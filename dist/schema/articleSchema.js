import { Type } from "@sinclair/typebox";
import { articleSchema, commonHeadersSchema, commonBodySchema, commonParamSchema, commonQuerySchema, commonPagenationSchema, } from "./commonSchema";
const headers = commonHeadersSchema;
const body = commonBodySchema;
const params = commonParamSchema;
const querystring = commonQuerySchema;
const createArticleSchema = {
    headers,
    body: Type.Object({
        content: Type.String(),
    }),
    response: {
        200: articleSchema,
    },
};
const updateArticleSchema = {
    headers,
    body,
    response: {
        200: articleSchema,
    },
};
const deleteArticleSchema = {
    headers,
    params,
    response: {
        200: articleSchema,
    },
};
const readArticleOneSchema = {
    params,
    response: {
        200: articleSchema,
    },
};
const readArticlesSchema = {
    headers,
    querystring,
    response: {
        200: commonPagenationSchema,
    },
};
export { createArticleSchema, updateArticleSchema, deleteArticleSchema, readArticleOneSchema, readArticlesSchema, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZVNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWEvYXJ0aWNsZVNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekMsT0FBTyxFQUNMLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsc0JBQXNCLEdBQ3ZCLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsTUFBTSxPQUFPLEdBQUcsbUJBQW1CLENBQUM7QUFDcEMsTUFBTSxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7QUFDOUIsTUFBTSxNQUFNLEdBQUcsaUJBQWlCLENBQUM7QUFDakMsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUM7QUFFdEMsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixPQUFPO0lBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDaEIsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7S0FDdkIsQ0FBQztJQUNGLFFBQVEsRUFBRTtRQUNSLEdBQUcsRUFBRSxhQUFhO0tBQ25CO0NBQ0YsQ0FBQztBQUVGLE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsT0FBTztJQUNQLElBQUk7SUFDSixRQUFRLEVBQUU7UUFDUixHQUFHLEVBQUUsYUFBYTtLQUNuQjtDQUNGLENBQUM7QUFFRixNQUFNLG1CQUFtQixHQUFHO0lBQzFCLE9BQU87SUFDUCxNQUFNO0lBQ04sUUFBUSxFQUFFO1FBQ1IsR0FBRyxFQUFFLGFBQWE7S0FDbkI7Q0FDRixDQUFDO0FBRUYsTUFBTSxvQkFBb0IsR0FBRztJQUMzQixNQUFNO0lBQ04sUUFBUSxFQUFFO1FBQ1IsR0FBRyxFQUFFLGFBQWE7S0FDbkI7Q0FDRixDQUFDO0FBRUYsTUFBTSxrQkFBa0IsR0FBRztJQUN6QixPQUFPO0lBQ1AsV0FBVztJQUNYLFFBQVEsRUFBRTtRQUNSLEdBQUcsRUFBRSxzQkFBc0I7S0FDNUI7Q0FDRixDQUFDO0FBRUYsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ25CLG9CQUFvQixFQUNwQixrQkFBa0IsR0FDbkIsQ0FBQyJ9