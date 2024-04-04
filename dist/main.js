import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import routes from "./routes";
import { SECRET_KEY } from "./lib/constants";
import { currentlyAuthPlugin } from "./plugin/authPlugin";
import { checkStartupUser, checkStartupArticle } from "./startup";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { swaggerConfig, swaggerUiConfig } from "./config/swagger";
const fastify = Fastify({
    logger: true,
    // https: {
    //   key: fs.readFileSync("./server.key"),
    //   cert: fs.readFileSync("./server.crt"),
    // },
}).withTypeProvider();
// fastify.get("/ping", async (request, reply) => {
//   return "pong\n";
// });
fastify.register(cors, {
    origin: true,
    credentials: true,
});
fastify.register(fastifySwagger, swaggerConfig);
fastify.register(fastifySwaggerUi, swaggerUiConfig);
fastify.register(fastifyCookie, {
    secret: SECRET_KEY,
});
fastify.register(currentlyAuthPlugin);
fastify.register(routes);
const start = async () => {
    try {
        await checkStartupUser();
        await checkStartupArticle();
        await fastify.listen({ port: 8083 }, () => {
            if (process.send)
                process.send("ready");
            console.log("Server Start!!!");
        });
        console.log(`Server Start!`);
    }
    catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUc5QixPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLE1BQU0sTUFBTSxVQUFVLENBQUM7QUFDOUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVsRSxPQUFPLElBQUksTUFBTSxlQUFlLENBQUM7QUFDakMsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxnQkFBZ0IsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWxFLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN0QixNQUFNLEVBQUUsSUFBSTtJQUNaLFdBQVc7SUFDWCwwQ0FBMEM7SUFDMUMsMkNBQTJDO0lBQzNDLEtBQUs7Q0FDTixDQUFDLENBQUMsZ0JBQWdCLEVBQXVCLENBQUM7QUFFM0MsbURBQW1EO0FBQ25ELHFCQUFxQjtBQUNyQixNQUFNO0FBRU4sT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7SUFDckIsTUFBTSxFQUFFLElBQUk7SUFDWixXQUFXLEVBQUUsSUFBSTtDQUNsQixDQUFDLENBQUM7QUFFSCxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUNoRCxPQUFPLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBRXBELE9BQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFO0lBQzlCLE1BQU0sRUFBRSxVQUFVO0NBQ0ssQ0FBQyxDQUFDO0FBRTNCLE9BQU8sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUN0QyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXpCLE1BQU0sS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ3ZCLElBQUksQ0FBQztRQUNILE1BQU0sZ0JBQWdCLEVBQUUsQ0FBQztRQUN6QixNQUFNLG1CQUFtQixFQUFFLENBQUM7UUFDNUIsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRTtZQUN4QyxJQUFJLE9BQU8sQ0FBQyxJQUFJO2dCQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLEtBQUssRUFBRSxDQUFDIn0=