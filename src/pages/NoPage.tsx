import { useContext, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {AlertContext} from '../providers/AlertProvider';

const NoPage: React.FC = () => {
  const navigate = useNavigate();
  const openSnackbar = useContext(AlertContext) as (message: string, severity: 'error') => void;

  useEffect(() => {
    openSnackbar('Page not found!', 'error');
  }, [openSnackbar]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        The page you are looking for doesn't exist or has been moved.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NoPage;
