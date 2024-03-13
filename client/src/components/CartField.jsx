import { TextField, Button, Box } from '@mui/material';
import { useState } from 'react';
function CartField({ onSave }) {
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

export default CartField;