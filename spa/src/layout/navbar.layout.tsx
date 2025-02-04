import { LightMode, MenuOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useColorScheme, useTheme } from "@mui/material/styles";
import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {}

const routes = [
  { display: "Início", route: "/" },
  { display: "Proprietarios", route: "/scheduled" },
  { display: "Inquilinos", route: "/services" },
  { display: "Corretores", route: "/partners" },
];

export const Navbar = forwardRef<HTMLElement, NavbarProps>((_props, ref) => {
  const theme = useTheme();
  const { mode, setMode } = useColorScheme();
  const handleToggle = () =>
    mode === "light" ? setMode("dark") : setMode("light");

  if (!mode) {
    return null;
  }

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (route: string) => {
    navigate(route);
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" ref={ref} style={{ borderRadius: 10 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuOutlined />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {routes.map(({ display, route }) => (
                <MenuItem
                  key={display}
                  onClick={() => handleCloseNavMenu(route)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {display}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{ flexGrow: 1, gap: 1, display: { xs: "none", md: "flex" } }}
          >
            {routes.map(({ display, route }) => (
              <Button
                key={display}
                onClick={() => navigate(route)}
                variant={location.pathname === route ? "contained" : "outlined"}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  borderRadius: 3,
                  backgroundColor:
                    mode === "light" && location.pathname === route
                      ? theme.palette.secondary.dark
                      : "primary",
                }}
              >
                {display}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Toggle dark mode">
              <IconButton onClick={handleToggle}>
                <LightMode />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
});
