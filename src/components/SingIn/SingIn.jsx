import {useForm} from "react-hook-form";
import styles from './singIn.module.css'
import cn from 'classnames'
import {authAPI} from "../../api/api";
import {useContext, useState} from "react";
import {authContext} from "../../context/context";

export const SingIn = () => {
	const [errorMessage, setErrorMessage] = useState()

	const {register, handleSubmit, watch, formState: {errors}} = useForm();
	const auth = useContext(authContext)

	const onSubmit = data =>
		authAPI.singIn(data)
		.then(res =>{
			if (res.responseCode === 1) {
				localStorage.setItem('token', JSON.stringify(res.token))
				authAPI.isAuth()
					.then(res=>auth.setUser(res.email))
			} else {
				setErrorMessage(res.message)
			}
		});

	return (
		<div className={styles.wrapper}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<input
					className={cn({[styles.error]: errors.email})}
					placeholder='Email'
					{...register("email", {required: true})} />
				<input
					className={cn({[styles.error]: errors.password})}
					placeholder='Password'
					{...register("password", {required: true})} />
				<button type="submit">Sing in</button>
			</form>
			{errorMessage}
		</div>
	)
}