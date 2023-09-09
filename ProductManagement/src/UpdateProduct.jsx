import React ,{useState, useEffect}from 'react';
import{useParams, useNavigate} from "react-router-dom";
import axios from 'axios'


function UpdateProduct() {
    const{id} = useParams()
    const [productName, setProductName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    useEffect(() => {
        axios.get('http://localhost:3001/getProduct/'+id)
            .then(result => {
                console.log(result)
                setImage(result.data.image)
                setProductName(result.data.productName)
                setDescription(result.data.description)
                setPrice(result.data.price)
                
            })
            .catch(err => console.log(err))

    }, [])

    const Update = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);
        axios.put("http://localhost:3001/updateProduct/" + id, formData)
            .then(result => {
                console.log(result)
                navigate('/')
            })
            .catch(err => console.log(err))
        
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Update}>
                    <h2>Update Product</h2>
                    <div className='mb-3'>
                        <label htmlFor='image' > Product Image </label>
                        <input type='file' className='form-control'
                            onChange={handleImageChange}
                        />
                        </div>
                    <div className='mb-2'>
                        <label htmlFor="">Product Name</label>
                        <input type="text" placeholder='Enter Name' className='form-control' 
                            value={productName} onChange={(e) => setProductName(e.target.value)}/>

                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Description</label>
                        <input type="text" placeholder='Enter Description' className='form-control'
                            value={description} onChange={(e) => setDescription(e.target.value)}/>

                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Price</label>
                        <input type="text" placeholder='Enter Price' className='form-control'
                            value={price} onChange={(e) => setPrice(e.target.value)} />

                    </div>
                    <button className='btn btn-success'>Submit</button>

                </form>

            </div>
        </div>
    )
}
export default UpdateProduct;