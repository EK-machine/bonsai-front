export interface ErrorType {
    type:  string;
    data: {
        message: string[];
        error: string;
        statusCode: number;
    },
    code: number;
}