import React       from "react";
import ProjectInfo from "./ProjectInfo";

class ProjectsList extends React.Component {
	render() {
		const projectsList = this.props.projects.map ((project, key) => {
			return (
				<ProjectInfo
					value={project}
					key={key}
				/>
			)
		});
		return (
			<div>
				{projectsList}
			</div>
		)
	}
}

export default ProjectsList;
