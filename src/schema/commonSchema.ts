import { Type } from "@sinclair/typebox";

const commonHeadersSchema = Type.Object({
  authorization: Type.Optional(Type.String()),
});

export { commonHeadersSchema };
