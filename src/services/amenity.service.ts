import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";

const baseUrl = `${url}/v1/amenity`;

export interface IAmenity {
  _id: string;
  name: string;
  thumbnail: string;
  amenityCategoryId: string;
  amenityCategoryName: string;
  description: string;
  status: string;
  isDeleted: boolean; 
  createdAt: Date;
  updateAt: Date;
}

type PartialAmenity = Partial<IAmenity>;

const addAmenity = (amenity: PartialAmenity) => {
  return axios.post(`${baseUrl}`, amenity);
};

export const useAddAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAmenity,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["amenity"] });
    },
  });
};

const getAmenity = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<IAmenity>>(
    `${baseUrl}/?${query}`
  );
};

export const useAmenity = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(getPaginationFromParams);
  return useQuery({
    queryKey: ["amenity", pagination, searchObj],
    queryFn: () => getAmenity(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

const getAmenityById = (amenityId: string) => {
  return axios.get<GeneralApiResponse<IAmenity>>(
    `${baseUrl}/getById/${amenityId}`
  );
};

export const useAmenityById = (amenityId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["amenityById", amenityId],
    queryFn: () => getAmenityById(amenityId).then((res) => res.data?.data),
    enabled: enabled,
  });
};

const udpateAmenity = ({ amenityId, ...obj }: any) => {
  return axios.patch(`${baseUrl}/updateById/${amenityId}`, obj);
};

export const useUpdateAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: udpateAmenity,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["amenity"] });
      queryClient.invalidateQueries({ queryKey: ["amenityById"] });
    },
  });
};

const deleteAmenity = (amenityId: string) => {
  return axios.delete(`${baseUrl}/deleteById/${amenityId}`);
};

export const useDeleteAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAmenity,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["amenity"] });
      // toastSuccess(res);
    },
  });
};
