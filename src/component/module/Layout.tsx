import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { ReactElement } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { LoadingButton } from "@mui/lab";
import LogoutIcon from "@mui/icons-material/Logout";

type LayoutProps = {};

/**
 * Layout component page.
 * @return {JSX.Element} Layout component.
 */
export const Layout: React.FC<LayoutProps> = (): ReactElement => {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
      router.push("/login");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Events
          </Typography>
          <LoadingButton onClick={handleLogout} color="inherit">
            <LogoutIcon />
          </LoadingButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
