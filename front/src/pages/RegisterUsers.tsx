import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

function RegisterUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await fetch("https://api.keywise.com.ar/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    console.log(response);

    const data = await response.json();

    // Handle the response from the server
    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      maxWidth="300px"
      margin="0 auto">
      <Typography
        fontSize={20}
        fontFamily="Lato"
        marginTop="8em"
        marginBottom="2em">
        Registro del Usuario
      </Typography>

      <TextField
        label="Nombre completo"
        value={name}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setName(e.target.value)
        }
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "#F3F3F3",
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "#c2c6f3",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#a4abf3",
            },
          },
        }}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setEmail(e.target.value)
        }
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "#F3F3F3",
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "#c2c6f3",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#a4abf3",
            },
          },
        }}
      />
      <TextField
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setPassword(e.target.value)
        }
        margin="normal"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "#F3F3F3",
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "#c2c6f3",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#a4abf3",
            },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        sx={{
          backgroundColor: "#C2B7ED",
          color: "black",
          "&.MuiButton-root": {
            "&:hover": {
              background: "#BDADED",
            },
          },
        }}>
        Enviar
      </Button>
    </Box>
  );
}

export default RegisterUsers;
