import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertContext } from '../../providers/AlertProvider';
import Form from './Form';
import ProductItem from './../../components/products/Product';
import {Product} from './../../interfaces/Product';

const Details: React.FC = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [editable, setEditable] = useState<boolean>(false);
  const openSnackbar = useContext(AlertContext);

  const fetchProductById = useCallback(
    async (productId: string) => {
      try {
        const result = await window.apiClient(`/products/${productId}`);
        if (result.status === 200 && result.data._id) {
          setProduct(result.data as Product);
          setEditable(false as boolean);
        } else {
          openSnackbar('Product is not available or something went wrong', 'error');
          navigate('/products');
        }
      } catch (error: any) {
        openSnackbar(error.message, 'error');
      }
    },
    [navigate, openSnackbar]
  );

  const deleteProduct = async (): Promise<void> => {
    try {
      const result = await window.apiClient.delete(`/products/${productId}`);
      if (result.status === 201) {
        openSnackbar('Product deleted successfully', 'success');
        navigate('/products');
      } else {
        openSnackbar('Error deleting product', 'error');
      }
    } catch (error: any) {
      openSnackbar(error.message, 'error');
    }
  };

  const updateProduct = async (formData: any) => {
    try {
      const result = await window.apiClient.patch(`/products/${productId}`, formData);
      if (result.status === 201) {
        openSnackbar('Product updated successfully', 'success');
        fetchProductById(productId!);
      } else {
        openSnackbar('Error updating product', 'error');
      }
    } catch (error: any) {
      openSnackbar(error.message, 'error');
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
    }
  }, [productId, fetchProductById]);

  const setEditableForm = () => {
    setEditable(true);
  };

  if (product && editable) {
    return (
      <Form product={product} resetEditable={() => setEditable(false)} handleSubmit={updateProduct} />
    );
  }

  return (
    <Container sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <Typography variant="h4">Product Details</Typography>
      </Box>
      {product && (
        <ProductItem product={product} deleteProduct={deleteProduct} setEditableForm={setEditableForm} />
      )}
    </Container>
  );
};

export default Details;
