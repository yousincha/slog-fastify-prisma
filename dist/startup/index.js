import db from "../lib/db";
import { generateHash } from "../lib/authHelper";
import { FIRST_PWD } from "../lib/constants";
const checkStartupUser = async () => {
    const pwd = FIRST_PWD;
    const hashPwd = generateHash(pwd);
    const userCount = await db.user.count({});
    if (userCount === 0) {
        let count = 1;
        let maxCount = 1;
        while (count <= maxCount) {
            const value = {
                email: `user${count}@email.com`,
                password: hashPwd,
            };
            await db.user.create({
                data: value,
            });
            count += 1;
        }
        console.log(`created startup user!!!`);
    }
};
const checkStartupArticle = async () => {
    const articleCount = await db.article.count({});
    if (articleCount === 0) {
        const user = await db.user.findFirst({
            orderBy: {
                id: "asc",
            },
        });
        if (user) {
            let count = 1;
            const maxCount = 50;
            while (count <= maxCount) {
                let values = {
                    content: `content_${count}`,
                    userId: user.id,
                };
                await db.article.create({
                    data: values,
                });
                count += 1;
            }
            console.log(`created startup articles!!!`);
        }
        else {
            await checkStartupUser();
            await checkStartupArticle();
        }
    }
};
export { checkStartupUser, checkStartupArticle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RhcnR1cC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDM0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUc3QyxNQUFNLGdCQUFnQixHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ2xDLE1BQU0sR0FBRyxHQUFHLFNBQW1CLENBQUM7SUFFaEMsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLE1BQU0sU0FBUyxHQUFHLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFMUMsSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDcEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ3pCLE1BQU0sS0FBSyxHQUFHO2dCQUNaLEtBQUssRUFBRSxPQUFPLEtBQUssWUFBWTtnQkFDL0IsUUFBUSxFQUFFLE9BQU87YUFDbEIsQ0FBQztZQUNGLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ25CLElBQUksRUFBRSxLQUFLO2FBQ1osQ0FBQyxDQUFDO1lBQ0gsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNiLENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDekMsQ0FBQztBQUNILENBQUMsQ0FBQztBQUNGLE1BQU0sbUJBQW1CLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDckMsTUFBTSxZQUFZLEdBQUcsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVoRCxJQUFJLFlBQVksS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUN2QixNQUFNLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ25DLE9BQU8sRUFBRTtnQkFDUCxFQUFFLEVBQUUsS0FBSzthQUNWO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNULElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUVwQixPQUFPLEtBQUssSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFDekIsSUFBSSxNQUFNLEdBQUc7b0JBQ1gsT0FBTyxFQUFFLFdBQVcsS0FBSyxFQUFFO29CQUMzQixNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7aUJBQ2hCLENBQUM7Z0JBRUYsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDdEIsSUFBSSxFQUFFLE1BQU07aUJBQ2IsQ0FBQyxDQUFDO2dCQUNILEtBQUssSUFBSSxDQUFDLENBQUM7WUFDYixDQUFDO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQzdDLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3pCLE1BQU0sbUJBQW1CLEVBQUUsQ0FBQztRQUM5QixDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxDQUFDIn0=