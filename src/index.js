import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, useParams, useHistory} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {Container, Notification, Columns, Column, Content, Image, Title, Box, Progress, Button, Footer} from 'bloomer';
import 'bulma/css/bulma.css';
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {Query} from "@apollo/react-components";

import {GET_PROJECTS} from "./qgl/getProjects";
const history = createBrowserHistory();

const client = new ApolloClient({uri: 'https://piotr.cf:3307/graphql'});
const SRLoptions = {
    overlayColor: "#64cdfb",
    transitionTimingFunction: "ease",
    slideTransitionSpeed: 1000,
    buttonsIconPadding: "2px",
    buttonsIconColor: "rgba(25, 136, 124)",
    enablePanzoom: false,
    hideControlsAfter: 3000
};

class ProjectInfo extends React.Component{
    render(){
        return (
            <Notification isColor='warning'>
                <Title isSize={3}>{this.props.value.title}</Title>
                <p>{this.props.value.description}</p>
                <ButtonHistory style={{marginTop: 10}} path={'project/' + this.props.value.id} text='show me the details' />
            </Notification>
        );
    }
}

class ProjectsList extends React.Component {
    render() {
        const projectsList = this.props.projects.map((project, key) => {
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

class Home extends React.Component {
    render() {
        return (
            <Container isFluid style={{marginTop: 30}}>
                <Columns isCentered>
                    <Column isSize='1/3'>
                        <Notification>
                            <Container style={{marginTop: 10}}>
                                <Image isSize="96x96" src={ process.env.PUBLIC_URL +"/teemo.png"}/>
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
                                    <FontAwesomeIcon icon={faEnvelope} /> piotrekzet97@gmail.com
                                </Content>
                            </Container>
                        </Notification>
                    </Column>
                    <Column isSize='2/3'>
                        <Box>
                            <Title isSize={1}>Projects</Title>
                            <Query
                                query={GET_PROJECTS}>
                                {({data, loading, error}) => {
                                    if (loading) return <Progress max={100}/>;
                                    if (error) return <Content>Could not load...<Progress max={100}/></Content>;
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

function OnlyProject(){
    let { slug } = useParams();
    let project;
    if(isNaN(slug)){
        project = <Notification isColor='danger'>
                        <Title isSize={3}>Wrong project ID</Title>
                       <p>;c</p>
                        <ButtonHistory back={true} path='/' text='Back to all projects' />
                    </Notification>
    }else{
        project = <Notification isColor='light'>
            <Query query={GET_PROJECTS} variables={{id: Number(slug)}}>
                {({loading, error, data}) => {
                    if (loading) return <Progress max={100}/>;
                    if (error) return <Content>Could not load...<Progress max={100}/></Content>;
                    const current = data.GetProjects;
                    if(current.length){
                        let technologies;
                        let images;
                        let urlTo;
                        let otherInfo;
                        if(current[0].projects_technologies.length){
                            const technologiesList = current[0].projects_technologies.map((project, key) => {
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
                        if(current[0].projects_images.length){
                            const imagesList = current[0].projects_images.map((project, key) => {
                                return (
                                        <li className="list-item" key={key}>
                                            <a href={process.env.PUBLIC_URL + '/info/' + slug + '/' + project.image_filename}>
                                                <Image src={process.env.PUBLIC_URL + '/info/' + slug + '/' + project.image_filename} />
                                            </a>
                                        </li>
                                )
                            });

                            images =
                                <Notification isColor='warning'>
                                    <Title isSize={4}>Example images</Title>
                                        <SRLWrapper options={SRLoptions}>
                                            {imagesList}
                                        </SRLWrapper>
                                </Notification>;
                        }

                        if(current[0].other_info){
                            otherInfo =
                                <Notification style={{marginTop: 20}} isColor='warning'>
                                    <Title isSize={4}>Other info</Title>
                                    <p>{current[0].other_info}</p>
                                </Notification>;
                        }

                        if(current[0].url){
                            urlTo = <Button isLink isSize='small' isColor='info' href={current[0].url}>Go to project site</Button>
                        }
                        return(
                            <div>
                                <Title isSize={3}>{current[0].title}</Title>
                                <p>{current[0].description}</p>
                                {technologies}
                                {images}
                                {otherInfo}
                                {urlTo}
                            </div>
                        )
                    }else{
                        return(
                            <div>
                                <Title isSize={3}>Wrong project ID</Title>
                                <p>Project with this ID does not exist</p>
                            </div>
                            )
                    }
                }}
            </Query>
            <br />
            <ButtonHistory back={true} path='/' text='Back to all projects' />
        </Notification>
    }
    return (
        <Container isFluid style={{marginTop: 30}}>
            <Box>
                <Title isSize={1}>Project file</Title>
                {project}
            </Box>
        </Container>
    );
}

function ButtonHistory(props) {
    let history = useHistory();

    function handleClick() {
        if(props.back){
            history.goBack();
        }else{
            history.push(props.path);
        }
    }

    return (
        <Button isSize='small' isColor='info' onClick={handleClick}>
            {props.text}
        </Button>
    );
}

function Page404() {
    return(
        <Container isFluid style={{marginTop: 30}}>
            404
        </Container>
    )
}

class App extends React.Component{
    render() {
        return(
            <Router hitory={history}>
                <SimpleReactLightbox>
                    <Switch>
                        <Route path="/project/:slug">
                            <OnlyProject />
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route>
                            <Page404 />
                        </Route>
                    </Switch>
                    <Footer id='footer' style={{marginTop: 30}}>
                        <Container>
                            <Content>
                                <Columns>
                                    <Column>
                                        <p>
                                            Made by <a href="#">Piotr</a> ;D
                                        </p>
                                    </Column>
                                </Columns>
                            </Content>
                        </Container>
                    </Footer>
                </SimpleReactLightbox>
            </Router>
        );
    }
}

ReactDOM.render(<ApolloProvider client={client}><App/></ApolloProvider>, document.getElementById('root'));
