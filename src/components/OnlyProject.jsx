import {useParams} from "react-router-dom";
import {Box, Breadcrumb, BreadcrumbItem, Button, Container, Content, Notification, Progress, Title} from "bloomer";
import {Query} from "@apollo/react-components";
import {GET_PROJECTS_EXTENDED_INFO} from "../qgl/getProjects";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ButtonHistory from "./ButtonHistory";
import TechnologiesList from "./TechnologiesList";
import ImagesList from "./ImagesList";
import OtherInfo from "./OtherInfo";

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
            <Query query={ GET_PROJECTS_EXTENDED_INFO } variables={{id: Number(slug)}}>
                {({loading, error, data}) => {
                    if (loading) return <Progress max={100}/>;
                    if (error) return <Content>Could not load...<Progress max={100}/></Content>;
                    const current = data.GetProjects;

                    if(current.length){
                        let urlTo;
                        if(current[0].url){
                            urlTo = <Button style={{marginTop: 30}} isLink isSize='medium' isColor='info' href={ current[0].url }>Go to project site</Button>
                        }

                        return(
                            <div>
                                <Title isSize={3}>{current[0].title}</Title>
                                <p>{current[0].description}</p>
                                <TechnologiesList projects_technologies = { current[0].projects_technologies} />
                                <ImagesList projects_images = { current[0].projects_images } />
                                <OtherInfo other_info = { current[0].other_info } />
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
            <ButtonHistory back="true" path='/' text='Back to all projects' />
        </Notification>
    }
    return (
        <Container isFluid style={{marginTop: 30}}>
            <Box>
                <Breadcrumb>
                    <ul>
                        <BreadcrumbItem><a href="/"><Title isSize={1}><FontAwesomeIcon icon={ faHome } /></Title></a></BreadcrumbItem>
                        <BreadcrumbItem isActive><Title isSize={1}>Project file</Title></BreadcrumbItem>
                    </ul>
                </Breadcrumb>
                {project}
            </Box>
        </Container>
    );
}

export default OnlyProject;
