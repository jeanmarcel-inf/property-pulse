import connectDb from "@/config/database";
import Property from "@/models/Property";

export const GET = async (request, { params }) => {
	try {
		await connectDb();

		const userId = params.userId;

		if (!userId) {
			return new Response("UserId is required", { status: 400 });
		}

		const properties = await Property.find({ owner: userId });

		return new Response(JSON.stringify(properties), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response("Something went wrong", { status: 500 });
	}
};
