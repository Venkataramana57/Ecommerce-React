import axios from 'axios';

const apiClient = axios.create({
	baseURL: '/api/v1'
});

apiClient.interceptors.request.use(
	(config) => {
		const accessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:ecom')).auth).accessToken
		if(accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	err => {
		Promise.reject(err);
	}
);

export default apiClient;