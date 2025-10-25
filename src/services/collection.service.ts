import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";

import { PaginationState, usePagination } from "@/hooks/usePagination";

const baseUrl = `${url}/v1/collection`;

export interface ICollection {
  _id: string;
  name: string;
  label: string;
  checked: boolean;
  slug: string;
  status: string;
  thumbnail: string;
  isDeleted: boolean;
  createdAt: Date;
  updateAt: Date;
}

type PartialCollection = Partial<ICollection>;

const addCollection = (collection: PartialCollection) => {
  return axios.post(`${baseUrl}`, collection);
};

export const useAddCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCollection,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
    },
  });
};

const getCollection = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<ICollection>>(
    `${baseUrl}/?${query}`
  );
};

export const useCollection = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["collection", pagination, searchObj],
    queryFn: () => getCollection(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

const getCollectionById = (collectionId: string) => {
  return axios.get<GeneralApiResponse<ICollection>>(
    `${baseUrl}/getById/${collectionId}`
  );
};

