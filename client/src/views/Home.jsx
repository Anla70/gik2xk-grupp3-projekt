import { useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList';
import CartList from '../components/CartList';
// import UserList from '../components/UserList';
import { Alert, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';

function Home() {
  const location = useLocation();
  const message = location.state?.message;
  const [open, setOpen] = useState(true);

  function clearMessage() {
    window.history.replaceState({}, '');
  }
  return (
    <>
      {message && open && (
        <Alert
          onClose={() => {
            setOpen(false);
            clearMessage();
          }}
          variant="filled"
          severity="success">
          {message}
        </Alert>
      )}
      <Grid container spacing={8}>
        <Grid component="section" item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, mt: 4, borderRadius: 2 }}>
            <Typography variant="h2">Nyaste varorna</Typography>
            <ProductList />
          </Paper>
        </Grid>
        <Grid component="section" item xs={12} md={4}>
          {/* <Paper elevation={3} sx={{ p: 2, mt: 4, borderRadius: 2 }}>
            <Typography variant="h2">Användare</Typography>
            <UserList />
          </Paper> */}
          <Paper elevation={3} sx={{ p: 2, mt: 4, borderRadius: 2 }}>
            <Typography variant="h2">Kundkorg</Typography>
            <CartList />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;