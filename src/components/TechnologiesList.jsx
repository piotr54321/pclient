import React                   from "react";
import { Notification, Title } from "bloomer";

class TechnologiesList extends React.Component {
	render() {
		let technologies = null;
		if (this.props.projects_technologies.length) {
			const technologiesList = this.props.projects_technologies.map ((project, key) => {
				return (
					<li className="list-item" key={key}>
						{project.technology.name}
					</li>
				)
			});
			technologies =
				<Notification style={{marginTop: 20}} isColor='warning'>
					<Title isSize={4}>Technologies</Title>
					<div className="list">
						{technologiesList}
					</div>
				</Notification>;
		}

		return technologies;
	}
}

export default TechnologiesList;
