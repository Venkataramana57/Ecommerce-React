import React, { useContext, useState } from 'react';
import { TextField, Button, Box, Typography, Link, Container, Grid } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/authSlice';
import { AlertContext } from '../../AlertProvider';

const Login: React.FC = () => {
  const openSnackbar = useContext(AlertContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State variables with types
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Handle Login function
  const handleLogin = async (): Promise<void> => {
    if (!email.length || !password.length) {
      openSnackbar('Please enter email and password', 'error');
      return;
    }
    try {
      const result = await window.apiClient.post('login', { email, password });
      if (result.status === 201 && !result.data.error) {
        dispatch(login(result.data));
        openSnackbar('Login successful!', 'success');
        navigate('/');
      } else {
        openSnackbar('Invalid credentials', 'error');
      }
    } catch (error: any) {
      const errMsg = error.response?.data?.message || 'An error occurred';
      openSnackbar(errMsg, 'error');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
          width: '100%',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={handleLogin} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Login
        </Button>

        <Grid container>
          <Grid item>
            <Link component={RouterLink} to="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
