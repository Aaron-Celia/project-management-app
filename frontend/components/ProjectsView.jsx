"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import addIcon from "../public/add-icon.png";
import { setSelectedProject } from "@/redux/slices/selectedProjectSlice";
import { Permanent_Marker } from "next/font/google";
import { useDispatch } from "react-redux";

const pm = Permanent_Marker({
	subsets: ["latin"],
	weight: ["400"]
});

export default function ProjectsView() {
	const [projects, setProjects] = useState([{}]);
	const [error, setError] = useState("");
	const [description, setDescription] = useState("");
	const [descriptionEditDisplayed, setDescriptionEditDisplayed] = useState("");
	const router = useRouter();

	const dispatch = useDispatch();

	const setAndGoToProject = (project) => {
		dispatch(setSelectedProject({ 
            _id: project._id,
            name: project.name,
            components: project.components,
            functions: project.functions,
            tables: project.tables
            }));
		router.push(`/projects/${project._id}`);
	};

	const updateDescription = async (projectId, e) => {
        e.preventDefault();
		if (!description) return;
		const res = await axios.put(
			`http://localhost:4000/api/v1/projects/${projectId}`,
			{
				description
			}
		);
		console.log("update function RES: ", res);
		if (!res.data.success) {
			setError("Error Updating Description");
		} else {
			setProjects(() => [projects, ...res.data.data.projects]);
			setDescriptionEditDisplayed("");
			setDescription("");
            console.log(projects);
		}
	};

	const deleteProject = async (projectId, e) => {
		e.stopPropagation();

		const res = await axios.delete(
			`http://localhost:4000/api/v1/projects/${projectId}`
		);
		if (res.data.success) {
			setProjects(() => [projects, ...res.data.data.projects]);
		} else {
			setError("Error deleting Projects");
		}
	};

	const setNewDevice = async () => {
		const device = localStorage.getItem("deviceId");
		if (!device) {
			const res = await axios.post("http://localhost:4000/api/v1/devices");
			localStorage.setItem("deviceId", res.data.data.device._id);
		}
	};

	const fetchProjects = async () => {
		setError("");
		const deviceId = localStorage.getItem("deviceId");
		const res = await axios.get("http://localhost:4000/api/v1/projects", {
			params: {
				deviceId
			}
		});
		if (res.data.success) {
			setProjects(() => [projects, ...res.data.data.projects]);
		} else {
			setError("Error fetching projects");
		}
	};

	useEffect(() => {
		setNewDevice();
		fetchProjects();
	}, []);

	useEffect(() => {
		setError("");
	}, [description]);

	return (
		<div className="h-[100%] w-[100%] flex flex-wrap">
			{projects?.map((project, index) =>
				project._id ? (
					<div
						key={index}
						onClick={() => setAndGoToProject(project)}
						className="w-1/5 mx-8 cursor-pointer my-10 bg-slate-800 text-yellow-400 drop-shadow-2xl h-[400px] rounded-xl flex flex-col justify-between">
						<Link
							href={`/projects/${project._id}`}
							className={`${pm.className} text-3xl font-bold`}>
							{project.name}
						</Link>
						{project.description ? (
							<p
								onClick={() => router.push(`/projects/${project._id}`)}
								className="text-lg">
								{project.description}
							</p>
						) : descriptionEditDisplayed === project._id ? (
							<div
								onClick={(e) => e.stopPropagation()}
								className="flex flex-col mx-3">
								<textarea
									className="w-full h-[175px] text-black resize-none rounded-lg"
									placeholder=" Project description..."
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
								<div className="w-full mt-3">
									<button
										onClick={(e) => {
											updateDescription(project._id, e);
										}}
										className="bg-green-500 w-1/2 text-black font-bold rounded-lg">
										Save
									</button>
									<button
										onClick={() => {
											setDescriptionEditDisplayed("");
											setDescription("");
										}}
										className="bg-red-500 w-1/2 text-black font-bold rounded-lg">
										Cancel
									</button>
								</div>
							</div>
						) : (
							<button
								className="h-[100px] mx-8 text-2xl font-bold bg-slate-200 text-black rounded-xl hover:bg-slate-400 duration-150"
								onClick={(e) => {
									e.stopPropagation();
									setDescriptionEditDisplayed(project._id);
								}}>
								Add Description
							</button>
						)}
						<button
							className="bg-red-500 w-full h-[30px] rounded-b-xl text-white hover:bg-red-700 duration-150"
							onClick={(e) => {
								deleteProject(project._id, e);
							}}>
							Delete
						</button>
					</div>
				) : (
					<div
						onClick={() => router.replace("/new")}
						className="w-1/5 mx-8 my-10 bg-green-500 drop-shadow-2xl h-[400px] rounded-xl flex justify-center items-center cursor-pointer">
						<Image src={addIcon} alt="add icon" height={64} width={64} />
					</div>
				)
			)}
			{error && <p className="text-red-600">{error}</p>}
		</div>
	);
}
