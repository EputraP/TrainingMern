import express from "express";
import {
  CreateCountryHandler,
  GetCountryHandler,
  GetHourlyById,
  GetDailyById,
  DeleteCountryHandler,
} from "../handler/CurrencyHandler";
import {
  CreateCountryValidation,
  DeleteCountryValidation,
  IdCountryParamsValidation,
} from "../middleware/ReqValidation";

const router = express.Router();

router.get("/country", GetCountryHandler);
router.get("/country/hourly/:id", IdCountryParamsValidation, GetHourlyById);
router.get("/country/daily/:id", IdCountryParamsValidation, GetDailyById);
router.delete("/country/:id", DeleteCountryValidation, DeleteCountryHandler);
router.post("/country/create", CreateCountryValidation, CreateCountryHandler);

export default router;
