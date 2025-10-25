import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";

const baseUrl = `${url}/v1/destination`;

export interface IDestination {
  _id: string;
  name: string;
  slug: string;
  status: string;
  thumbnail: string;
  checked: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updateAt: Date;
}

type PartialDestination = Partial<IDestination>;

const getDestination = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<IDestination>>(
    `${baseUrl}/?${query}`
  );
};

export const useDestination = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true,
  
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["destination", pagination, searchObj],
    queryFn: () =>
      getDestination(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

const getDestinationById = (destinationId: string) => {
  return axios.get<GeneralApiResponse<IDestination>>(
    `${baseUrl}/getById/${destinationId}`
  );
};

export const useDestinationById = (destinationId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["destinationById", destinationId],
    queryFn: () =>
      getDestinationById(destinationId).then((res) => res.data?.data),
    enabled: enabled,
  });
};
