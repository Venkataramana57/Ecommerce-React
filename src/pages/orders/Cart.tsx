import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from '../../components/products/Product';
import { useDispatch } from 'react-redux';
import { clear } from '../../slices/cartSlice';
import { AlertContext } from '../../providers/AlertProvider';
import { AuthContext } from '../../providers/AuthProvider';
import { Product } from '../../interfaces/Product';

import {
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

interface LoginCheck {
  isUserLoggedIn: boolean;
  isRetailer: boolean;
}

const List: React.FC = () => {
  const { isUserLoggedIn, isRetailer } = useContext(AuthContext) as LoginCheck;

  const dispatch = useDispatch();
  const openSnackbar = useContext(AlertContext) as (
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error'
  ) => void;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // Dialog State
  const navigate = useNavigate();

  const getProducts = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      const response = await window.apiClient.get('checkout');
      const products = response?.data || [];

      if (!products.length) {
        openSnackbar('No items added to cart', 'info');
      } else {
        setProducts(products as Product[]);
      }
    } catch (err: unknown) {
      openSnackbar('Failed to load cart items', 'error');
      setError('Failed to load cart items.');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setProducts, setError, openSnackbar]);

  useEffect(() => {
    if (!isUserLoggedIn || (isUserLoggedIn && isRetailer)) {
      openSnackbar('You are not authorised to cart page!', 'error');
      navigate('/');
    } else {
      getProducts();
    }
  }, [isUserLoggedIn, isRetailer, getProducts, openSnackbar, navigate]);

  const buyCart = async () => {
    try {
      const result = await window.apiClient.post('purchage');
      if (result.status === 201) {
        openSnackbar('Purchased items successfully!', 'success');
        dispatch(clear());
        navigate('/products');
      }
    } catch (error: any) {
      openSnackbar(error.message as string, 'error');
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

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
            <ProductItem product={product} listing={true} key={product._id} />
          ))}
      </Grid>

      {/* Purchase Items Button */}
      {products.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => setIsDialogOpen(true)} // Open confirmation dialog
          >
            Purchase Items
          </Button>
        </Box>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Purchase!!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to purchase these items?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={buyCart} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default List;
