import { verifySignIn } from "../../lib/authHelper";
import { addLikeSchema, cancelLikeSchema, readLikesSchema } from "../../schema";
import { handleError } from "../../lib/errorHelper";
import { ERROR_MESSAGE } from "../../lib/constants";
import likeService from "../../services/likeService";
const likeRoute = async (fastify) => {
    fastify.route({
        method: "POST",
        schema: addLikeSchema,
        url: "/add/:articleId",
        preHandler: [verifySignIn],
        handler: async (req, rep) => {
            const { articleId } = req.params;
            const userId = req.user.id;
            try {
                const result = await likeService.addLike(articleId, userId);
                rep.status(200).send(result);
            }
            catch (error) {
                handleError(rep, ERROR_MESSAGE.badRequest, error);
            }
        },
    });
    fastify.route({
        method: "GET",
        schema: readLikesSchema,
        url: "/",
        preHandler: [verifySignIn],
        handler: async (req, rep) => {
            const { pageNumber = 0 } = req.query;
            const userId = req.user.id;
            try {
                const result = await likeService.readLikes(pageNumber, userId);
                rep.status(200).send(result);
            }
            catch (error) {
                handleError(rep, ERROR_MESSAGE.badRequest, error);
            }
        },
    });
    fastify.route({
        method: "POST",
        schema: cancelLikeSchema,
        url: "/cancel/:articleId",
        preHandler: [verifySignIn],
        handler: async (req, rep) => {
            const { articleId } = req.params;
            const userId = req.user.id;
            try {
                const result = likeService.cancelLike(articleId, userId);
                rep.status(200).send(result);
            }
            catch (error) {
                handleError(rep, ERROR_MESSAGE.badRequest, error);
            }
        },
    });
};
export default likeRoute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2xpa2UvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRWhGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxXQUFXLE1BQU0sNEJBQTRCLENBQUM7QUFFckQsTUFBTSxTQUFTLEdBQUcsS0FBSyxFQUFFLE9BQXdCLEVBQUUsRUFBRTtJQUNuRCxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ1osTUFBTSxFQUFFLE1BQU07UUFDZCxNQUFNLEVBQUUsYUFBYTtRQUNyQixHQUFHLEVBQUUsaUJBQWlCO1FBQ3RCLFVBQVUsRUFBRSxDQUFDLFlBQVksQ0FBQztRQUMxQixPQUFPLEVBQUUsS0FBSyxFQUNaLEdBQXNFLEVBQ3RFLEdBQWlCLEVBQ2pCLEVBQUU7WUFDRixNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUNqQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSyxDQUFDLEVBQUUsQ0FBQztZQUU1QixJQUFJLENBQUM7Z0JBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDNUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0IsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2YsV0FBVyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3BELENBQUM7UUFDSCxDQUFDO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsTUFBTSxFQUFFLGVBQWU7UUFDdkIsR0FBRyxFQUFFLEdBQUc7UUFDUixVQUFVLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDMUIsT0FBTyxFQUFFLEtBQUssRUFDWixHQUdFLEVBQ0YsR0FBaUIsRUFDakIsRUFBRTtZQUNGLE1BQU0sRUFBRSxVQUFVLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNyQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSyxDQUFDLEVBQUUsQ0FBQztZQUU1QixJQUFJLENBQUM7Z0JBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDL0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0IsQ0FBQztZQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7Z0JBQ2YsV0FBVyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3BELENBQUM7UUFDSCxDQUFDO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNaLE1BQU0sRUFBRSxNQUFNO1FBQ2QsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixHQUFHLEVBQUUsb0JBQW9CO1FBQ3pCLFVBQVUsRUFBRSxDQUFDLFlBQVksQ0FBQztRQUMxQixPQUFPLEVBQUUsS0FBSyxFQUNaLEdBQXNFLEVBQ3RFLEdBQWlCLEVBQ2pCLEVBQUU7WUFDRixNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUNqQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSyxDQUFDLEVBQUUsQ0FBQztZQUU1QixJQUFJLENBQUM7Z0JBQ0gsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3pELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9CLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNmLFdBQVcsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwRCxDQUFDO1FBQ0gsQ0FBQztLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLGVBQWUsU0FBUyxDQUFDIn0=