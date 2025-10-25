import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";

const baseUrl = `${url}/v1/banner`;

export interface IBanner {
  _id: string;
  name: string;
  status: string;
  thumbnail: string;
  isDeleted: boolean;
  createdAt: Date;
  updateAt: Date;
}

const getBanner = async (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return await axios.get<GeneralApiResponsePagination<IBanner>>(
    `${baseUrl}/?${query}`
  );
};

export const useBanner = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["banner", pagination, searchObj],
    queryFn: () => getBanner(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

const getBannerById = (bannerId: string) => {
  return axios.get<GeneralApiResponse<IBanner>>(
    `${baseUrl}/getById/${bannerId}`
  );
};

export const useBannerById = (bannerId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["bannerById", bannerId],
    queryFn: () => getBannerById(bannerId).then((res) => res.data?.data),
    enabled: enabled,
  });
};


