import styles from './privateRoutes.module.css'
import {Route, Switch, useHistory, useLocation, useParams} from "react-router-dom";
import {Private} from "../../routes/routes";
import {Sidebar} from "../Sidebar";

export const PrivateRoutes = () =>{
	const location = useLocation();
	const headerTitle = location.pathname.slice(1,location.pathname.length).toUpperCase()

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
			</div>
		</div>
	)}