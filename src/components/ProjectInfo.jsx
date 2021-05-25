import React from "react";
import {Notification, Title} from "bloomer";
import ButtonHistory from "./ButtonHistory";
import {Trans, withTranslation} from "react-i18next";

class ProjectInfo extends React.Component{
    render(){
        return (
            <Notification isColor='warning'>
                <Title isSize={3}>{this.props.value.title}</Title>
                <p>{this.props.value.description}</p>
                <ButtonHistory style={{marginTop: 10}} path={'project/' + this.props.value.id} isColor='info' text={<Trans i18nKey="project_info.show_details" /> } />
            </Notification>
        );
    }
}

export default withTranslation()(ProjectInfo);
