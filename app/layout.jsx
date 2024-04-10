import "../assets/styles/globals.css";
import "../components/Navbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
	title: "Property Pulse | Find The Perfect Rental",
	description: "Find your dream rental property",
	keywords: "rental, find rentals, find properties",
};

const Layout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<Navbar />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
};

export default Layout;
