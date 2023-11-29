export interface ApiCallErr {
    response: {
      status: number;
      data: {
        result: string;
      };
    };
    message: string;
}

export interface SignInUpBody {
    email: string;
    password: string;
}

export interface SignInResp {
  data: string;
  status: number;
  statusText: string;
}

export interface SignUpResp {
  data: {message: string};
  status: number;
  statusText: string;
}
