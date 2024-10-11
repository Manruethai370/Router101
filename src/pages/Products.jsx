import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';
 
function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);
  const [newProduct, setNewProduct] = useState({
    id: productList.length + 1, // ตั้ง id ใหม่จากจำนวนสินค้าใน list
    name: '',
    price: '',
    description: ''
  });
 
  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };
 
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.description) {
      dispatch(addProduct(newProduct));
      setNewProduct({
        id: newProduct.id + 1,
        name: '',
        price: '',
        description: ''
      });
    } else {
      alert('');
    }
  };
 
  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };
 
  return (
<div>
<h2>การสั่งซื้อสินค้า</h2>
<ul>
        {productList.map(product => (
<li key={product.id}>
<Link to={`/product/${product.id}`}>
              {product.name} - {product.price}
</Link>
<button onClick={() => handleRemoveProduct(product.id)}>ลบสินค้า</button>
</li>
        ))}
</ul>
 
      <h3>ป้อนข้อมูลสินค้า</h3>
<input 
        type="text" 
        name="name" 
        placeholder="ชื่อสินค้า" 
        value={newProduct.name} 
        onChange={handleInputChange} 
      />
<input 
        type="text" 
        name="price" 
        placeholder="ราคาสินค้า" 
        value={newProduct.price} 
        onChange={handleInputChange} 
      />
<input 
        type="text" 
        name="description" 
        placeholder="รายละเอียดสินค้า" 
        value={newProduct.description} 
        onChange={handleInputChange} 
      />
<button onClick={handleAddProduct}>เพิ่มสินค้า</button>
</div>
  );
}
 
export default Products;