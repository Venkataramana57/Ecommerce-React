import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
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
      const response = await window.apiClient.get('products');
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

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
		<Box sx={{ padding: 3 }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
				<Typography variant="h4">Products</Typography>
				<Button variant="contained" color="primary" onClick={() => navigate('/products/new')}>
					New
				</Button>
			</Box>
			<Grid container spacing={2}>
				{products.length > 0 &&
					products.map((product) => (
						<Grid item xs={12} sm={6} md={4} key={product._id}>
							<Card>
								<CardMedia
									component="img"
									height="140"
									image={'https://via.placeholder.com/150'}
									alt={product.title}
								/>
								<CardContent>
									<Typography variant="h6" gutterBottom>
										{product.title}
									</Typography>
									<Typography variant="body2" color="textSecondary">
										{product.description}
									</Typography>
									<Typography>${product.price.$numberDecimal}</Typography>
									<Typography>Quantity: {product.quantity}</Typography>

									{/* Button container */}
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'flex-end',
											gap: 1, // Adds space between buttons
											marginTop: 2, // Adds space above the buttons
										}}
									>
										<Button
											variant="contained"
											color="primary"
											size="small"
											onClick={() => navigate(`/products/${product._id}`)}
										>
											Detail
										</Button>
										<Button
											variant="contained"
											color="error"
											size="small"
											onClick={() => navigate(`/`)}
										>
											Delete
										</Button>
									</Box>
								</CardContent>
							</Card>
						</Grid>
					))}
			</Grid>
		</Box>

  );
};

export default List;
