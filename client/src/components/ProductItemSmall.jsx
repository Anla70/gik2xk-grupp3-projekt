import { Link, useNavigate } from "react-router-dom";
import Cart from "./Cart";
//import UserItemSmall from './UserItemSmall';
import { toRelativeDateString, truncate } from "../common/formatHelpers";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Typography,
} from "@mui/material";
import placeholderImage from "../assets/placeholder.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { grey } from "@mui/material/colors";

function ProductItemSmall({ product }) {
	const navigate = useNavigate();

	return (
		<>
			<Card variant='outlined' sx={{ mb: 4 }}>
				<CardHeader
					title={
						<Typography variant='h3'>
							<Link to={`/products/${product.id}`}>{product.title}</Link>
						</Typography>
					}
					subheader={`Skrivet: ${toRelativeDateString(product.createdAt)}`}
					// avatar={
					//   <UserItemSmall
					//     style={{
					//       minWidth: '7rem',
					//       paddingRight: '.7rem',
					//       marginRight: '.5rem',
					//       borderRight: `1px solid ${grey[400]}`
					//     }}
					//     user={product.author}
					//   />
					// }
				/>
				<CardMedia
					component='img'
					height='300'
					image={product.imageUrl || placeholderImage}
					alt={`Bild till ${product.title}`}
				/>
				<CardContent>
					<Box mb={2}>
						{product.carts.length > 0 &&
							product.carts.map((cart) => <Cart key={cart} text={cart} />)}
					</Box>

					<Typography variant='body2'>{truncate(product.title, 500)}</Typography>
				</CardContent>
				<CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Button
						onClick={() => navigate(`/products/${product.id}`)}
						endIcon={<ChevronRightIcon />}
					>
						Läs mer
					</Button>
				</CardActions>
			</Card>
		</>
	);
}

export default ProductItemSmall;
