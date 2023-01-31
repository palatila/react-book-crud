import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateBook() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({category_id:0, author:'', title:'', price:0});    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        if (inputs.category_id > 0 && inputs.category_id < 7 ){
            axios.post('http://localhost:8080/react_book/api/product/save', inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
        } 
        else {
            console.log("bár mi");
        }
        
        
    }
    return (
        <div className="w-50 mx-auto text-center">
            <h1 className="my-5">Könyv feltöltés</h1>
            <form onSubmit={handleSubmit} className="form-control">               
                <label className="form-label py-2">Kategória</label>                           
                <select name="category_id" className="form-control my-2" onChange={handleChange}>
                                    <option value="0">Válassz Kategóriát</option>
                                    <option value="1">Szép Irodalom</option>
                                    <option value="2">Fantasy</option>
                                    <option value="3">Ezotéria</option>
                                    <option value="4">Történelem</option>
                                    <option value="5">Utazás</option>
                                    <option value="6">Gasztronómia</option>                                  
                </select>
                <label className="form-label py-2">Szerző:</label>                            
                <input type="text" name="author" onChange={handleChange} className="form-control my-2" />                            
                <label className="form-label py-2">Cím: </label>
                <input type="text" name="title" onChange={handleChange} className="form-control my-2" />                            
                <label className="form-label py-2">Ár:</label>
                <input type="text" name="price" onChange={handleChange} className="form-control my-2" />
                <label className="form-label py-2">Leírás:</label>                           
                <textarea name="description" className="form-control my-2" cols="30" rows="10" onChange={handleChange} ></textarea>
                <button className="btn btn-success">Mentés</button>                            
            </form>
        </div>
    )
}
