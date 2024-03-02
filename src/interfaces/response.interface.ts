
export interface BaseResponse<ApiData> {
    data: ApiData;
    message: string;
}

export interface SignInResponseData {
    token: string;
}