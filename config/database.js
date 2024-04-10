import mongoose from "mongoose";

let connected = false;

const connectDb = async () => {
	mongoose.set("strictQuery", true);

	// If the database is already connected, don't connect again
	if (connected) {
		console.log("MongoDb is already connected ");
		return;
	}

	// Connect to MongoDb
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		connected = true;

		console.log("MongoDb connected...");
	} catch (error) {
		console.log(error);
	}
};

export default connectDb;
