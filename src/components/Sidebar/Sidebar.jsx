import styles from './sidebar.module.css'
import icon from '../../assets/images/manage.png'
import {NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {authContext} from "../../context/context";

export const Sidebar = () =>{
	const {setUser} = useContext(authContext)
	const [QWEWQE,DASDSA] = useState('asdsadsad')
	console.log(QWEWQE)

	const logout = ()=>{
		localStorage.removeItem('token')
		setUser(null)
	}
	return(
		<div className={styles.container}>
			<div>
			<div className={styles.icon}>
				<img src={icon}/>
				<span>manage</span>
			</div>
			<div className={styles.menu}>
				<NavLink to='/notifications'>Notifications</NavLink>
				<NavLink to='/dashboards'>Dashboards</NavLink>
			</div>
			</div>
			<div className={styles.logout}>
			<span onClick={logout}>Log out</span>
			</div>
		</div>
	)
}