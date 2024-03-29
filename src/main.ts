import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { FastifyCookieOptions } from "@fastify/cookie";
import fastifyCookie from "@fastify/cookie";
import routes from "./routes";
import { SECRET_KEY } from "./lib/constants";
import { currentlyAuthPlugin } from "./plugin/authPlugin";

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

// fastify.get("/ping", async (request, reply) => {
//   return "pong\n";
// });

fastify.register(fastifyCookie, {
  secret: SECRET_KEY,
} as FastifyCookieOptions);

fastify.register(currentlyAuthPlugin);
fastify.register(routes);

const start = async () => {
  try {
    await fastify.listen({ port: 8083 });
    console.log(`Server Start!`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
