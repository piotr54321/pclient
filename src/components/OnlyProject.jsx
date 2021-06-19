import { useParams }                                                                                  from "react-router-dom";
import { Box, Breadcrumb, BreadcrumbItem, Button, Container, Content, Notification, Progress, Title } from "bloomer";
import { Query }                                                                                      from "@apollo/react-components";
import { GET_PROJECTS_EXTENDED_INFO }                                                                 from "../qgl/getProjects";
import { FontAwesomeIcon }                                                                            from "@fortawesome/react-fontawesome";
import { faHome }                                                                                     from "@fortawesome/free-solid-svg-icons";
import React                                                                                          from "react";
import ButtonHistory
																									  from "./ButtonHistory";
import TechnologiesList
																									  from "./TechnologiesList";
import ImagesList
																									  from "./ImagesList";
import OtherInfo
																									  from "./OtherInfo";
import {
	Trans,
	withTranslation
}                                                                                                     from "react-i18next";

function OnlyProject() {
	let {slug} = useParams ();
	let project;
	if (isNaN (slug)) {
		project = <Notification isColor='danger'>
			<Title isSize={3}><Trans i18nKey="project_page.wrong_id"/></Title>
			<p>;c</p>
			<ButtonHistory back={true} path='/' isColor='info' text='Back to all projects'/>
		</Notification>
	} else {
		project = <Notification isColor='light'>
			<Query query={GET_PROJECTS_EXTENDED_INFO} variables={{id: Number (slug)}}>
				{({loading, error, data}) => {
					if (loading) return <Progress max={100}/>;
					if (error) return <Content><Trans i18nKey="project_page.load_error"/><Progress
						max={100}/></Content>;
					const current = data.GetProjects;

					if (current.length) {
						let urlTo;
						if (current[ 0 ].url) {
							urlTo = <Button style={{marginTop: 30}} isLink isSize='medium' isColor='info'
											href={current[ 0 ].url} target="_blank"><Trans
								i18nKey="project_page.project_site"/></Button>
						}

						return (
							<div>
								<Title isSize={3}>{current[ 0 ].title}</Title>
								<p>{current[ 0 ].description}</p>
								<TechnologiesList projects_technologies={current[ 0 ].projects_technologies}/>
								<ImagesList projects_images={current[ 0 ].projects_images}/>
								<OtherInfo other_info={current[ 0 ].other_info}/>
								{urlTo}
							</div>
						)
					} else {
						return (
							<div>
								<Title isSize={3}><Trans i18nKey="project_page.wrong_id"/></Title>
								<p><Trans i18nKey="project_page.dont_exist"/></p>
							</div>
						)
					}
				}}
			</Query>
			<br/>
			<ButtonHistory back="true" path='/' isColor='info' text={<Trans i18nKey="project_page.back_to"/>}/>
		</Notification>
	}
	return (
		<Container isFluid style={{marginTop: 30}}>
			<Box>
				<Breadcrumb>
					<ul>
						<BreadcrumbItem><ButtonHistory isColor='white' path='/' isSize='large' isInverted={false}
													   text={<FontAwesomeIcon icon={faHome}/>}/></BreadcrumbItem>
						<BreadcrumbItem isActive><Title isSize={1}><Trans i18nKey="project_page.project_file"/></Title></BreadcrumbItem>
					</ul>
				</Breadcrumb>
				{project}
			</Box>
		</Container>
	);
}

export default withTranslation () (OnlyProject);
