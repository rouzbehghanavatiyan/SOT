import Chat from "./Chat";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

interface PropsType {
  window?: () => Window;
  setOpenMessage: React.Dispatch<React.SetStateAction<boolean>>;
  openMessage: boolean;
}

const Messages: React.FC<PropsType> = ({ setOpenMessage, openMessage }) => {
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenMessage(newOpen);
  };

  const Root = styled("div")(({ theme }) => ({
    height: "100%",
    backgroundColor: grey[100],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.background.default,
    }),
  }));

  const Puller = styled("div")(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: grey[300],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 10px)",
    ...theme.applyStyles("dark", {
      backgroundColor: grey[900],
    }),
  }));

  const drawerHeight = window.innerHeight * 0.96;

  return (
      <SwipeableDrawer
        anchor="right"
        open={openMessage}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: "25%",
            height: drawerHeight,
            top: 0,
            transition: "transform 0.3s ease",
            borderBottomLeftRadius: 15,
          },
        }}
      >
        <Puller />
        <Chat />
      </SwipeableDrawer>
  );
};

export default Messages;
