import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";
import faq from '@/assets/faq.png';
import { IFaq } from "./faq.service";

const baseUrl = `${url}/v1/faqCategory`;

export interface IFaqCategory {
  _id: string;
  name: string;
  status: string;
  isDeleted: boolean;
  createdAt: Date;
  updateAt: Date;
  faqs?: IFaq[];
}

type PartialFaqCategory = Partial<IFaqCategory>;

const addFaqCategory = (faqCategory: PartialFaqCategory) => {
  return axios.post(`${baseUrl}`, faqCategory);
};

export const useAddFaqCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFaqCategory,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["faqCategory"] });
    },
  });
};

const getFaqCategory = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<IFaqCategory>>(
    `${baseUrl}/?${query}`
  );
};

export const useFaqCategory = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["faqCategory", pagination, searchObj],
    queryFn: () => getFaqCategory(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

const getFaqCategoryById = (faqCategoryId: string) => {
  return axios.get<GeneralApiResponse<IFaqCategory>>(
    `${baseUrl}/getById/${faqCategoryId}`
  );
};

export const useFaqCategoryById = (faqCategoryId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["faqCategoryById", faqCategoryId],
    queryFn: () => getFaqCategoryById(faqCategoryId).then((res) => res.data?.data),
    enabled: enabled,
  });
};

const udpateFaqCategory = ({ faqCategoryId, ...obj }: any) => {
  return axios.patch(`${baseUrl}/updateById/${faqCategoryId}`, obj);
};

export const useUpdateFaqCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: udpateFaqCategory,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["faqCategory"] });
      queryClient.invalidateQueries({ queryKey: ["faqCategoryById"] });
    },
  });
};

const deleteFaqCategory = (faqCategoryId: string) => {
  return axios.delete(`${baseUrl}/deleteById/${faqCategoryId}`);
};

export const useDeleteFaqCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFaqCategory,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["faqCategory"] });
      // toastSuccess(res);
    },
  });
};
