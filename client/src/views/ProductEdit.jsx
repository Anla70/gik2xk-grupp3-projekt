import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { create, getOne, remove, update } from "../services/ProductService";
import {
	Box,
	Button,
	Chip,
	Container,
	TextField,
	Typography,
} from "@mui/material";
import CartList from "../components/CartList";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

function ProductEdit() {
	const { id } = useParams();
	const navigate = useNavigate();
	const emptyProduct = {
		id: 0,
		title: "",
		body: "",
		price: 0,
		imageUrl: "",
		carts: [],
		userId: 2,
	};
	const [product, setProduct] = useState(emptyProduct);

	useEffect(() => {
		if (id) {
			getOne(id).then((product) => setProduct(product));
		} else {
			setProduct(emptyProduct);
		}
	}, [id]);

	function onChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		const newProduct = { ...product, [name]: value };
		setProduct(newProduct);
	}

	function onSave() {
		if (product.id === 0) {
			create(product).then((response) => {
				navigate("/", {
					replace: true,
					state: { message: `Produkten ${response.title} skapades.` },
				});
			});
		} else {
			update(product).then((response) =>
				navigate(`/products/${product.id}`, { replace: true, state: response })
			);
		}
	}

	function onDelete() {
		remove(product.id).then((response) =>
			navigate("/", { replace: true, state: response })
		);
	}

	function onCartAdd(cartString) {
		//splitta arrayen vid kommatecken
		const cartArray = cartString.split(",");
		//trimma whitespace runt rader
		const uniqueAndTrimmedCarts = cartArray
			.map((cart) => cart.trim())
			.filter((cart) => !product.carts.includes(cart));

		//slå samman befintlig cart-array med de nya, unika raderna
		const mergedArray = [...product.carts, ...uniqueAndTrimmedCarts];

		//spara befintligt inlägg med nya carts-arrayen till state.
		setProduct({ ...product, carts: mergedArray });
	}

	function onCartDelete(cartToDelete) {
		const newCarts = product.carts.filter((cart) => cart !== cartToDelete);

		setProduct({ ...product, carts: newCarts });
	}
	return (
		<Container maxWidth='lg'>
			<Typography variant='h4' component='h2'>
				{product.id ? "Ändra inlägg" : "Skapa inlägg"}
			</Typography>
			<Box mt={4}>
				<form>
					<Box>
						<TextField
							fullWidth
							margin='normal'
							onChange={onChange}
							value={product.title}
							name='title'
							id='title'
							label='Titel'
						/>
					</Box>
					<Box>
						<TextField
						fullWidth
						margin='normal'
						onChange={onChange}
						value={product.body}
						multiline
						minRows={5}
						name='body'
						label='Innehåll'
						id='body'
						
						/>
					</Box>
					<Box>
						<TextField
							fullWidth
							margin='normal'
							onChange={onChange}
							value={product.price}
							name='price' 
							id='price'
							label='Pris'
							type='number' 
						/>
					</Box>
					<Box>
						<TextField
							fullWidth
							margin='normal'
							onChange={onChange}
							value={product.imageUrl}
							name='imageUrl'
							id='imageUrl'
							label='Sökväg till bild'
						/>
					</Box>
					<Box mt={1}>
						{product?.carts?.length > 0 &&
							product.carts.map((cart) => (
								<Chip
									sx={{ mr: 1 }}
									onDelete={() => onCartDelete(cart)}
									key={cart}
									label={cart}
								/>
							))}
					</Box>
					<Box mt={2}>
						<CartList onSave={onCartAdd} />
					</Box>
					<Box display='flex' mt={2}>
						<Box flexGrow={1}>
							<Button
								startIcon={<ChevronLeftIcon />}
								sx={{ mr: 1 }}
								variant='contained'
								onClick={() => navigate(-1)}
							>
								Tillbaka
							</Button>
							{id && (
								<Button
									startIcon={<DeleteIcon />}
									onClick={onDelete}
									variant='contained'
									color='error'
								>

									{/* ********************* */}
									Ta bort
								</Button>
							)}
						</Box>
						<Button
							startIcon={<SaveIcon />}
							onClick={onSave}
							variant='contained'
							color='success'
						>
							Spara
						</Button>
					</Box>
				</form>
			</Box>
		</Container>
	);
}

export default ProductEdit;
