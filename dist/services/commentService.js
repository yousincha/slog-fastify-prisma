import db from "../lib/db";
import { getCurrentDate } from "../lib/timeHelper";
function commentService() {
    const createComment = async (articleId, content, userId, userEmail) => {
        try {
            const values = {
                content: content,
                userId: userId,
                articleId: articleId,
                createdAt: getCurrentDate(),
            };
            const result = await db.comment.create({
                data: values,
            });
            const newComment = {
                ...result,
                userId: userId,
                userEmail: userEmail,
            };
            await db.article.update({
                where: { id: articleId },
                data: {
                    commentCount: { increment: 1 },
                },
            });
            return newComment;
        }
        catch (error) {
            throw error;
        }
    };
    const readComment = async (articleId) => {
        try {
            const comments = await db.comment.findMany({
                where: {
                    articleId: articleId,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                        },
                    },
                },
            });
            let flattenComments = comments.map((comment) => {
                return {
                    ...comment,
                    userEmail: comment.user.email,
                    createdAt: comment.createdAt.toString(),
                };
            });
            return {
                comments: flattenComments,
            };
        }
        catch (error) {
            throw error;
        }
    };
    const deleteComment = async (articleId, commentId, userId) => {
        try {
            const result = await db.comment.delete({
                where: {
                    id: commentId,
                },
            });
            await db.article.update({
                where: {
                    id: articleId,
                },
                data: {
                    commentCount: { decrement: 1 },
                },
            });
            return {
                commentId: result.id,
            };
        }
        catch (error) {
            throw error;
        }
    };
    return {
        createComment,
        readComment,
        deleteComment,
    };
}
export default commentService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvY29tbWVudFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUluRCxTQUFTLGNBQWM7SUFDckIsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUN6QixTQUFpQixFQUNqQixPQUFlLEVBQ2YsTUFBYyxFQUNkLFNBQWlCLEVBQ2pCLEVBQUU7UUFDRixJQUFJLENBQUM7WUFDSCxNQUFNLE1BQU0sR0FBRztnQkFDYixPQUFPLEVBQUUsT0FBTztnQkFDaEIsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLFNBQVMsRUFBRSxjQUFjLEVBQUU7YUFDNUIsQ0FBQztZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQ3JDLElBQUksRUFBRSxNQUFNO2FBQ2IsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxVQUFVLEdBQUc7Z0JBQ2pCLEdBQUcsTUFBTTtnQkFDVCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxTQUFTLEVBQUUsU0FBUzthQUNyQixDQUFDO1lBQ0YsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFDdEIsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRTtnQkFDeEIsSUFBSSxFQUFFO29CQUNKLFlBQVksRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUU7aUJBQy9CO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxVQUFVLENBQUM7UUFDcEIsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLEtBQUssQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsU0FBaUIsRUFBRSxFQUFFO1FBQzlDLElBQUksQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFHLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7Z0JBQ3pDLEtBQUssRUFBRTtvQkFDTCxTQUFTLEVBQUUsU0FBUztpQkFDckI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRTt3QkFDSixNQUFNLEVBQUU7NEJBQ04sRUFBRSxFQUFFLElBQUk7NEJBQ1IsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0Y7YUFDRixDQUFDLENBQUM7WUFDSCxJQUFJLGVBQWUsR0FBZSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3pELE9BQU87b0JBQ0wsR0FBRyxPQUFPO29CQUNWLFNBQVMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUs7b0JBQzdCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTtpQkFDeEMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTztnQkFDTCxRQUFRLEVBQUUsZUFBZTthQUMxQixDQUFDO1FBQ0osQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLEtBQUssQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQ3pCLFNBQWlCLEVBQ2pCLFNBQWlCLEVBQ2pCLE1BQWMsRUFDZCxFQUFFO1FBQ0YsSUFBSSxDQUFDO1lBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFDckMsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxTQUFTO2lCQUNkO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFDdEIsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxTQUFTO2lCQUNkO2dCQUNELElBQUksRUFBRTtvQkFDSixZQUFZLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFO2lCQUMvQjthQUNGLENBQUMsQ0FBQztZQUNILE9BQU87Z0JBQ0wsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUFFO2FBQ3JCLENBQUM7UUFDSixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUMsQ0FBQztJQUNGLE9BQU87UUFDTCxhQUFhO1FBQ2IsV0FBVztRQUNYLGFBQWE7S0FDZCxDQUFDO0FBQ0osQ0FBQztBQUVELGVBQWUsY0FBYyxFQUFFLENBQUMifQ==