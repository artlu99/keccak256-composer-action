"use server";

import { authToken, endpoint, mutation } from "@/external/schema";
import { GraphQLClient } from "graphql-request";
import { z } from "zod";

const schema = z.object({
  fid: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number()),
  fid2: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number())
    .nullable(),
  fid3: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number())
    .nullable(),
  fid4: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number())
    .nullable(),
  timestamp: z.string().nullable(),
  messageHash: z.string().nullable(),
  text: z.string(),
  hashedText: z.string(),
  nonce: z.string().nullable(),
});

export async function processSubmission(formData: FormData) {
  const validatedFields = schema.safeParse({
    fid: formData.get("fid"),
    fid2: formData.get("fid2"),
    fid3: formData.get("fid3"),
    fid4: formData.get("fid4"),
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
    const { fid, fid2, fid3, fid4, ...filteredData } = validatedFields.data;

    // Call request for each fid
    await graphQLClient.request(mutation, { ...filteredData, fid });
    if (fid2 !== null && fid2 > 0)
      await graphQLClient.request(mutation, { ...filteredData, fid: fid2 });
    if (fid3 !== null && fid4 !== null && fid3 > 0 && fid4 > 0) {
      await graphQLClient.request(mutation, { ...filteredData, fid: fid3 });
      await graphQLClient.request(mutation, { ...filteredData, fid: fid4 });
    }
  } catch (error) {
    console.error("Error updating data:", error);
  }
}
