import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";

import { PaginationState, usePagination } from "@/hooks/usePagination";

const baseUrl = `${url}/v1/page`;

export type SectionProps = {
  title: string;
  description: string;
  image: any;
  url: string;
};
export interface IPage {
  _id: string;
  name: string;
  type: string;
  section1: SectionProps[];
  section2: SectionProps;
  section3: SectionProps[];
  section4: SectionProps;
  section5: SectionProps[];
  isDeleted: boolean;
  status: string;
  createdAt: Date;
  updateAt: Date;
}

type PartialPage = Partial<IPage>;

const addPage = (page: PartialPage) => {
  return axios.post(`${baseUrl}`, page);
};

export const useAddPage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPage,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["page"] });
    },
  });
};

const getPage = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<IPage>>(`${baseUrl}/?${query}`);
};

export const usePage = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["page", pagination, searchObj],
    queryFn: () => getPage(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

const getPageById = async (pageId: string) => {
  return await  axios.get<GeneralApiResponse<IPage>>(
    `${baseUrl}/getById/${pageId}`
  );
};

export const usePageById = (pageId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["pageById", pageId],
    queryFn: () => getPageById(pageId).then((res) => res.data?.data),
    enabled: enabled,
  });
};
