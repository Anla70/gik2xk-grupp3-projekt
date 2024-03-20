import { TextField, Button, Box } from '@mui/material';
import { useState } from 'react'; 
import PropTypes from 'prop-types';

function CartField( { onSave } ) {
  const [cartString, setCartString] = useState('');
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <TextField
        sx={{ flex: 1 }}
        value={cartString}
        onChange={(e) => setCartString(e.target.value)}
        label="Kundkorgar (ange flera separerade med kommatecken)"
        name="carts"
      />
      <Button
        color="success"
        variant="contained"
        onClick={() => onSave(cartString)}>
        Lägg till kundkorg(ar)
      </Button>
    </Box> 
  );
}
CartField.propTypes = {
	onSave: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		imageUrl: PropTypes.string,
		createdAt: PropTypes.string,
		updatedAt: PropTypes.string, 
	
		body: PropTypes.string,
		price: PropTypes.number,
		carts: PropTypes.arrayOf(PropTypes.string) // Antagande om vad carts innehåller
	})
};
	
export default CartField;