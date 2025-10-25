import axios from "axios";
import { GeneralApiResponsePagination, url } from "./url.service";
import { PaginationState, usePagination } from "@/hooks/usePagination";
import axiosAuth from "./axios.service";
import { useQuery } from "@tanstack/react-query";

let serverUrl = `${url}/v1/order`;
export interface IOrder {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  gstNo: string;
  message: string;
  nights: string;
  adult: string;
  child: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  propertyId: string;
  sellerId: string;
  hotelsArr: Hotel[];
  gst: Gst;
  subTotalAmount: number;
  totalAmount: number;
  orderStatus: string;
  orderStatusArr: OrderStatusItem[];
  dicountObj: DiscountObj;
  paymentObj: PaymentObj;
  active: boolean;
  orderNotes: string;
  createdAt: Date;
}

interface Hotel {
  propertyId: string;
  price: number;
  name: string;
  image: string;
}

interface Gst {
  tax: number;
  amount: number;
}

interface OrderStatusItem {
  orderStatus: string;
  updatedOn: string;
}

interface DiscountObj {
  code: string;
  amount: number;
}

interface PaymentObj {
  paymentId: string;
  gatwayPaymentObj: any; // Replace with specific Razorpay type if available
  amountPayedFromWallet: number;
  paymentChk: number;
}
type PartialOrder = Partial<IOrder>;
export const createOrder = async () => {
  return await axios.post(`${serverUrl}/createOrder`);
};

export const createGuestOrder = async (obj: any) => {
  return await axios.post(`${serverUrl}/createGuestOrder`, obj);
};
export const orderCallback = async (obj: any, id: string) => {
  return await axios.get(`${serverUrl}/paymentCallback/${id}?${obj}`);
};

export const phonepePayment = async (id: string, obj: any) => {
  return await axios.post(`${serverUrl}/phonepePayment/${id}?${obj}`);
};

export const phonepePaymentStatusCheck = async (id: string) => {
  return await axios.get(`${serverUrl}/phonepePaymentStatusCheck/${id}`);
};
export const orderCallbackApi = async (obj: any, id: string) => {
  return await axios.get(`${serverUrl}/paymentCallback/${id}`, obj);
};

export const getOrderById = async (id: string) => {
  return await axios.get(`${serverUrl}/getOrderById/${id}`);
};



const getOrder = (
  pagination: PaginationState,
  searchObj: Record<string, any>
) => {
  const query = new URLSearchParams({
    pageIndex: String(pagination.pageIndex),
    pageSize: String(pagination.pageSize),
    ...searchObj,
  }).toString();
   return axiosAuth.get<GeneralApiResponsePagination<IOrder>>(
     `${serverUrl}/?${query}`
   );
};

export const useOrder = (
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
    queryFn: () => getOrder(pagination, searchObj).then((res) => res.data),
    enabled: enabled,
  });
};

