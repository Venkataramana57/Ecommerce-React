import { useState, useEffect, useCallback } from 'react';
import { Container, Card, CardMedia, CardContent, Button, Box, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from './Form';
import {add, remove} from './../../slices/cartSlice';

const Details = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productId = useParams().id;
  const [product, setProduct] = useState(null);
  const [editable, setEditable] = useState(false);
  const [itemAddedToCart, setItemAddedToCart] = useState(false);
  const cartItems = useSelector((state) => state.cart && state.cart.items);

  const fetchProductById = useCallback(async (productId) => {
    try {
      const result = await window.apiClient(`/products/${productId}`);
      if(result.status === 200 && result.data._id) {
        setProduct(result.data);
        setEditable(false);
        setItemAddedToCart(cartItems && cartItems.includes(productId));
      } else {
        navigate('/products')
      }
    }
    catch (error) {
      console.log(error);
    }
  }, [navigate, cartItems])

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

  const addOrRemoveCart = async (e) => {
    console.log(111, cartItems)
    e.preventDefault();
    try {
      const url = itemAddedToCart ? 'remove_cart' : 'add_cart';
      const result = await window.apiClient.post(`${url}/${productId}`);
      if(result.status === 200) {
        itemAddedToCart ? dispatch(remove(productId)) : dispatch(add(productId));
      }
    } catch (error) {
      console.log(error);
    }
  }

  if(product && editable) {
    return(
      <Form product={product} resetEditable={() => setEditable(false)} handleSubmit={updateProduct}/>
    )
  }

  return(
    <Container>
      {product && !editable && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
          <Card sx={{ maxWidth: 800 }}>
            <CardMedia
              component="img"
              alt={product.title}
              height="300"
              image={'https://via.placeholder.com/800x300'}
              sx={{ borderRadius: 1 }}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {product.description}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Price: ${product.price.$numberDecimal}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Quantity Available: {product.quantity}
              </Typography>
            </CardContent>
            {/* Buttons */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
              }}
            >
              {/* Edit and Delete Buttons */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={() => {
                    setEditable(true)
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={(e) => {
                    deleteProduct(e)
                  }}
                >
                  Delete
                </Button>
              </Box>
              {/* Add to Cart Button */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    addOrRemoveCart(e)
                  }}
                >
                  {itemAddedToCart ? 'Remove from' : 'Add to'} Cart
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => {
                    navigate('/products')
                  }}
                >
                  Back
                </Button>
              </Box>
            </Box>
          </Card>
        </Box>
      )}
    </Container>
  )
}

export default Details;