import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios.service";
import url, {
  GeneralApiResponse,
  GeneralApiResponsePagination,
} from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";
import { IDestination } from "./destination.service";

const baseUrl = `${url}/v1/property`;

export interface IProperty {
  _id: string;
  support: string;
  dayPrice: number;
  serviceType: string;
  reels: any;
  maxStar: number;
  allImages?: string[];
  collectionsDetails?: any;
  Infromation: String;
  sellerId: string;
  mixMenuImage: string;
  isWishlist: string;
  viewMore: string;
  name: string;
  slug: string;
  title: string;
  pdf: string;
  bedroom: number;
  bathroom: number;
  price: number;
  guest: number;
  destination: any;
  amenities: {
    amenityCategoryName: string;
    amenityCategoryId: string;
    name: string;
    amenityId: string;
    thumbnail: string;
  }[];
  description: string;
  collectionId: string;
  destinationId: string;
  mainImage: string;
  area: string;
  address: string;
  map: string;
  location: string;
  mealImage: string;
  nonVegMenuImage: string;
  todos: string;
  meals: {
    name: string;
    priceArr: {
      name: string;
      price: number;
    }[];
  }[];
  galleries: {
    name: string;
    imageList: any[];
  }[];
  rooms: {
    title: string;
    description: string;
    image: string;
  }[];
  propertyRules: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  isDeleted: boolean;
  status: string;
  createdAt: Date;
  updateAt: Date;
  wishlistsObj: {
    userId: string;
    propertyId: string;
  };
}

const getProperty = async (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
  return axios.get<GeneralApiResponsePagination<IProperty>>(
    `${baseUrl}/website?${query}`
  );
};

export const useProperty = (
  searchObj: Record<string, any> = {},
  getPaginationFromParams = true,
  enabled = true
) => {
  const pagination = usePagination(
    getPaginationFromParams,
    searchObj.pageIndex,
    searchObj.pageSize
  );
  return useQuery({
    queryKey: ["property", pagination, searchObj],
    queryFn: () => getProperty(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

const getPropertyBySlug = (obj: any | null) => {
  return axios.get<GeneralApiResponse<IProperty>>(
    `${baseUrl}/getBySlug/${obj?.slug}?userId=${obj?.userId}`
  );
};

export const usePropertyBySlug = (obj: any | null, enabled: boolean) => {
  return useQuery({
    queryKey: ["propertyBySlug", obj],
    queryFn: () => getPropertyBySlug(obj).then((res) => res.data?.data),
    enabled: enabled,
  });
};

const getPropertyById = (slug: string | null) => {
  return axios.get<GeneralApiResponse<IProperty>>(`${baseUrl}/getById/${slug}`);
};

export const usePropertyById = (
  slug: string | null,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ["propertyById", slug],
    queryFn: () => getPropertyById(slug).then((res) => res.data?.data),
    enabled: !!slug && enabled,
  });
};
