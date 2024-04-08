import { Box,Button, TextField, Rating,Typography  } from '@mui/material';
import {useState } from 'react';
import PropTypes from 'prop-types';

function ReviewForm({onSave}) {

  const [review,setReview] = useState({title: '', body:'', review:1})
  return (
    <form>
      <Box>
        Rubrik till din recension: 
        <TextField 
        value={review.title} 
        onChange={(e)=> setReview({ ...review, title: e.target.value})}
        label='Rubrik'
        name='title'
        id='title'
        margin='normal'
        />
      </Box>

      <Box>
      Skriv din recension här: {' '} 
        <TextField
        multiline
        minRows={3}
        value={review.body}
        onChange={(e) => setReview({ ...review, body: e.target.value })}
        label="Innehåll"
        name="body"
        id="body"
        />
           </Box>
         <Box>
          <Typography component='legend'>Betygsätt ditt köp</Typography>
				<Rating
         name="simple-controlled"
          value={review.rating}
            onChange={(event, newValue) => {
            setReview({ ...review, review: newValue });
          }}
        />
      </Box>
      <Button onClick={() => onSave(review)}>Spara recension</Button>
    </form>
  );
}
ReviewForm.propTypes = {
onSave: PropTypes.func.isRequired, 
};

export default ReviewForm;
