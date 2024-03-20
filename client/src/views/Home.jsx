import ProductList from "../components/ProductList";

function Home() {

  return(
   <>
     <h2>Home</h2> 
     <ProductList />
   </>
  ); 
}

export default Home;



// import PostList from '../components/PostList';
// import TagList from '../components/TagList';
// import UserList from '../components/UserList';
// import { Grid } from '@mui/material';

// function Home() {
//   return (
//     <>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={8}>
//           <PostList />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <UserList />
//           <TagList />
//         </Grid>
//       </Grid>
//     </>
//   );
// }

// export default Home;