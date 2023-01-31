import { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const {id} = useParams();
    useEffect(() => {
        getBook();
    }, []);

    function getBook() {

        axios.get(`http://localhost:8080/react_book/api/${id}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost:8080/react_book/api/${id}/edit`, inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
        
    }
    return (
        <div>
            <h1>Edit user</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Kategória</label>
                            </th>
                            <td>
                                <select name="category_id" className="form-control my-2" onChange={handleChange} value={inputs.category_id} >
                                    <option value="1">Szép Irodalom</option>
                                    <option value="2">Fantasy</option>
                                    <option value="3">Ezotéria</option>
                                    <option value="4">Történelem</option>
                                    <option value="5">Utazás</option>
                                    <option value="6">Gasztronómia</option>                                  
                                </select>
                            </td>                            
                        </tr>
                        <tr>
                            <th>
                                <label>Szerző: </label>
                            </th>
                            <td>
                                <input value={inputs.author} type="text" name="author" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Cím: </label>
                            </th>
                            <td> 
                                <input value={inputs.title} type="text" name="title" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Ár: </label>
                            </th>
                            <td>
                                <input value={inputs.price} type="text" name="price" onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Leírás: </label>
                            </th>
                            <td>
                                <textarea name="description" value={inputs.description} className="form-control my-2" cols="30" rows="10" onChange={handleChange}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align ="right">
                                <button>Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}
