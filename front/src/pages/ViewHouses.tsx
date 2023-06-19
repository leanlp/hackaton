import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";

function ViewHouses() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  

  const fetchProducts = async () => {
    const response = await fetch('https://keywisebackend.onrender.com/products', {
      method: 'GET',
      headers: {
        'Accept': '*/*'
      },
    });
    
    const data = await response.json();
    
   
    setProducts(data);
  };

  return (
    <Box component="div" display="flex" flexDirection="column" maxWidth="300px" margin="0 auto">
      {products.map((product, index) => (
        <Box key={index}>
          <p>Name: {product.name}</p>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
          <img src={product.imageUrl} alt={product.name} />
          {/* display other product properties as needed */}
        </Box>
      ))}
    </Box>
  );
}

export default ViewHouses;