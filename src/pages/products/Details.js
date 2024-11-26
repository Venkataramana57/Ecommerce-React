import { useState, useEffect, useCallback } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Form from './Form';
import ProductItem from './../../components/products/Product'

const Details = () => {
  const navigate = useNavigate();
  const productId = useParams().id;
  const [product, setProduct] = useState(null);
  const [editable, setEditable] = useState(false);

  const fetchProductById = useCallback(async (productId) => {
    try {
      const result = await window.apiClient(`/products/${productId}`);
      if(result.status === 200 && result.data._id) {
        setProduct(result.data);
        setEditable(false);
      } else {
        navigate('/products')
      }
    }
    catch (error) {
      console.log(error);
    }
  }, [navigate])

  const deleteProduct = async (e) => {
    e.preventDefault();
    try {
      const result = await window.apiClient.delete(`/products/${productId}`)
      if(result.status === 201) {
        navigate('/products');
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateProduct = async (formData) => {
    try {
      const result = await window.apiClient.patch(`/products/${productId}`, formData);
      if(result.status === 201) {
        fetchProductById(productId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProductById(productId)
  }, [productId, fetchProductById]);

  const setEditableForm = () => {
    setEditable(true);
  }

  if(product && editable) {
    return(
      <Form product={product} resetEditable={() => setEditable(false)} handleSubmit={updateProduct}/>
    )
  }

  return(
    <Container sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <Typography variant="h4">Product Details</Typography>
      </Box>
      {product && <ProductItem product={product} deleteProduct={deleteProduct} setEditableForm={setEditableForm}/>}
    </Container>
  )
}

export default Details;