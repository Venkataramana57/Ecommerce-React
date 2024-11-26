import {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import {add, remove} from './../../slices/cartSlice';
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid
} from '@mui/material';

const Product = ({product, listing, setEditableForm, deleteProduct}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isUserLoggedIn, isRetailer} = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart && state.cart.items);
  const [itemAddedToCart, setItemAddedToCart] = useState(false);

  useEffect(() => {
    setItemAddedToCart(cartItems && cartItems.includes(product._id));
  }, [product._id, cartItems])

  const addOrRemoveCart = async (e) => {
    e.preventDefault();
    if(!isUserLoggedIn) {
      navigate('/login');
      return;
    }
    try {
      const url = itemAddedToCart ? 'remove_cart' : 'add_cart';
      const result = await window.apiClient.post(`${url}/${product._id}`);
      if(result.status === 201) {
        itemAddedToCart ? dispatch(remove(product._id)) : dispatch(add(product._id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 800 }}>
        <CardMedia
          component="img"
          alt={product.title}
          height="300"
          image={'https://via.placeholder.com/150'}
          sx={{ borderRadius: 1 }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Details: {product.description || 'N/A'}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Price: ${product.price.$numberDecimal}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Quantity Available: {product.quantity}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              {isRetailer && !listing && <Button
                variant="outlined"
                color="info"
                onClick={setEditableForm}
              >
                Edit
              </Button>}

              {isRetailer && !listing && <Button
                variant="outlined"
                color="error"
                onClick={deleteProduct}
              >
                Delete
              </Button>}

              {!isRetailer && <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  addOrRemoveCart(e)
                }}
              >
                {itemAddedToCart ? 'Remove from' : 'Add to'} Cart
              </Button>}
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {listing && <Button
                variant="outlined"
                color="info"
                onClick={() => {
                  navigate(`/products/${product._id}`)
                }}
                >
                Details
              </Button>}
              {!listing && <Button
                variant="outlined"
                color="warning"
                onClick={() => {
                  navigate('/products')
                }}
              >
                Back
              </Button>}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Product;