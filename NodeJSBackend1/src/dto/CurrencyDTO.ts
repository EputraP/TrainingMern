import { z } from "zod";

export const GetCountryListSchema = z.object({
  id: z.string().uuid(),
  country: z.string(),
  value: z.number().int(),
});
export const RandomDataSchema = z.object({
  currencyValue: z.number().int(),
  timestamp: z.coerce.date(),
});
export const CreateCountrySchema = z.object({
  body: z.object({
    country: z
      .string()
      .refine(
        (value) => /^[A-Z][a-z0-9_-]*$/.test(value),
        "First Char must Capitalized!"
      ),
    value: z.number().int(),
  }),
});
export const IdCountryParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateCountryType = z.infer<typeof CreateCountrySchema>;
export type GetCountryListType = z.infer<typeof GetCountryListSchema>;
export type IdCountryParamsType = z.infer<typeof IdCountryParamsSchema>;
export type RandomDataType = z.infer<typeof RandomDataSchema>;
