import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";
import amenity from '@/assets/amenity.png';
import { IAmenity } from "./amenity.service";

const baseUrl = `${url}/v1/amenityCategory`;

export interface IAmenityCategory {
  _id: string;
  name: string;
  status: string;
  isDeleted: boolean;
  createdAt: Date;
  updateAt: Date;
  amenitys?: IAmenity[];
}

type PartialAmenityCategory = Partial<IAmenityCategory>;

const addAmenityCategory = (amenityCategory: PartialAmenityCategory) => {
  return axios.post(`${baseUrl}`, amenityCategory);
};

export const useAddAmenityCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAmenityCategory,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["amenityCategory"] });
    },
  });
};

const getAmenityCategory = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<IAmenityCategory>>(
    `${baseUrl}/?${query}`
  );
};

export const useAmenityCategory = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["amenityCategory", pagination, searchObj],
    queryFn: () => getAmenityCategory(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

const getAmenityCategoryById = (amenityCategoryId: string) => {
  return axios.get<GeneralApiResponse<IAmenityCategory>>(
    `${baseUrl}/getById/${amenityCategoryId}`
  );
};

export const useAmenityCategoryById = (amenityCategoryId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["amenityCategoryById", amenityCategoryId],
    queryFn: () => getAmenityCategoryById(amenityCategoryId).then((res) => res.data?.data),
    enabled: enabled,
  });
};

const udpateAmenityCategory = ({ amenityCategoryId, ...obj }: any) => {
  return axios.patch(`${baseUrl}/updateById/${amenityCategoryId}`, obj);
};

export const useUpdateAmenityCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: udpateAmenityCategory,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["amenityCategory"] });
      queryClient.invalidateQueries({ queryKey: ["amenityCategoryById"] });
    },
  });
};

const deleteAmenityCategory = (amenityCategoryId: string) => {
  return axios.delete(`${baseUrl}/deleteById/${amenityCategoryId}`);
};

export const useDeleteAmenityCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAmenityCategory,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["amenityCategory"] });
      // toastSuccess(res);
    },
  });
};
