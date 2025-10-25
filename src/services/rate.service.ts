import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";

const baseUrl = `${url}/v1/rate`;

export interface IRate {
  name: string;
  propertyId: string;
  price: number;
  date: Date;
  maxGuest: number;
  isAvailable: boolean;
  couponData: [];
}

type PartialRate = Partial<IRate>;

const getRate = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<IRate>>(`${baseUrl}/?${query}`);
};

export const useRate = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["rate", pagination, searchObj],
    queryFn: () => getRate(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

export const getRoomsAvailablesApi = (obj: any, source: any = null) => {
  console.log(obj);
  return axios.patch(`${baseUrl}/roomAvailables/${obj.propertyId}`, obj, {
    cancelToken: source?.token,
  });
};
