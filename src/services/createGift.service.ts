import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GeneralApiResponsePagination, url } from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";
import axiosAuth from "./axios.service";

const baseUrl = `${url}/v1/create-gift`;

export interface ICreateGift {
  _id?: string;
  sender: IGiftInfo;
  receiver: IGiftInfo;
  amount: number;
  title: string;
  message: string;
  createdAt?: Date;
  updateAt?: Date;
}

export interface IGiftInfo{
    name?: string;
    email?: string;
    phone?: string;
  }

type PartialCreateGift = Partial<ICreateGift>;

const getCreateGift = () => {
  return axiosAuth.get<GeneralApiResponsePagination<ICreateGift>>(
    `${baseUrl}/getAllCreateGift`
  );
};

export const useGetCreateGift = (enabled = true) => {
  return useQuery({
    queryKey: ["CreateGifts"],
    queryFn: () => getCreateGift().then((res) => res.data.data),
    enabled: enabled,
  });
};

const addCreateGift = (CreateGift: PartialCreateGift) => {
  return axiosAuth.post(`${baseUrl}`, CreateGift);
};

export const useAddCreateGift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCreateGift,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["CreateGift"] });
      queryClient.invalidateQueries({ queryKey: ["property"] });
      queryClient.invalidateQueries({ queryKey: ["propertyBySlug"] });
    },
  });
};
