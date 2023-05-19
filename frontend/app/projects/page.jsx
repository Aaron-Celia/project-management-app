import Interface from "@/components/Interface";
import ProjectsView from "@/components/ProjectsView";

export default function AllProjects() {
	return (
		<Interface
			headerText="Your Projects"
			headerColor='bg-yellow-400'
			component={<ProjectsView />}
			addedClassName="bg-white"
		/>
	);
}
