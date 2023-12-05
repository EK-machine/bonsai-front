import { Article, Bonsai, Instrument, Pot, Service, Soil } from "./index";

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

export interface RefreshResp {
  data: string;
  status: number;
  statusText: string;
}

export interface GetAllBonsaiResp {
  data: Bonsai[];
  status: number;
  statusText: string;
}

export interface GetAllArticleResp {
  data: Article[];
  status: number;
  statusText: string;
}

export interface GetAllServiceResp {
  data: Service[];
  status: number;
  statusText: string;
}

export interface GetAllSoilResp {
  data: Soil[];
  status: number;
  statusText: string;
}

export interface GetAllInstrumentResp {
  data: Instrument[];
  status: number;
  statusText: string;
}

export interface GetAllPotResp {
  data: Pot[];
  status: number;
  statusText: string;
}