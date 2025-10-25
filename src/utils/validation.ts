import { toast } from "react-hot-toast";

export const validateText = (
  name: string,
  field: string,
  required: boolean = false
): boolean => {
  if ((!name || name.trim() === "") && required) {
    toast.error(`${field} is required.`);
    return false;
  }

  const trimmed = name.trim();
  const isValid = /^[a-zA-Z\s]+$/.test(trimmed);

  if (!isValid) {
    toast.error(`${field} must contain only letters and spaces.`);
    return false;
  }

  if (trimmed.length < 2) {
    toast.error(`${field} must be at least 2 characters long.`);
    return false;
  }

  return true;
};

export const validateEmail = (
  email: string,
  required: boolean = false
): boolean => {
  if ((!email || email.trim() === "") && required) {
    toast.error("Email is required.");
    return false;
  }

  const trimmed = email.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

  if (!isValid) {
    toast.error("Please enter a valid email address.");
    return false;
  }

  return true;
};

export const validatePhone = (
  phone: string,
  required: boolean = false
): boolean => {
  if ((!phone || phone.trim() === "") && required) {
    toast.error("Phone number is required.");
    return false;
  }

  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length !== 10) {
    toast.error("Phone number must be exactly 10 digits.");
    return false;
  }

  return true;
};

export const validateNumber = (
  value: string,
  field: string = "Value",
  required: boolean = false
): boolean => {
  const trimmed = value?.trim() || "";

  if (required && trimmed === "") {
    toast.error(`${field} is required.`);
    return false;
  }

  if (trimmed !== "" && !/^\d+$/.test(trimmed)) {
    toast.error(`${field} must be a valid number.`);
    return false;
  }

  return true;
};
