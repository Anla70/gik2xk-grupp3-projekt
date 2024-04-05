// import { Button, TextField, Rating,Typography  } from '@mui/material';
// import {useState } from 'react';
// import PropTypes from 'prop-types';

// function ReviewForm({onSave}) {

//   const [review,setReview] = useState({title: '', body:'',review:1})
//   return (
//     <form>
//       <div>
//         Rubrik till din recension: 
//         <TextField 
//         value={review.title} 
//         onChange={(e)=> setReview({ ...review, title: e.target.value})}
//         label='Rubrik'
//         name='title'
//         id='title'
//         margin='normal'
//         />
//       </div>

//       <div>
//         Skriv din recension: {' '} 
//         <TextField
//         multiline
//         minRows={3}
//         value={review.body}
//         onChange={(e) => setReview({ ...review, body: e.target.value })}
//         label="Innehåll"
//         name="body"
//         id="body"
//         />
//            </div>
//          <div>
//           <Typography component='legend'>Betygsätt</Typography>
// 				<Rating
//          name="simple-controlled"
//           value={review.rating}
//             onChange={(event, newValue) => {
//             setReview({ ...review, rating: newValue });
//           }}
//         />
        
     
     
        
//       </div>
//       <Button onClick={() => onSave(review)}>Spara recension</Button>
//     </form>
//   );
// }
// /* ReviewForm.propTypes = {
//   onSave: PropTypes.shape({
//     id: PropTypes.number,
//     title: PropTypes.string,
//     body: PropTypes.string,
//     review: PropTypes.number,
//     createdAt: PropTypes.string,
//     updatedAt: PropTypes.string, 
//   }).isRequired */
// ReviewForm.propTypes = {
// onSave: PropTypes.func.isRequired, 
// };

// export default ReviewForm;

import { TextField, Rating, Typography, Button } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';

// Style för att justera avståndet mellan fälten
const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  '& > *': {
    marginBottom: '20px', // Avståndet mellan fälten
  },
});

// Stil för att justera längden på fälten
const StyledTextField = styled(TextField)({
  width: '20%', // Fältens längd
});

// Anpassad knappstil
const CustomButton = styled(Button)({
  backgroundColor: '#1976d2', // Blå 
  color: 'white', // Vit text
  borderRadius: '10px', // Rundade kanter
  '&:hover': {
    backgroundColor: '#1560c0', // Mörkare blå vid hover
  },
});

function ReviewForm({ onSave }) {
  const [review, setReview] = useState({ title: '', body: '', rating: 1 });

  const handleFieldChange = (fieldName, value) => {
    setReview({ ...review, [fieldName]: value });
  };

  const handleSaveReview = () => {
    onSave(review);
  };

  return (
    <form>
      <FormContainer>
        <StyledTextField
          value={review.title}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          label="Skriv en rubrik här"
          name="title"
          id="title"
        />

        <StyledTextField
          multiline
          minRows={3}
          value={review.body}
          onChange={(e) => handleFieldChange('body', e.target.value)}
          label="Skriv din recension här"
          name="body"
          id="body"
        />

        <Typography component="legend">Betygsätt ditt köp</Typography>
        <Rating
          name="simple-controlled"
          value={review.rating}
          onChange={(event, newValue) => {
            handleFieldChange('rating', newValue);
          }}
        />
      </FormContainer>

      <CustomButton onClick={handleSaveReview}>Spara recension</CustomButton>
    </form>
  );
}

ReviewForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default ReviewForm;
