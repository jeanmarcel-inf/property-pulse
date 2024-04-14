const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch All Properties
const fetchProperties = async () => {
	try {
		if (!apiDomain) {
			return [];
		}

		const response = await fetch(`${apiDomain}/properties`, {
			cache: "no-store",
		});
		if (!response.ok) {
			throw new Error("Erro ao carregar os dados");
		}

		return response.json();
	} catch (error) {
		console.error("Erro:", error);
		return [];
	}
};

// Fetch Single Property
const fetchProperty = async (id) => {
	try {
		if (!apiDomain) {
			return null;
		}

		const response = await fetch(`${apiDomain}/properties/${id}`);

		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}

		return response.json();
	} catch (error) {
		console.error("Erro:", error);
		return null;
	}
};

export { fetchProperties, fetchProperty };
