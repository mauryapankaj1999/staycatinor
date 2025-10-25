import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";

const baseUrl = `${url}/v1/faq`;

export interface IFaq {
  _id: string;
  name: string;
  thumbnail: string;
  faqCategoryId: string;
  faqCategoryName: string;
  description: string;
  status: string;
  isDeleted: boolean;
  createdAt: Date;
  updateAt: Date;
}

type PartialFaq = Partial<IFaq>;

const addFaq = (faq: PartialFaq) => {
  return axios.post(`${baseUrl}`, faq);
};

export const useAddFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFaq,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["faq"] });
    },
  });
};

const getFaq = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<IFaq>>(
    `${baseUrl}/?${query}`
  );
};

export const useFaq = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["faq", pagination, searchObj],
    queryFn: () => getFaq(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

const getFaqById = (faqId: string) => {
  return axios.get<GeneralApiResponse<IFaq>>(
    `${baseUrl}/getById/${faqId}`
  );
};

export const useFaqById = (faqId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["faqById", faqId],
    queryFn: () => getFaqById(faqId).then((res) => res.data?.data),
    enabled: enabled,
  });
};

const udpateFaq = ({ faqId, ...obj }: any) => {
  return axios.patch(`${baseUrl}/updateById/${faqId}`, obj);
};

export const useUpdateFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: udpateFaq,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["faq"] });
      queryClient.invalidateQueries({ queryKey: ["faqById"] });
    },
  });
};

const deleteFaq = (faqId: string) => {
  return axios.delete(`${baseUrl}/deleteById/${faqId}`);
};

export const useDeleteFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFaq,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["faq"] });
      // toastSuccess(res);
    },
  });
};
