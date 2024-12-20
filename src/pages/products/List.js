import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from './../../components/products/Product';
import { AuthContext } from './../../AuthProvider';
import {AlertContext} from './../../AlertProvider';

import {
  Typography,
  Box,
  Button,
  Grid,
  Container
} from '@mui/material';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
	const {isRetailer} = useContext(AuthContext);
  const openSnackbar = useContext(AlertContext);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await window.apiClient.get('products');
      if(!response.data.length) openSnackbar('No products available', 'info');

      setProducts(response.data);
    } catch (err) {
      openSnackbar('Failed to load products', 'error');
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Container sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
          <Typography variant="h4">Products</Typography>
          {isRetailer && <Button variant="contained" color="primary" onClick={() => navigate('/products/new')}>
            New
          </Button>}
        </Box>
        <Grid container spacing={2}>
          {products.length > 0 &&
            products.map((product) => (
							<ProductItem product={product} listing={true} key={product._id}/>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;