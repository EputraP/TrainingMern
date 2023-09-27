import express from "express";
import {
  CreateCountryHandler,
  GetCountryHandler,
  GetHourlyById,
  GetDailyById,
  DeleteCountryHandler,
  GetCountryCheckHandler,
} from "../handler/CurrencyHandler";
import {
  GetMonthListHandler,
  GetYearListHandler,
  GetPriorityHandler,
  CreateNoteHandler,
  GetCalenderWithNotesHandler,
  UpdateNoteHandler,
} from "../handler/CalendarHandler";
import {
  CreateCountryValidation,
  DeleteCountryValidation,
  IdCountryParamsValidation,
  NameCountryParamsValidation,
  CreateNoteValidation,
  GetCalendarWithNotesReqValidation,
  IdCalendarParamsValidation,
} from "../middleware/ReqValidation";

const router = express.Router();
router.get("/calendar/month", GetMonthListHandler);
router.get("/calendar/year", GetYearListHandler);
router.get("/calendar/priority", GetPriorityHandler);
router.get(
  "/calendar",
  GetCalendarWithNotesReqValidation,
  GetCalenderWithNotesHandler
);
router.post("/calendar/note/create", CreateNoteValidation, CreateNoteHandler);
router.put(
  "/calendar/note/:id",
  [CreateNoteValidation, IdCalendarParamsValidation],
  UpdateNoteHandler
);

router.get("/country", GetCountryHandler);
router.get("/country/hourly/:id", IdCountryParamsValidation, GetHourlyById);
router.get("/country/daily/:id", IdCountryParamsValidation, GetDailyById);
router.get(
  "/country/check/:name",
  NameCountryParamsValidation,
  GetCountryCheckHandler
);
router.delete("/country/:id", DeleteCountryValidation, DeleteCountryHandler);
router.post("/country/create", CreateCountryValidation, CreateCountryHandler);

export default router;
