import {NavLink} from "react-router-dom";

export const Notifications = () =>{
	return(
		<div>
			notifications
			<NavLink to='/newMailing'>New message</NavLink>
		</div>
	)
}