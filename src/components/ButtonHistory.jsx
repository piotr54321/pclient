import {useHistory} from "react-router-dom";
import {Button} from "bloomer";
import React from "react";

function ButtonHistory(props) {
    let history = useHistory();

    function handleClick() {
        if(props.back){
            //history.goBack();
            history.push('/');
        }else{
            history.push(props.path);
        }
        window.scrollTo(0, 0)
    }

    return (
        <Button {...props} isColor='info' onClick={handleClick}>
            {props.text}
        </Button>
    );
}

export default ButtonHistory;
