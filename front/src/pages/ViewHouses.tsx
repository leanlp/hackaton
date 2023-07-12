import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Button, { IconButton, ListSubheader } from '@mui/material'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { Link, Navigate } from "react-router-dom";


function ViewHouses() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  

  const fetchProducts = async () => {
    const response = await fetch('https://api.keywise.com.ar/products', {
      method: 'GET',
      headers: {
        'Accept': '*/*'
      },
    });
    
    const data = await response.json();
    
   
    setProducts(data);
    console.log(data)
  };

  return (
    <>
      <ImageList>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Rent House (buscar titulo )</ListSubheader>
      </ImageListItem>
      {products.map((product, index) => (
        <ImageListItem key={product.imageUrl}>
          <img
            src={`${product.imageUrl}?w=248&fit=crop&auto=format`}
            srcSet={`${product.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={product.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={product.description}
            subtitle={product.price}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${product.price}`}
              >
                   <Link to="/register" style={{textDecoration:'none'}}>
                <HistoryEduIcon ></HistoryEduIcon>
                </Link>
              </IconButton>
            }
          />
        </ImageListItem>
   ))}
    </ImageList>
 
    </>
  );
}

export default ViewHouses;