export const AUTH_TOKEN = "AUTH_TOKEN";

export const pageIndex = "pageIndex";
export const defaultPageIndex = 0;
export const pageSize = "pageSize";
export const defaultPageSize = 10;

export const headerNameKey = "headerName";

export const ROLES = {
  ADMIN: "ADMIN",
  SUBADMIN: "SUBADMIN",
  SELLER: "SELLER",
  USER: "USER",
} as const;
export type ROLES_TYPE = keyof typeof ROLES;

export const ROLE_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;
export type ROLE_STATUS_TYPE = keyof typeof ROLE_STATUS;


export const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;
export type STATUS_TYPE = keyof typeof STATUS;

export const APPROVE_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  DENIED: "DENIED",
} as const;
export type APPROVE_STATUS_TYPE = keyof typeof APPROVE_STATUS;

export const ORDER_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  DENIED: "DENIED",
  DISPATCHED: "DISPATCHED", //check stock
  DELIVERED: "DELIVERED",
  CANCELED: "CANCELED",
  RETURNED: "RETURNED",
} as const;
export type ORDER_STATUS_TYPE = keyof typeof ORDER_STATUS;

export const ORDER_UPDATE_STATUS = {
  REJECTED: "REJECTED",
  REQUESTED: "REQUESTED",
  APPROVED: "APPROVED",
} as const;
export type ORDER_UPDATE_STATUS_TYPE = keyof typeof ORDER_UPDATE_STATUS;
