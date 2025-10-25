import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GeneralApiResponse,
  GeneralApiResponsePagination,
  url,
} from "./url.service";
import { usePagination } from "@/hooks/usePagination";
import axiosAuth from "./axios.service";
import axios from "axios";
import { ROLES_TYPE } from "@/common/contstant";

const baseUrl = `${url}/v1/user`;

type webloginResponse = {
  message: string;
  token: string;
  id: string;
  name: string;
  role: string;
  email?: string;
};
export interface IUser {
  _id: string;
  fullName: string;
  lastName: string;
  email: string;
  dob: string;
  name: string;
  gender: string;
  location: string;
  phone: string;
  password: string;
  stateId: string;
  stateName: string;
  cityId: string;
  cityName: string;
  address: string;
  pincode: string;
  isVerified: boolean;
  profileImage: string;
  gstNo: string;
  status: string;
  role: ROLES_TYPE;
  isDeleted: boolean;
  deletedOn: Date;
  createdAt: Date;
  updateAt: Date;
}

export type PartialUser = Partial<IUser>;

export const webLogin = (formobj: { email: string; password: string }) => {
  return axios.post<webloginResponse>(`${baseUrl}/login`, formobj);
};

const getProfile = () => {
  return axiosAuth.get<GeneralApiResponse<IUser>>(`${baseUrl}/getProfile`);
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile().then((res) => res.data.data),
  });
};

export const registerUser = (user: PartialUser) => {
  return axios.post(`${baseUrl}/register`, user);
};

const updateUser = ({ userId, ...user }: any) => {
  return axios.patch(`${baseUrl}/updateById/${userId}`, user);
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["userObj"] });
    },
  });
};

const updateProfileImage = ({ userId, ...user }: any) => {
  return axios.patch(`${baseUrl}/updateProfileImage/${userId}`, user);
};

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileImage,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["userObj"] });
    },
  });
};

const updatePassword = ({ userId, ...user }: any) => {
  return axios.patch(`${baseUrl}/updatePasswordByAdmin/${userId}`, user);
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePassword,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["userObj"] });
    },
  });
};

const getUserById = (_id: string) => {
  return axios.get<GeneralApiResponse<IUser>>(`${baseUrl}/getById/${_id}`);
};

export const useUserById = (_id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["userObj", _id],
    queryFn: () => getUserById(_id).then((res) => res.data?.data),
    enabled: enabled,
  });
};

export const sendOTP = async (obj: { phone: string }) => {
  console.log("🚀 -----------------------🚀")
  console.log("🚀 ~ sendOTP ~ obj:", obj)
  console.log("🚀 -----------------------🚀")
  const res = await axios.post(`${baseUrl}/sendOtp`, obj);
  return res;
};


export const verifyOtp = async (obj: { phone: string; otp: string }) => {
  return axios.post(`${baseUrl}/verifyOtp`, obj);
};

export const useSendOTP = () => {
  return useMutation({
    mutationFn: (obj: { phone: string }) => sendOTP(obj),
  });
};


export const resendOTP = async (obj: { phone: string }) => {
  return axios.post(`${baseUrl}/resendOtp`, obj);
};

export const useResendOTP = () => {
  return useMutation({
    mutationFn: (obj: { phone: string }) => resendOTP(obj),
  });
};
