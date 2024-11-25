import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Link, Container, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';

const Signup = () => {
	const { currentUser, isUserLoggedIn } = useContext(AuthContext);
	console.log(1111111, 2222, currentUser, isUserLoggedIn)
	const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
			const response = await window.apiClient.post('signup', formData);
			alert('Signup successful!');
			console.log(1111, response)
    } catch (error) {
      console.error('Signup failed', error);
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
					Sign Up
				</Typography>
				<TextField
					label="Name"
					name="name"
					variant="outlined"
					fullWidth
					margin="normal"
					value={formData.name}
					onChange={handleChange}
				/>
				<TextField
					label="Email"
					name="email"
					variant="outlined"
					fullWidth
					margin="normal"
					value={formData.email}
					onChange={handleChange}
				/>
				<TextField
					label="Password"
					name="password"
					type="password"
					variant="outlined"
					fullWidth
					margin="normal"
					value={formData.password}
					onChange={handleChange}
				/>
				<TextField
					label="Role"
					name="role"
					select
					fullWidth
					margin="normal"
					value={formData.role}
					onChange={handleChange}
				>
					<MenuItem value="retailer">Retailer</MenuItem>
					<MenuItem value="customer">Customer</MenuItem>
				</TextField>

				<Button onClick={handleSignup} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
					Sign Up
				</Button>

				<Grid container>
					<Grid item>
						<Link component={RouterLink} to="/login" variant="body2">
							{"Do you have an account already? Login"}
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Container>
  );
};

export default Signup;