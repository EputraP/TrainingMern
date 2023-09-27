import { PriorityList, NotesRaw } from "../model/Calendar";
import { CreateNoteType } from "../dto/CalendarDTO";
import { FunctionResponse } from "../util/functionresponse";
import { Sequelize } from "sequelize";

export const GetPriorityList = async () => {
  try {
    const PriorityListVal = await PriorityList.findAll();
    return FunctionResponse({
      Data: JSON.stringify(PriorityListVal, undefined, 2),
      Error: null,
    });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};

export const CreatePriority = async (input: CreateNoteType["body"]) => {
  try {
    const CreateNoteRes = await NotesRaw.create({
      title: input.title,
      notes: input.notes,
      priorityId: input.priorityId,
      date: input.date,
    });
    return FunctionResponse({
      Data: CreateNoteRes,
      Error: null,
    });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};

export const GetNotesByDate = async (date: string) => {
  try {
    const notesListVal = await NotesRaw.findAll({
      attributes: [
        [Sequelize.col("notes_raw.id"), "id"],
        [Sequelize.col("notes_raw.title"), "title"],
        [Sequelize.col("notes_raw.notes"), "notes"],
        [Sequelize.col("notes_raw.date"), "date"],
      ],
      include: [
        {
          model: PriorityList,
          required: true,
          attributes: ["priority"],
        },
      ],
      where: {
        date: date,
      },
    });
    return FunctionResponse({
      Data: JSON.stringify(notesListVal, undefined, 2),
      Error: null,
    });
  } catch (error: any) {
    return FunctionResponse({
      Data: null,
      Error: error,
    });
  }
};
