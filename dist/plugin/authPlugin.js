import { verifyAccessToken, shortVerifyRefreshToken } from "../lib/authHelper";
import fp from "fastify-plugin";
const currentlyAuth = async (fastify) => {
    fastify.decorateRequest("user", null);
    fastify.addHook("preHandler", async (req) => {
        const { authorization } = req.headers;
        const refresh_token = req.cookies.refresh_token;
        if (!authorization || !refresh_token)
            return;
        try {
            shortVerifyRefreshToken(refresh_token);
            const decode = verifyAccessToken(authorization);
            req.user = {
                id: decode.id,
                email: decode.email,
            };
        }
        catch (error) {
            return;
        }
    });
};
export const currentlyAuthPlugin = fp(currentlyAuth, {
    name: "currentlyAuthPlugin",
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aFBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wbHVnaW4vYXV0aFBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdoQyxNQUFNLGFBQWEsR0FBdUIsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO0lBQzFELE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLE9BQU8sQ0FBQyxPQUFPLENBQ2IsWUFBWSxFQUNaLEtBQUssRUFBRSxHQUFnRCxFQUFFLEVBQUU7UUFDekQsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDdEMsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFFaEQsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPO1FBRTdDLElBQUksQ0FBQztZQUNILHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRWhELEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ1QsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUNiLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSzthQUNwQixDQUFDO1FBQ0osQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPO1FBQ1QsQ0FBQztJQUNILENBQUMsQ0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsRUFBRSxDQUFDLGFBQWEsRUFBRTtJQUNuRCxJQUFJLEVBQUUscUJBQXFCO0NBQzVCLENBQUMsQ0FBQyJ9