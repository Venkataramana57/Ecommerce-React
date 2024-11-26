import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link, Container, Grid } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './../../slices/authSlice';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
			const result = await window.apiClient.post('login', { email, password })
			if(result.status === 201) {
        dispatch(login(result.data))
				navigate('/');
      }
    } catch (error) {
      console.error('Login failed', error);
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
					<Grid item xs>
						<Link component={RouterLink} to="/signup" variant="body2">
							Forgot Password?
						</Link>
					</Grid>
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
