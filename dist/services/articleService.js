import db from "../lib/db";
import { getCurrentDate } from "../lib/timeHelper";
import { ERROR_MESSAGE, CATEGORY_TYPE } from "../lib/constants";
import { verifyArticleUser, likeCompareArticles } from "../lib/articleHelper";
function articleService() {
    const createArticle = async (id, email, content) => {
        try {
            const values = {
                content: content,
                userId: id,
                createdAt: getCurrentDate(),
            };
            const result = await db.article.create({
                data: values,
            });
            const returnValue = {
                ...result,
                userEmail: email,
                likeMe: false,
                createdAt: result.createdAt.toString(),
            };
            return returnValue;
        }
        catch (error) {
            throw error;
        }
    };
    const updateArticle = async (articleId, content, userId, email) => {
        try {
            const checkVerifyUser = await verifyArticleUser(articleId, userId);
            if (checkVerifyUser) {
                const result = await db.article.update({
                    where: {
                        id: articleId,
                    },
                    data: {
                        content: content,
                    },
                });
                const returnValue = {
                    ...result,
                    userEmail: email,
                    likeMe: false,
                    createdAt: result.createdAt.toString(),
                };
                return returnValue;
            }
            else {
                throw ERROR_MESSAGE.badRequest;
            }
        }
        catch (error) {
            throw error;
        }
    };
    const deleteArticle = async (articleId, userId) => {
        try {
            const checkVerifyUser = await verifyArticleUser(articleId, userId);
            if (checkVerifyUser) {
                const result = await db.article.delete({
                    where: {
                        id: articleId,
                    },
                });
                return result;
            }
            else {
                throw ERROR_MESSAGE.badRequest;
            }
        }
        catch (error) {
            throw error;
        }
    };
    const readArticleOne = async (articleId) => {
        try {
            const articleOne = await db.article.findUnique({
                where: {
                    id: articleId,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                        },
                    },
                },
            });
            let returnValue;
            if (articleOne) {
                returnValue = {
                    ...articleOne,
                    userEmail: articleOne.user.email,
                    likeMe: false,
                    createdAt: articleOne.createdAt.toString(),
                };
            }
            else {
                returnValue = {};
            }
            return returnValue;
        }
        catch (error) {
            throw error;
        }
    };
    const readArticlesList = async (pageNumber, mode, userId) => {
        const pageSize = 10;
        let skip = 0;
        if (pageNumber > 1)
            skip = (pageNumber - 1) * pageSize;
        let _where = {};
        if (mode === CATEGORY_TYPE.MY) {
            _where = { userId: userId };
        }
        try {
            const articles = await db.article.findMany({
                where: _where,
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                        },
                    },
                },
                orderBy: {
                    id: "desc",
                },
                skip: skip,
                take: pageSize,
            });
            const totalArticleCount = await db.article.count({
                where: _where,
            });
            let totalPageCount = Math.ceil(totalArticleCount / pageSize);
            let flattenArticles = articles.map((article) => {
                return {
                    ...article,
                    userEmail: article.user.email,
                    likeMe: false,
                    createdAt: article.createdAt.toString(),
                };
            });
            let returnArticles;
            if (userId) {
                returnArticles = await likeCompareArticles([...flattenArticles], userId);
            }
            else {
                returnArticles = [...flattenArticles];
            }
            const returnValue = {
                totalPageCount: totalPageCount,
                articleList: returnArticles,
            };
            return returnValue;
        }
        catch (error) {
            throw error;
        }
    };
    return {
        createArticle,
        updateArticle,
        deleteArticle,
        readArticleOne,
        readArticlesList,
    };
}
export default articleService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZVNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvYXJ0aWNsZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTNCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlFLFNBQVMsY0FBYztJQUNyQixNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQUUsRUFBVSxFQUFFLEtBQWEsRUFBRSxPQUFlLEVBQUUsRUFBRTtRQUN6RSxJQUFJLENBQUM7WUFDSCxNQUFNLE1BQU0sR0FBRztnQkFDYixPQUFPLEVBQUUsT0FBTztnQkFDaEIsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLGNBQWMsRUFBRTthQUM1QixDQUFDO1lBRUYsTUFBTSxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFDckMsSUFBSSxFQUFFLE1BQU07YUFDYixDQUFDLENBQUM7WUFFSCxNQUFNLFdBQVcsR0FBYTtnQkFDNUIsR0FBRyxNQUFNO2dCQUNULFNBQVMsRUFBRSxLQUFLO2dCQUNoQixNQUFNLEVBQUUsS0FBSztnQkFDYixTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7YUFDdkMsQ0FBQztZQUVGLE9BQU8sV0FBVyxDQUFDO1FBQ3JCLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUN6QixTQUFpQixFQUNqQixPQUFlLEVBQ2YsTUFBYyxF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