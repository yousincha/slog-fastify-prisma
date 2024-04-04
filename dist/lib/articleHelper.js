import db from "./db";
const verifyArticleUser = async (articleId, userId) => {
    let result = false;
    try {
        const article = await db.article.findUnique({
            where: {
                id: articleId,
            },
            select: {
                userId: true,
            },
        });
        if (article) {
            result = article.userId === userId ? true : false;
        }
        return result;
    }
    catch (error) {
        return false;
    }
};
const likeCompareArticles = async (articles, userId) => {
    const articlesIds = articles.map((article) => article.id);
    let likes = await db.like.findMany({
        where: {
            userId: userId,
            articleId: {
                in: articlesIds,
            },
        },
        select: {
            articleId: true,
        },
    });
    const verifyLikeMe = (article, likes) => {
        article.likeMe = false;
        const likeArticle = likes.some((like) => like.articleId === article.id);
        if (likeArticle)
            article.likeMe = true;
        return article;
    };
    const articlesWithLike = articles.map((article) => verifyLikeMe(article, likes));
    return articlesWithLike;
};
export { verifyArticleUser, likeCompareArticles };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZUhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvYXJ0aWNsZUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHdEIsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLEVBQUUsU0FBaUIsRUFBRSxNQUFjLEVBQUUsRUFBRTtJQUNwRSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFFbkIsSUFBSSxDQUFDO1FBQ0gsTUFBTSxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUMxQyxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLFNBQVM7YUFDZDtZQUNELE1BQU0sRUFBRTtnQkFDTixNQUFNLEVBQUUsSUFBSTthQUNiO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDcEQsQ0FBQztRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsTUFBTSxtQkFBbUIsR0FBRyxLQUFLLEVBQUUsUUFBb0IsRUFBRSxNQUFjLEVBQUUsRUFBRTtJQUt6RSxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFMUQsSUFBSSxLQUFLLEdBQW1CLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDakQsS0FBSyxFQUFFO1lBQ0wsTUFBTSxFQUFFLE1BQU07WUFDZCxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxFQUFFLFdBQVc7YUFDaEI7U0FDRjtRQUNELE1BQU0sRUFBRTtZQUNOLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsTUFBTSxZQUFZLEdBQUcsQ0FBQyxPQUFpQixFQUFFLEtBQXFCLEVBQUUsRUFBRTtRQUNoRSxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN2QixNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4RSxJQUFJLFdBQVc7WUFBRSxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUV2QyxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDLENBQUM7SUFFRixNQUFNLGdCQUFnQixHQUFlLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUM1RCxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUM3QixDQUFDO0lBQ0YsT0FBTyxnQkFBZ0IsQ0FBQztBQUMxQixDQUFDLENBQUM7QUFFRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyJ9