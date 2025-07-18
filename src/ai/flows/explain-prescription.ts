// This is an autogenerated file from Firebase Studio.
'use server';
/**
 * @fileOverview Explains a prescription based on an image.
 *
 * - explainPrescription - A function that handles the prescription explanation process.
 * - ExplainPrescriptionInput - The input type for the explainPrescription function.
 * - ExplainPrescriptionOutput - The return type for the explainPrescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainPrescriptionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a prescription, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExplainPrescriptionInput = z.infer<typeof ExplainPrescriptionInputSchema>;

const ExplainPrescriptionOutputSchema = z.object({
  explanation: z.string().describe('A simplified explanation of the medication name, dosage, and purpose.'),
});
export type ExplainPrescriptionOutput = z.infer<typeof ExplainPrescriptionOutputSchema>;

export async function explainPrescription(input: ExplainPrescriptionInput): Promise<ExplainPrescriptionOutput> {
  return explainPrescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainPrescriptionPrompt',
  input: {schema: ExplainPrescriptionInputSchema},
  output: {schema: ExplainPrescriptionOutputSchema},
  prompt: `You are a pharmacist explaining a prescription to a patient.

  Based on the prescription image, provide a simplified explanation of the medication name, dosage, and purpose.

  Prescription: {{media url=photoDataUri}}`,
});

const explainPrescriptionFlow = ai.defineFlow(
  {
    name: 'explainPrescriptionFlow',
    inputSchema: ExplainPrescriptionInputSchema,
    outputSchema: ExplainPrescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
