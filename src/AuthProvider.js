import { useState, createContext, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from './slices/authSlice';
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
	const dispatch = useDispatch();
	const loggedinUser = useSelector((state) => state.auth.currentUser);
	const isLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
	const [isRetailer, setIsRetailer] = useState(false);
	const [currentUser, setcurrentUser] = useState(null);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

	useEffect(() => {
		setcurrentUser(loggedinUser);
		setIsUserLoggedIn(isLoggedIn);
		if(isLoggedIn) setIsRetailer(loggedinUser.role === 'retailer');
	}, [loggedinUser, isLoggedIn, isRetailer]);

	const logOut = () => {
		dispatch(logout());
	}

	return(
		<AuthContext.Provider value={{currentUser, isUserLoggedIn, isRetailer, logOut}}>
			{children}
		</AuthContext.Provider>
	)
};

export default AuthProvider;