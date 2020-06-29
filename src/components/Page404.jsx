import {Box, Container, Image, Notification, Title} from "bloomer";
import React from "react";
import ButtonHistory from "./ButtonHistory";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Page404() {
    return(
        <Container isFluid style={{marginTop: 30}}>
            <Box>
                <Title isSize={1}>404</Title>
                <Notification>
                    We'd like to load something, but we don't know what's going on ;c -> go to home page <ButtonHistory path='/' isSize='small' isColor='primary' text={<FontAwesomeIcon icon={ faHome } />}/>
                </Notification>
                <Image src={ process.env.PUBLIC_URL +"/404.jpg" }/>
            </Box>
        </Container>
    )
}

export default Page404;
