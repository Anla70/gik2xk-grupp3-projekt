import ProductItemLarge from '../components/ProductItemLarge';
import ReviewForm from '../components/ReviewForm';
import Review from '../components/Review';
import { getOne,addReview } from '../services/ProductService';
//import ImageModal from '../components/ImageModal';

import {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EditIcon from "@mui/icons-material/Edit";
// import { ZoomInIcon } from "@mui/icons-material/ZoomIn";
import { 
  Button,
  Tooltip,
  Alert,
	Box,
	Container,
	Typography,
	List } from '@mui/material';


function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	// const [showModal, setShowModal] = useState(false);
	// const [selectedImage, setSelectedImage] = useState('');

	// // En funktion för att öppna modalen och visa bilden
	// const openModal = (imageUrl) => {
	// 	setSelectedImage(imageUrl);
	// 	setShowModal(true);
	// };

	// // En funktion för att stänga modalen
	// const closeModal = () => {
	// 	setShowModal(false);
	// };

	useEffect(() => {
		getOne(id).then((product) => setProduct(product));
	}, [id]);

	const navigate = useNavigate();

	function onReviewAdd(review) {
		addReview(product.id, review)
			.then(() => getOne(id))
			.then((product) => setProduct(product));
	}
	const location = useLocation();
	const message = location.state?.message;
	const [open, setOpen] = useState(true);

	function clearMessage() {
		window.history.replaceState({}, "");
	}

	

	return product ? (
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

			<Container maxWidth='lg'>
				<ProductItemLarge product={product} />
				<Box display='flex' justifyContent='space-between' mb={4}>
					<Button
						variant='contained'
						color='secondary'
						startIcon={<ChevronLeftIcon />}
						sx={{ mr: 2 }}
						onClick={() => navigate(-1)}
					>
						Tillbaka
					</Button>


          
          <Tooltip
						title='Endast admin kan ändra varan'
						componentsProps={{
							tooltip: {
								sx: {
									fontSize: "1rem"
                },},}}>
						<Button startIcon={<EditIcon />} variant='contained'
						onClick={() => navigate(`/products/${product.id}/edit`)}>
							Ändra vara
						</Button>
					</Tooltip>




				{/* <div>
					<img src={product.imageUrl} alt={product.name} onClick={() => openModal(product.imageUrl)}
					style={{ cursor: 'pointer' }} 
					/>

					<ZoomInIcon fontSize="small" onClick={() => openModal(product.imageUrl)} 
					style={{ cursor: 'pointer' }}
					/>

					{showModal && (
						<ImageModal isOpen={true}
						imageUrl={selectedImage}
						onClose={closeModal}
						/>
					)}
				</div>  */}
					
				</Box>

				<Box>
				<Typography variant="h3">Recension</Typography>
				<ReviewForm onSave={onReviewAdd} />
				<Typography variant="h3">Andras recensioner</Typography>
				{product.reviews &&(
				<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
					{product.reviews.map((review, i) => (
						<Review key={`review_${i}`} review={review} />
					))}
</List>)}
					</Box>
			</Container>
		</>
	) : (
		<h3>Kunde inte hämta produkten</h3>
	);
}

export default ProductDetail;



// import ProductItemLarge from '../components/ProductItemLarge';
// import { Button, Alert, Box, Container, Typography, List } from '@mui/material';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import ReviewForm from '../components/ReviewForm';
// import Review from '../components/Review';
// import {useState, useEffect} from 'react';
// import { getOne, addReview } from '../services/ProductService';
// //import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import EditIcon from "@mui/icons-material/Edit";


// function ProductDetail() {
//     const { id } = useParams();
//     const [product, setProduct] = useState(null);
    
//     useEffect(() => {
//         getOne(id).then((product) => setProduct(product));
//     }, [id]);
    
//     const navigate = useNavigate();
    
//     function onReviewAdd(review) {
//         addReview(product.id, review)
//             .then(() => getOne(id))
//             .then((product) => setProduct(product));
//     }
//     const location = useLocation();
//     const message = location.state?.message;
//     const [open, setOpen] = useState(true);
    
//     function clearMessage() {
//         window.history.replaceState({}, "");
//     }
    
//     return product ? (
//         <>
//             {message && open && (
//                 <Alert
//                     onClose={() => {
//                         setOpen(false);
//                         clearMessage();
//                     }}
//                     variant='filled'
//                     severity='success'
//                 >
//                     {message}
//                 </Alert>
//             )}
            
//             <Container maxWidth='lg'>
//                 <Box display='flex' justifyContent='space-between' mb={4}>
                    
                    
//                 </Box>

//                 <Box display="flex" justifyContent="space-between">
//                     <Box flex={1} pr={2}>
//                         <ProductItemLarge product={product} />
						
//                     </Box>
//                     <Box flex={1} pl={2}>
//                         <Typography variant="h5">Recension</Typography>
//                         <ReviewForm onSave={onReviewAdd} />
//                         <Typography variant="h5">Andras recensioner</Typography>
//                         {product.reviews && (
//                             <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
//                                 {product.reviews.map((review, i) => (
//                                     <Review key={`review_${i}`} review={review} />
//                                 ))}
//                             </List>
//                         )}
//                     </Box>
					
//                 </Box>
// 				<Button
//                         startIcon={<EditIcon />}
//                         variant='contained'
//                         onClick={() => navigate(`/products/${product.id}/edit`)}
//                     >
//                         Ändra vara
//                     </Button>
//             </Container>
//         </>
//     ) : (
//         <h3>Kunde inte hämta produkten</h3>
//     );
// }

// export default ProductDetail;
