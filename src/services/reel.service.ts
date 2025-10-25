import { useQuery } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";

const baseUrl = `${url}/v1/reels`; // Match admin panel's base URL

export interface IReel {
  _id: string;
  title: string;
  thumbnail: string; // URL or base64 string from admin
  slug: string;
  propertyObj: any;
  description: string;
  video: string;
  cityId: string;
  stateId: string;
  // URL or base64 string from admin
}

type PartialReel = Partial<IReel>;

const getReel = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<IReel>>(`${baseUrl}/?${query}`);
};

export const useReel = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["reels", pagination, searchObj],
    queryFn: () => getReel(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};
