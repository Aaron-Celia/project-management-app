import Interface from "@/components/Interface";
import NewProjectView from "@/components/NewProjectsView";

export default function NewProject() {
	return (
		<Interface
			headerText="New Project"
			headerColor='bg-green-500'
			component={<NewProjectView />}
			addedClassName="bg-gradient-to-b from-slate-700 to-slate-500"
		/>
	);
}
