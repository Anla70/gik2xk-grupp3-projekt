import {
	Button,
	TextField,
	Typography,
	Rating,
	IconButton,
} from "@mui/material";
import { useState } from "react";
import * as React from "react";
import SendIcon from "@mui/icons-material/Send";

function ReviewForm({ onSave }) {
	// Vilka värden som behövs i en review
	const [review, setReview] = useState({ title: "", body: "", review: 0, });

	return (
		<form>
			<div>
				<Typography component='legend'>Betygsätt</Typography>
				<Rating
				// Ratingen är att m,an kan trycka (simple-controlled) värdet/antal stjärnonr är review.review.
				// om change ändrar den från 0(basvärdet) till det nya värdet
				 name="simple-controlled"
				 value={review.review}
				 onChange={(event, newValue) => {
					 setReview({ ...review, review: newValue });
				 }}
				/>
				<TextField
					fullWidth
					value={review.title}
					onChange={(e) => setReview({ ...review, title: e.target.value })}
					label='Rubrik'
					name='title'
					id='title'
					margin='normal'
				/>
			</div>
			<div>
				<TextField
					fullWidth
					multiline
					minRows={3}
					value={review.body}
					onChange={(e) => setReview({ ...review, body: e.target.value })}
					label='Innehåll'
					name='body'
					id='body'
				/>
			</div>
			<Button
				sx={{ mt: 1 }}
				variant='contained'
				endIcon={<SendIcon />}
				onClick={() => onSave(review)}
			>
				Skicka
			</Button>
		</form>
	);
}

export default ReviewForm;
