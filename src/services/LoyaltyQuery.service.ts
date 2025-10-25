import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GeneralApiResponse,
  GeneralApiResponsePagination,
  url,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";
import axiosAuth from "./axios.service";
import axios from "axios";
import { ROLES_TYPE } from "@/common/contstant";
import { add } from "lodash";

const baseUrl = `${url}/v1/loyaltyquery`;

export interface ILoyaltyQuery {
  _id: string;
  name: String;
  email: String;
  phone: String;
  city: String;
  travelType: String;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
}

type PartialLoyaltyQuery = Partial<ILoyaltyQuery>;

const getLoyaltyQuery = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axiosAuth.get<GeneralApiResponsePagination<ILoyaltyQuery>>(
    `${baseUrl}/getAllLoyaltyQuery?${query}`
  );
};

export const useGetLoyaltyQuery = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["LoyaltyQuerys", pagination, searchObj],
    queryFn: () =>
      getLoyaltyQuery(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

const addLoyaltyQuery = (LoyaltyQuery: PartialLoyaltyQuery) => {
  return axiosAuth.post(`${baseUrl}`, LoyaltyQuery);
};

export const useAddLoyaltyQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addLoyaltyQuery,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["LoyaltyQuery"] });
      queryClient.invalidateQueries({ queryKey: ["property"] });
      queryClient.invalidateQueries({ queryKey: ["propertyBySlug"] });
    },
  });
};
