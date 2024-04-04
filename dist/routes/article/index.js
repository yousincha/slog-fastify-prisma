import { createArticleSchema, updateArticleSchema, deleteArticleSchema, readArticlesSchema, readArticleOneSchema, } from "../../schema";
import { handleError } from "../../lib/errorHelper";
import { ERROR_MESSAGE, CATEGORY_TYPE } from "../../lib/constants";
import articleService from "../../services/articleService";
import { verifySignIn } from "../../lib/authHelper";
const articleRoute = async (fastify) => {
    fastify.route({
        method: "POST",
        schema: createArticleSchema,
        url: "/",
        preHandler: [verifySignIn],
        handler: async (req, rep) => {
            const { content } = req.body;
            const userId = req.user.id;
            const email = req.user.email;
            try {
                const result = await articleService.createArticle(userId, email, content);
                rep.status(200).send(result);
            }
            catch (error) {
                handleError(rep, ERROR_MESSAGE.badRequest, error);
            }
        },
    });
    fastify.route({
        method: "PUT",
        url: "/",
        schema: updateArticleSchema,
        preHandler: [verifySignIn],
        handler: async (req, rep) => {
            const { articleId, content } = req.body;
            const userId = req.user.id;
            const email = req.user.email;
            try {
                const result = await articleService.updateArticle(articleId, content, userId, email);
                rep.status(200).send(result);
            }
            catch (error) {
                handleError(rep, ERROR_MESSAGE.badRequest, error);
            }
        },
    });
    fastify.route({
        method: "DELETE",
        url: "/:articleId",
        schema: deleteArticleSchema,
        preHandler: [verifySignIn],
        handler: async (req, rep) => {
            const { articleId } = req.params;
            const userId = req.user.id;
            try {
                const result = await articleService.deleteArticle(Number(articleId), userId);
                rep.status(200).send(result);
            }
            catch (error) {
                handleError(rep, ERROR_MESSAGE.badRequest, error);
            }
        },
    });
    fastify.route({
        method: "GET",
        url: "/:articleId",
        schema: readArticleOneSchema,
        handler: async (req, rep) => {
            const { articleId } = req.params;
            try {
                const result = await articleService.readArticleOne(Number(articleId));
                rep.status(200).send(result);
            }
            catch (error) {
                handleError(rep, ERROR_MESSAGE.badRequest, error);
            }
        },
    });
    fastify.route({
        method: "GET",
        url: "/",
        schema: readArticlesSchema,
        handler: async (req, rep) => {
            const { pageNumber = 0, mode = CATEGORY_TYPE.ALL } = req.query;
            const userId = req.user?.id;
            try {
                const result = await articleService.readArticlesList(pageNumber, mode, userId);
                rep.status(200).send(result);
            }
            catch (error) {
                handleError(rep, ERROR_MESSAGE.badRequest, error);
            }
        },
    });
};
export default articleRoute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2FydGljbGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ25CLGtCQUFrQixFQUNsQixvQkFBb0IsR0FDckIsTUFBTSxjQUFjLENBQUM7QUFPdEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkUsT0FBTyxjQUFjLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXBELE1BQU0sWUFBWSxHQUFHLEtBQUssRUFBRSxPQUF3QixFQUFFLEVBQUU7SUFDdEQsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNaLE1BQU0sRUFBRSxNQUFNO1FBQ2QsTUFBTSxFQUFFLG1CQUFtQjtRQUMzQixHQUFHLEVBQUUsR0FBRztRQUNSLFVBQVUsRUFBRSxDQUFDLFlBQVksQ0FBQztRQUMxQixPQUFPLEVBQUUsS0FBSyxFQUNaLEdBQW1FLEVBQ25FLEdBQWlCLEVBQ2pCLEVBQUU7WUFDRixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUM3QixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSyxDQUFDLEVBQUUsQ0FBQztZQUM1QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSyxDQUFDLEtBQUssQ0FBQztZQUU5QixJQUFJLENBQUM7Z0JBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxjQUFjLENBQUMsYUFBYSxDQUMvQyxNQUFNLEVBQ04sS0FBSyxFQUNMLE9BQU8sQ0FDUixDQUFDO2dCQUNGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMs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