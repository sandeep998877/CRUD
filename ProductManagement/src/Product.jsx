import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import axios from "axios";

 function Product() {
    const [products, setProducts]= useState([])

    useEffect(()=>{
      axios.get('http://localhost:3001')
      .then(result => setProducts(result.data))
      .catch(err => console.log(err))

    },[])

    const handleDelete = (id) =>{
      axios.delete('http://localhost:3001/deleteProduct/'+id)
  
      .then(res => { console.log(res)
      window.location.reload()})
      .catch(errr => console.log(errr))
    }

  return (
  <>
      <div class="container">
<h1 className='text-align-center'> Product Management</h1>
            <Link to="/create" className="btn btn-success">ADD +</Link>
<div class='row'>
        {
          products.map((product) => {
            return <div class="col-4 p-3">
              <div class="card-group"><div class="card" >
              {product.image ?
                <img height="300px"src={product.image} />
                : ""}
            <div class="card-body">
                <h5 class="card-title">{product.productName}</h5>
                <p class="card-text">{product.description}</p>
                <h2>$ {product.price}</h2>
                <Link to={`/update/${product._id}`} className="btn btn-primary">Update</Link>
                  <button className='btn btn-danger'
                    onClick={(e) => handleDelete(product._id)}>Delete</button>
            </div>
        </div>
        </div>
        </div>
          })
        }
        </div>
        </div>
        </>
  )
}
export default Product;