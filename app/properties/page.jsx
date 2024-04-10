import PropertyCard from "../../components/PropertyCard";

const fetchData = async () => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`
		);
		if (!response.ok) {
			throw new Error("Erro ao carregar os dados");
		}

		return response.json();
	} catch (error) {
		console.error("Erro:", error);
	}
};

const PropertiesPage = async () => {
	const properties = await fetchData();

	properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

	return (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				{properties.length === 0 ? (
					<p>No properties found</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{properties.map((property) => (
							<PropertyCard
								key={property._id}
								property={property}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default PropertiesPage;