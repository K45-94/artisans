interface ResponseError {
    type: string;
    message: string;
}
declare type ResponseErrors = ResponseError[];
export default ResponseErrors;
export { ResponseError, };
