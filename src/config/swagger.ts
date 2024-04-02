// FastifySwaggerUiOptions 타입을 가져옵니다.
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

// 스웨거 설정 객체를 생성합니다.
const swaggerConfig = {
  // 스웨거 문서의 정보를 설정합니다.
  swagger: {
    info: {
      title: "Slog Api",
      description: "Slog에 사용되는 REST API 명세서 입니다. ",
      version: "1.0.0",
    },
    // API 서버의 호스트를 설정합니다.
    host: "localhost:8083",
    // API 엔드포인트의 기본 경로를 설정합니다.
    basePath: "/",
  },
};
// 스웨거 UI 설정 객체를 생성합니다.
const swaggerUiConfig: FastifySwaggerUiOptions = {
  // 스웨거 UI가 노출될 경로(prefix)를 설정합니다.
  routePrefix: "/documentation",
  // 스웨거 UI의 설정을 구성합니다.
  uiConfig: {
    // 스웨거 UI에서 문서를 펼칠 방식을 설정합니다. "full"로 설정하면 모든 세부 정보를 펼쳐서 보여줍니다.
    docExpansion: "full",
  },
};

// 생성한 스웨거 설정 객체와 스웨거 UI 설정 객체를 내보냅니다.
export { swaggerConfig, swaggerUiConfig };
