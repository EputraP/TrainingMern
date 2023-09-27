import {
  CreateCountrySchema,
  IdCountryParamsSchema,
  NameCountryParamsSchema,
} from "../dto/CurrencyDTO";
import {
  CreateNoteSchema,
  GetCalendarWithNotesReqSchema,
  IdCalendarParamsSchema,
} from "../dto/CalendarDTO";
import { NewResponse } from "../util/response";

const validate = (schema: any) => (req: any, res: any, next: any) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (error: any) {
    return res.send(
      NewResponse({
        Code: 500,
        Message: error,
        Data: [],
      })
    );
  }
};
export const CreateCountryValidation = validate(CreateCountrySchema);
export const DeleteCountryValidation = validate(IdCountryParamsSchema);
export const IdCountryParamsValidation = validate(IdCountryParamsSchema);
export const NameCountryParamsValidation = validate(NameCountryParamsSchema);

export const CreateNoteValidation = validate(CreateNoteSchema);
export const IdCalendarParamsValidation = validate(IdCalendarParamsSchema);
export const GetCalendarWithNotesReqValidation = validate(
  GetCalendarWithNotesReqSchema
);
