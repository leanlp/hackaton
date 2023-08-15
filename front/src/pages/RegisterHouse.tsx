import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

function RegisterHouse() {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", location);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("seller", seller);
    formData.append("email", email);
    if (file) {
      formData.append("image", file);
    }

    console.log(formData);
    // const response = await fetch(
    //   "https://keywisebackend.onrender.com/products",
    const response = await fetch("https://api.keywise.com.ar/products", {
      method: "POST",
      body: formData,
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
        Registro del Inmueble
      </Typography>
      <TextField
        label="Localidad"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
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
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
        label="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
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
        label="Categoría"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
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
        label="Propietario"
        value={seller}
        onChange={(e) => setSeller(e.target.value)}
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
        onChange={(e) => setEmail(e.target.value)}
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
      <input type="file" onChange={handleFileChange} />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        sx={{
          marginBottom: "4em",
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

export default RegisterHouse;
