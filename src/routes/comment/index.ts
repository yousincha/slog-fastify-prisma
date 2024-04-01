import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { verifySignIn } from "../../lib/authHelper";
import { verifyCommentUser } from "../../schema/commentHelper";
import {
  createCommentSchema,
  deleteCommentSchema,
  readCommentSchema,
} from "../../schema";
import {
  TCommonHeaders,
  TCommonBody,
  TCommonParam,
  TCommentDeleteBody,
} from "../../schema/types";

const commentRoute = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    schema: createCommentSchema,
    url: "/",
    preHandler: [verifySignIn],
    handler: async (
      req: FastifyRequest<{ Headers: TCommonHeaders; Body: TCommonBody }>,
      rep: FastifyReply
    ) => {},
  });

  fastify.route({
    method: "GET",
    schema: readCommentSchema,
    url: "/:articleId",
    handler: async (
      req: FastifyRequest<{ Headers: TCommonHeaders; Params: TCommonParam }>,
      rep: FastifyReply
    ) => {},
  });

  fastify.route({
    method: "DELETE",
    schema: deleteCommentSchema,
    url: "/",
    preHandler: [verifySignIn, verifyCommentUser],
    handler: async (
      req: FastifyRequest<{
        Headers: TCommonHeaders;
        Body: TCommentDeleteBody;
      }>,
      rep: FastifyReply
    ) => {},
  });
};

export default commentRoute;
