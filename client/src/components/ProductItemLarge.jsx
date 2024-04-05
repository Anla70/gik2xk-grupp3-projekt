// import PropTypes from 'prop-types';
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// // import ZoomOutIcon from '@mui/icons-material/ZoomOut';
// //import { ZoomInIcon } from '@mui/icons-material/ZoomIn';
// import {
// 	Button,
// 	TextField,
// 	Box,
// 	CardMedia,
// 	Paper,
// 	Typography,
// 	Rating,
// } from "@mui/material";
// import { addToCart } from "../services/CartService";
// import { useState } from "react";
// import { calculateAverageRating } from "../common/RatingHelp";

// function ProductItemLarge({product}) {
  
//   // const addToCart = addToCart;
  
//   const averageRating = product ? calculateAverageRating(product.reviews) : 0;
// 	const [amount, setAmount] = useState(1); // Startar med 1 produkt som standard
// 	const hardcodedCartId = 1; // Exempel på hårdkodat varukorgs-ID
// 	const userId = 1; // Exempel på hårdkodat användar-ID

//   const handleAddToCart = async () => {
//     try {
//       await addToCart(hardcodedCartId, product.id, amount, userId);
//       alert("Produkt tillagd i varukorgen!");
//     } catch (error) {
//       console.error("Could not add product to cart", error);
//       alert("Produkten ligger redan i varukorgen.");
//     }
//   };
    

// 	return (
// 		<Paper sx={{ my: 4, p: 4, borderRadius: 2, width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} elevation={3}>
// 			<Box sx={{ mb: 2 }}>
// 				<Typography variant='h2'> {product.title} </Typography>
// 				<Rating name='read-only' value={averageRating} readOnly />
// 				<Typography variant='body1'> {product.body} </Typography>
// 				<Typography variant='p'> {product.price} kr</Typography>
// 			</Box>

//      {/*  <Button startIcon={<ZoomInIcon />}
// 			class="material-icons md-24">zoom_in</Button> */}

// 			<Box sx={{ my: 4, p: 4, borderRadius: 2, width: '600px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
// 				<TextField
// 					label='Antal'
// 					type='number'
// 					InputLabelProps={{
// 						shrink: true,
// 					}}
// 					variant='outlined'
// 					value={amount}
// 					onChange={(e) => setAmount(Number(e.target.value))}
// 					size='small'
// 					sx={{ mb: 1, width: 1 / 6 }}
// 				/>

//       {/* {<span class="material-icons md-24">zoomInIcon</span>} */}

// 				<Button
// 					sx={{ ml: 1.5 }}
// 					onClick={handleAddToCart}
// 					startIcon={<AddShoppingCartIcon />}
// 					color='primary'
// 				>
// 					Lägg till i varukorgen
// 				</Button>
// 			</Box>
//       <Box sx={{ alignSelf: 'flex-start'}}>
// 			<CardMedia
// 				sx={{ borderRadius: 2, maxWidth:'100%', height: 'auto'}}
// 				component='img'
// 				image={product.imageUrl}
// 			/>
//       </Box>
     
// 		</Paper>
// 	);
// }

// // Vi har lagt till emptyProduct i propTypes  för att släcka id i ProductEdit.
// ProductItemLarge.propTypes = {
//   product: PropTypes.shape({
//     reviews: PropTypes.arrayOf(PropTypes.shape({
// 			review: PropTypes.number, 
// 		})
// 	).isRequired,
// 		rating: PropTypes.number,
//     id: PropTypes.number,
//     title: PropTypes.string,
//     imageUrl: PropTypes.string,
//     createdAt: PropTypes.string,
//     updatedAt: PropTypes.string, 
//     body: PropTypes.string,
//     price: PropTypes.number,
//     carts: PropTypes.arrayOf(PropTypes.string) // Antagande om vad carts innehåller
//   }).isRequired
// };

// export default ProductItemLarge;

import PropTypes from 'prop-types';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
//import zoom_in from '@mui/icons-material/Zoom_in';
//import {zoom-inIcon} from '@mui/icons-material/Zoom_in';
import {
	Button,
	TextField,
	Box,
	CardMedia,
	Paper,
	Typography,
	Rating,
} from "@mui/material";
import { addToCart } from "../services/CartService";
import { useState } from "react";
import { calculateAverageRating } from "../common/RatingHelp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate} from 'react-router-dom';

function ProductItemLarge({product}) {
  
  // const addToCart = addToCart;
  
  const averageRating = product ? calculateAverageRating(product.reviews) : 0;
	const [amount, setAmount] = useState(1); // Startar med 1 produkt som standard
	const hardcodedCartId = 1; // Exempel på hårdkodat varukorgs-ID
	const userId = 1; // Exempel på hårdkodat användar-ID
	const cartSet = new Set();

  const handleAddToCart = async (productID) => {
	if (cartSet.has(productId)){
		alert("Produkten finns redan i varukorgen")
		return;
	}
    try {
      await addToCart(hardcodedCartId, product.id, amount, userId);
      alert("Produkt tillagd i varukorgen!");
    } catch (error) {
      console.error("Could not add product to cart", error);
    //   alert("Produkten ligger redan i din varukorg.");
    }
  };

// ORIGNAL-KOD
//   const handleAddToCart = async () => {
// 	try {
// 		const cartItem = await addToCart(
// 			hardcodedCartId,
// 			product.id,
// 			amount,
// 			userId
// 		);
// 		alert("Produkt tillagd i varukorgen!");
// 	} catch (error) {
// 		console.error("Could not add product to cart", error);
// 		alert("Misslyckades med att lägga till produkt i varukorgen.");
// 	}
// };


  const navigate = useNavigate();
    

	return (
		<Paper sx={{ my: 4, p: 4, borderRadius: 2, width: '600px' }} elevation={3}>
			<Box sx={{ mb: 2 }}>
				<Typography variant='h2'> {product.title} </Typography>
				<Rating name='read-only' value={averageRating} readOnly />
				<Typography variant='body1'> {product.body} </Typography>
				<Typography variant='p'> {product.price} kr</Typography>
			</Box>

      {/* <span class="material-icons md-24">zoom_in</span> */}

			
      <Box>
			<CardMedia
				sx={{ borderRadius: 2, maxWidth:'100%', height: 'auto'}}
				component='img'
				image={product.imageUrl}
			/>
			<Box sx={{ my: 4, p: 4, borderRadius: 2, width: '600px', height: 'auto'}}>
				<TextField
					label='Antal'
					type='number'
					InputLabelProps={{
						shrink: true,
					}}
					variant='outlined'
					value={amount}
					onChange={(e) => setAmount(Number(e.target.value))}
					size='small'
					sx={{ mb: 1, width: 1 / 6 }}
				/>

				<Button
					sx={{ ml: 1.5 }}
					onClick={handleAddToCart}
					startIcon={<AddShoppingCartIcon />}
					color='primary'
					>Lägg till i varukorgen
				</Button>
				

				
			</Box>
			<Button
                        variant='contained'
                        color='success'
                        startIcon={<ChevronLeftIcon />}
                        sx={{ mr: 2 }}
                        onClick={() => navigate(-1)}
                    >
                        Tillbaka till butiken
                    </Button>
				
      </Box>
     
		</Paper>
	);
}

// Vi har lagt till emptyProduct i propTypes  för att släcka id i ProductEdit.
ProductItemLarge.propTypes = {
  product: PropTypes.shape({
    reviews: PropTypes.arrayOf(PropTypes.shape({
			review: PropTypes.number, 
		})
	).isRequired,
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string, 
    //review: PropTypes.number,
    body: PropTypes.string,
    price: PropTypes.number,
    carts: PropTypes.arrayOf(PropTypes.string) // Antagande om vad carts innehåller
  }).isRequired
};

export default ProductItemLarge;