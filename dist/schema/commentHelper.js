import db from "../lib/db";
import { handleError } from "../lib/errorHelper";
import { ERROR_MESSAGE } from "../lib/constants";
const compareCommentUser = async (commentId, userId) => {
    let result = false;
    try {
        const comment = await db.comment.findUnique({
            where: {
                id: commentId,
            },
            select: {
                userId: true,
            },
        });
        if (comment) {
            result = comment.userId === userId ? true : false;
        }
        return result;
    }
    catch (error) {
        return false;
    }
};
const verifyCommentUser = async (req, rep) => {
    const { commentId } = req.body;
    const userId = req.user.id;
    const result = await compareCommentUser(commentId, userId);
    if (!result)
        handleError(rep, ERROR_MESSAGE.forbidden);
    return;
};
export { verifyCommentUser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWEvY29tbWVudEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHM0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLGtCQUFrQixHQUFHLEtBQUssRUFBRSxTQUFpQixFQUFFLE1BQWMsRUFBRSxFQUFFO0lBQ3JFLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNuQixJQUFJLENBQUM7UUFDSCxNQUFNLE9BQU8sR0FBRyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1lBQzFDLEtBQUssRUFBRTtnQkFDTCxFQUFFLEVBQUUsU0FBUzthQUNkO1lBQ0QsTUFBTSxFQUFFO2dCQUNOLE1BQU0sRUFBRSxJQUFJO2FBQ2I7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ1osTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNwRCxDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLGlCQUFpQixHQUFHLEtBQUssRUFDN0IsR0FBaUQsRUFDakQsR0FBaUIsRUFDakIsRUFBRTtJQUNGLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQy9CLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFLLENBQUMsRUFBRSxDQUFDO0lBRTVCLE1BQU0sTUFBTSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzNELElBQUksQ0FBQyxNQUFNO1FBQUUsV0FBVyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkQsT0FBTztBQUNULENBQUMsQ0FBQztBQUVGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxDQUFDIn0=