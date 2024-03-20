import { Button } from '@mui/material';

function RatingForm() {
  return (
    <form>
      <div>
        Titel: <input type="text" />
      </div>
      <div>
        Innehåll: <textarea rows="5"></textarea>
      </div>
      <Button>Spara</Button>
    </form>
  );
}

export default RatingForm;