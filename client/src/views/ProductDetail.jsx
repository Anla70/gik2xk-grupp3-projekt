import ProductItemLarge from '../components/ProductItemLarge';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import Review from '../components/Review';
import {useState, useEffect} from 'react';
import { getOne,addReview } from '../services/ProductService';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation } from "react-router-dom";

import {
	Alert,
	Box,

	Container,
	Typography,
	List
} from "@mui/material";

function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);

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
					<Button
						startIcon={<EditIcon />}
						variant='contained'
						onClick={() => navigate(`/products/${product.id}/edit`)}
					>
						Ändra vara
					</Button>
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

