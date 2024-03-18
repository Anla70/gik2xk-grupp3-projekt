import { Box, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
// import { toDateTimeString } from '../common/formatHelpers';

function Rating({ rating }) {
	return (
		// <Product sx={{ mb: 1, borderBottom: `1px solid ${grey[300]}` }}>
		<TextField
			primary={
				<Typography
					color='text.secondary'
					component='p'
					fontWeight='bold'
					variant='body1'
				>
					{/* {rating.author} säger: */}
				</Typography>
			}
			secondary={
				<Box>
					<Typography variant='body2'>
						{toDateTimeString(rating.createdAt)}
					</Typography>
					<Typography sx={{ my: 1 }} color='text.primary' variant='h4'>
						{rating.title}
					</Typography>
					<Typography color='text.secondary' variant='body1'>
						{rating.body}
					</Typography>
				</Box>
			}
		></TextField>
		// </Product>
	);
}

export default Rating;
