import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListBook() {

    const [product, setProduct] = useState([]);
    useEffect(() => {
        getProduct();
    }, []);

    function getProduct() {

        axios.get('http://localhost:8080/react_book/api/product').then(function(response) {
            console.log(response.data);
            setProduct(response.data);
        });
    }

    const deleteBook = (id) => {
        axios.delete(`http://localhost:8080/react_book/api/${id}/delete`).then(function(response){
            console.log(response.date);
            getProduct();
        });
    }

    return (
        <div className=" text-center">
        <h1 className="my-5">Könyv Lista</h1>
        <table className="table table-striped table-hover text-center shadow">
            <thead>
                <tr>
                    <th>#</th>                    
                    <th>category_id</th>                    
                    <th>Szerző</th>
                    <th>Cím</th>
                    <th>Ár</th>
                    <th>Leírás</th>
                </tr>
            </thead>
            <tbody>
                {product.map((book, key) =>
                <tr key={key}>
                <td>{book.id}</td>                
                <td>{book.category_id}</td>                
                <td>{book.author}</td>
                <td>{book.title}</td>
                <td>{book.price} Ft</td>
                <td>{book.description}</td>
                <td>
                    <Link className='mx-2 btn btn-warning py-1' to={`book/${book.id}/edit`} >módosít</Link>
                    <button className='btn btn-danger p-1 my-2' onClick={() => deleteBook(book.id)}  >Törlés</button>
                </td>
                </tr>
                )}
                
            </tbody>
        </table>
        </div>
    )
}

