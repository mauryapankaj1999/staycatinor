import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import url from "./url.service";

const server_url = `${url}/v1/location`;

export interface IState {
  label: string;
  value: string;
}

export interface ICity {
  label: string;
  value: string;
  stateId: string;
}

export const getStates = async (query: string) => {
  return axios.get(`${server_url}/states?${query}`);
};

export const getCities = async (query: string) => {
  return axios.get(`${server_url}/cities?${query}`);
};

export const useAllStates = (query: string) => {
  return useQuery({
    queryKey: ["statesList", query],
    staleTime: 10 * (60 * 1000),
    queryFn: () => getStates(query).then((res) => res.data?.data),
    enabled: true,
  });
};

export const useAllCities = (query: string) => {
  return useQuery({
    queryKey: ["citiesList"],
    staleTime: 10 * (60 * 1000),
    queryFn: () => getCities(query).then((res) => res.data?.data),
    enabled: true,
  });
};
