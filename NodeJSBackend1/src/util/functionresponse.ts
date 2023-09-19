type response = {
  Data: any;
  Error: string | null;
};

export const FunctionResponse = ({ Data, Error }: response) => {
  return {
    Data: Data,
    Error: Error,
  };
};
