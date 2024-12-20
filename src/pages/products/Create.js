import { useEffect, useContext } from 'react';
import Form from './Form';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from './../../AuthProvider';
import {AlertContext} from './../../AlertProvider';

const Create = () => {
  const navigate = useNavigate();
  const {isUserLoggedIn, isRetailer} = useContext(AuthContext);
  const openSnackbar = useContext(AlertContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      if(!isUserLoggedIn || !isRetailer) {
        openSnackbar('You are not authorised to create a product!', 'error');
        navigate('/');
      }
    }, 200);

    return () => clearTimeout(timer);    
  }, [isUserLoggedIn, isRetailer, navigate, openSnackbar])

  const handleCreate = async (formData) => {
    console.log('Form Data:', formData);
    try {
      const result = await window.apiClient.post('/products', formData);
      if(result.status === 201) {
        openSnackbar('Product created successfully!', 'success');
        navigate('/products');
      } else {
        openSnackbar('Error creating a product', 'error');
      }
    } catch (error) {
      const errMsg = error.response && error.response.data && error.response.data.message;
      openSnackbar(errMsg, 'error');
    }
  };

  return <Form handleSubmit={handleCreate} />;
}

export default Create;