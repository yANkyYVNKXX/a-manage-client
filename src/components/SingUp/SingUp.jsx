import {useForm} from "react-hook-form";
import styles from './singUp.module.css'
import {authAPI} from "../../api/api";
import cn from 'classnames'
import {useContext, useState} from "react";
import {authContext} from "../../context/context";

const regEXPemail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const SingUp = () => {

	const [successMessage, setSuccessMessage] = useState()
	const [errorMessage, setErrorMessage] = useState()

	const {register, handleSubmit, watch, formState: {errors}} = useForm();
	const auth = useContext(authContext)

	const onSubmit = data =>
		authAPI.singUp(data)
		.then(res => {
			if (res.responseCode === 1){
				setErrorMessage(null)
				setSuccessMessage(res.message)
			} else {
				setErrorMessage(res.message)
			}
		});
	const repeatPasswordValidate = (value) => value === watch('password')

	return (
		<div className={styles.wrapper}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<input
					placeholder='Email'
					className={cn({[styles.error]: errors.email})}
					{...register("email", {required: true, pattern: regEXPemail})} />
				<input
					placeholder='Password'
					className={cn({[styles.error]: errors.password})}
					type='password'
					{...register("password", {required: true, minLength: 6})} />
				<input
					placeholder='Repeat password'
					type='password'
					className={cn({[styles.error]: errors.repeatPassword})}
					{...register("repeatPassword", {required: true, validate: repeatPasswordValidate})} />
				<button type="submit">Sing in</button>
			</form>
			<span className={styles.errorMessage}>{errorMessage}</span>
			<span className={styles.successMessage}>{successMessage}</span>
		</div>
	)
}