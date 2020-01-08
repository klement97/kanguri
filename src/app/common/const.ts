export class ErrorData {
  error: {
    type: string,
    code: number,
    param: string,
    message: string,
  };
}

export class JwtModel {
  refresh: string;
  access: string;
}
