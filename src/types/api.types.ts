export interface ApiCallErr {
    response: {
      status: number;
      data: {
        result: string;
      };
    };
    message: string;
}