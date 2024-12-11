import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { CloseRounded } from '@mui/icons-material';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100vh; /* Full height of the viewport */
  overflow-y: auto; /* Allows scrolling if content overflows */
`;

const FormTitle = styled.h2`
  font-size: 24px;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 20px; /* Space below the title */
`;

const ProductForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProductContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};

  &:focus {
    border-color: ${({ theme }) => theme.secondary};
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: #fff;
  background-color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const AddButton = styled(Button)`
  background-color: ${({ theme }) => theme.secondary};
  margin-top: 10px;
`;

const Error = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.red};
  margin: 4px 0;
`;

const ProductAddPage = () => {
  const [products, setProducts] = useState([
    { title: '', name: '', desc: '', img: '', price: { org: '', mrp: '', off: '' }, sizes: '', category: '' }
  ]);

  const handleChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleNestedChange = (index, field, nestedField, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field][nestedField] = value;
    setProducts(updatedProducts);
  };

  const addNewProduct = () => {
    setProducts([...products, { title: '', name: '', desc: '', img: '', price: { org: '', mrp: '', off: '' }, sizes: '', category: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/products/add', products);
      console.log(response.data);
      alert('Products added successfully');
    } catch (error) {
      console.error('Failed to add products:', error);
      alert('Failed to add products');
    }
  };

  return (
    <Container>
      <FormTitle>Add Products</FormTitle>
      <ProductForm onSubmit={handleSubmit}>
        {products.map((product, index) => (
          <ProductContainer key={index}>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Title"
              value={product.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              required
            />
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Name"
              value={product.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              required
            />
            <Label>Description</Label>
            <Input
              type="text"
              placeholder="Description"
              value={product.desc}
              onChange={(e) => handleChange(index, 'desc', e.target.value)}
              required
            />
            <Label>Image URL</Label>
            <Input
              type="text"
              placeholder="Image URL"
              value={product.img}
              onChange={(e) => handleChange(index, 'img', e.target.value)}
              required
            />
            <Label>Original Price</Label>
            <Input
              type="number"
              placeholder="Original Price"
              value={product.price.org}
              onChange={(e) => handleNestedChange(index, 'price', 'org', e.target.value)}
              required
            />
            <Label>MRP</Label>
            <Input
              type="number"
              placeholder="MRP"
              value={product.price.mrp}
              onChange={(e) => handleNestedChange(index, 'price', 'mrp', e.target.value)}
              required
            />
            <Label>Discount Percentage</Label>
            <Input
              type="number"
              placeholder="Discount Percentage"
              value={product.price.off}
              onChange={(e) => handleNestedChange(index, 'price', 'off', e.target.value)}
              required
            />
            <Label>Sizes (comma-separated)</Label>
            <Input
              type="text"
              placeholder="Sizes"
              value={product.sizes}
              onChange={(e) => handleChange(index, 'sizes', e.target.value.split(','))}
            />
            <Label>Categories (comma-separated)</Label>
            <Input
              type="text"
              placeholder="Categories"
              value={product.category}
              onChange={(e) => handleChange(index, 'category', e.target.value.split(','))}
            />
          </ProductContainer>
        ))}
        <AddButton type="button" onClick={addNewProduct}>Add Another Product</AddButton>
        <Button type="submit">Submit</Button>
      </ProductForm>
    </Container>
  );
};

export default ProductAddPage;
