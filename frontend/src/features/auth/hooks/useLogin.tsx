import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../services/authApi";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log("Login success:", data);
      // optionally store token in store/session
      navigate("/dashboard");
    },
    onError: (error: any) => {
      console.error("Login error:", error);
    },
  });

  return {
    login: mutation.mutate,
    error: mutation.error,
  };
};
