import { verifySignIn } from "../../lib/authHelper";
import { verifyCommentUser } from "../../schema/commentHelper";
import { createCommentSchema, deleteCommentSchema, readCommentSchema, } from "../../schema";
import commentController from "../../controller/commentController";
const commentRoute = async (fastify) => {
    fastify.route({
        method: "POST",
        schema: createCommentSchema,
        url: "/",
        preHandler: [verifySignIn],
        handler: commentController.createComment,
    });
    fastify.route({
        method: "GET",
        schema: readCommentSchema,
        url: "/:articleId",
        handler: commentController.readComment,
    });
    fastify.route({
        method: "DELETE",
        schema: deleteCommentSchema,
        url: "/",
        preHandler: [verifySignIn, verifyCommentUser],
        handler: commentController.deleteComment,
    });
};
export default commentRoute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2NvbW1lbnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQy9ELE9BQU8sRUFDTCxtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ25CLGlCQUFpQixHQUNsQixNQUFNLGNBQWMsQ0FBQztBQUV0QixPQUFPLGlCQUFpQixNQUFNLG9DQUFvQyxDQUFDO0FBQ25FLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFBRSxPQUF3QixFQUFFLEVBQUU7SUFDdEQsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNaLE1BQU0sRUFBRSxNQUFNO1FBQ2QsTUFBTSxFQUFFLG1CQUFtQjtRQUMzQixHQUFHLEVBQUUsR0FBRztRQUNSLFVBQVUsRUFBRSxDQUFDLFlBQVksQ0FBQztRQUMxQixPQUFPLEVBQUUsaUJBQWlCLENBQUMsYUFBYTtLQUN6QyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ1osTUFBTSxFQUFFLEtBQUs7UUFDYixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLEdBQUcsRUFBRSxhQUFhO1FBQ2xCLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxXQUFXO0tBQ3ZDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDWixNQUFNLEVBQUUsUUFBUTtRQUNoQixNQUFNLEVBQUUsbUJBQW1CO1FBQzNCLEdBQUcsRUFBRSxHQUFHO1FBQ1IsVUFBVSxFQUFFLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDO1FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxhQUFhO0tBQ3pDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLGVBQWUsWUFBWSxDQUFDIn0=