import React from "react";
import { Stack, Avatar, Typography, Box } from "@mui/material";
import { CardComponent } from "../components/Card";
import wallet from "../assets/wallet.png";
import verified from "../assets/verified.png";

function UserProfile() {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="left"
        flexDirection="row"
        marginTop={8}
        alignItems="center"
        sx={{
          marginLeft: {
            lg: "20em",
            md: "1em",
            sm: "0em",
            xs: "0em",
          },
        }}>
        <Avatar
          alt="Remy Sharp"
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          sx={{ width: 140, height: 140 }}
        />
        <Stack display={"flex"} marginLeft={6}>
          <Typography fontFamily="Roboto" fontSize="16px" fontWeight="400">
            Inquilino
          </Typography>
          <Stack display="flex" alignItems="center" flexDirection="row">
            <Typography
              fontFamily="Roboto"
              fontSize="25px"
              fontWeight="600"
              marginRight={2}>
              Nombre de Usuario
            </Typography>
            <img src={verified} alt="verified" />
          </Stack>
          <Stack display="flex" flexDirection="row" alignItems="center">
            <img src={wallet} alt="wallet" />
            <Typography
              fontFamily="Roboto"
              marginLeft={2}
              fontSize="14px"
              fontWeight="400"
              color={"#808080"}>
              0x0B...31C4
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent={"space-around"}
        marginTop={6}>
        <CardComponent
          title="Ingresos promedio mensual"
          number="5.500 USD"
          subtitle="Tech Lead"
        />
        <CardComponent
          title="Dejó en Garantía"
          number="8.000 USDT"
          subtitle="Staking 5.000 USDT"
        />
        <CardComponent
          title="Precio del alquiler mensual"
          number="800 USDT"
          subtitle="1er año"
        />
        <CardComponent
          title="Contrato"
          number="3 años"
          subtitle="Finaliza en  2 años y 6 meses"
        />
      </Box>
    </Box>
  );
}

export default UserProfile;
