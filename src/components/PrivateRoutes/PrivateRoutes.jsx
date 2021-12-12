import styles from './privateRoutes.module.css'
import {Route, Switch} from "react-router-dom";
import {Private} from "../../routes/routes";
import {Sidebar} from "../Sidebar";
import { useState } from 'react/cjs/react.development';
import { setHeaderContext } from '../../context/context';

export const PrivateRoutes = () =>{
	const [headerTitle, setHeaderTitle] = useState()

	return (
		<div className={styles.container}>
			<Sidebar/>
			<div>
			<header className={styles.header}>
				<div className={styles.title}>
					{headerTitle}
				</div>
				<div>
				</div>
			</header>
			<setHeaderContext.Provider value={setHeaderTitle}>
			<Switch>
			{
				Private.map((item) => {
					return (<Route
						path={item.path}
						component={item.component}
						key={item.index}
						exact={item.exact}
					/>)
				})
			}
			</Switch>
			</setHeaderContext.Provider>
			</div>
		</div>
	)}