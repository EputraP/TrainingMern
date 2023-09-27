import { NewResponse } from "../util/response";
import {
  GetMonthListService,
  GetYearListService,
  GetAllPriorityListService,
  CreateNoteService,
  GetCalenderWithNotesService,
} from "../service/CalendarService";

export const GetMonthListHandler = (req: any, res: any) => {
  try {
    const { Data, Error } = GetMonthListService();
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
        Message: "Get Month List Success",
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

export const GetYearListHandler = (req: any, res: any) => {
  try {
    const { Data, Error } = GetYearListService();
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
        Message: "Get Year List Success",
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

export const GetPriorityHandler = async (req: any, res: any) => {
  try {
    const { Data, Error } = await GetAllPriorityListService();
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
        Message: "Get Priority List Success",
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

export const GetCalenderWithNotesHandler = async (req: any, res: any) => {
  try {
    const { Data, Error } = await GetCalenderWithNotesService(req.body);
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
        Message: "Get Calendar With Notes Success",
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

export const CreateNoteHandler = async (req: any, res: any) => {
  try {
    const { Data, Error } = await CreateNoteService(req.body);
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
        Message: "Create Note Success",
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

export const UpdateNoteHandler = async (req: any, res: any) => {
  try {
    console.log(req.params.id);
    console.log(req.body);
    res.send(
      NewResponse({
        Code: 201,
        Message: "Update Note Success",
        Data: [req.params.id, req.body],
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
