
import ProductItemSmall from './ProductItemSmall';
function ProductList() {

const products =[
    {
        "id": 1,
        "title": "Ett stilla hav",
        "body": "Naturposter: Ett stilla hav med solnedgång. Storlek: 50 x 70 cm.",
        "imageUrl": "http://bild1.com",
        "price": 550,
        "createdAt": "2024-03-18T17:34:22.000Z",
        "updatedAt": "2024-03-19T08:46:45.000Z",
        "carts": [],
        "reviews": []
    },
    {
        "id": 2,
        "title": "En sommaräng",
        "body": "Naturposter: En sommaräng med blommor. Storlek: 50 x 70 cm.",
        "imageUrl": "http://bild2.com",
        "price": 500,
        "createdAt": "2024-03-18T17:36:58.000Z",
        "updatedAt": "2024-03-19T07:56:18.000Z",
        "carts": [],
        "reviews": []
    },
    {
        "id": 3,
        "title": "Hundvalpar",
        "body": "Djurposter: Hundvalpar som leker i gräset. Storlek: 50 x 70 cm.",
        "imageUrl": "http://bild3.com",
        "price": 399,
        "createdAt": "2024-03-19T15:43:31.000Z",
        "updatedAt": "2024-03-20T08:25:28.000Z",
        "carts": [],
        "reviews": []
    },
    {
        "id": 4,
        "title": "Kattungar",
        "body": "Djurposter: Kattungar som leker i gräset. Storlek: 50 x 70 cm.",
        "imageUrl": "http://bild4.com",
        "price": 299,
        "createdAt": "2024-03-20T08:24:24.000Z",
        "updatedAt": "2024-03-20T08:24:49.000Z",
        "carts": [],
        "reviews": []
    }
];


  return  (
<ul>
      {products?.length > 0 ? (
        products.map((product) => (
          <li key={`products_${product.id}`}>
            <ProductItemSmall product={product} />
          </li>
        ))
      ) : (
        <h3>Kunde inte hämta produkt</h3>
      )}
    </ul>




  );
}

export default ProductList;


