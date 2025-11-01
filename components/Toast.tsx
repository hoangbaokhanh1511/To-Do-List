"use client";

import { addToast } from "@heroui/react";

export const showToast = {
  success: (title: string, description?: string) => {
    addToast({
      title,
      description,
      color: "success",
      timeout: 3000,
      shouldShowTimeoutProgress: true,
    });
  },
  error: (title: string, description?: string) => {
    addToast({
      title,
      description,
      color: "danger",
      timeout: 3000,
      shouldShowTimeoutProgress: true,
    });
  },
  info: (title: string, description?: string) => {
    addToast({
      title,
      description,
      color: "primary",
      timeout: 3000,
      shouldShowTimeoutProgress: true,
    });
  },
};
