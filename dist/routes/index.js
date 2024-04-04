import authRoute from "./auth";
import articleRoute from "./article";
import commentRoute from "./comment";
import likeRoute from "./like";
const routes = async (fastify) => {
    await fastify.register(authRoute, { prefix: "/auth" });
    await fastify.register(articleRoute, { prefix: "/articles" });
    await fastify.register(commentRoute, { prefix: "/comments" });
    await fastify.register(likeRoute, { prefix: "/likes" });
};
export default routes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sU0FBUyxNQUFNLFFBQVEsQ0FBQztBQUMvQixPQUFPLFlBQVksTUFBTSxXQUFXLENBQUM7QUFDckMsT0FBTyxZQUFZLE1BQU0sV0FBVyxDQUFDO0FBQ3JDLE9BQU8sU0FBUyxNQUFNLFFBQVEsQ0FBQztBQUUvQixNQUFNLE1BQU0sR0FBRyxLQUFLLEVBQUUsT0FBd0IsRUFBRSxFQUFFO0lBQ2hELE1BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN2RCxNQUFNLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDOUQsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzlELE1BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUMxRCxDQUFDLENBQUM7QUFFRixlQUFlLE1BQU0sQ0FBQyJ9