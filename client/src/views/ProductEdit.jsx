import {useParams, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {getOne, create, update, remove} from '../services/ProductService';
import {TextField, Button} from '@mui/material';


  

function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const emptyProduct= {
        id: 0, 
        title: '',
        body: '', 
        price: '', 
        imageUrl: '', 
        //carts: [], 
        //userId: 2  //Hårdkodad användare för att kunna skapa produkter (skapa en särskild användare för detta senare)
    };
    
    const [product, setProduct]= useState(emptyProduct);
    
    
    useEffect(() => {
        if (id) {
            getOne(id).then((product) => setProduct(product));
        } else {
            setProduct(emptyProduct);
        }
    }, [id]);  
    
    
function onChange(e) {
    const name= e.target.name;
    const value = e.target.value;

    const newProduct = {...product, [name]: value}; 
    setProduct(newProduct);
}

function onSave() {
    if(product.id===0){
        create(product).then((response)=>{
            console.log(response)
            navigate('/', {replace: true, state:response});
        });
    } else{
        update(product).then((response)=> 
            navigate(`/products/${product.id}`, {replace:true, state:response})
        );
    }
}

function onDelete() {
    remove(product.id).then((response) => 
    navigate('/', { replace: true, state: response})
    );
}

    return (
    <form>
    <div>
        <TextField 
        onChange={onChange}
        value={product.title}
        name = "title" 
        id="title" 
        label = "Titel" />
    </div>
    <div>
        <TextField 
        onChange={onChange}
        value={product.body}
        multiline 
        minRows={5} 
        name="body" 
        id="body" 
        label="Beskrivning" />
    </div>
    <div>
        <TextField
        onChange={onChange}
        value = {product.price}
        name="price" 
        id="price" 
        label="Pris" 
        type='number' 
        />
    </div>
    <div>
    <TextField 
    onChange={onChange}
    value={product.imageUrl}
    name= 'imageUrl' 
    id='imageUrl' 
    label = 'Sökväg till bild'
    />
    </div>


    {/* 
    **** Vi tycker inte att cart passar in här
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
        <Button onClick={onDelete} variant="contained" color="error">
        Ta bort 
    </Button>
    )}
      <Button onClick={onSave} variant="contained" color="success">
        Spara
    </Button>
    </div>
    </form>
    );
}


export default ProductEdit;