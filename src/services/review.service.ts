import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";

const baseUrl = `${url}/v1/review`;

export interface IReview {
  _id: string;
  name: string;
  propertyId: string;
  date: Date;
  description: string;
  title: string;
  star: number;
  postedOn: string;
  thumbnail: string;
  isDeleted: boolean;
  status: string;
  top: string;
  createdAt: Date;
  updateAt: Date;
}


const getReview = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<IReview>>(
    `${baseUrl}/?${query}`
  );
};

export const useReview = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["review", pagination, searchObj],
    queryFn: () => getReview(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

const getReviewById = (reviewId: string) => {
  return axios.get<GeneralApiResponse<IReview>>(
    `${baseUrl}/getById/${reviewId}`
  );
};

export const useReviewById = (reviewId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["reviewById", reviewId],
    queryFn: () => getReviewById(reviewId).then((res) => res.data?.data),
    enabled: enabled,
  });
};
