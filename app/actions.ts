"use server";

import { authToken, endpoint, mutation } from "@/external/schema";
import { GraphQLClient } from "graphql-request";
import { z } from "zod";

const schema = z.object({
	fid: z
		.string()
		.transform((val) => Number.parseInt(val, 10))
		.pipe(z.number()),
	timestamp: z.string().nullable(),
	messageHash: z.string().nullable(),
	text: z.string(),
	hashedText: z.string(),
	nonce: z.string().nullable(),
});

export async function processSubmission(formData: FormData) {
	const validatedFields = schema.safeParse({
		fid: formData.get("fid"),
		timestamp: formData.get("timestamp"),
		messageHash: formData.get("messageHash"),
		text: formData.get("rawText"),
		hashedText: formData.get("hashedText"),
		nonce: formData.get("nonce"),
	});

	if (!validatedFields.success) {
		console.error({ errors: validatedFields.error.flatten().fieldErrors });
		return;
	}

	const graphQLClient = new GraphQLClient(endpoint, {
		headers: {
			authorization: `Bearer ${authToken}`,
		},
	});

	try {
		const { fid, messageHash, ...filteredData } = validatedFields.data;
		await graphQLClient.request(mutation, {
			...filteredData,
			messageHash,
			fid,
		});
	} catch (error) {
		console.error("Error updating data:", error);
	}
}
