"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SingleProject() {
	const [project, setProject] = useState({})
	const projectReduxState = useSelector(state => state.selectedProject)
	
	const setNewDevice = async () => {
		const device = localStorage.getItem("deviceId");
		if (!device) {
			const res = await axios.post("http://localhost:4000/api/v1/devices");
			localStorage.setItem("deviceId", res.data.data.device._id);
		}
	};
	
	useEffect(() => {
		setNewDevice();
		// setState();
		setProject(projectReduxState[0]);
		// const previousProject = sessioinStorage.getItem('project');
		// if(previousProject){
		// 	sessionStorage.removeItem('project')
		// }
		// sessionStorage.setItem('project', project[0]);
		// const currentProject = sessionStorage.getItem('project');
	}, []);

	return (
		<main className="h-screen w-screen mt-[50px]">
			<p>project: {JSON.stringify(project)}</p>
		</main>
	);
}
