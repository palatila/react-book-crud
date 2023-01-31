import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ListBook from './Components/ListBook';
import EditBook from './Components/EditBook';
import CreateBook from './Components/CreateBook';

function App() {
  return (
     <Router>
  <div className='container'>
      <Navbar/>
      <Routes>         
         <Route path="/createbook" element={<CreateBook/>} />
         <Route path="/" element={<ListBook/>} />
         <Route path="/book/:id/edit" element={<EditBook/>} />
      </Routes>
  </div>
  </Router>
  );
}

export default App;
