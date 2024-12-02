import React, { useState, useEffect, useContext } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../../providers/AlertProvider';
import { Product, FormData as FD } from './../../interfaces/Product';

interface FormProps {
  product?: Product | null;
  handleSubmit: (formData: FormData) => void;
  resetEditable?: () => void;
}

const Form: React.FC<FormProps> = ({ product = null, handleSubmit, resetEditable }) => {
  const navigate = useNavigate();
  const openSnackbar = useContext(AlertContext);
  const [formData, setFormData] = useState<FD>({
    title: '',
    description: '',
    price: '',
    quantity: 0,
    images: []
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price.$numberDecimal,
        quantity: product.quantity,
        images: []  // Keep images empty for a new product or handle them for existing products
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setFormData((prevState) => ({ ...prevState, images: fileArray }));
    }
  };

  const setValidation = (): boolean => {
    let isValid = true;
    if (!formData.title) {
      isValid = false;
      openSnackbar('Title is required', 'error');
      return isValid;
    }
    if (!formData.description) {
      isValid = false;
      openSnackbar('Description is required', 'error');
      return isValid;
    }
    if (!formData.price) {
      isValid = false;
      openSnackbar('Price is required', 'error');
      return isValid;
    }
    if (!formData.quantity || Number(formData.quantity) > 20) {
      isValid = false;
      openSnackbar('Quantity is required and max quantity should be 20', 'error');
      return isValid;
    }
    return isValid;
  };

  const submitForm = async () => {
    const isFormValid = setValidation();
    if (!isFormValid) return;

    const form = new FormData()
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('price', String(formData.price));
    form.append('quantity', String(formData.quantity));

    formData.images.forEach(image => {
      form.append('images', image);
    })

    handleSubmit(form);
  };

  const handleNavigation = () => {
    product ? resetEditable?.() : navigate('/products');
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          {product ? 'Edit Product' : 'Create Product'}
        </Typography>
        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          margin="normal"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          fullWidth
          margin="normal"
          value={formData.price}
          onChange={handleChange}
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          fullWidth
          margin="normal"
          value={formData.quantity}
          onChange={handleChange}
        />

        {/* File input for uploading images */}
        <input
          accept="image/*"
          id="image-upload"
          type="file"
          multiple
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <label htmlFor="image-upload">
          <Button variant="outlined" component="span" sx={{ mt: 2 }}>
            Upload Images
          </Button>
        </label>

        {formData.images.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Selected Images:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {formData.images.map((file: any, index) => (
                <Box key={index} sx={{ marginRight: 2, marginBottom: 2 }}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button variant="outlined" onClick={handleNavigation}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={submitForm}>
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Form;
