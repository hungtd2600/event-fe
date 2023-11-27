import { useRouter } from "next/navigation";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";

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
  useEffect(() => {
    const token = getLocalStorageValue("token");
    if (!token) router.push("/login");
  }, [router]);

  return <>{children}</>;
};
