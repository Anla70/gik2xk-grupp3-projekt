import { Button, TextField, Rating,Typography  } from '@mui/material';
import {useState } from 'react';
import PropTypes from 'prop-types';

function ReviewForm({onSave}) {

  const [review,setReview] = useState({title: '', body:'',review:1})
  return (
    <form>
      <div>
        Rubrik till din recension: 
        <TextField 
        value={review.title} 
        onChange={(e)=> setReview({ ...review, title: e.target.value})}
        label='Rubrik'
        name='title'
        id='title'
        margin='normal'
        />
      </div>

      <div>
        Skriv din recension: {' '} 
        <TextField
        multiline
        minRows={3}
        value={review.body}
        onChange={(e) => setReview({ ...review, body: e.target.value })}
        label="Innehåll"
        name="body"
        id="body"
        />
           </div>
         <div>
          <Typography component='legend'>Betygsätt</Typography>
				<Rating
         name="simple-controlled"
          value={review.rating}
            onChange={(event, newValue) => {
            setReview({ ...review, rating: newValue });
          }}
        />
        
     
     
        
      </div>
      <Button onClick={() => onSave(review)}>Spara recension</Button>
    </form>
  );
}
/* ReviewForm.propTypes = {
  onSave: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    review: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string, 
  }).isRequired */
ReviewForm.propTypes = {
onSave: PropTypes.func.isRequired, 
};

export default ReviewForm;