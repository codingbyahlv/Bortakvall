type ResponseSuccess<T> = {
  status: "success";
  data: T;
};

type ResponseError = {
  status: "error";
  message: string;
};

type ResponseFail = {
  status: "fail";
  data: { [key: string]: string[] };
};

export type ResponseData<T> = ResponseSuccess<T> | ResponseError | ResponseFail;
