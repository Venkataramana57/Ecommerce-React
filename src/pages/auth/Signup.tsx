import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Link, Container, Grid } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {AlertContext} from '../../AlertProvider';

const Signup: React.FC = () => {
	interface Form {
		name: string,
		email: string,
		password: string,
		role: string
	}

	const openSnackbar = useContext(AlertContext);
	const navigate = useNavigate();
	const [formData, setFormData] = useState<Form>({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

	const setValidation = (): boolean => {
		let isValid = true;
		if(!formData.name || !formData.email || !formData.password || !formData.role) {
			isValid = false;
			openSnackbar('All fields required!', 'error');
		}
		return isValid;
	}

  const handleSignup = async (): Promise<void> => {
		const isFormValid = setValidation();
		if(!isFormValid) return;

    try {
			const result = await window.apiClient.post('signup', formData);
			if(result.status === 201 && !result.data.error) {
				openSnackbar('Login successful!', 'success');
				navigate('/login');
      } else {
				openSnackbar('Login successful!', 'error');
			}
    } catch (error: any) {
			const errMsg = error.response && error.response.data && error.response.data.message;
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
