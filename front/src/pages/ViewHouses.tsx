import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Button, { IconButton, ListSubheader } from "@mui/material";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { Link, Navigate } from "react-router-dom";

function ViewHouses() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("https://api.keywise.com.ar/products", {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    });

    const data = await response.json();

    setProducts(data);
    console.log(data);
  };

  return (
    <>
      <ImageList gap={20} sx={{ marginLeft: "2em", marginRight: "2em" }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader
            component="div"
            sx={{
              marginTop: "3em",
              marginBottom: "1em",
              fontFamily: "Reboto",
              fontSize: "30px",
              fontWeight: "600",
              color: "#000000",
            }}>
            Disponible
          </ListSubheader>
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
              subtitle={<span>${product.price}</span>}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${product.price}`}>
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    <HistoryEduIcon></HistoryEduIcon>
                  </Link>
                </IconButton>
              }
            />
            {/* <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              title="Localidad"
              position="top"
            /> */}
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

export default ViewHouses;
