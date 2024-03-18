import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { toDateTimeString } from '../common/formatHelpers';
import Rating from '@mui/material/Rating';


function Review({ review }) {
	return (
		<Box sx={{ mb: 1, borderBottom: `1px solid ${grey[300]}` }}>
				<Typography
					color='text.secondary'
					component='p'
					fontWeight='bold'
					variant='body1'
					sx={{ mb: 1 }}
				>
					{/* {rating.author} säger: */}
				</Typography>
			
					<Typography variant='body2' sx={{ mb: 1 }}>
						{toDateTimeString(review.createdAt)}
					</Typography>
					<Typography sx={{ my: 1 }} color='text.primary' variant='h4'>
						{review.title}
						<Rating name="read-only" value={review.rating} readOnly />
					</Typography>

					<Typography color='text.secondary' variant='body1'>
						{review.body}
					</Typography>
				</Box> 
	);
}

export default Review;
