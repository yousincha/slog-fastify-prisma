import bcrypt from "bcrypt";
import db from "./db";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  ERROR_MESSAGE,
  ROUND,
  SECRET_KEY,
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
} from "./constants";
import { handleError } from "../lib/errorHelper";

const generateHash = (pwd: string) => {
  // ROUND의 숫자가 커질수록 암호화가 복잡
  // 복잡할 수록 성능이 떨어짐
  const hashPwd = bcrypt.hashSync(pwd, ROUND);
  return hashPwd;
};

const duplicateVerifyUser = async (email: string) => {
  try {
    const userCount = await db.user.count({
      where: {
        email: email,
      },
    });
    if (userCount > 0) throw ERROR_MESSAGE.alreadySignup;

    return true;
  } catch (error) {
    throw error;
  }
};

const verifyPassword = async (email: string, pwd: string) => {
  try {
    const encrptedPwd = await db.user.findUnique({
      where: {
        email: email,
      },
      select: {
        password: true,
      },
    });
    if (!encrptedPwd) return false;
    const result = bcrypt.compareSync(pwd, encrptedPwd.password);
    return result;
  } catch (error) {
    return false;
  }
};

const generateAccessToken = (user: { id: number; email: string }) => {
  const accessToken = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRES,
  });
  return accessToken;
};

const generateRefreshToken = (user: { id: number; email: string }) => {
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    SECRET_KEY,
    { expiresIn: REFRESH_TOKEN_EXPIRES }
  );
  return refreshToken;
};

//db,jwt.verify토큰 상태 확인
const verifyRefreshToken = async (refresh_token: string) => {
  try {
    const decoded = jwt.verify(refresh_token, SECRET_KEY) as JwtPayload;
    const tokenFromServer = await db.token.count({
      where: {
        userId: decoded.id,
        refreshToken: refresh_token,
      },
    });
    // 토근에 로그인 정보가 있는지 확인
    if (tokenFromServer > 0) {
      return decoded;
    } else {
      throw ERROR_MESSAGE.unauthorized;
    }
  } catch (error) {
    throw ERROR_MESSAGE.unauthorized;
  }
};

//db X, jwt.verify만으로 토큰 상태 확인
const shortVerifyRefreshToken = (refresh_token: string) => {
  const decode = jwt.verify(refresh_token, SECRET_KEY);
  if (decode) {
    return true;
  } else {
    return false;
  }
};

//access_token 복호화
const verifyAccessToken = (access_token: string) => {
  try {
    const decode = jwt.verify(access_token, SECRET_KEY) as JwtPayload;
    return decode;
  } catch (error) {
    throw ERROR_MESSAGE.invalidToken;
  }
};
export {
  generateHash,
  duplicateVerifyUser,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  shortVerifyRefreshToken,
  verifyAccessToken,
};
