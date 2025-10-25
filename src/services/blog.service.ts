import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";

const baseUrl = `${url}/v1/blog`;

export interface IBlog {
  _id: string;
  name: string;

  description: string;
  author: string;
  views: number;
  date: Date;
  thumbnail: string;
  isDeleted: boolean;
  status: string;
  top: string;
  createdAt: Date;
  updateAt: Date;
}

type PartialBlog = Partial<IBlog>;

const getBlog = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<IBlog>>(`${baseUrl}/?${query}`);
};

export const useBlog = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["blog", pagination, searchObj],
    queryFn: () => getBlog(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

const getBlogById = (slug: string) => {
  return axios.get<GeneralApiResponse<IBlog>>(`${baseUrl}/getBySlug/${slug}`);
};

export const useBlogByBy = (slug: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["blogBySlug", slug],
    queryFn: () => getBlogById(slug).then((res) => res.data?.data),
    enabled: enabled,
  });
};
