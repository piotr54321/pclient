import React from "react";
import {Notification, Progress} from "bloomer";
import {SRLWrapper} from "simple-react-lightbox";

const SRLoptions = {
    overlayColor: "#64cdfb",
    transitionTimingFunction: "ease",
    slideTransitionSpeed: 1000,
    buttonsIconPadding: "2px",
    buttonsIconColor: "rgba(25, 136, 124)",
    enablePanzoom: false,
    hideControlsAfter: 3000
};

class ImagesList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: 0
        }
    }

    handleImageLoad(){
        this.setState({loaded: this.state.loaded + 1});
    }

    render(){
        let images = null;
        let loadStatus = false;
        if(this.props.projects_images.length){
            const imagesList = this.props.projects_images.map((project, key) => {
                return (
                    <li align="center" className="list-item" style={{display: project.main === 0 ? "none" : "" }} key={key}>
                        <img
                            src={ process.env.PUBLIC_URL + '/info/' + project.projects_id + '/' + project.image_filename }
                            onLoad={this.handleImageLoad.bind(this)}
                            alt={ project.alt }
                        />
                    </li>
                )
            });

            if(this.props.projects_images.length === this.state.loaded){
                loadStatus = true;
            }

            return(
                <div>
                    <Progress max={100} isColor='warning' style={{display: loadStatus === true ? "none" : "" }} />
                    <Notification isColor='warning' style={{display: !loadStatus === true ? "none" : "" }}>
                        <SRLWrapper options={ SRLoptions }>
                            {imagesList}
                        </SRLWrapper>
                    </Notification>
                </div>
            )
        }else{
            return images;
        }
    }
}

export default ImagesList;