type response = {
  Code: number;
  Message: string;
  Data: object[] | null;
};

export const NewResponse = ({ Code, Message, Data }: response) => {
  return {
    Code: Code,
    Message: Message,
    Data: Data,
  };
};
