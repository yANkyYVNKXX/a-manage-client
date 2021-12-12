import { useContext } from "react"
import { setHeaderContext } from "../../context/context"

export const MailingLists = () =>{

	const setHeaderTitle = useContext(setHeaderContext)
	setHeaderTitle('Mailing lists')
	
	return(
		<div >
		mailingLists
		</div>
	)
}