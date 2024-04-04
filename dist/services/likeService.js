import db from "../lib/db";
import { ERROR_MESSAGE } from "../lib/constants";
function likeService() {
    const addLike = async (articleId, userId) => {
        const values = {
            userId: userId,
            articleId: articleId,
        };
        try {
            const likeCheck = await db.like.count({
                where: {
                    userId: userId,
                    articleId: articleId,
                },
            });
            if (likeCheck === 0) {
                await db.like.create({
                    data: values,
                });
                await db.article.update({
                    where: {
                        id: articleId,
                    },
                    data: {
                        likeCount: { increment: 1 },
                    },
                });
                return true;
            }
            else {
                throw ERROR_MESSAGE.likeAddError;
            }
        }
        catch (error) {
            throw error;
        }
    };
    const cancelLike = async (articleId, userId) => {
        try {
            const likeCheck = await db.like.count({
                where: {
                    userId: userId,
                    articleId: articleId,
                },
            });
            if (likeCheck > 0) {
                await db.like.deleteMany({
                    where: {
                        userId: userId,
                        articleId: articleId,
                    },
                });
                await db.article.update({
                    where: {
                        id: articleId,
                    },
                    data: {
                        likeCount: { decrement: 1 },
                    },
                });
                return true;
            }
            else {
                throw ERROR_MESSAGE.likeCancelError;
            }
        }
        catch (error) {
            throw error;
        }
    };
    const readLikes = async (pageNumber, userId) => {
        const pageSize = 10;
        let skip = 0;
        if (pageNumber > 1)
            skip = (pageNumber - 1) * pageSize;
        try {
            const likeArticles = await db.like.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    article: {
                        select: {
                            id: true,
                            content: true,
                            commentCount: true,
                            likeCount: true,
                            createdAt: true,
                            user: {
                                select: {
                                    id: true,
                                    email: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    id: "desc",
                },
                skip: skip,
                take: pageSize,
            });
            const totalLikeCount = await db.like.count({
                where: {
                    userId: userId,
                },
            });
            const totalPageCount = Math.ceil(totalLikeCount / pageSize);
            let flattenArticles = likeArticles.map((like) => {
                return {
                    ...like.article,
                    createdAt: like.article.createdAt.toString(),
                    userId: like.article.user.id,
                    userEmail: like.article.user.email,
                    likeMe: true,
                };
            });
            return {
                totalPageCount: totalPageCount,
                articleList: flattenArticles,
            };
        }
        catch (error) {
            throw error;
        }
    };
    return {
        addLike,
        cancelLike,
        readLikes,
    };
}
export default likeService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlrZVNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvbGlrZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUdqRCxTQUFTLFdBQVc7SUFDbEIsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLFNBQWlCLEVBQUUsTUFBYyxFQUFFLEVBQUU7UUFDMUQsTUFBTSxNQUFNLEdBQUc7WUFDYixNQUFNLEVBQUUsTUFBTTtZQUNkLFNBQVMsRUFBRSxTQUFTO1NBQ3JCLENBQUM7UUFFRixJQUFJLENBQUM7WUFDSCxNQUFNLFNBQVMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNwQyxLQUFLLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLE1BQU07b0JBQ2QsU0FBUyxFQUFFLFNBQVM7aUJBQ3JCO2FBQ0YsQ0FBQyxDQUFDO1lBRUgsSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ3BCLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ25CLElBQUksRUFBRSxNQUFNO2lCQUNiLENBQUMsQ0FBQztnQkFFSCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO29CQUN0QixLQUFLLEVBQUU7d0JBQ0wsRUFBRSxFQUFFLFNBQVM7cUJBQ2Q7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLFNBQVMsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUU7cUJBQzVCO2lCQUNGLENBQUMsQ0FBQztnQkFFSCxPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7aUJBQU0sQ0FBQztnQkFDTixNQUFNLGFBQWEsQ0FBQyxZQUFZLENBQUM7WUFDbkMsQ0FBQztRQUNILENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsTUFB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