import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Form = ({ product=null, handleSubmit, resetEditable }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    { title: '', description: '', image: '', price: '', quantity: '' }
  );

  useEffect(() => {
    if(product) {
      setFormData({
        title: product.title, description: product.description, image: '', price: product.price.$numberDecimal, quantity: product.quantity
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    handleSubmit(formData);
  };

  const handleNavigation = () => {
    product ? resetEditable() : navigate('/products');
  }

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
          margin="normal"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          label="Image URL"
          name="image"
          fullWidth
          margin="normal"
          value={formData.image}
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
					<Button variant="outlined" onClick={() => handleNavigation()}>
						Cancel
					</Button>
					<Button
            variant="contained"
            color="primary"
            onClick={submitForm}
            >
            Save
          </Button>
				</Box>
      </Box>
    </Container>
  );
};

export default Form;
