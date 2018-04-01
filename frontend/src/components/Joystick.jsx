import React, { Component } from 'react';
import {Card, CardBody, CardImg, CardLink, CardText, CardTitle, Col} from "reactstrap";

class Joystick extends Component{

    render(){
        let d = this.props.device;
        let connected="";
        if(Date.now() - Date.parse(d.last_seen)>3000)
            connected = "dead";
        return(
            <Card>
                <CardImg top className={connected} width="100%" src="https://www.robotgeek.com/shared/images/PImages/rg-joystick-a.jpg"/>
                <CardBody>
                    <CardTitle>Joystick</CardTitle>
                    <CardText>Used to control the bot.</CardText>
                    <CardLink href="/joystick/" target="_blank">Open Joystick</CardLink>
                </CardBody>
            </Card>
        )
    }
}

export default Joystick;