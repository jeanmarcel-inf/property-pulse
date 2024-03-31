import "@/assets/styles/globals.css";

export const metadata = {
	title: "Property Pulse | Find The Perfect Rental",
	description: "Find your dream rental property",
};

const Layout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<div>{children}</div>
			</body>
		</html>
	);
};

export default Layout;
