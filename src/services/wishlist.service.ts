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

const baseUrl = `${url}/v1/wishlist`;

export interface IWishlist {
  _id: string;
  userId: string;
  propertyId: string;
  createdAt: Date;
  updatedAt: Date;
}

type PartialWishlist = Partial<IWishlist>;

const getWishlist = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axiosAuth.get<GeneralApiResponsePagination<IWishlist>>(
    `${baseUrl}/getAllWishlist?${query}`
  );
};

export const useGetWishlist = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["wishlists", pagination, searchObj],
    queryFn: () => getWishlist(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

const addWishlist = (wishlist: PartialWishlist) => {
  return axiosAuth.post(`${baseUrl}`, wishlist);
};

export const useAddWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addWishlist,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["property"] });
      queryClient.invalidateQueries({ queryKey: ["propertyBySlug"] });
    },
  });
};
