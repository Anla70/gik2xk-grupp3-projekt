import ProductList from "../components/ProductList";
import { Alert, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
function Home() {
	const location = useLocation();
	const message = location.state?.message;
	const [open, setOpen] = useState(true);

	function clearMessage() {
		window.history.replaceState({}, "");
	}

	return (
		<>
			{message && open && (
				<Alert
					onClose={() => {
						setOpen(false);
						clearMessage();
					}}
					variant='filled'
					severity='success'
				>
					{message}
				</Alert>
			)}
	
				<Grid component='section' item xs={12} md={8}>
					<Paper elevation={3} sx={{ p: 2, mt: 4, borderRadius: 2 }}>
						<Typography variant='h2'>Senaste inläggen</Typography>
						<ProductList />
					</Paper>
				</Grid>
				
				
			
		</>
	);
}

export default Home;
