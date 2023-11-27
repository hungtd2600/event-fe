"use client";
import { ReactElement, useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { StyledParams } from "@/type/common";
import axiosInstance from "@/utils/axios";
import { LoginForm } from "@/component/page/login/LoginForm";
import { LoginParams } from "@/type/login";
import { useRouter } from "next/navigation";

/**
 * LoginPage component page.
 * @return {JSX.Element} LoginPage component.
 */
const LoginPage = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = useCallback(
    async (params: LoginParams) => {
      const data = new URLSearchParams(params);
      try {
        setLoading(true);
        const response = await axiosInstance.post("signin", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        if (!response?.data?.access_token) return;
        if (typeof window !== "undefined") {
          window.localStorage.setItem("token", response?.data?.access_token);
          router.push("/");
        }
      } catch (error) {
        alert("Tên người dùng hoặc mật khẩu chưa chính xác.");
      } finally {
        setLoading(false);
      }
    },
    [router]
  );
  return (
    <LoginWrapper>
      <LoginForm loading={loading} onLogin={handleLogin} />
    </LoginWrapper>
  );
};

const LoginWrapper = styled(Stack)(({ theme }: StyledParams) => ({
  padding: theme.spacing(4),
  alignItems: "center",
}));

export default LoginPage;
