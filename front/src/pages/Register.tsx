import {
  Box,
  Typography,
  Card,
  TextField,
  Button,
  Grid,
  FormControl,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";
import { object, number, string, ObjectSchema } from "yup";
import { User } from "../typings/index";
import abiContract from "../abiContractV1NFT.json";
import { useProvider, useAccount, useSigner, useContract } from "wagmi";
import { ethers } from "ethers";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import abiERC20 from "../abiERC20.json";
import abiStaking from "../abiStaking.json";

import { Link } from "react-router-dom";
import { Margin } from "@mui/icons-material";
// import { Sidebar } from "../components/Sidebar";

// import { gql, useMutation } from '@apollo/client';

interface AddUserData {
  addUser: User;
}

// const ADD_USER = gql`
//   mutation CreateUser($fullName:String!, $email: String!,$phone: String!,$dni: Int!,$status: String!,$account: EVMAccountAddress!,$contractName: String!,$deposit: Int!,$rent:Int!,$transactionHash:String!,$file: String!,$streetName: String!,$streetNumber: Int!,$city:String!,$state: String!,$zipCode: Int!) {
//     createUser(
// 		user:{ fullName: $fullName, email: $email,phone:$phone,dni: $dni, status: $status,account: $account,contractName: $contractName, deposit: $deposit,rent: $rent,transactionHash: $transactionHash, file: $file,streetName: $streetName,streetNumber: $streetNumber,city: $city,state:$state,zipCode:$zipCode}
// 		){
//     txHash
//     user {
//       id
// 	fullName
//       email
// 	  phone
// 	  dni
// 	  status
// 	  account
// 	  contractName
// 	  deposit
// 	  rent
// 	  transactionHash
// 	  file
// 	  streetName
// 	  streetNumber
// 	  city
// 	  state
// 	  zipCode
//     }
//   }

//   }
// `;

// const validationSchema: ObjectSchema<User> = object( {
// 	fullName: string(),
// 	email: string(),
// 	phone: string(),
// 	dni: number(),
// 	status: string(),
// 	account: string(),
// 	contractName: string(),
// 	deposit: number(),
// 	rent: number(),
// 	transactionHash: string(),
// 	file: string(),
// 	streetName: string(),
// 	streetNumber: number(),
// 	city: string(),
// 	state: string(),
// 	zipCode: number(),
// } );

//REEMPLAZAR TODA LA INFO QUE VIENE DE WALLET DE HASH Y DE CONTRATO POR LOS DATOS DE ESTADO PARA MANDAR EL FORM
export default function Register() {
  const [form, setForm] = useState<User>({
    fullName: "",
    email: "",
    phone: "",
    dni: 0,
    status: "",
    account: "",
    contractName: "",
    deposit: 0,
    rent: 0,
    transactionHash: "",
    file: "",
    streetName: "",
    streetNumber: 0,
    city: "",
    state: "",
    zipCode: 0,
  });
  const [smartWallet, setSmartWallet] = useState<string | null>("0xcd67a4b699138Ec8A0990309970e098871f46c89");
  useEffect(() => {
    if (smartWallet) {
        console.log("Received Wallet Address:", smartWallet);
    }
}, [smartWallet]);
  const [hashPDF, setHash] = useState("");
  // const [addUser] = useMutation<AddUserData>( ADD_USER );
  const { address } = useAccount();
  let wallet = address;
  const navigate = useNavigate();

  // 	validationSchema: validationSchema,
  // 	onSubmit: ( values ) => {
  // 		const { fullName, email, phone, dni, status, account, contractName, deposit, rent, transactionHash, file, streetName, streetNumber, city, state, zipCode }= values

  // 		// addUser( { variables: { fullName, email, phone, dni, status, account, contractName, deposit, rent, transactionHash, file, streetName, streetNumber, city, state, zipCode } } )

  // 		alert( JSON.stringify( values, null, 2 ) );
  // 		// console.log(values.fullName, values.dni)

  // 		contract2(values, hashPDF); //instancia la async function contract
  // 		navigate('/save');
  // 	},
  // } );

  // const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
  // 	e.preventDefault();
  // 	addUser( { variables: { title, author } } );
  // 	setTitle( '' );
  // 	setAuthor( '' );
  // };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(JSON.stringify(form, null, 2));
    contract2({ ...form }, hashPDF);
  };

  const handleapprove = (smartWallet: any) => {
    async function approve(deposit: number) {
      const factory = new ethers.Contract(
        "0xef9ccA0D749A362AAaEbaaC1e7434D861153F51d",  //usdtMumbai
        abiERC20,
        signer!
      );

      const erc20 = factory.connect(signer!);
      const approve = await erc20.approve(
        "0xef9ccA0D749A362AAaEbaaC1e7434D861153F51d",
		// smartWallet,
        100000
      );
      const tx = approve.wait;

      const transfer = await erc20.transfer(
        smartWallet,
        100000
      );
      const tx2 = transfer.wait;
      console.log(tx, tx2);
    }

    approve(5000);
  };

  const handleapprove2 = () => {
    async function staking(deposit: number) {
      const factory = new ethers.Contract(
        "0x8536Ccde8249e971021515097Ec2Cb44535E3fD8", //token
        abiERC20,
        signer!
      );
      const stakingFactory = new ethers.Contract(
        "0x317Bf90C250b96281c7E88e3e1F5249FA8BcD502", //staking contract
        abiStaking,
        signer!
      );

      const erc20 = factory.connect(signer!);
      const approve = await erc20.approve(
        "0x317Bf90C250b96281c7E88e3e1F5249FA8BcD502",
        1000000000
      );
      const tx = approve.wait;

      const transfer = await stakingFactory.stake(1000000000); //10.000 usdt
      const tx2 = transfer.wait;
      console.log(tx, tx2);
    }

    staking(2222);
  };

  const handleapprove3 = () => {
	async function newSmartWallet(wallet: string){
	  try {
		const response = await fetch("http://localhost:3005/smartwallet/run", {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({ param1: wallet }), 
		});
		
		if (!response.ok) {
		  throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
		}
  
		const data = await response.json();
		setSmartWallet(data.walletAddress.toString()); 
        console.log(data.walletAddress.toString()); // log the returned wallet address
} catch (error) {
console.error("Error fetching data:", error);
}
	}
  
	newSmartWallet(wallet!);
  }

  // sha256
  async function encodeFile(files: any) {
    const fileData = new Uint8Array(await files.arrayBuffer());
    const hashBuffer = await crypto.subtle.digest("SHA-256", fileData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }
  async function generateEncode(files: any) {
    const file = files[0];
    const hashValue = await encodeFile(file);
    console.log(hashValue);
    setHash(hashValue);
  }

  const { data: signer, isError, isLoading } = useSigner();

  async function contract2(
    values: {
      fullName: any;
      email: any;
      phone?: string;
      dni: any;
      status?: string;
      account?: string;
      contractName?: string;
      deposit?: number;
      rent?: number;
      transactionHash?: string;
      file?: string;
      streetName?: string;
      streetNumber?: number;
      city?: string;
      state?: string;
      zipCode?: number;
      address?: any;
    },
    hashPDF: string
  ) {
    const factory = new ethers.Contract(
      "0xd9369d77c799Bda1fc320764Ce228e9824181400",
      abiContract,
      signer!
    );

    ////Esta Funcion es la que se va a ejecutar cuando hacemos el submit con la data del form
    const add = await factory.addData(
      values.fullName,
      values.email,
      values.dni,
      values.city,
      values.deposit,
      hashPDF

      // values.fullName,
      // values.email,
      // values.fullName,
      // values.address,
      // values.fullName,
    );
    const tx = add.wait();
    const hash = add.hash;
    console.log(hash);

    //   console.log(provider)
    //   console.log(signer)
    //   console.log(useSigner)
    console.log(factory);
  }

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: {
              lg: "8em",
              md: "6em",
              sm: "4em",
              xs: "2em",
            },
          }}>
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
              fontWeight: 500,
              textAlign: "left",
              marginBottom: 4,
              marginTop: 4,
              fontFamily: "Roboto",
            }}>
            Redactar contrato
          </Typography>
          <Typography
            sx={{
              fontSize: {
                lg: 24,
                md: 22,
                sm: 18,
                xs: 16,
              },
              fontWeight: 400,
              textAlign: "left",
              marginBottom: 4,
              fontFamily: "'lato'",
            }}>
            Al cargar su contrato, podremos analizarlo y brindarle una
            evaluación de sus términos y condiciones. Por favor, asegúrese de
            que esté en formato PDF.
          </Typography>
          <Typography marginBottom="2em">Datos del Usuario</Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}>
          <Grid
            container
            spacing={2}
            display="flex"
            justifyContent="center"
            alignItems="center">
            <Grid item xs={5}>
              <TextField
                id="fullName"
                name="fullName"
                label="Nombre Completo"
                type="text"
                required
                placeholder="Nombre completo"
                onChange={handleFormChange}
                // value={formik.values.fullName}
                // onChange={formik.handleChange}
                // error={
                // 	formik.touched.fullName && Boolean( formik.errors.fullName )
                // }
                // helperText={formik.touched.fullName && formik.errors.fullName}
                fullWidth
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
            </Grid>
            <Grid item xs={5}>
              <TextField
                placeholder="DNI"
                id="dni"
                name="dni"
                type="number"
                label="DNI"
                required
                onChange={handleFormChange}
                inputProps={{
                  inputProps: { min: 0 },
                }}
                onKeyDown={(event) => {
                  if (event?.key === "-" || event?.key === "+") {
                    event.preventDefault();
                  }
                }}
                // value={formik.values.dni}
                // onChange={formik.handleChange}
                // error={formik.touched.dni && Boolean( formik.errors.dni )}
                // helperText={formik.touched.dni && formik.errors.dni}
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
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    '& input[type="number"]': {
                      "-moz-appearance": "textfield",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                placeholder="Phone"
                id="phone"
                name="phone"
                type="text"
                label="Telefono"
                onChange={handleFormChange}
                required
                // value={formik.values.phone.toString()}
                // onChange={formik.handleChange}
                // error={formik.touched.phone && Boolean( formik.errors.phone )}
                // helperText={formik.touched.phone && formik.errors.phone}
                fullWidth
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
            </Grid>
            <Grid item xs={5}>
              <TextField
                placeholder="Email"
                id="email"
                name="email"
                type="email"
                label="Email"
                onChange={handleFormChange}
                required
                // value={formik.values.email}
                // onChange={formik.handleChange}
                // error={formik.touched.email && Boolean( formik.errors.email )}
                // helperText={formik.touched.email && formik.errors.email}
                fullWidth
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
            </Grid>
            <Grid item xs={5}>
              <TextField
                placeholder="Propietario o Inquilino"
                id="status"
                name="status"
                label="Propietario o Inquilino"
                onChange={handleFormChange}
                required
                // value={formik.values.status}
                // onChange={formik.handleChange}
                // error={formik.touched.status && Boolean( formik.errors.status )}
                // helperText={formik.touched.status && formik.errors.status}
                fullWidth
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
            </Grid>
            <Grid item xs={5}>
              <TextField
                placeholder="Addres wallet"
                id="account"
                name="account"
                label="Addres Wallet"
                onChange={handleFormChange}
                required
                // value={formik.values.account}
                // onChange={formik.handleChange}
                // error={formik.touched.account && Boolean( formik.errors.account )}
                // helperText={formik.touched.account && formik.errors.account}
                fullWidth
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
            </Grid>
            <Grid item xs={10} marginBottom="1em" marginTop="2em">
              <Typography>Dirección</Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField
                placeholder="Calle"
                id="streetName"
                name="streetName"
                label="Calle"
                onChange={handleFormChange}
                required
                // value={formik.values.streetName}
                // onChange={formik.handleChange}
                // error={
                // 	formik.touched.streetName && Boolean( formik.errors.streetName )
                // }
                // helperText={
                // 	formik.touched.streetName && formik.errors.streetName
                // }
                fullWidth
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
            </Grid>
            <Grid item xs={5}>
              <TextField
                placeholder="Número de casa"
                id="streetNumber"
                name="streetNumber"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">#</InputAdornment>
                  ),
                  inputProps: { min: 0 },
                }}
                onKeyDown={(event) => {
                  if (event?.key === "-" || event?.key === "+") {
                    event.preventDefault();
                  }
                }}
                label="Número"
                onChange={handleFormChange}
                required
                // value={formik.values.streetNumber}
                // onChange={formik.handleChange}
                // error={
                // 	formik.touched.streetNumber &&
                // 	Boolean( formik.errors.streetNumber )
                // }
                // helperText={
                // 	formik.touched.streetNumber && formik.errors.streetNumber
                // }
                fullWidth
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
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    '& input[type="number"]': {
                      "-moz-appearance": "textfield",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                placeholder="Localidad"
                id="city"
                name="city"
                label="Localidad"
                onChange={handleFormChange}
                fullWidth
                required
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
            </Grid>
            <Grid item xs={5}>
              <TextField
                placeholder="Provincia"
                id="state"
                name="state"
                label="Provincia"
                onChange={handleFormChange}
                required
                // value={formik.values.state}
                // onChange={formik.handleChange}
                // error={formik.touched.state && Boolean( formik.errors.state )}
                // helperText={formik.touched.state && formik.errors.state}
                fullWidth
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
            </Grid>
            <Grid item xs={5} marginBottom="2em">
              <TextField
                placeholder="Código Postal"
                id="zipCode"
                name="zipCode"
                type="number"
                label="Codigo postal"
                onChange={handleFormChange}
                required
                inputProps={{
                  inputProps: { min: 0 },
                }}
                onKeyDown={(event) => {
                  if (event?.key === "-" || event?.key === "+") {
                    event.preventDefault();
                  }
                }}
                // value={formik.values.zipCode}
                // onChange={formik.handleChange}
                // error={formik.touched.zipCode && Boolean( formik.errors.zipCode )}
                // helperText={formik.touched.zipCode && formik.errors.zipCode}
                fullWidth
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
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    '& input[type="number"]': {
                      "-moz-appearance": "textfield",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={5}></Grid>

            <Grid item xs={10}>
              <Typography>Contrato</Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField
                placeholder="Tipo de contrato"
                id="contractName"
                name="contractName"
                onChange={handleFormChange}
                label="Tipo de contrato"
                required
                // value={formik.values.contractName}
                // onChange={formik.handleChange}
                // error={
                // 	formik.touched.contractName &&
                // 	Boolean( formik.errors.contractName )
                // }
                // helperText={
                // 	formik.touched.contractName && formik.errors.contractName
                // }
                fullWidth
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
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid
              item
              xs={5}
              display={"flex"}
              flexDirection="row"
              alignItems="center">
              <TextField
                placeholder="Garantía"
                id="deposit"
                name="deposit"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  inputProps: { min: 0 },
                }}
                onKeyDown={(event) => {
                  if (event?.key === "-" || event?.key === "+") {
                    event.preventDefault();
                  }
                }}
                label="Garantia"
                onChange={handleFormChange}
                required
                // value={formik.values.deposit}
                // onChange={formik.handleChange}
                // error={formik.touched.deposit && Boolean( formik.errors.deposit )}
                // helperText={formik.touched.deposit && formik.errors.deposit}
                fullWidth
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
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    '& input[type="number"]': {
                      "-moz-appearance": "textfield",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={5}>
			<Button
                variant="contained"
                sx={{
                  backgroundColor: "#C2B7ED",
                  color: "black",
                  "&.MuiButton-root": {
                    "&:hover": {
                      background: "#BDADED",
                    },
                  },
                  height: "40px",
                  marginLeft: "2em",
                  fontSize: {
                    lg: 12,
                    md: 10,
                    sm: 8,
                    xs: 6,
                  },
                }}
                onClick={handleapprove3}>
                Quiero una nueva Smart Wallet con Selft-recovery
              </Button>
			  <Button
                variant="contained"
                sx={{
                  backgroundColor: "#C2B7ED",
                  color: "black",
                  "&.MuiButton-root": {
                    "&:hover": {
                      background: "#BDADED",
                    },
                  },
                  height: "50px",

                  fontSize: {
                    lg: 12,
                    md: 10,
                    sm: 8,
                    xs: 6,
                  },
                  marginLeft: "2em",
                }}
                onClick={handleapprove}>
                Enviar USDT a la nueva Smart Wallet
              </Button>
			  <Button
                variant="contained"
                sx={{
                  backgroundColor: "#C2B7ED",
                  color: "black",
                  "&.MuiButton-root": {
                    "&:hover": {
                      background: "#BDADED",
                    },
                  },
                  height: "40px",
                  marginLeft: "2em",
                  fontSize: {
                    lg: 12,
                    md: 10,
                    sm: 8,
                    xs: 6,
                  },
                }}
                onClick={handleapprove2}>
                Aceptar Staking
              </Button>
            </Grid>
            <Grid
              item
              xs={5}
              display="flex"
              flexDirection="row"
              alignItems="center">
              <TextField
                placeholder="Monto de alquiler"
                id="rent"
                name="rent"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  inputProps: { min: 0 },
                }}
                onKeyDown={(event) => {
                  if (event?.key === "-" || event?.key === "+") {
                    event.preventDefault();
                  }
                }}
                label="Monto alquiler"
                onChange={handleFormChange}
                required
                // value={formik.values.rent}
                // onChange={formik.handleChange}
                // error={formik.touched.rent && Boolean( formik.errors.rent )}
                // helperText={formik.touched.rent && formik.errors.rent}
                fullWidth
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
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                      {
                        "-webkit-appearance": "none",
                        margin: 0,
                      },
                    '& input[type="number"]': {
                      "-moz-appearance": "textfield",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#C2B7ED",
                  color: "black",
                  "&.MuiButton-root": {
                    "&:hover": {
                      background: "#BDADED",
                    },
                  },
                  height: "50px",

                  fontSize: {
                    lg: 12,
                    md: 10,
                    sm: 8,
                    xs: 6,
                  },
                  marginLeft: "2em",
                }}
                onClick={handleapprove}>
                Aceptar el envio de Tokens
              </Button>
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={10}>
              <Button
                sx={{
                  marginTop: "16px",
                }}>
                <label htmlFor="files">Subi tu contrato de alquiler</label>
                <input
                  placeholder="Contrato.pdf"
                  type="file"
                  id="files"
                  style={{ visibility: "hidden" }}
                  onChange={(e) => generateEncode(e.target.files)}
                />
              </Button>
            </Grid>
            <Grid item xs={10} marginBottom="2em">
              {/* <Link to={"/save"}> */}
              <Button
                variant="contained"
                type="submit"
                sx={{
                  height: "50px",
                  backgroundColor: "#C2B7ED",
                  color: "black",
                  "&.MuiButton-root": {
                    "&:hover": {
                      background: "#BDADED",
                    },
                  },
                  fontSize: {
                    lg: 12,
                    md: 10,
                    sm: 8,
                    xs: 6,
                  },
                }}>
                Siguiente
              </Button>
              {/* </Link> */}
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
}

function dispatch(arg0: Promise<void>) {
  throw new Error("Function not implemented.");
}

function showResetPasswordConfirmation(): any {
  throw new Error("Function not implemented.");
}

function showGenericErrorSnackbar(message: any): any {
  throw new Error("Function not implemented.");
}
