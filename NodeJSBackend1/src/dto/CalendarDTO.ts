import { z } from "zod";

export const GetPriorityListSchema = z.object({
  id: z.string().uuid(),
  priority: z.string(),
});

export const CreateNoteSchema = z.object({
  body: z.object({
    title: z.string(),
    notes: z.string(),
    priorityId: z.string().uuid(),
    date: z.string().datetime(),
  }),
});
export const IdCalendarParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
export const GetCalendarWithNotesReqSchema = z.object({
  body: z.object({
    month: z
      .string()
      .refine(
        (value) => /^[A-Z][a-z0-9_-]*$/.test(value),
        "First Char must Capitalized!"
      ),
    year: z.coerce.number().int().gte(1000).lte(9999),
  }),
});

export const GetNoteSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  notes: z.string(),
  priority: z.string(),
  date: z.string().datetime(),
});

export const GetCalendarWithNotesSchema = z.object({
  date: z.number().int(),
  month: z.string(),
  year: z.number().int(),
  priority: z.array(GetNoteSchema),
});

export type GetPriorityListType = z.infer<typeof GetPriorityListSchema>;
export type CreateNoteType = z.infer<typeof CreateNoteSchema>;
export type GetCalendarWithNotesReqType = z.infer<
  typeof GetCalendarWithNotesReqSchema
>;
export type GetNoteType = z.infer<typeof GetNoteSchema>;
export type GetCalendarWithNotesType = z.infer<
  typeof GetCalendarWithNotesSchema
>;
export type IdCalendarParamsType = z.infer<typeof IdCalendarParamsSchema>;
