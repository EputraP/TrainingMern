import { FunctionResponse } from "../util/functionresponse";
import {
  GetPriorityList,
  CreatePriority,
  GetNotesByDate,
} from "../repository/CalendarRepository";
import {
  GetPriorityListType,
  GetCalendarWithNotesReqType,
  GetNoteType,
  GetCalendarWithNotesType,
} from "../dto/CalendarDTO";
import { CreateNoteType } from "../dto/CalendarDTO";

const GetAllDaysInMonthService = (month: number, year: number) => {
  var date = new Date(Date.UTC(year, month, 1));
  var days = [];
  while (date.getUTCMonth() === month) {
    days.push(new Date(date));
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return days;
};

export const GetMonthListService = () => {
  try {
    const monthList: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return FunctionResponse({ Data: monthList, Error: null });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};

export const GetYearListService = () => {
  try {
    const yearList: number[] = [];

    const date = new Date();

    let year = date.getFullYear();
    year = year - 3;
    for (let i = 1; i < 8; i++) {
      yearList.push(year);
      year++;
    }

    return FunctionResponse({ Data: yearList, Error: null });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};

export const GetAllPriorityListService = async () => {
  try {
    const PriorityListRes: GetPriorityListType[] = [];

    const { Data, Error } = await GetPriorityList();
    if (Error != null) return FunctionResponse({ Data: null, Error: Error });

    const PriorityListObj: any = JSON.parse(Data);
    for (let i = 0; i < PriorityListObj.length; i++) {
      PriorityListRes.push({
        id: PriorityListObj[i].id,
        priority: PriorityListObj[i].priority,
      });
    }
    return FunctionResponse({ Data: PriorityListRes, Error: null });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};

export const GetNoteByDateService = async (date: string) => {
  const { Data, Error } = await GetNotesByDate(date);
  if (Error != null) return FunctionResponse({ Data: null, Error: Error });
  const notesObj: any = JSON.parse(Data);
  return FunctionResponse({ Data: notesObj, Error: null });
};

export const GetCalenderWithNotesService = async (
  input: GetCalendarWithNotesReqType["body"]
) => {
  try {
    const getNoteRes: GetCalendarWithNotesType[] = [];
    const { Data } = GetMonthListService();
    const allDates = GetAllDaysInMonthService(
      Data.indexOf(input.month),
      input.year
    );

    for (let i = 0; i < allDates.length; i++) {
      const { Data: noteData, Error } = await GetNoteByDateService(
        allDates[i].toISOString()
      );
      if (Error != null) return FunctionResponse({ Data: null, Error: Error });
      getNoteRes.push({
        date: allDates[i].getDate(),
        month: Data[allDates[i].getMonth()],
        year: allDates[i].getFullYear(),
        priority: noteData,
      });
    }
    return FunctionResponse({ Data: getNoteRes, Error: null });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};

export const CreateNoteService = async (input: CreateNoteType["body"]) => {
  try {
    const { Data, Error } = await CreatePriority(input);
    if (Error != null) return FunctionResponse({ Data: null, Error: Error });

    return FunctionResponse({ Data: Data, Error: null });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};
