import { useEffect, useState } from 'react';
import axios from 'axios';

export const useApiProgress = (apiPath) => {
	const [pendingAPICall, setPendingAPICall] = useState(false);
	useEffect(() => {

		let requestInterceptor, responseInterceptor;
		const updateAPICallFor = (url, inProgress) => {
			if (url === apiPath) {
				setPendingAPICall(inProgress);
			}
		}
		const registerInterceptors = () => {
			requestInterceptor = axios.interceptors.request.use(request => {
				updateAPICallFor(request.url, true);
				return request;
			})

			responseInterceptor = axios.interceptors.response.use(
				response => {
					updateAPICallFor(response.config.url, false);
					return response;
				},
				error => {
					updateAPICallFor(error.config.url, false);
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
	})

	return pendingAPICall;
}
