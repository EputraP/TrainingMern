import {
  GetAllCountryList,
  GetHourlyData,
  GetDailyData,
  CreateNewCountry,
  DeleteCountry,
} from "../service/CurrencyService";
import { NewResponse } from "../util/response";

export const GetCountryHandler = async (req: any, res: any) => {
  try {
    const { Data, Error } = await GetAllCountryList();
    if (Error != null)
      return res.send(
        NewResponse({
          Code: 500,
          Message: Error,
          Data: null,
        })
      );
    res.send(
      NewResponse({
        Code: 200,
        Message: "Get Country List Success",
        Data: Data,
      })
    );
  } catch (error: any) {
    res.send(
      NewResponse({
        Code: 500,
        Message: error,
        Data: null,
      })
    );
  }
};

export const GetHourlyById = async (req: any, res: any) => {
  try {
    const { Data, Error } = await GetHourlyData(req.params.id);
    if (Error != null)
      return res.send(
        NewResponse({
          Code: 500,
          Message: Error,
          Data: null,
        })
      );
    res.send(
      NewResponse({
        Code: 200,
        Message: "Get Country Hourly Success",
        Data: Data,
      })
    );
  } catch (error: any) {
    res.send(
      NewResponse({
        Code: 500,
        Message: error,
        Data: null,
      })
    );
  }
};

export const GetDailyById = async (req: any, res: any) => {
  try {
    const { Data, Error } = await GetDailyData(req.params.id);
    if (Error != null)
      return res.send(
        NewResponse({
          Code: 500,
          Message: Error,
          Data: null,
        })
      );
    res.send(
      NewResponse({
        Code: 200,
        Message: "Get Country Hourly Success",
        Data: Data,
      })
    );
  } catch (error: any) {
    res.send(
      NewResponse({
        Code: 500,
        Message: error,
        Data: null,
      })
    );
  }
};

export const CreateCountryHandler = async (req: any, res: any) => {
  try {
    const { Data, Error } = await CreateNewCountry(req.body);
    if (Error != null)
      return res.send(
        NewResponse({
          Code: 500,
          Message: Error,
          Data: null,
        })
      );
    res.send(
      NewResponse({
        Code: 201,
        Message: "Create Country Success",
        Data: Data,
      })
    );
  } catch (error: any) {
    res.send(
      NewResponse({
        Code: 500,
        Message: error,
        Data: null,
      })
    );
  }
};

export const DeleteCountryHandler = async (req: any, res: any) => {
  try {
    const { Data, Error } = await DeleteCountry(req.params.id);
    if (Error != null)
      return res.send(
        NewResponse({
          Code: 500,
          Message: Error,
          Data: null,
        })
      );
    res.send(
      NewResponse({
        Code: 201,
        Message: "Delete Country Success",
        Data: Data,
      })
    );
  } catch (error: any) {
    res.send(
      NewResponse({
        Code: 500,
        Message: error,
        Data: null,
      })
    );
  }
};
