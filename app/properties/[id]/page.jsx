"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const PropertyPage = () => {
	const router = useRouter();
	const { id } = useParams();
	const searchParams = useSearchParams();
	const name = searchParams.get("name");

	return (
		<div>
			<button
				className="p-2 bg-cyan-500"
				onClick={() => router.push("/")}
			>
				Go Home {name} {id}
			</button>
		</div>
	);
};

export default PropertyPage;
