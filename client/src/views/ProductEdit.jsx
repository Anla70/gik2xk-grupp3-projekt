import {useParams, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {getOne} from '../services/ProductService';
import {TextField, Button} from '@mui/material';


  

function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const emptyProduct= {
        //id: 0, 
        title: '', 
        body: '', 
        price: '', 
        imageUrl: '', 
        //carts: [], 
        //userId: 2
    };
    
    const [product, setProduct]= useState(emptyProduct);
    
    
    useEffect(() => {
        if (id) {
            getOne(id).then((product) => setProduct(product));
        } else {
            setProduct(emptyProduct);
        }
    }, [id]);  
    
    



    return (
    <form>
    <div>
        <TextField 
        value={product.title}
        name = "title" 
        id="title" 
        label = "Titel" />
    </div>
    <div>
        <TextField 
        value={product.body}
        multiline 
        minRows={5} 
        name="body" 
        id="body" 
        label="Beskrivning" />
    </div>
    <div>
        <TextField 
        value = {product.price}
        name="price" 
        id="price" 
        label="Pris" 
        type='number' 
        />
    </div>
    <div>
    <TextField 
    value={product.imageUrl}
    name= 'imageUrl' 
    id='imageUrl' 
    label = 'Sökväg till bild'
    />
    </div>


    {/* 
    Vi tycker inte att cart passar in här
    <div>
        {product ?.carts ?.length > 0 && 
        product.carts.map((cart) => <Chip key = {cart} label = {cart} />)}
    </div>
    <div>
        <CartField />
    </div> */}
    <div>
    <Button variant="contained" onClick={() => navigate(-1)}>
        Tillbaka 
    </Button>
    {id &&  (
        <Button variant="contained" color="error">
        Ta bort 
    </Button>
    )}
      <Button variant="contained" color="success">
        Spara
    </Button>
    </div>
    </form>
    );
}


export default ProductEdit;