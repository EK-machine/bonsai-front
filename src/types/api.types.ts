export interface ApiCallErr {
    response: {
      status: number;
      data: {
        result: string;
      };
    };
    message: string;
}

export interface LoginBody {
    email: string;
    password: string;
}

export interface LoginResp {
  data: string;
  status: number;
  statusText: string;
}

