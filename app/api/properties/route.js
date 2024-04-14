import cloudinary from "@/config/cloudinary";
import connectDb from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const GET = async () => {
	try {
		await connectDb();

		const properties = await Property.find();

		return new Response(JSON.stringify(properties), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response("Something went wrong", { status: 500 });
	}
};

export const POST = async (request) => {
	try {
		await connectDb();

		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.userId) {
			return new Response("User ID is required", { status: 401 });
		}

		const { userId } = sessionUser;

		const formData = await request.formData();

		// Get All amenities
		const amenities = formData.getAll("amenities");
		const images = formData
			.getAll("images")
			.filter((image) => image.name !== "");

		// Create property object for database
		const propertyData = {
			type: formData.get("type"),
			name: formData.get("name"),
			description: formData.get("description"),
			location: {
				street: formData.get("location.street"),
				city: formData.get("location.city"),
				state: formData.get("location.state"),
				zipcode: formData.get("location.zipcode"),
			},
			beds: formData.get("beds"),
			baths: formData.get("baths"),
			square_feet: formData.get("square_feet"),
			amenities,
			rates: {
				weekly: formData.get("rates.weekly"),
				monthly: formData.get("rates.monthly"),
				nightly: formData.get("rates.nightly"),
			},
			seller_info: {
				name: formData.get("seller_info.name"),
				email: formData.get("seller_info.email"),
				phone: formData.get("seller_info.phone"),
			},
			owner: userId,
		};

		const imageUploadPromises = [];

		for (const image of images) {
			// Transforming into an array buffer
			const imageBuffer = await image.arrayBuffer();
			const imageArray = Array.from(new Uint8Array(imageBuffer));
			const imageData = Buffer.from(imageArray);

			// Convert the image to a format that cloudinary can process
			const imageBase64 = imageData.toString("base64");

			// Cloudinary upload request
			const result = await cloudinary.uploader.upload(
				`data:image/png;base64,${imageBase64}`,
				{ folder: "propertypulse" }
			);
			// Pushing cloudinary images url into imageUploadPromises
			imageUploadPromises.push(result.secure_url);

			// Wait for all images to upload
			const uploadedImages = await Promise.all(imageUploadPromises);

			// Add uploaded images to the propertyData object
			propertyData.images = uploadedImages;
		}

		const newProperty = new Property(propertyData);
		await newProperty.save();

		return Response.redirect(
			`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
		);
	} catch (error) {
		console.error("This is the error we are looking for: ", error);
		return new Response("Failed to add property", { status: 500 });
	}
};
