import {authAPI, messagesAPI} from "../../api/api";
import styles from './newMailing.module.css'
import {useContext, useRef, useState} from "react";
import {authContext} from "../../context/context";

export const NewMailing = () => {

	const {user} = useContext(authContext)
	const [mailTo, setMailTo] = useState([])
	const [textareaValue, setTextareaValue] = useState()
	const [tooltip, setTooltip] = useState(false)
	const [csvFile, setCsvFile] = useState(false)

	const inputCsv = useRef(null)

	const sendCSV = (file) => {
		setCsvFile(file)
		const formData = new FormData()
		formData.append('csv', file)
		formData.append('user', user)
		formData.append('textMessage', textareaValue)
		messagesAPI.sendCSV(formData)
			.then(res => setMailTo(res.data.mailTo))
	}

	const handleChangeTextarea = (e) => {
		if (e.nativeEvent.data === '@') {
			setTextareaValue(e.target.value)
			setTooltip(true)
		} else {
			setTextareaValue(e.target.value)
			setTooltip(false)
		}

	}

	const saveDraft = (e) => {
		e.preventDefault()
		const formData = new FormData()
		if (csvFile) {
			formData.append('csv', csvFile)
		}
		formData.append('user', user)
		formData.append('textMessage', textareaValue)
		messagesAPI.saveDraft(formData)
	}

	const uploadDraft = (e) => {
		e.preventDefault()
		messagesAPI.uploadDraft(user)
			.then(res => {
				setTextareaValue(res.data.textMessage)
				setMailTo(res.data.mailTo)
				console.log(inputCsv.current.value = null)
			})

	}

	const chooseUserFromList = (user) => {
		setTextareaValue(textareaValue + user)
		setTooltip(false)
	}

	const sendMessage = (e) => {
		e.preventDefault()
		messagesAPI.sendMessage({mailTo, textMessage: textareaValue, user})
	}
	return (
		<div className={styles.container}>
			<form className={styles.form}>
				<div className={styles.uploadCSV}>
					<span>Upload file csv: </span>
				<input ref={inputCsv} type='file' onChange={(e) => sendCSV(e.target.files[0])}/>
				</div>
				<div className={styles.mailFrom}>
					<span>From: </span>
					<span>{user}</span>
				</div>
				<div className={styles.mailTo}>
					<span>To: </span>
					{mailTo.map(item => {
						return (
							<span>
							{item.email},
							</span>
						)
					})}
				</div>
				<textarea value={textareaValue} onChange={(e) => handleChangeTextarea(e)}/>
				<div className={styles.emails}>
				{tooltip && mailTo.map(item => {
					return (
						<span  key={item.email} onClick={() => chooseUserFromList(item.name)}>
							{item.email}
						</span>
					)
				})}
				</div>
				<div className={styles.buttons}>
					<div className={styles.draft}>
						<button onClick={(e) => uploadDraft(e)}>Upload draft</button>
						<button onClick={(e) => saveDraft(e)}>Save draft</button>
					</div>
					<div>
					<button onClick={(e) => sendMessage(e)}>Send message</button>
					</div>
				</div>
			</form>
		</div>
	)
}