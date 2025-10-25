import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GeneralApiResponse,
  GeneralApiResponsePagination,
  url,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";
import axios from "axios";
import { ROLES_TYPE } from "@/common/contstant";
import { add } from "lodash";

const baseUrl = `${url}/v1/Subscribe`;

export interface ISubscribe {
  _id: string;
  Email: string;
  createdAt: Date;
  updatedAt: Date;
}

type PartialSubscribe = Partial<ISubscribe>;

const getSubscribe = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<ISubscribe>>(
    `${baseUrl}/getAllSubscribe?${query}`
  );
};

export const useGetSubscribe = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["Subscribes", pagination, searchObj],
    queryFn: () => getSubscribe(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

const addSubscribe = (Subscribe: PartialSubscribe) => {
  return axios.post(`${baseUrl}`, Subscribe);
};

export const useAddSubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSubscribe,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["Subscribe"] });
      queryClient.invalidateQueries({ queryKey: ["property"] });
      queryClient.invalidateQueries({ queryKey: ["propertyBySlug"] });
    },
  });
};
