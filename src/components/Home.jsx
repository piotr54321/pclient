import React from "react";
import {Box, Column, Columns, Container, Content, Image, Notification, Progress, Title} from "bloomer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {Query} from "@apollo/react-components";
import {GET_PROJECTS} from "../qgl/getProjects";
import ProjectsList from "./ProjectsList";

class Home extends React.Component {
    render() {
        return (
            <Container isFluid style={{marginTop: 30}}>
                <Columns isCentered>
                    <Column isSize='1/3'>
                        <Notification>
                            <Container style={{marginTop: 10}}>
                                <Image isSize="96x96" src={ process.env.PUBLIC_URL +"/HPGoPPl.png" }/>
                                <Content>
                                    <h1>Piotr Z.</h1>
                                    Hi!
                                    <br/>
                                    Page prepared for the needs of the "Projects - information" project
                                    <br/>
                                    <small>1 February 2020</small>
                                </Content>
                            </Container>
                        </Notification>
                        <Notification isColor='white'>
                            <Container>
                                <Content>
                                    Contact me
                                    <br/>
                                    <FontAwesomeIcon icon={ faEnvelope } /> piotrekzet97@gmail.com
                                </Content>
                            </Container>
                        </Notification>
                    </Column>
                    <Column isSize='2/3'>
                        <Box>
                            <Title isSize={1}>Projects</Title>
                            <Query query={GET_PROJECTS} variables={{limit: 10}}>
                                {({data, loading, error}) => {
                                    if (loading) return <Progress max={100}/>;
                                    if (error) return <Content>Could not load...<Progress max={100}/></Content>;
                                    const current = data.GetProjects;
                                    return (
                                        <ProjectsList
                                            projects={ current }
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

export default Home;
