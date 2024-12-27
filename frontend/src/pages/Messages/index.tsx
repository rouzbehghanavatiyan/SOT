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

  // تابع برای محاسبه ارتفاع کشویی
  const drawerHeight = window.innerHeight * 0.96; // 50% از ارتفاع ویندوز

  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <Root>
        <SwipeableDrawer
          anchor="right" // کشو از سمت راست باز می‌شود
          open={openMessage}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: "25%", // تنظیم عرض کشویی به 25% از عرض ویندوز
              height: drawerHeight, // تنظیم ارتفاع کشویی به 50% از ارتفاع ویندوز
              top: 0, // کشو پایین‌تر از هدر قرار می‌گیرد
              transition: "transform 0.3s ease", // انیمیشن باز شدن کشو
              borderBottomLeftRadius: 15,
              //   borderBottomRightRadius: 10,
            },
          }}
        >
          <Puller />
          <Chat />
        </SwipeableDrawer>
      </Root>
    </Box>
  );
};

export default Messages;
