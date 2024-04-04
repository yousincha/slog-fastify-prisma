import { Type } from "@sinclair/typebox";
import { commonHeadersSchema, commonBodySchema, commonParamSchema, } from "./commonSchema";
const headers = commonHeadersSchema;
const body = commonBodySchema;
const params = commonParamSchema;
const commentSchema = Type.Object({
    id: Type.Number(),
    articleId: Type.Number(),
    content: Type.String(),
    createdAt: Type.String(),
    userId: Type.Number(),
    userEmail: Type.String(),
});
const commentDeleteBodySchema = Type.Object({
    articleId: Type.Number(),
    commentId: Type.Number(),
});
const createCommentSchema = {
    headers,
    body,
    response: {
        200: commentSchema,
    },
};
const readCommentSchema = {
    params,
    response: {
        200: Type.Object({
            comments: Type.Array(commentSchema),
        }),
    },
};
const deleteCommentSchema = {
    headers,
    body: commentDeleteBodySchema,
    response: {
        200: Type.Object({
            commentId: Type.Number(),
        }),
    },
};
export { commentSchema, commentDeleteBodySchema, createCommentSchema, readCommentSchema, deleteCommentSchema, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudFNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWEvY29tbWVudFNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekMsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsTUFBTSxPQUFPLEdBQUcsbUJBQW1CLENBQUM7QUFDcEMsTUFBTSxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7QUFDOUIsTUFBTSxNQUFNLEdBQUcsaUJBQWlCLENBQUM7QUFFakMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNoQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtJQUNqQixTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtJQUN4QixPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtJQUN0QixTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtJQUN4QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtJQUNyQixTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtDQUN6QixDQUFDLENBQUM7QUFFSCxNQUFNLHVCQUF1QixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDMUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7SUFDeEIsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7Q0FDekIsQ0FBQyxDQUFDO0FBRUgsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixPQUFPO0lBQ1AsSUFBSTtJQUNKLFFBQVEsRUFBRTtRQUNSLEdBQUcsRUFBRSxhQUFhO0tBQ25CO0NBQ0YsQ0FBQztBQUVGLE1BQU0saUJBQWlCLEdBQUc7SUFDeEIsTUFBTTtJQUNOLFFBQVEsRUFBRTtRQUNSLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ2YsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1NBQ3BDLENBQUM7S0FDSDtDQUNGLENBQUM7QUFFRixNQUFNLG1CQUFtQixHQUFHO0lBQzFCLE9BQU87SUFDUCxJQUFJLEVBQUUsdUJBQXVCO0lBQzdCLFFBQVEsRUFBRTtRQUNSLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ2YsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7U0FDekIsQ0FBQztLQUNIO0NBQ0YsQ0FBQztBQUVGLE9BQU8sRUFDTCxhQUFhLEVBQ2IsdUJBQXVCLEVBQ3ZCLG1CQUFtQixFQUNuQixpQkFBaUIsRUFDakIsbUJBQW1CLEdBQ3BCLENBQUMifQ==