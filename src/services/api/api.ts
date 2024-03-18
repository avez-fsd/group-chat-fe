import axiosRequest from "@/utils/axiosRequest";
import { BaseResponse } from "@/interfaces/response.interface";

export const getUserAssociatedGroups = async ({token}:any) => {
    const {
        data: response,
        isError,
        error,
      } = await axiosRequest({
        url: `${process.env.NEXT_PUBLIC_BE_HOST}/v1/groups`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
        },
      });
    
      return { data: response as BaseResponse<any>, isError, error };
}

export const getGroupMessages = async ({token, groupUniqueId}:any) => {

  const {
    data: response,
    isError,
    error,
  } = await axiosRequest({
    url: `${process.env.NEXT_PUBLIC_BE_HOST}/v1/groups/${groupUniqueId}/messages`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    },
  });

  return { data: response as BaseResponse<any>, isError, error };

}

export const sendMessageInGroup = async ({token, groupUniqueId, payload}:any) => {

  const {
    data: response,
    isError,
    error,
  } = await axiosRequest({
    url: `${process.env.NEXT_PUBLIC_BE_HOST}/v1/groups/${groupUniqueId}/message`,
    method: 'POST',
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    },
  });

  return { data: response as BaseResponse<any>, isError, error };

}

export const searchUsers = async ({token, search}:any) => {

  const {
    data: response,
    isError,
    error,
  } = await axiosRequest({
    url: `${process.env.NEXT_PUBLIC_BE_HOST}/v1/users?page=1&pageSize=20&searchTerm=${search}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    },
  });

  return { data: response as BaseResponse<any>, isError, error };

}


export const createGroup = async ({token, payload}:any) => {

  const {
    data: response,
    isError,
    error,
  } = await axiosRequest({
    url: `${process.env.NEXT_PUBLIC_BE_HOST}/v1/groups`,
    method: 'POST',
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    },
  });

  return { data: response as BaseResponse<any>, isError, error };
  
}
