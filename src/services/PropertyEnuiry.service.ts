import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";
import axiosAuth from "./axios.service";

const baseUrl = `${url}/v1/PropertyEnuiry`;

export interface IPropertyEnuiry {
  _id: String;
  propertyId: String;
  name: String;
  mobile: String;
  email: String;
  message: String;
  createdAt: Date;
  updatedAt: Date;
}

type PartialPropertyEnuiry = Partial<IPropertyEnuiry>;

const addPropertyEnuiry = (PropertyEnuiry: PartialPropertyEnuiry) => {
  return axiosAuth.post(`${baseUrl}`, PropertyEnuiry);
};

export const useAddPropertyEnuiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPropertyEnuiry,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["PropertyEnuiry"] });
    },
  });
};

const getPropertyEnuiry = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axiosAuth.get<GeneralApiResponsePagination<IPropertyEnuiry>>(
    `${baseUrl}/?${query}`
  );
};

export const usePropertyEnuiry = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["PropertyEnuiry", pagination, searchObj],
    queryFn: () =>
      getPropertyEnuiry(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

const getPropertyEnuiryById = (PropertyEnuiryId: string) => {
  return axiosAuth.get<GeneralApiResponse<IPropertyEnuiry>>(
    `${baseUrl}/getById/${PropertyEnuiryId}`
  );
};

export const usePropertyEnuiryById = (
  PropertyEnuiryId: string,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["PropertyEnuiryById", PropertyEnuiryId],
    queryFn: () =>
      getPropertyEnuiryById(PropertyEnuiryId).then((res) => res.data?.data),
    enabled: enabled,
  });
};

const udpatePropertyEnuiry = ({ PropertyEnuiryId, ...obj }: any) => {
  return axiosAuth.patch(`${baseUrl}/updateById/${PropertyEnuiryId}`, obj);
};

export const useUpdatePropertyEnuiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: udpatePropertyEnuiry,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["PropertyEnuiry"] });
      queryClient.invalidateQueries({ queryKey: ["PropertyEnuiryById"] });
    },
  });
};

const deletePropertyEnuiry = (PropertyEnuiryId: string) => {
  return axiosAuth.delete(`${baseUrl}/deleteById/${PropertyEnuiryId}`);
};

export const useDeletePropertyEnuiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePropertyEnuiry,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["PropertyEnuiry"] });
      // toastSuccess(res);
    },
  });
};
