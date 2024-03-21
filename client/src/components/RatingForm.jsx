import { Button } from '@mui/material';

function RatingForm() {
  return (
    <form>
      <div>
        Titel på Rating: <input type="text" />
      </div>
      <div>
        Innehåll på Rating: <textarea rows="5"></textarea>
      </div>
      <Button>Spara</Button>
    </form>
  );
}

export default RatingForm;