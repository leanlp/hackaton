import { Box, Typography, Card, TextField, Button, Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";
import { object, number, string, ObjectSchema } from "yup";
import { User } from "../typings/index";
import abiContract from "../abiContractV1NFT.json";
import { useProvider, useAccount, useSigner, useContract } from "wagmi";
import { ethers } from "ethers";
import {useState} from "react"
import { useNavigate } from 'react-router-dom';



import { Link } from "react-router-dom";
// import { Sidebar } from "../components/Sidebar";

import { gql, useMutation } from '@apollo/client';




interface AddUserData {
	addUser: User;
}

const ADD_USER = gql`
  mutation CreateUser($fullName:String!, $email: String!,$phone: String!,$dni: Int!,$status: String!,$account: EVMAccountAddress!,$contractName: String!,$deposit: Int!,$rent:Int!,$transactionHash:String!,$file: String!,$streetName: String!,$streetNumber: Int!,$city:String!,$state: String!,$zipCode: Int!) {
    createUser(  
		user:{ fullName: $fullName, email: $email,phone:$phone,dni: $dni, status: $status,account: $account,contractName: $contractName, deposit: $deposit,rent: $rent,transactionHash: $transactionHash, file: $file,streetName: $streetName,streetNumber: $streetNumber,city: $city,state:$state,zipCode:$zipCode}
		){
    txHash
    user {
      id
	fullName
      email
	  phone
	  dni
	  status
	  account
	  contractName
	  deposit
	  rent
	  transactionHash
	  file
	  streetName
	  streetNumber
	  city
	  state
	  zipCode
    }
  }
	
  }
`;



const validationSchema: ObjectSchema<User> = object( {
	fullName: string(),
	email: string(),
	phone: string(),
	dni: number(),
	status: string(),
	account: string(),
	contractName: string(),
	deposit: number(),
	rent: number(),
	transactionHash: string(),
	file: string(),
	streetName: string(),
	streetNumber: number(),
	city: string(),
	state: string(),
	zipCode: number(),
} );

//REEMPLAZAR TODA LA INFO QUE VIENE DE WALLET DE HASH Y DE CONTRATO POR LOS DATOS DE ESTADO PARA MANDAR EL FORM
export default function Register() {
	const [hashPDF, setHash] = useState("");
	const [addUser] = useMutation<AddUserData>( ADD_USER );
	const { address } = useAccount();
	let wallet = address;
	const navigate = useNavigate();

	const formik = useFormik( {
		initialValues: {
			fullName: "fullName",
			email: "email@example.com",
			phone: "2215778293",
			dni: 3902344,
			status: "Propietario",
			account: wallet?.toString(),
			contractName: "Alquiler comercial",
			deposit: 9872198,
			rent: 92012,
			transactionHash: "jgsaueier",
			file: "https://www.metamask.io",
			streetName: "Av Siempre Viva",
			streetNumber: 121312,
			city: "CABA",
			state: "Buenos Aires",
			zipCode: 1022,
		},
		validationSchema: validationSchema,
		onSubmit: ( values ) => {
			const { fullName, email, phone, dni, status, account, contractName, deposit, rent, transactionHash, file, streetName, streetNumber, city, state, zipCode }= values 

			addUser( { variables: { fullName, email, phone, dni, status, account, contractName, deposit, rent, transactionHash, file, streetName, streetNumber, city, state, zipCode } } )


			alert( JSON.stringify( values, null, 2 ) );
			// console.log(values.fullName, values.dni)

			contract2(values, hashPDF); //instancia la async function contract
			navigate('/save');
		},
	} );


	// const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
	// 	e.preventDefault();
	// 	addUser( { variables: { title, author } } );
	// 	setTitle( '' );
	// 	setAuthor( '' );
	// };



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

	async function contract2(values: {
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
    hashPDF: string) {

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
		console.log( hash );

		//   console.log(provider)
		//   console.log(signer)
		//   console.log(useSigner)
		console.log( factory );
	}

	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<Box
					sx={{
						width: "80%",
						display: "flex",
						justifyContent: "center",
						flexDirection: "column",
						marginLeft: "8em",
					}}
				>
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
							fontFamily: "'lato'",
						}}
					>
						Subir contrato
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
						}}
					>
						Al cargar su contrato, podremos analizarlo y brindarle una
						evaluación de sus términos y condiciones. Por favor, asegúrese de
						que esté en formato PDF.
					</Typography>
					<Typography>Datos del Usuario</Typography>
				</Box>
				<Box
					sx={{
						flexGrow: 1,
						display: "flex",
						justifyContent: "center",
						width: "100%",
					}}
				>
					<Grid
						container
						spacing={2}
						display="flex"
						justifyContent="center"
						alignItems="center"
					>
						{/* <Sidebar /> */}
						<Grid item xs={5}>
							<TextField
								id="fullName"
								name="fullName"
								placeholder="fullName"
								type="text"
								value={formik.values.fullName}
								onChange={formik.handleChange}
								error={
									formik.touched.fullName && Boolean( formik.errors.fullName )
								}
								helperText={formik.touched.fullName && formik.errors.fullName}
								fullWidth
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "40px",
										backgroundColor: "#ECFAE2",
										"& fieldset": {
											borderColor: "transparent",
										},
										"&:hover fieldset": {
											borderColor: "#265700",
										},
										"&.Mui-focused fieldset": {
											borderColor: "#265700",
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
								value={formik.values.dni}
								onChange={formik.handleChange}
								error={formik.touched.dni && Boolean( formik.errors.dni )}
								helperText={formik.touched.dni && formik.errors.dni}
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "40px",
										backgroundColor: "#ECFAE2",
										"& fieldset": {
											borderColor: "transparent",
										},
										"&:hover fieldset": {
											borderColor: "#265700",
										},
										"&.Mui-focused fieldset": {
											borderColor: "#265700",
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
								value={formik.values.phone.toString()}
								onChange={formik.handleChange}
								error={formik.touched.phone && Boolean( formik.errors.phone )}
								helperText={formik.touched.phone && formik.errors.phone}
								fullWidth
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "40px",
										backgroundColor: "#ECFAE2",
										"& fieldset": {
											borderColor: "transparent",
										},
										"&:hover fieldset": {
											borderColor: "#265700",
										},
										"&.Mui-focused fieldset": {
											borderColor: "#265700",
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
								value={formik.values.email}
								onChange={formik.handleChange}
								error={formik.touched.email && Boolean( formik.errors.email )}
								helperText={formik.touched.email && formik.errors.email}
								fullWidth
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "40px",
										backgroundColor: "#ECFAE2",
										"& fieldset": {
											borderColor: "transparent",
										},
										"&:hover fieldset": {
											borderColor: "#265700",
										},
										"&.Mui-focused fieldset": {
											borderColor: "#265700",
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
								value={formik.values.status}
								onChange={formik.handleChange}
								error={formik.touched.status && Boolean( formik.errors.status )}
								helperText={formik.touched.status && formik.errors.status}
								fullWidth
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "40px",
										backgroundColor: "#ECFAE2",
										"& fieldset": {
											borderColor: "transparent",
										},
										"&:hover fieldset": {
											borderColor: "#265700",
										},
										"&.Mui-focused fieldset": {
											borderColor: "#265700",
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={5}>
							<TextField
								placeholder="wallet"
								id="account"
								name="account"
								value={formik.values.account}
								onChange={formik.handleChange}
								error={formik.touched.account && Boolean( formik.errors.account )}
								helperText={formik.touched.account && formik.errors.account}
								fullWidth
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "40px",
										backgroundColor: "#ECFAE2",
										"& fieldset": {
											borderColor: "transparent",
										},
										"&:hover fieldset": {
											borderColor: "#265700",
										},
										"&.Mui-focused fieldset": {
											borderColor: "#265700",
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={10}>
							<Typography>Dirección</Typography>
						</Grid>
						<Grid item xs={5}>
							<TextField
								placeholder="Street Name"
								id="streetName"
								name="streetName"
								value={formik.values.streetName}
								onChange={formik.handleChange}
								error={
									formik.touched.streetName && Boolean( formik.errors.streetName )
								}
								helperText={
									formik.touched.streetName && formik.errors.streetName
								}
								fullWidth
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "40px",
										backgroundColor: "#ECFAE2",
										"& fieldset": {
											borderColor: "transparent",
										},
										"&:hover fieldset": {
											borderColor: "#265700",
										},
										"&.Mui-focused fieldset": {
											borderColor: "#265700",
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={5}>
							<TextField
								placeholder="Street Number"
								id="streetNumber"
								name="streetNumber"
								type="number"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">#</InputAdornment>
									),
								}}
								value={formik.values.streetNumber}
								onChange={formik.handleChange}
								error={
									formik.touched.streetNumber &&
									Boolean( formik.errors.streetNumber )
								}
								helperText={
									formik.touched.streetNumber && formik.errors.streetNumber
								}
								fullWidth
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "40px",
										backgroundColor: "#ECFAE2",
										"& fieldset": {
											borderColor: "transparent",
										},
										"&:hover fieldset": {
											borderColor: "#265700",
										},
										"&.Mui-focused fieldset": {
											borderColor: "#265700",
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={5}>
							<TextField
								placeholder="City"
								id="city"
								name="city"
								value={formik.values.city}
								onChange={formik.handleChange}
								error={formik.touched.city && Boolean( formik.errors.city )}
								helperText={formik.touched.city && formik.errors.city}
								fullWidth
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "40px",
										backgroundColor: "#ECFAE2",
										"& fieldset": {
											borderColor: "transparent",
										},
										"&:hover fieldset": {
											borderColor: "#265700",
										},
										"&.Mui-focused fieldset": {
											borderColor: "#265700",
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={5}>
							<TextField
								placeholder="State"
								id="state"
								name="state"
								value={formik.values.state}
								onChange={formik.handleChange}
								error={formik.touched.state && Boolean( formik.errors.state )}
								helperText={formik.touched.state && formik.errors.state}
								fullWidth
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "40px",
										backgroundColor: "#ECFAE2",
										"& fieldset": {
											borderColor: "transparent",
										},
										"&:hover fieldset": {
											borderColor: "#265700",
										},
										"&.Mui-focused fieldset": {
											borderColor: "#265700",
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={5}>
							<TextField
								placeholder="ZIP code"
								id="zipCode"
								name="zipCode"
								type="number"
								value={formik.values.zipCode}
								onChange={formik.handleChange}
								error={formik.touched.zipCode && Boolean( formik.errors.zipCode )}
								helperText={formik.touched.zipCode && formik.errors.zipCode}
								fullWidth
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "40px",
										backgroundColor: "#ECFAE2",
										"& fieldset": {
											borderColor: "transparent",
										},
										"&:hover fieldset": {
											borderColor: "#265700",
										},
										"&.Mui-focused fieldset": {
											borderColor: "#265700",
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
								placeholder="Contract type"
								id="contractName"
								name="contractName"
								value={formik.values.contractName}
								onChange={formik.handleChange}
								error={
									formik.touched.contractName &&
									Boolean( formik.errors.contractName )
								}
								helperText={
									formik.touched.contractName && formik.errors.contractName
								}
								fullWidth
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "40px",
										backgroundColor: "#ECFAE2",
										"& fieldset": {
											borderColor: "transparent",
										},
										"&:hover fieldset": {
											borderColor: "#265700",
										},
										"&.Mui-focused fieldset": {
											borderColor: "#265700",
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={5}>
							<TextField
								placeholder="Deposit"
								id="deposit"
								name="deposit"
								type="number"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">$</InputAdornment>
									),
								}}
								value={formik.values.deposit}
								onChange={formik.handleChange}
								error={formik.touched.deposit && Boolean( formik.errors.deposit )}
								helperText={formik.touched.deposit && formik.errors.deposit}
								fullWidth
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "40px",
										backgroundColor: "#ECFAE2",
										"& fieldset": {
											borderColor: "transparent",
										},
										"&:hover fieldset": {
											borderColor: "#265700",
										},
										"&.Mui-focused fieldset": {
											borderColor: "#265700",
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={5}>
							<TextField
								placeholder="Rent"
								id="rent"
								name="rent"
								type="number"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">$</InputAdornment>
									),
								}}
								value={formik.values.rent}
								onChange={formik.handleChange}
								error={formik.touched.rent && Boolean( formik.errors.rent )}
								helperText={formik.touched.rent && formik.errors.rent}
								fullWidth
								sx={{
									"& .MuiOutlinedInput-root": {
										borderRadius: "40px",
										backgroundColor: "#ECFAE2",
										"& fieldset": {
											borderColor: "transparent",
										},
										"&:hover fieldset": {
											borderColor: "#265700",
										},
										"&.Mui-focused fieldset": {
											borderColor: "#265700",
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={5}></Grid>
						<Grid item xs={10}>
							<Button
								sx={{
									marginTop: "16px",
								}}
							>
								<label htmlFor="files">Subi tu contrato de alquiler</label>
								<input
									placeholder="Contrato.pdf"
									type="file"
									id="files"
									style={{ visibility: "hidden" }}

									onChange={( e ) => generateEncode( e.target.files )}

								/>
							</Button>
						</Grid>
						<Grid item xs={10}>
							<Button
								variant="contained"
								sx={{
									backgroundColor: "#265700",
									marginRight: "6em",
								}}
							>
								Cancelar
							</Button>
							{/* <Link to={"/save"}> */}
								<Button
									variant="contained"
									type="submit"
									sx={{
										backgroundColor: "#265700",
									}}
								>
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


