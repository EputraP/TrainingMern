import {
  GetCountryList,
  GetCountryById,
  CreateCountry,
  DeleteSingleCountry,
} from "../repository/CurrencyRepository";
import {
  GetCountryListType,
  CreateCountryType,
  IdCountryParamsType,
  RandomDataType,
} from "../dto/CurrencyDTO";
import { FunctionResponse } from "../util/functionresponse";

const CheckCountryAvailibility = async (
  input: IdCountryParamsType["params"]
) => {
  const { Data, Error } = await GetCountryById(input);
  if (Error != null) return FunctionResponse({ Data: null, Error: Error });
  if (JSON.parse(Data).length == 0)
    return FunctionResponse({ Data: null, Error: "Country not found" });

  return FunctionResponse({ Data: Data, Error: null });
};

const GenerateRandomValue = (baseValue: number) => {
  let RandomDataRes: RandomDataType[] = [];
  const base = baseValue;
  const tolerance = 0.3;
  const min = base - tolerance * base;
  const max = base + tolerance * base;

  const length = 7 * 24 * 60; // One week in minutes
  for (let i = 0; i < length; i++) {
    // Random value in [min, max)
    let currencyValue = Math.random() * (max - min) + min;

    // Increment minutes by interval
    let timestamp = new Date(2022, 6, 19, 17, i * 60);
    RandomDataRes.push({
      currencyValue: currencyValue,
      timestamp: timestamp,
    });
  }
  return RandomDataRes;
};

const AggregateValue = (inputGroupBy: string, data: RandomDataType[]) => {
  let group: any = {};
  let AggregateRes: RandomDataType[] = [];
  const groupBy = inputGroupBy;
  data.forEach((row) => {
    let key;
    if (groupBy === "hour") {
      key = row.timestamp.getHours();
    } else if (groupBy === "day") {
      key = row.timestamp.getDay();
    } else {
      throw new Error("'groupBy' must be one of 'hour' or 'day'");
    }

    if (!group.hasOwnProperty(key)) {
      group[key] = [];
    }
    group[key].push({
      countryName: "test",
      currencyValue: row.currencyValue,
      timestamp: row.timestamp,
    });
  });

  for (let key in group) {
    let values = group[key];
    // Average currency values in the group
    let accValue =
      values.reduce((acc: any, cur: any) => acc + cur.currencyValue, 0) /
      values.length;

    AggregateRes.push({
      currencyValue: accValue,
      timestamp: values[0].timestamp,
    });
  }
  return AggregateRes;
};

export const GetAllCountryList = async () => {
  try {
    const CountryListRes: GetCountryListType[] = [];

    const { Data, Error } = await GetCountryList();
    if (Error != null) return FunctionResponse({ Data: null, Error: Error });

    const CountryListObj: any = JSON.parse(Data);
    for (let i = 0; i < CountryListObj.length; i++) {
      CountryListRes.push({
        id: CountryListObj[i].id,
        country: CountryListObj[i].country,
        value: parseInt(CountryListObj[i].value),
      });
    }
    return FunctionResponse({ Data: CountryListRes, Error: null });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};

export const GetHourlyData = async (input: IdCountryParamsType["params"]) => {
  try {
    const { Data: DataCountry, Error: ErrorCountryById } =
      await CheckCountryAvailibility(input);
    if (ErrorCountryById != null)
      return FunctionResponse({ Data: null, Error: ErrorCountryById });
    const CountryObj: any = JSON.parse(DataCountry);

    const randomDataRes = GenerateRandomValue(CountryObj[0].value);

    const AggregateRes = AggregateValue("hour", randomDataRes);

    return FunctionResponse({ Data: AggregateRes, Error: null });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};
export const GetDailyData = async (input: IdCountryParamsType["params"]) => {
  try {
    const { Data: DataCountry, Error: ErrorCountryById } =
      await CheckCountryAvailibility(input);
    if (ErrorCountryById != null)
      return FunctionResponse({ Data: null, Error: ErrorCountryById });
    const CountryObj: any = JSON.parse(DataCountry);

    const randomDataRes = GenerateRandomValue(CountryObj[0].value);

    const AggregateRes = AggregateValue("day", randomDataRes);

    return FunctionResponse({ Data: AggregateRes, Error: null });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};

export const CreateNewCountry = async (input: CreateCountryType["body"]) => {
  try {
    const { Data, Error } = await CreateCountry(input);
    if (Error != null) return FunctionResponse({ Data: null, Error: Error });

    return FunctionResponse({ Data: Data, Error: null });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};

export const DeleteCountry = async (input: IdCountryParamsType["params"]) => {
  try {
    const { Error: ErrorCountryById } = await CheckCountryAvailibility(input);
    if (ErrorCountryById != null)
      return FunctionResponse({ Data: null, Error: ErrorCountryById });

    const { Data, Error } = await DeleteSingleCountry(input);
    if (Error != null) return FunctionResponse({ Data: null, Error: Error });

    return FunctionResponse({ Data: Data, Error: null });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};
