"use server";

import { z } from "zod";

const schema = z.object({
  fid: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number())
    .nullable(),
  timestamp: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number())
    .nullable(),
  messageHash: z.string().nullable(),
  text: z.string(),
});

export async function processSubmission(formData: FormData) {
  const validatedFields = schema.safeParse({
    fid: formData.get("fid"),
    timestamp: formData.get("timestamp"),
    messageHash: formData.get("messageHash"),
    text: formData.get("rawText"),
  });

  if (!validatedFields.success) {
    console.error({ errors: validatedFields.error.flatten().fieldErrors });
  }

  console.log(validatedFields);

  // mutate data
  // revalidate cache
}
