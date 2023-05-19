"use client";
import { useEffect, useState } from "react";
import { Permanent_Marker } from "next/font/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const pm = Permanent_Marker({
	subsets: ["latin"],
	weight: ["400"]
});

export default function NewProjectView() {
	const [projectName, setProjectName] = useState("");
	const [projectDescription, setProjectDescription] = useState("");
	const [error, setError] = useState("");

	const router = useRouter();

	const setNewDevice = async () => {
		const device = localStorage.getItem("deviceId");
		if (!device) {
			const res = await axios.post("http://localhost:4000/api/v1/devices");
			localStorage.setItem("deviceId", res.data.data.device._id);
		}
	};

	const createNewProject = async (e) => {
		e.preventDefault();
		if (!projectName) {
			setError("Please enter a name for your project.");
			return;
		}
		const deviceId = localStorage.getItem("deviceId");
		const body = projectDescription
			? {
					deviceId,
					projectName,
					projectDescription
			  }
			: {
					deviceId,
					projectName
			  };
		const res = await axios.post("http://localhost:4000/api/v1/projects", body);
		if (res.data.success) {
			setProjectDescription("");
			setError("");
			setProjectName("");
			console.log("res in createNewProject: ", res);
			router.push(`/projects/${res.data.data.project._id}`);
		} else {
			setError("An Error occured while creating your project.");
		}
	};

	// if (error) {
	// 	setTimeout(() => {
	// 		setError("");
	// 	}, 5000);
	// }

	useEffect(() => {
		setNewDevice();
	}, []);

	useEffect(() => {
		setError("");
	}, [projectName]);

	return (
		<div className="h-[100%] w-[100%] flex justify-center items-center">
			<Link
				href="/projects"
				className={`${pm.className} text-3xl text-yellow-400 fixed top-[2px] left-[8px]`}>
				Go Back
			</Link>
			<form
				onSubmit={(e) => createNewProject(e)}
				className="w-1/2 h-1/2 rounded-xl flex flex-col items-center">
				<label
					id="project-name"
					className={`${pm.className} font-bold text-3xl text-yellow-400 mb-2`}>
					Project Name
				</label>
				<input
					id="project-name"
					type="text"
					placeholder="Project name..."
					value={projectName}
					onChange={(e) => setProjectName(e.target.value)}
					className="w-full text-xl h-[40px] rounded-xl mb-8"
				/>
				<label
					id="project-description"
					className={`${pm.className} font-bold text-3xl text-yellow-400 mb-2`}>
					Description
				</label>
				<p className={`${pm.className} font-bold text-yellow-400 mb-2`}>
					(optional)
				</p>
				<textarea
					placeholder="Project description..."
					className="resize-none rounded-xl w-full"
					value={projectDescription}
					onChange={(e) => setProjectDescription(e.target.value)}
					id="project-description"
					cols="30"
					rows="3"
				/>
				{error && <p className="text-red-400">{error}</p>}
				<button
					type="submit"
					className={`${pm.className} w-1/2 mt-8 bg-green-500 hover:bg-green-400 duration-150 rounded-2xl h-1/6 text-2xl font-bold`}>
					Create
				</button>
			</form>
		</div>
	);
}
