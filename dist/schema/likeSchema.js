import { Type } from "@sinclair/typebox";
import { commonHeadersSchema, commonQuerySchema, commonParamSchema, commonPagenationSchema, } from "./commonSchema";
const headers = commonHeadersSchema;
const querystring = commonQuerySchema;
const params = commonParamSchema;
const addLikeSchema = {
    headers,
    params,
    response: {
        200: Type.Boolean(),
    },
};
const cancelLikeSchema = {
    headers,
    params,
    response: {
        200: Type.Boolean(),
    },
};
const readLikesSchema = {
    headers,
    querystring,
    response: {
        200: commonPagenationSchema,
    },
};
export { addLikeSchema, cancelLikeSchema, readLikesSchema };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlrZVNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWEvbGlrZVNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekMsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLHNCQUFzQixHQUN2QixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE1BQU0sT0FBTyxHQUFHLG1CQUFtQixDQUFDO0FBQ3BDLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFDO0FBQ3RDLE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDO0FBRWpDLE1BQU0sYUFBYSxHQUFHO0lBQ3BCLE9BQU87SUFDUCxNQUFNO0lBQ04sUUFBUSxFQUFFO1FBQ1IsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7S0FDcEI7Q0FDRixDQUFDO0FBQ0YsTUFBTSxnQkFBZ0IsR0FBRztJQUN2QixPQUFPO0lBQ1AsTUFBTTtJQUNOLFFBQVEsRUFBRTtRQUNSLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO0tBQ3BCO0NBQ0YsQ0FBQztBQUNGLE1BQU0sZUFBZSxHQUFHO0lBQ3RCLE9BQU87SUFDUCxXQUFXO0lBQ1gsUUFBUSxFQUFFO1FBQ1IsR0FBRyxFQUFFLHNCQUFzQjtLQUM1QjtDQUNGLENBQUM7QUFFRixPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxDQUFDIn0=