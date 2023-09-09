import { useState } from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Product from './Product';
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateProduct';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Product/>}></Route>
        <Route path='/Create' element={<CreateProduct/> }></Route>
        <Route path='/Update/:id' element={<UpdateProduct/> }></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
