import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";
import axiosAuth from "./axios.service";

const baseUrl = `${url}/v1/enquiry`;

export interface IEnquiry {
  _id: String;
  name: string;
  email: string;
  phone: string;
  locationvilla: string;
  statusnvilla: string;
  numberofroom: number;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

type PartialEnquiry = Partial<IEnquiry>;

const addEnquiry = (Enquiry: PartialEnquiry) => {
  return axiosAuth.post(`${baseUrl}`, Enquiry);
};

export const useAddEnquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEnquiry,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["Enquiry"] });
    },
  });
};

const getEnquiry = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axiosAuth.get<GeneralApiResponsePagination<IEnquiry>>(
    `${baseUrl}/?${query}`
  );
};

export const useEnquiry = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["Enquiry", pagination, searchObj],
    queryFn: () => getEnquiry(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

const getEnquiryById = (EnquiryId: string) => {
  return axiosAuth.get<GeneralApiResponse<IEnquiry>>(
    `${baseUrl}/getById/${EnquiryId}`
  );
};

export const useEnquiryById = (EnquiryId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["EnquiryById", EnquiryId],
    queryFn: () => getEnquiryById(EnquiryId).then((res) => res.data?.data),
    enabled: enabled,
  });
};

const udpateEnquiry = ({ EnquiryId, ...obj }: any) => {
  return axiosAuth.patch(`${baseUrl}/updateById/${EnquiryId}`, obj);
};

export const useUpdateEnquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: udpateEnquiry,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["Enquiry"] });
      queryClient.invalidateQueries({ queryKey: ["EnquiryById"] });
    },
  });
};

const deleteEnquiry = (EnquiryId: string) => {
  return axiosAuth.delete(`${baseUrl}/deleteById/${EnquiryId}`);
};

export const useDeleteEnquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEnquiry,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["Enquiry"] });
      // toastSuccess(res);
    },
  });
};
