import {SingUp} from "../components/SingUp";
import {SingIn} from "../components/SingIn";
import {NewMailing} from "../components/NewMessage";
import {Notifications} from "../components/Notifications";
import {Dashboards} from "../components/Dashboards";

export const Public = [
		{
			path:'/singIn',
			component:SingIn,
			exact: true,
		},
		{
			path:'/singUp',
			component:SingUp,
			exact: true,
		}
	]
	export const Private = [
		{
			path:'/newMailing',
			component: NewMailing,
			exact: true,
		},
		{
			path:'/notifications',
			component: Notifications,
			exact: true,
		},
		{
			path:'/dashboards',
			component: Dashboards,
			exact: true,
		},
	]
