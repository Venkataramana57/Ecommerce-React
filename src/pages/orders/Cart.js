import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from './../../components/products/Product';
import { useDispatch } from 'react-redux';
import {clear} from './../../slices/cartSlice';
import {
  Box,
  Typography,
  Button,
	Grid
} from '@mui/material';

const List = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await window.apiClient.get('checkout');
      console.log(response.data)
			setProducts(response.data);
    } catch (err) {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const buyCart = async () => {
    try {
      const result = await window.apiClient.post('purchage');
      if(result.status === 201) {
        dispatch(clear());
        navigate('/products');
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
		<Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <Typography variant="h4">Cart Items</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </Box>

      <Grid container spacing={2}>
        {products.length > 0 &&
          products.map((product) => (
            <ProductItem product={product} listing={true} key={product._id}/>
          ))}
      </Grid>

      {/* Purchase Items Button */}
      {products.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => buyCart()}
          >
            Purchase Items
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default List;
