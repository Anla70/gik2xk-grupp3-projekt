import { Button, TextField, Typography, Rating } from "@mui/material";
import { useState } from "react";
import * as React from "react";

function RatingForm({ onSave }) {
	const [rating, setRating] = useState({ title: "", body: "", userId: 1 });

	return (
		<form>
			<div>
				<TextField
					fullWidth
					value={rating.title}
					onChange={(e) => setRating({ ...rating, title: e.target.value })}
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
					value={rating.body}
					onChange={(e) => setRating({ ...rating, body: e.target.value })}
					label='Innehåll'
					name='body'
					id='body'
				/>
			</div>
			<Button onClick={() => onSave(rating)}>Skicka</Button>
		</form>
	);
}

export default RatingForm;
