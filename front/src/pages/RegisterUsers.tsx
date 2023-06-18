import React, { useState } from 'react';
import { Button, TextField, Box } from "@mui/material";

function RegisterUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const response = await fetch('https://keywisebackend.onrender.com/users', {
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
        label="Name" 
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
        label="Password" 
        type="password"
        value={password} 
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)} 
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Submit
      </Button>
    </Box>
  );
}

export default RegisterUsers;