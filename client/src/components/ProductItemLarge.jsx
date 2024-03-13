import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography
} from '@mui/material';
import Cart from './Cart';
/* import UserItemSmall from './UserItemSmall'; */
import { toDateTimeString } from '../common/formatHelpers';
import placeholderImage from '../assets/placeholder.png';


function ProductItemLarge({ product }) {
  return (
    <Paper sx={{ my: 4, p: 4, borderRadius: 2 }} elevation={3}>
      <Box>
        {/* <UserItemSmall style={{ marginBottom: '.3rem' }} user={product.author} /> */}
        <Typography variant="h2">{product.title}</Typography>
        <Typography>
          Produkten publicerades: {toDateTimeString(product.createdAt)}
        </Typography>
      </Box>
      <Card elevation={0}>
        <CardMedia component="img" image={product.imageUrl || placeholderImage} />
        <CardContent>
          {product.carts &&
            product.carts.map((cart) => <Cart key={`cart_${cart}`} text={cart} />)}
          <Typography variant="body2">{product.body}</Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}

export default ProductItemLarge;
