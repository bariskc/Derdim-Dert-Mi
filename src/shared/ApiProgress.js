import { useEffect, useState } from 'react';
import axios from 'axios';

export const useApiProgress = (apiMethod, apiPath) => {
	const [pendingAPICall, setPendingAPICall] = useState(false);
	useEffect(() => {

		let requestInterceptor, responseInterceptor;
		const updateAPICallFor = (method, url, inProgress) => {
			if (url === apiPath  && method === apiMethod) {
				setPendingAPICall(inProgress);
			}
		}
		const registerInterceptors = () => {
			requestInterceptor = axios.interceptors.request.use(request => {
				const {url, method} = request
				updateAPICallFor(method, url, true);
				return request;
			})

			responseInterceptor = axios.interceptors.response.use(
				response => {
					const {url, method} = response.config;
					updateAPICallFor(method, url, false);
					return response;
				},
				error => {
					const {url, method} = error.config;
					updateAPICallFor(method, url, false);
					throw error;
				}
			);
		}
		const unregisterInterceptors = () => {
			axios.interceptors.request.eject(requestInterceptor);
			axios.interceptors.request.eject(responseInterceptor);
		}
		registerInterceptors();
		return function unMount() {
			unregisterInterceptors();
		}
	}, [apiPath, apiMethod])

	return pendingAPICall;
}
