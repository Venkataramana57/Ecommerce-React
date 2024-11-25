import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Button,
	Grid
} from '@mui/material';

const List = () => {
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
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} key={product._id}>
              {/* Row layout for each cart item */}
              <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                {/* Left: Image */}
                <CardMedia
                  component="img"
                  image={'https://via.placeholder.com/150'}
                  alt={product.title}
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: 1,
                    marginRight: 2,
                  }}
                />

                {/* Right: Details and Button */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexGrow: 1,
                  }}
                >
                  {/* Product Details */}
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {product.description}
                    </Typography>
                    <Typography>${product.price.$numberDecimal}</Typography>
                    <Typography>Quantity: {product.quantity}</Typography>
                  </Box>

                  {/* Remove Button */}
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => navigate(`/products/${product._id}`)}
                    sx={{ marginLeft: 2 }}
                  >
                    Remove from Cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" textAlign="center" sx={{ width: '100%', marginTop: 4 }}>
            Your cart is empty.
          </Typography>
        )}
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
