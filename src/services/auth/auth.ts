import axiosRequest from "@/utils/axiosRequest";
import { BaseResponse, SignInResponseData } from "@/interfaces/response.interface";

export const signIn = async (data:any) => {
    const {
        data: response,
        isError,
        error,
      } = await axiosRequest({
        url: `${process.env.NEXT_PUBLIC_BE_HOST}/v1/auth/signin`,
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      return { data: response as BaseResponse<SignInResponseData>, isError, error };
}

export const signUp = async (data:any) => {
    const {
        data: response,
        isError,
        error,
      } = await axiosRequest({
        url: `${process.env.NEXT_PUBLIC_BE_HOST}/v1/auth/signup`,
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      return { data: response, isError, error };
}