import { Box, Typography, Card } from "@mui/material";
import { Web3Button } from "@web3modal/react";
import city from "./../assets/city.png";
import Web3Modal from "@web3modal/react";
// import { providers, Contract } from "ethers";
import { useEffect, useRef, useState } from "react";
import { useProvider, useAccount, useSigner, useContract } from "wagmi";
// import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import KHome from "../assets/KHome.svg";
export default function Home() {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  const [contractSent, setContractSent] = useState(false);
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const { address, isConnecting, isDisconnected } = useAccount();
  console.log("adress", address, provider, signer);
  const contract = useContract({
    address: "0xB1D11a2b59bB6B0c5D61A2eE765ceb8779941b57",
    signerOrProvider: signer,
  });

  const contractHackatonABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "StringDataAdded",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_string1",
          type: "string",
        },
        {
          internalType: "string",
          name: "_string2",
          type: "string",
        },
        {
          internalType: "string",
          name: "_string3",
          type: "string",
        },
        {
          internalType: "string",
          name: "_string4",
          type: "string",
        },
        {
          internalType: "string",
          name: "_string5",
          type: "string",
        },
      ],
      name: "addStringData",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "getStringData",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  //traigo el array ahora, para que inicie el servidor backend apenas se cargue la web, asi disminuimos el lag
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(
      "https://keywisebackend.onrender.com/products",
      {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
    );

    const data = await response.json();

    console.log(data);
  };
  // aca fijarme el redirect
  // const navigate = useNavigate();

  // redirect
  // useEffect(() => {
  // 	if (address) {
  // 		navigate("/register");
  // 	}
  // }, [address]);

  // async function contract2() {
  // 	const factory = new ethers.Contract(
  // 		"0xB1D11a2b59bB6B0c5D61A2eE765ceb8779941b57",
  // 		contractHackatonABI,
  // 		signer!
  // 	);

  // 	////Esta Funcion es la que se va a ejecutar cuando hacemos el submit con la data del form
  // 	const add = await factory.addStringData(
  // 		"gonzaa",
  // 		"agus",
  // 		"fecha3333",
  // 		"fecha2022",
  // 		"hash2022"
  // 	);
  // 	const tx = add.wait();
  // 	console.log(tx);
  // 	//   console.log(provider)
  // 	//   console.log(signer)
  // 	//   console.log(useSigner)
  // 	console.log(factory);
  // }
  // contract2(); //llama a la funcion async, esto debemos de conectarlo con el submit del formulario

  return (
    <>
      <Box
        sx={{
          background:
            "linear-gradient(90deg, rgba(26,30,52,1) 100%, rgba(27,70,80,1) 100%, rgba(194,183,237,1) 100%);",
          height: "100vh",
        }}>
        <img src={KHome}></img>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}>
          <Typography
            color="#C2B7ED"
            fontFamily="Sora"
            fontWeight="bold"
            fontSize="200px"
            marginBottom={10}>
            Keywise
          </Typography>
          <Typography
            color="#60D086"
            fontSize="30px"
            fontFamily="Roboto"
            marginBottom={8}>
            Tu garantía de alquiler, en crypto.
          </Typography>
          <Web3Button />
        </Box>
      </Box>
    </>
  );
}
