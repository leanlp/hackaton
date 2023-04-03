import { Box, Typography, Card, CircularProgress } from "@mui/material";
import background from "./../assets/saveContract.jpg";

export default function SaveContract() {
	return (
		<>
			<img src={background} alt="background" style={{ position: "absolute" }} />
			<Box
				sx={{
					flexDirection: "column",
					position: "relative",
					zIndex: 2,
					display: "flex",
					justifyContent: "space-beetwen",
					alignItems: "center",
					marginTop: "20em",
					paddingLeft: "18em",
				}}
			>
				<img
					style={{ width: "300px" }}
					src="https://s3-alpha-sig.figma.com/img/e428/fb50/ef1e86a209879973928ada577c2f1abe?Expires=1681084800&Signature=YN~Hym~a74ocv76voFrEYdKU9N7x1gE-NPH1sOcq89ZHKMBwKPWDfzHrSGhTWK6k3p-Iv8uswyjPIqBdNDH66CCAcMcDoX1BTE6rquhB1Pj2XlNfZ3c-NMeZyC2Gi3waCumIrGq-Chwx96s2F4ZyhDxecfuCnIfFZljVt7kaLgaaxi-QhHUvuClgFAB-P5jQgMZoAEjbwyglRMD4SpVUA643yWggMENOX-l5eiBQe7Pbda8a1AHI8dgVeqSfy2poVfb7Y7n7xTkvAy007LCyT3IuvTSO5WKkHzBOkP1xIgL5ZXQHuEp1nnBUVq578FgO4VraRHpbB8dvSIaUoZ6ghw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
				></img>
				<Typography
					sx={{
						fontFamily: "'Lato'",
						fontWeight: 700,
						color: "#786CFF",
						fontSize: 45,
						textAlign: "center",
						width: "500px",
						marginTop: "230px",
					}}
				>
					El contrato fue guardado en la blockchain
				</Typography>
			</Box>
		</>
	);
}
