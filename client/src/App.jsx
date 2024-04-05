import { Link, Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';

// function App() {
//   return (
//     <>
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             <Link to="/">Webbshop</Link>
//           </Typography>
//           <Button color="inherit">
//             <Link to="/products/new">Skapa ny produkt</Link>
//           </Button>

//           <Button color='inherit'>
// 							<Link to='/cart'>Varukorg</Link>
// 				</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//     <Outlet />
//   </>
// );
// }

function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ paddingLeft: '10px', paddingRight: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div" sx={{ color: 'white', fontSize: '25px' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Webbshop</Link>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Button color='inherit' sx={{ marginBottom: '5px' }}>
                <Link to='/products/new' style={{ textDecoration: 'none', color: 'inherit', fontSize: '16px' }}>Skapa ny produkt</Link>
              </Button>
              <Button color="inherit">
                <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit', fontSize: '16px' }}>Varukorg</Link>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
}


export default App;
