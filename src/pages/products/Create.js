import Form from './Form';
import {useNavigate} from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    console.log('Form Data:', formData);
    try {
      const result = await window.apiClient.post('/products', formData);
      if(result.data) navigate('/products');
    } catch (error) {
      console.error('Error while creating product:', error);
    }
  };

  return <Form handleSubmit={handleCreate} />;
}

export default Create;