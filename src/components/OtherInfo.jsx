import React from "react";
import {Notification, Title} from "bloomer";

class OtherInfo extends React.Component{
    render() {
        let otherInfo = null;

        if(this.props.other_info){
            otherInfo =
                <Notification style={{marginTop: 20}} isColor='warning'>
                    <Title isSize={4}>Other info</Title>
                    <p>{this.props.other_info}</p>
                </Notification>;
        }
        return otherInfo;
    }
}

export default OtherInfo;
