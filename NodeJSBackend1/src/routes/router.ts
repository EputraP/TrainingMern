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
  CreateCountryValidation,
  DeleteCountryValidation,
  IdCountryParamsValidation,
  NameCountryParamsValidation,
} from "../middleware/ReqValidation";

const router = express.Router();

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
