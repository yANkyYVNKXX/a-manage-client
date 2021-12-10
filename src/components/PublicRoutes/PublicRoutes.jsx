import styles from './publicRoutes.module.css'
import {Route} from "react-router-dom";
import {Public} from "../../routes/routes";
import {Header} from "../Header";

export const PublicRoutes = () => {
	return (
		<div className={styles.container}>
			<Header/>
			{Public.map((item) => {
				return (
					<Route
						path={item.path}
						component={item.component}
						key={item.index}
					/>)
			})}
		</div>
	)
}