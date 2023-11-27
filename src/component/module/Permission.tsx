import { useRouter } from "next/navigation";
import React, { ReactElement, ReactNode, useEffect } from "react";

type PermissionProps = {
  children: ReactNode;
};

/**
 * Permission component page.
 * @return {JSX.Element} Permission component.
 */
export const Permission: React.FC<PermissionProps> = ({
  children,
}): ReactElement => {
  const router = useRouter();

  const getLocalStorageValue = (key: string): string | null => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(key);
    }
    return null;
  };

  const token = getLocalStorageValue("token");

  useEffect(() => {
    if (!token) router.push("/login");
  }, [router, token]);

  return <>{token && children}</>;
};
