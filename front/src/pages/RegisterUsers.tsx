import React, { useState } from 'react';
import { Button, TextField, Box } from "@mui/material";

function RegisterUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const response = await fetch('https://api.keywise.com.ar/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
     
    });
    console.log(response)

    const data = await response.json();

    // Handle the response from the server
    console.log(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" maxWidth="300px" margin="0 auto">
      <TextField 
        label="Nombre completo" 
        value={name} 
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)} 
        margin="normal"
      />
      <TextField 
        label="Email" 
        value={email} 
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)} 
        margin="normal"
      />
      <TextField 
        label="contraseña" 
        type="password"
        value={password} 
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)} 
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Enviar
      </Button>
    </Box>
  );
}

export default RegisterUsers;