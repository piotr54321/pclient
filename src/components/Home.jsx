import React                                                                              from "react";
import { Box, Column, Columns, Container, Content, Image, Notification, Progress, Title } from "bloomer";
import { FontAwesomeIcon }                                                                from "@fortawesome/react-fontawesome";
import { faEnvelope }                                                                     from "@fortawesome/free-solid-svg-icons";
import { Query }                                                                          from "@apollo/react-components";
import { GET_PROJECTS }                                                                   from "../qgl/getProjects";
import ProjectsList                                                                       from "./ProjectsList";
import { withTranslation, Trans }                                                         from "react-i18next";

class Home extends React.Component {
	render() {
		let images = [
			'villager.png',
			'teemo.png'
		]
		return (
			<Container isFluid style={{marginTop: 30}}>
				<Columns isCentered>
					<Column isSize='1/3'>
						<Notification>
							<Container style={{marginTop: 10}}>
								<Image isSize="96x96"
									   src={`${process.env.PUBLIC_URL}/avatar/${images[ Math.floor (Math.random () * images.length) ]}`}/>
								<Content>
									<h1><Trans i18nKey="home.name"/></h1>
									<Trans i18nKey="home.hello"/>
									<br/>
									<Trans i18nKey="home.page_prepared_for"/>
									<br/>
									<small><Trans i18nKey="home.date"/></small>
								</Content>
							</Container>
						</Notification>
						<Notification isColor='white'>
							<Container>
								<Content>
									<Trans i18nKey="home.contact_me"/>
									<br/>
									<FontAwesomeIcon icon={faEnvelope}/> <Trans i18nKey="home.email"/>
								</Content>
							</Container>
						</Notification>
					</Column>
					<Column isSize='2/3'>
						<Box>
							<Title isSize={1}><Trans i18nKey="home.projects"/></Title>
							<Query query={GET_PROJECTS} variables={{limit: 10}}>
								{({data, loading, error}) => {
									if (loading) return <Progress max={100}/>;
									if (error) return <Content><Trans i18nKey="home.load_error"/><Progress
										max={100}/></Content>;
									const current = data.GetProjects;
									return (
										<ProjectsList
											projects={current}
											//onClick={(i) => this.handleClick(i)}
										/>
									)
								}}
							</Query>
						</Box>
					</Column>
				</Columns>
			</Container>
		);
	}
}

export default withTranslation () (Home);
