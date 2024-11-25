import { useState, createContext, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from './slices/authSlice';
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
	const dispatch = useDispatch();
	const loggedinUser = useSelector((state) => state.auth.currentUser);
	const isLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
	const [currentUser, setcurrentUser] = useState(null);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	useEffect(() => {
		setcurrentUser(loggedinUser);
		setIsUserLoggedIn(isLoggedIn);
	}, [loggedinUser, isLoggedIn]);

	const logOut = () => {
		dispatch(logout());
	}

	return(
		<AuthContext.Provider value={{currentUser, isUserLoggedIn, logOut}}>
			{children}
		</AuthContext.Provider>
	)
};

export default AuthProvider;