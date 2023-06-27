import React, { useState } from 'react';
import { Button, TextField, Box } from "@mui/material";

function RegisterHouse() {
  const [name, setName] = useState("");
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
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('seller', seller);
    formData.append('email', email);
    if (file) {
      formData.append('image', file);
    }
  
    const response = await fetch('https://keywisebackend.onrender.com/products', {
      method: 'POST',
      body: formData,
    });
    
    console.log(response)
  
    const data = await response.json();
  
    // Handle the response from the server
    console.log(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" maxWidth="300px" margin="0 auto">
      <TextField 
  label="Descripción" 
  value={description} 
  onChange={e => setDescription(e.target.value)} 
  margin="normal"
/>
<TextField 
  label="Precio" 
  value={price} 
  onChange={e => setPrice(e.target.value)} 
  margin="normal"
/>
<TextField 
  label="Categoría" 
  value={category} 
  onChange={e => setCategory(e.target.value)} 
  margin="normal"
/>
<TextField 
  label="Propietario" 
  value={seller} 
  onChange={e => setSeller(e.target.value)} 
  margin="normal"
/>
<input 
  type="file" 
  onChange={handleFileChange}
/>
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Enviar
      </Button>
    </Box>
  );
}

export default RegisterHouse;