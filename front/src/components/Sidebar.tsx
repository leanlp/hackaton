import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Drawer } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import home from "../assets/home.png";
import contract from "../assets/contract.png";
import account_circle from "../assets/account_circle.png";
import realState from "../assets/real_estate_agent.png";
import person from "../assets/person_add.png";
import homeHealth from "../assets/home_health.png";
import iconMenu from "../assets/iconMenu.png";

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const toggleDrawer =
    (newOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        setOpen(newOpen);
      }
      setOpen(newOpen);
    };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          background:
            "linear-gradient(to bottom right, #34344f, #3a3c57, #2c344c, #2c2c44, #1c2436, #2c2c4c, #24243c, #1c1c34)",
        }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          onKeyDown={toggleDrawer(false)}
          // edge="start"
          // sx={{ mr: -50, mb:-60, ...(open && { display: 'none' }) }}
        >
          <img src={iconMenu} alt="iconMenu"></img>
        </IconButton>
        <Drawer
          variant="temporary"
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          sx={{
            "&  .MuiPaper-root": { backgroundColor: "#1A1A31" },
          }}>
          <IconButton onClick={toggleDrawer(false)}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: "#CFF153" }} />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <List
            sx={{
              "& .MuiButtonBase-root": {
                color: "white",
                fontFamily: "Roboto",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },

              "& .MuiListItemButton-root:hover": {
                minWidth: "250px",
              },
            }}>
            <ListItem
              key={"Home"}
              disablePadding
              color="white"
              sx={{
                "& .Mui-selected": {
                  color: "#CFF153",
                  minWidth: "250px",
                },
              }}
              onClick={toggleDrawer(false)}>
              <Link to="/">
                <ListItemButton
                  selected={selected === "home"}
                  onClick={() => setSelected("home")}>
                  <ListItemIcon>
                    <img src={home} alt="home"></img>
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem
              sx={{
                "& .Mui-selected": {
                  color: "#CFF153",
                  minWidth: "250px",
                },
              }}
              onClick={toggleDrawer(false)}
              key={"Mis Contratos"}
              disablePadding>
              <Link to="/register">
                <ListItemButton
                  selected={selected === "contract"}
                  onClick={() => setSelected("contract")}>
                  <ListItemIcon>
                    <img src={contract} alt="contract"></img>
                  </ListItemIcon>
                  <ListItemText primary={"Mis Contratos"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem
              key={"Perfil"}
              disablePadding
              sx={{
                "& .Mui-selected": {
                  color: "#CFF153",
                  minWidth: "250px",
                },
              }}
              onClick={toggleDrawer(false)}>
              <Link to="/profile">
                <ListItemButton
                  selected={selected === "profile"}
                  onClick={() => setSelected("profile")}>
                  <ListItemIcon>
                    <img src={account_circle} alt="profile"></img>
                  </ListItemIcon>
                  <ListItemText primary={"Perfil"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem
              onClick={toggleDrawer(false)}
              key={"RegisterUsers"}
              disablePadding
              sx={{
                "& .Mui-selected": {
                  color: "#CFF153",
                  minWidth: "250px",
                },
              }}>
              <Link to="/RegisterUsers">
                <ListItemButton
                  selected={selected === "user"}
                  onClick={() => setSelected("user")}>
                  <ListItemIcon>
                    <img src={person} alt="user"></img>
                  </ListItemIcon>
                  <ListItemText primary={"Registra tu usuario"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem
              onClick={toggleDrawer(false)}
              key={"RegisterHouse"}
              disablePadding
              sx={{
                "& .Mui-selected": {
                  color: "#CFF153",
                  minWidth: "250px",
                },
              }}>
              <Link to="/RegisterHouse">
                <ListItemButton
                  selected={selected === "register"}
                  onClick={() => setSelected("register")}>
                  <ListItemIcon>
                    <img src={homeHealth} alt="register"></img>
                  </ListItemIcon>
                  <ListItemText primary={"Registra tu inmueble"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem
              onClick={toggleDrawer(false)}
              key={"viewHouses"}
              disablePadding
              sx={{
                "& .Mui-selected": {
                  color: "#CFF153",
                  minWidth: "250px",
                },
              }}>
              <Link to="/viewHouses">
                <ListItemButton
                  selected={selected === "viewHouses"}
                  onClick={() => setSelected("viewHouses")}>
                  <ListItemIcon>
                    <img src={realState} alt="ViewHouses"></img>
                  </ListItemIcon>
                  <ListItemText primary={"Inmuebles disponibles"} />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </>
  );
}
