import db from "../lib/db";
import { generateHash, duplicateVerifyUser, verifyPassword, generateAccessToken, generateRefreshToken, verifyRefreshToken, } from "../lib/authHelper";
import { ERROR_MESSAGE } from "../lib/constants";
function authService() {
    const register = async (email, pwd) => {
        try {
            await duplicateVerifyUser(email);
            const hashPwd = generateHash(pwd);
            const values = {
                email: email,
                password: hashPwd,
            };
            // db연결은 반드시 await(비동기)
            const returnValue = await db.user.create({
                data: values,
            });
            return returnValue;
        }
        catch (error) {
            throw error;
        }
    };
    const loginWithPassword = async (email, pwd) => {
        try {
            const authenticationUser = await db.user.findUnique({
                where: {
                    email: email,
                },
                select: {
                    id: true,
                    email: true,
                },
            });
            if (!authenticationUser)
                throw ERROR_MESSAGE.unauthorized;
            const passwordVerification = await verifyPassword(email, pwd);
            if (!passwordVerification)
                throw ERROR_MESSAGE.unauthorized;
            const accessToken = generateAccessToken(authenticationUser);
            const refreshToken = generateRefreshToken(authenticationUser);
            const values = {
                userId: authenticationUser.id,
                refreshToken: refreshToken,
            };
            await db.token.create({
                data: values,
            });
            const returnValue = {
                id: authenticationUser.id,
                email: authenticationUser.email,
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
            return returnValue;
        }
        catch (error) {
            throw error;
        }
    };
    const logout = async (refresh_token) => {
        try {
            const returnValue = await db.token.deleteMany({
                where: {
                    refreshToken: refresh_token,
                },
            });
            return returnValue;
        }
        catch (error) {
            throw error;
        }
    };
    const refresh = async (refresh_token) => {
        try {
            if (!refresh_token)
                throw ERROR_MESSAGE.unauthorized;
            const authenticationUser = await verifyRefreshToken(refresh_token);
            const userInfo = {
                id: authenticationUser.id,
                email: authenticationUser.email,
            };
            const access_token = generateAccessToken(userInfo);
            const returnValues = {
                id: authenticationUser.id,
                email: authenticationUser.email,
                Authorization: access_token,
            };
            return returnValues;
        }
        catch (error) {
            throw error;
        }
    };
    return {
        register,
        loginWithPassword,
        logout,
        refresh,
    };
}
export default authService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvYXV0aFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNCLE9BQU8sRUFDTCxZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLGNBQWMsRUFDZCxtQkFBbUIsRUFDbkIsb0JBQW9CLEVBQ3BCLGtCQUFrQixHQUNuQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxTQUFTLFdBQVc7SUFDbEIsTUFBTSxRQUFRLEdBQUcsS0FBSyxFQUFFLEtBQWEsRUFBRSxHQUFXLEVBQUUsRUFBRTtRQUNwRCxJQUFJLENBQUM7WUFDSCxNQUFNLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWpDLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVsQyxNQUFNLE1BQU0sR0FBRztnQkFDYixLQUFLLEVBQUUsS0FBSztnQkFDWixRQUFRLEVBQUUsT0FBTzthQUNsQixDQUFDO1lBQ0YsdUJBQXVCO1lBQ3ZCLE1BQU0sV0FBVyxHQUFHLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ3ZDLElBQUksRUFBRSxNQUFNO2FBQ2IsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxXQUFXLENBQUM7UUFDckIsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLEtBQUssQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixNQUFNLGlCQUFpQixHQUFHLEtBQUssRUFBRSxLQUFhLEVBQUUsR0FBVyxFQUFFLEVBQUU7UUFDN0QsSUFBSSxDQUFDO1lBQ0gsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNsRCxLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLEtBQUs7aUJBQ2I7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLEVBQUUsRUFBRSxJQUFJO29CQUNSLEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0YsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLGtCQUFrQjtnQkFBRSxNQUFNLGFBQWEsQ0FBQyxZQUFZLENBQUM7WUFFMUQsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLGNBQWMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLG9CQUFvQjtnQkFBRSxNQUFNLGFBQWEsQ0FBQyxZQUFZLENBQUM7WUFFNUQsTUFBTSxXQUFXLEdBQUcsbUJBQW1CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUM1RCxNQUFNLFlBQVksR0FBRyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRTlELE1BQU0sTUFBTSxHQUFHO2dCQUNiLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxFQUFFO2dCQUM3QixZQUFZLEVBQUUsWUFBWTthQUMzQixDQUFDO1lBRUYsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztnQkFDcEIsSUFBSSxFQUFFLE1BQU07YUFDYixDQUFDLENBQUM7WUFDSCxNQUFNLFdBQVcsR0FBRztnQkFDbEIsRUFBRSxFQUFFLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ3pCLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxLQUFLO2dCQUMvQixXQUFXLEVBQUUsV0FBVztnQkFDeEIsWUFBWSxFQUFFLFlBQVk7YUFDM0IsQ0FBQztZQUNGLE9BQU8sV0FBVyxDQUFDO1FBQ3JCLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsTUFBTSxNQUFNLEdBQUcsS0FBSyxFQUFFLGFBQXFCLEVBQUUsRUFBRTtRQUM3QyxJQUFJLENBQUM7WUFDSCxNQUFNLFdBQVcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2dCQUM1QyxLQUFLLEVBQUU7b0JBQ0wsWUFBWSxFQUFFLGFBQWE7aUJBQzVCO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxXQUFXLENBQUM7UUFDckIsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLEtBQUssQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsYUFBcUIsRUFBRSxFQUFFO1FBQzlDLElBQUksQ0FBQztZQUNILElBQUksQ0FBQyxhQUFhO2dCQUFFLE1BQU0sYUFBYSxDQUFDLFlBQVksQ0FBQztZQUVyRCxNQUFNLGtCQUFrQixHQUFHLE1BQU0sa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFbkUsTUFBTSxRQUFRLEdBQUc7Z0JBQ2YsRUFBRSxFQUFFLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ3pCLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxLQUFLO2FBQ2hDLENBQUM7WUFDRixNQUFNLFlBQVksR0FBRyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVuRCxNQUFNLFlBQVksR0FBRztnQkFDbkIsRUFBRSxFQUFFLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ3pCLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxLQUFLO2dCQUMvQixhQUFhLEVBQUUsWUFBWTthQUM1QixDQUFDO1lBQ0YsT0FBTyxZQUFZLENBQUM7UUFDdEIsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLEtBQUssQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDLENBQUM7SUFDRixPQUFPO1FBQ0wsUUFBUTtRQUNSLGlCQUFpQjtRQUNqQixNQUFNO1FBQ04sT0FBTztLQUNSLENBQUM7QUFDSixDQUFDO0FBRUQsZUFBZSxXQUFXLEVBQUUsQ0FBQyJ9