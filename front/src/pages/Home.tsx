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

export default function Home() {
	// walletConnected keep track of whether the user's wallet is connected or not
	const [walletConnected, setWalletConnected] = useState(false);
	const [contractSent, setContractSent] = useState(false);
	const provider = useProvider();
	const { data: signer, isError, isLoading } = useSigner();
	// Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
	const { address, isConnecting, isDisconnected } = useAccount();
	console.log( "adress", address, provider, signer );
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



	const navigate = useNavigate();

	// redirect
	useEffect(() => {
		if (address) {
			navigate("/register");
		}
	}, [address]);

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
			<img src={city} style={{ position: "absolute", bottom: "0" }}></img>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<Box
					sx={{
						alignItems: "center",
						marginTop: 16,
						position: "fixed",
						display: "flex",
						justifyContent: "center",
						flexDirection: "column",
						bottom: 0,
					}}
				>
					<Box 
						sx={{
							alignItems: "left",
							position: "fixed",
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
							bottom: 850,
						}}
					>
						<Sidebar />
					</Box>
					<Typography
						variant="h1"
						sx={{
							fontSize: {
								lg: 140,
								md: 90,
								sm: 70,
								xs: 50,
							},
							fontWeight: 700,
							// marginBottom: 4,
							fontFamily: "'Spectral'",
							color: "#265700",
						}}
					>
						Keywise
					</Typography>
					<Typography
						sx={{
							fontSize: {
								lg: 30,
								md: 28,
								sm: 24,
								xs: 20,
							},
							maxWidth: {
								lg: 600,
								md: 500,
								sm: 400,
								xs: 300,
							},
							fontWeight: 400,
							textAlign: "center",
							marginBottom: 4,
							fontFamily: "'lato'",
						}}
					>
						Transformamos los contratos tradicionales de alquiler en contratos
						inteligentes.
					</Typography>
					<Card
						sx={{
							minWidth: {
								lg: 600,
								md: 400,
								sm: 350,
								xs: 300,
							},
							minHeight: {
								lg: 300,
								md: 300,
								sm: 250,
								xs: 200,
							},
							backgroundColor: "#9FE870",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							marginTop: 14,
						}}
					>
						<Web3Button />
					</Card>
				</Box>
			</div>
		</>
	);
}
