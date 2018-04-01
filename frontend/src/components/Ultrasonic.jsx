import React, { Component } from 'react';
import {Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Progress} from "reactstrap";

class Ultrasonic extends Component{
    render(){
        let d = this.props.device;
        let color="primary";
        if(d.value<50)
            color = "danger";
        else if(d.value<150)
            color = "warning";
        let connected="";
        if(!d.state)
            connected = "dead";
        // if(d.last_seen)
        return(
                <Card>
                    <CardImg top className={connected} width="100%" src="http://img.dxcdn.com/productimages/sku_416860_1.jpg"/>
                    <CardBody>
                        <CardTitle>Ultrasonic Sensor</CardTitle>
                        <CardText>Measures distance to objects using ultrasonic sound waves</CardText>
                        <Progress animated color={color} value={d.value/3} />
                    </CardBody>
                </Card>
        )
    }
}

export default Ultrasonic;