import { CountryList } from "../model/CountryList";
import { CreateCountryType, IdCountryParamsType } from "../dto/CurrencyDTO";
import { FunctionResponse } from "../util/functionresponse";

export const GetCountryList = async () => {
  try {
    const CountryListVal = await CountryList.findAll();
    return FunctionResponse({
      Data: JSON.stringify(CountryListVal, undefined, 2),
      Error: null,
    });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};

export const GetCountryById = async (input: IdCountryParamsType["params"]) => {
  try {
    const CountryVal = await CountryList.findAll({
      where: {
        id: input,
      },
    });
    return FunctionResponse({
      Data: JSON.stringify(CountryVal, undefined, 2),
      Error: null,
    });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};

export const CreateCountry = async (input: CreateCountryType["body"]) => {
  try {
    const CreateCountryRes = await CountryList.create({
      country: input.country,
      value: input.value,
    });
    return FunctionResponse({
      Data: CreateCountryRes,
      Error: null,
    });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};

export const DeleteSingleCountry = async (
  input: IdCountryParamsType["params"]
) => {
  try {
    const DeleteCountryRes = await CountryList.destroy({
      where: {
        id: input,
      },
    });
    if (!DeleteCountryRes)
      return FunctionResponse({
        Data: null,
        Error: "Country Already Deleted",
      });
    return FunctionResponse({
      Data: [],
      Error: null,
    });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};
