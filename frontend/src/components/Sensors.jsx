import React, {Component} from 'react';
import {Button, Card, CardBody, CardImg, CardLink, CardText, CardTitle, Collapse, Progress} from "reactstrap";

import dht_img from "../images/DHT11-pin.jpg";
import ultra_img from "../images/sku_416860_1.jpg"
import joy_img from "../images/rg-joystick-a.jpg"


export class Ultrasonic extends Component{

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            value : 0
        };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.device.value<400){
            this.setState({value: nextProps.device.value});
            // this.setState({value: (nextProps.device.value+this.state.value)/2});
        }
    }

    
    render(){
        let color="success";

        if(this.state.value<50)
            color = "danger";
        else if(this.state.value<150)
            color = "warning";
        else if(this.state.value<300)
            color = "primary";
        // if(d.last_seen)
        return(
            <Card>
                <CardImg top className={this.props.device.state?"":"dead"} width="100%" src={ultra_img}/>
                <CardBody>
                    <CardTitle>Ultrasonic Sensor</CardTitle>
                    <CardText>Measures distance to objects using ultrasonic sound waves</CardText>
                    <CardText>Distance : {this.state.value}CM</CardText>
                    <Progress animated={this.props.device.state} color={color} value={this.state.value / 4}/>
                </CardBody>
            </Card>
        )
    }
}


export class Temperature extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render(){
        let d = this.props.device;
        let color="success";
        if(d.value>40)
            color = "danger";
        else if(d.value>30)
            color = "warning";
        return(
            <Card>
                <CardImg top className={d.state?"":"dead"} width="100%" src={dht_img}/>
                <CardBody>
                    <CardTitle>Temperature Sensor</CardTitle>
                    <CardText>Measures the temperature of the surrounding atmosphere. <br/> Temperature : {d.value} <br/> Humidity : {d.data} </CardText>
                    <Progress animated={d.state} color={color} value={d.value * 2}/>
                    <Button color="primary" onClick={this.toggle} style={{ marginTop: '1rem' }}>Details</Button>
                    <Collapse isOpen={this.state.collapse}>
                        <CardText style={{ marginTop: '1rem' }}>Temperature Range : 0 - 50℃ <br/>Humidity Range : 20-95%RH</CardText>
                    </Collapse>

                </CardBody>
            </Card>
        )
    }
}


export class Joystick extends Component{

    render(){
        let d = this.props.device;
        return(
            <Card>
                <CardImg top className={d.state?"":"dead"} width="100%" src={joy_img}/>
                <CardBody>
                    <CardTitle>Joystick</CardTitle>
                    <CardText>Used to control the bot.</CardText>
                    <CardLink href="/joystick/" target="_blank">Open Joystick</CardLink>
                </CardBody>
            </Card>
        )
    }
}


export class Clap extends Component{

    render(){
        let d = this.props.device;
        return(
            <Card>
                <CardImg top className={d.state?"":"dead"} width="100%" src={clap_img}/>
                <CardBody>
                    <CardTitle>Clap Sensor</CardTitle>
                    <CardText>Used to detect Claps.</CardText>
                    <Progress animated={d.state} color='danger' value={d.value * 100}/>
                </CardBody>
            </Card>
        )
    }
}

