import React, { Component } from 'react';
import {Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Progress} from "reactstrap";

class Temperature extends Component{
    render(){
        let d = this.props.device;
        let color="success";
        if(d.value>40)
            color = "danger";
        else if(d.value>30)
            color = "warning";
        let connected="";
        if(!d.state)
            connected = "dead";
        // if(d.last_seen)
        return(
                <Card>
                    <CardImg top className={connected} width="100%" src="https://www.smart-prototyping.com/image/data/2_components/sensors/101810%20DHT11/DHT11-pin.jpg"/>
                    <CardBody>
                        <CardTitle>Temperature Sensor</CardTitle>
                        <CardText>Measures the temperature of the surrounding atmosphere. <br/> Temperature Range : 0 - 50℃ </CardText>
                        <Progress animated color={color} value={d.value*2} />
                    </CardBody>
                </Card>
        )
    }
}

export default Temperature;