import axios from "axios";

const instance = axios.create({baseURL: 'http://localhost:4000/'})

export const authAPI = {
	singIn: (values) => instance.post('auth/singIn', values).then(res => res.data),
	singUp: (values) => instance.post('auth/singUp', values).then(res => res.data),
	isAuth: () => instance.post('auth/isAuth', {token: JSON.parse(localStorage.getItem('token'))}).then(res => res.data),
}

export const messagesAPI = {
	sendMessage: (data) => instance.post('messages/send', data),
	sendCSV: (data) => instance.post('messages/csv', data),
	saveDraft: (data) => instance.post('messages/saveDraft', data),
	uploadDraft: (user) => instance.get(`messages/uploadDraft?user=${user}`)
}