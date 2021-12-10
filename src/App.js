import styles from './App.module.css';
import {useEffect, useState} from "react";
import {authContext} from "./context/context";
import {authAPI} from "./api/api";
import {PrivateRoutes} from "./components/PrivateRoutes";
import {PublicRoutes} from "./components/PublicRoutes";
import {Redirect} from "react-router-dom";

function App() {

	const [user, setUser] = useState()

	useEffect(() => {
		authAPI.isAuth()
			.then(res => {
				setUser(res.email)
			})
	}, [])

	return (
		<div className={styles.container}>
			<authContext.Provider value={{user, setUser}}>
				{user ? <PrivateRoutes/> : <PublicRoutes/>}
				<Redirect to={user ? '/notifications':'/singIn'}/>
			</authContext.Provider>
		</div>
	);
}

export default App;
