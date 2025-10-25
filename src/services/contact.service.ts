import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";
import axios from "axios";

const baseUrl = `${url}/v1/contact`;

export interface IContact {
  _id: String;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

type PartialContact = Partial<IContact>;

const addContact = (Contact: PartialContact) => {
  return axios.post(`${baseUrl}`, Contact);
};

export const useAddContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addContact,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["Contact"] });
    },
  });
};

const getContactById = (ContactId: string) => {
  return axios.get<GeneralApiResponse<IContact>>(
    `${baseUrl}/getById/${ContactId}`
  );
};

export const useContactById = (ContactId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["ContactById", ContactId],
    queryFn: () => getContactById(ContactId).then((res) => res.data?.data),
    enabled: enabled,
  });
};

const udpateContact = ({ ContactId, ...obj }: any) => {
  return axios.patch(`${baseUrl}/updateById/${ContactId}`, obj);
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: udpateContact,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["Contact"] });
      queryClient.invalidateQueries({ queryKey: ["ContactById"] });
    },
  });
};

const deleteContact = (ContactId: string) => {
  return axios.delete(`${baseUrl}/deleteById/${ContactId}`);
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContact,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["Contact"] });
      // toastSuccess(res);
    },
  });
};
