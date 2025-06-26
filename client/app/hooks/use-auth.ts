import { postData } from "@/lib/axios";
import type { SignUpFormData } from "@/routes/auth/sign-up";
import type { LoginResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: (data: SignUpFormData) => postData("/auth/register", data),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: {
      email: string;
      password: string;
    }): Promise<LoginResponse> => postData("/auth/login", data),
  });
};

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: (data: { token: string }) =>
      postData("/auth/verify-email", data),
  });
};
