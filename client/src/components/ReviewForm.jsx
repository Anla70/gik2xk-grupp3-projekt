import { Box, Button, TextField, Rating, Typography } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

function ReviewForm({ onSave }) {
  const [review, setReview] = useState({ title: '', body: '', review: 1 });

  return (
    <form>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" component="legend">
          Rubrik till din recension:
        </Typography>
        <TextField
          fullWidth
          value={review.title}
          onChange={(e) => setReview({ ...review, title: e.target.value })}
          label="Rubrik"
          name="title"
          id="title"
          margin="normal"
        />
        
        <Typography variant="subtitle1" component="legend">
          Skriv din recension här:
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={3}
          value={review.body}
          onChange={(e) => setReview({ ...review, body: e.target.value })}
          label="Innehåll"
          name="body"
          id="body"
          margin="normal"
        />
        
        <Typography variant="subtitle1" component="legend">
          Betygsätt ditt köp
        </Typography>
        <Rating
          name="simple-controlled"
          value={review.rating}
          onChange={(event, newValue) => {
            setReview({ ...review, review: newValue });
          }}
        />
        <Button variant="contained" color="primary" onClick={() => onSave(review)}>
          Spara recension
        </Button>
      </Box>
    </form>
  );
}

ReviewForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default ReviewForm;