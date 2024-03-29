import { FastifyReply } from "fastify";

export function handleError(
  rep: FastifyReply,
  errorType: { success: boolean; status: number; message: string },
  //모든 종류의 에러를 처리하므로 any 사용
  error?: any
) {
  rep.log.error(error);
  rep.status(errorType.status).send(errorType);
}
