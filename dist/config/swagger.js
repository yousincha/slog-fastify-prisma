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
const swaggerUiConfig = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvc3dhZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxvQkFBb0I7QUFDcEIsTUFBTSxhQUFhLEdBQUc7SUFDcEIscUJBQXFCO0lBQ3JCLE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRTtZQUNKLEtBQUssRUFBRSxVQUFVO1lBQ2pCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsT0FBTyxFQUFFLE9BQU87U0FDakI7UUFDRCxzQkFBc0I7UUFDdEIsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QiwyQkFBMkI7UUFDM0IsUUFBUSxFQUFFLEdBQUc7S0FDZDtDQUNGLENBQUM7QUFDRix1QkFBdUI7QUFDdkIsTUFBTSxlQUFlLEdBQTRCO0lBQy9DLGlDQUFpQztJQUNqQyxXQUFXLEVBQUUsZ0JBQWdCO0lBQzdCLHFCQUFxQjtJQUNyQixRQUFRLEVBQUU7UUFDUiwrREFBK0Q7UUFDL0QsWUFBWSxFQUFFLE1BQU07S0FDckI7Q0FDRixDQUFDO0FBRUYsc0NBQXNDO0FBQ3RDLE9BQU8sRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLENBQUMifQ==