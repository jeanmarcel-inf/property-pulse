import Link from "next/link";
import React from "react";
import Hero from "../components/Hero";
import InfoBoxes from "../components/InfoBoxes";
import HomeProperties from "../components/HomeProperties";
import connectDb from "../config/database";

const HomePage = async () => {
	return (
		<>
			<Hero />
			<InfoBoxes />
			<HomeProperties />
		</>
	);
};

export default HomePage;
