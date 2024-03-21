import { Button, TextField } from '@mui/material';
import {useState } from 'react';
import PropTypes from 'prop-types';

function ReviewForm({onSave}) {

  const [review,setReview] = useState({title: '', body:''})
  return (
    <form>
      <div>
        Titel på recensionen: <TextField value={review.title} 
        onChange={(e)=> setReview({ ...review, title: e.target.value})}
        label='Rubrik'
        name='title'
        id='title'
        />
      </div>
      <div>
        Innehåll på recensionen: {' '} 
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