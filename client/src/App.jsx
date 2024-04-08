import { Link, Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button,Container } from '@mui/material';
import Tooltip from "@mui/material/Tooltip";


function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ paddingLeft: '10px', paddingRight: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div" sx={{ color: 'white', fontSize: '25px' }}>
              <Link to="/" >PosterPalooza</Link>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Tooltip title='Endast admin kan skapa ny vara'
            componentsProps={{
							tooltip: {
								sx: {
									fontSize: "1rem"
                },},}}>
              <Button color='inherit' sx={{ marginBottom: '5px' }}>
                <Link to='/products/new' style={{fontSize: '16px' }}>Skapa ny produkt</Link>
              </Button>
              </Tooltip>
              <Button color="inherit">
                <Link to="/cart" style={{ fontSize: '16px' }}>Varukorg</Link>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ mt: 4 }} maxWidth="xl" component="main">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
