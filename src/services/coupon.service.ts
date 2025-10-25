import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";

const baseUrl = `${url}/v1/coupon`;

export interface ICoupon {
  _id: string;
  type: string;
  description: string;
  expiryDate: Date;
  value: number;
  icon: string;
  name: string;
  usedBy: {
    type: number;
    default: 0;
  };
  validFor: number;
  image: string;
  minimumCartValue: number;
  status: string;
  show: boolean;
}

type PartialCoupon = Partial<ICoupon>;

const getCoupon = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<ICoupon>>(
    `${baseUrl}/?${query}`
  );
};

export const useCoupon = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["coupon", pagination, searchObj],
    queryFn: () => getCoupon(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};


