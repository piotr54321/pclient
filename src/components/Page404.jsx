import {Box, Container, Image, Notification, Title} from "bloomer";
import React from "react";
import ButtonHistory from "./ButtonHistory";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Trans, withTranslation }
    from 'react-i18next';

function Page404() {
    return(
        <Container isFluid style={{marginTop: 30}}>
            <Box>
                <Title isSize={1}><Trans i18nKey="404_page.title" /></Title>
                <Notification>
                    <Trans i18nKey="404_page.error_text" /> <ButtonHistory path='/' isSize='small' isColor='primary' text={<FontAwesomeIcon icon={ faHome } />}/>
                </Notification>
                <Image src={ process.env.PUBLIC_URL +"/404.jpg" }/>
            </Box>
        </Container>
    )
}

export default withTranslation()(Page404);
