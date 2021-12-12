import {messagesAPI} from "../../api/api";
import styles from './newMailing.module.css'
import {useContext, useRef, useState} from "react";
import {authContext, setHeaderContext} from "../../context/context";

export const NewMailing = () => {

	
	const [mailTo, setMailTo] = useState([])
	const [textareaValue, setTextareaValue] = useState('')
	const [tooltip, setTooltip] = useState(false)
	const [csvFile, setCsvFile] = useState(false)
	const [emailsForTooltip, setEmailsForTooltip] = useState(mailTo)
	const [findWord, setFindWord] = useState('')
	const [findMode, setFindMode] = useState(false)
	const [indexTrigger, setIndexTrigger] = useState()

	console.log(findWord)
	const setHeaderTitle = useContext(setHeaderContext)
	setHeaderTitle('New mailing')

	const {user} = useContext(authContext)
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
		if (indexTrigger && e.nativeEvent.data === ' '){
			setIndexTrigger(null)
			setFindMode(false)
			setTooltip(false)
		}

		if (textareaValue.length == indexTrigger+1 && e.nativeEvent.inputType === "deleteContentBackward")
		{
			setIndexTrigger(null)
			setFindMode(false)
			setTooltip(false)
		}

		if (e.nativeEvent.data === '@') {
			if (!indexTrigger){
				setIndexTrigger(textareaValue.length)
			}
			setTooltip(true)
			setFindMode(true)
		}
			
		if (findMode) {
				setFindWord(textareaValue.slice(indexTrigger+1, textareaValue.length))
				setEmailsForTooltip(mailTo.filter(el=>el.email.toLowerCase().search(findWord) !== -1))
			}
		
			setTextareaValue(e.target.value)

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
				if (res.data.mailTo){
					setMailTo(res.data.mailTo)
				}
			})

	}

	const chooseUserFromList = (email) => {
		setTextareaValue(textareaValue.slice(0, indexTrigger+1) + email)
		setTooltip(false)
		setFindWord('')
		setFindMode(false)
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
				{tooltip && emailsForTooltip ? emailsForTooltip.map(item => {
					return (
						<span  key={item.email} onClick={() => chooseUserFromList(item.email)}>
							{item.email}
						</span>
					)
				}):''}
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