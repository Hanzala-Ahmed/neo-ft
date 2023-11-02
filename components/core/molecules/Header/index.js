import { changeThemeMode } from "@/redux/theme/themeSlice";
import { pages } from "@/utils/constants";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Switch, styled } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchWithSuggestions from "../../atoms/SearchWithSuggestions";
import { lightTheme } from "@/utils/theme";
import { LightMode } from "@mui/icons-material";

const label = { inputProps: { "aria-label": "Switch demo" } };

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [tokenVisibility, setTokenVisibility] = React.useState(false);

  const themeMode = useSelector((state) => state.theme.themeMode);
  const dispatch = useDispatch();
  const pathName = usePathname();

  const handleChangeThemeMode = () => {
    dispatch(changeThemeMode(themeMode === "light" ? "dark" : "light"));
    localStorage.setItem("theme", themeMode === "light" ? "dark" : "light");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <StyledToolbar disableGutters>
          <StyledIconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <Image
              src="/static/logo.svg"
              width={50}
              height={50}
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          </StyledIconButton>

          <SearchWithSuggestions />

          <StyledSwitchBox>
            <StyledIOSSwitch
              {...label}
              checked={themeMode === "light" ? false : true}
              onChange={() => {
                handleChangeThemeMode();
              }}
            />
          </StyledSwitchBox>

          <StyledIconBox>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <StyledMenu
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
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <StyledMenuItemTypography component="a">
                    {page.name}
                  </StyledMenuItemTypography>
                </MenuItem>
              ))}
            </StyledMenu>
          </StyledIconBox>

          <MobileIconsBox>
            <StyledMobileIconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <Image
                src="/static/logo.svg"
                width={50}
                height={50}
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
            </StyledMobileIconButton>
            <StyledIOSSwitch
              {...label}
              checked={themeMode === "light" ? false : true}
              onChange={() => {
                handleChangeThemeMode();
              }}
            />
          </MobileIconsBox>

          <StyledBox2>
            <LinksMainBox
              sx={{ display: { xs: "none", md: "flex", gap: "20px" } }}
            >
              {pages.map((page) => (
                <Link
                  href={page.path}
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  style={{
                    color:
                      pathName === page.path
                        ? themeMode === "light"
                          ? "#000"
                          : "#fff"
                        : "#5D5D5B",
                  }}
                  className="navLinks"
                >
                  {page.name}
                </Link>
              ))}
            </LinksMainBox>

            {tokenVisibility ? (
              <>
                <TokenMainBox theme={lightTheme}>
                  <TokenTypography>rPyPN...revTR</TokenTypography>
                </TokenMainBox>
                <AvatarIconButton>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </AvatarIconButton>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                style={buttonStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#7A52F4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#7A52F4";
                }}
                onClick={() => {
                  setTokenVisibility(!tokenVisibility);
                }}
              >
                Connect Wallet
              </Button>
            )}
          </StyledBox2>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
}
export default Header;

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#7A52F4" : "#7A52F4",
        opacity: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#7A52F4",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 20,
    height: 20,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "84px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: theme.palette.boxShadow.appBar,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  boxShadow: "none",
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  //   "&:hover": {
  //     backgroundColor: "transparent",
  //   },
  display: "none",
  [`@media screen and (min-width: ${theme.breakpoints.values.md}px)`]: {
    display: "flex",
  },
}));

const StyledMobileIconButton = styled(IconButton)(({ theme }) => ({
  display: "flex",
  [`@media screen and (min-width: ${theme.breakpoints.values.md}px)`]: {
    display: "none",
  },
}));

const StyledSwitchBox = styled(Box)(({ theme }) => ({
  display: "none",
  [`@media screen and (min-width: ${theme.breakpoints.values.md}px)`]: {
    display: "flex",
  },
  justifyContent: "flex-end",
  mx: 2,
}));

const StyledIOSSwitch = styled(IOSSwitch)(({ theme }) => ({
  color: "inherit",
  backgroundColor: "inherit",
  margin: "0px 5px",
}));

const StyledIconBox = styled(Box)(({ theme }) => ({
  flexGrow: 0,
  display: "flex",
  [`@media screen and (min-width: ${theme.breakpoints.values.md}px)`]: {
    display: "none",
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  display: { xs: "block", md: "none" },
}));

const StyledMenuItemTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: "#5D5D5B",
}));

const MobileIconsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  [`@media screen and (min-width: ${theme.breakpoints.values.md}px)`]: {
    display: "none",
  },
  alignItems: "center",
}));

const StyledBox2 = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "20px",
}));

const LinksMainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  [`@media screen and (min-width: ${theme.breakpoints.values.md}px)`]: {
    display: "none",
  },
  gap: "20px",
}));

const TokenMainBox = styled(Box)(({ theme }) => ({
  border: `1px solid #5D5D5B`,
  height: "40px",
  padding: "8px 16px",
  borderRadius: "30px",
  width: "160px",
  maxWidth: "160px",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "transparent",
  transition: "background-color 0.3s",

  "&:hover": {
    backgroundColor: lightTheme.palette.tokenHoverColor.color,
  },
}));

const TokenTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.primary.dark,
  fontSize: "14px",
}));

const AvatarIconButton = styled(IconButton)(({ theme }) => ({
  padding: "0px",
}));

const buttonStyles = {
  width: "160px",
  height: "40px",
  backgroundColor: lightTheme.palette.buttonColor.color,
  borderRadius: 20,
  color: "#fff",
  fontSize: 12,
  fontWeight: "bold",
  transition: "background-color 0.3s",
};
