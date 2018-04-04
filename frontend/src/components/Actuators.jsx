import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Progress} from "reactstrap";

import buzzer_img from "../images/piezo-buzzer.jpg";
import led_img from "../images/BbT4n.png"
import robot_img from "../images/robot.jpg"


export class Led extends Component {
    render() {
        let d = this.props.device;

        // if(d.last_seen)
        return (
            <Card>
                <CardImg top className={d.state ? "" : "dead"} width="100%" src={led_img}/>
                <CardBody>
                    <CardTitle>Light Emitting Diode</CardTitle>
                    <CardText>Indicates different states using light.</CardText>
                    <Progress animated={d.state} color="danger" value={d.data==="1"?100:d.data==="blink"?50:0}/>
                </CardBody>
            </Card>
        )
    }
}


export class Robot extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {collapse: false};
    }

    toggle() {
        this.setState({collapse: !this.state.collapse});
    }

    render() {
        let d = this.props.device;
        return (
            <Card>
                <CardImg top className={d.state ? "" : "dead"} width="100%" src={robot_img}/>
                <CardBody>
                    <CardTitle>iBot</CardTitle>
                    <CardText>Uses DC motors to drive in all directions.</CardText>
                    <CardSubtitle>State : {d.data}</CardSubtitle>
                    {/*<Button color="primary" onClick={this.toggle} style={{marginTop: '1rem'}}>Details</Button>*/}
                    {/*<Collapse isOpen={this.state.collapse}>*/}
                        {/*<CardText style={{marginTop: '1rem'}}>Temperature Range : 0 - 50℃ <br/>Humidity Range : 20-95%RH</CardText>*/}
                    {/*</Collapse>*/}
                </CardBody>
            </Card>
        )
    }
}


export class Buzzer extends Component {
    render() {
        let d = this.props.device;
        return (
            <Card>
                <CardImg top className={d.state ? "" : "dead"} width="100%" src={buzzer_img}/>
                <CardBody>
                    <CardTitle>Piezo Buzzer</CardTitle>
                    <CardText>Used to emit sound.</CardText>
                    <Progress animated={d.state} color="success" value={d.data==="on"?100:d.data==="blink"?50:0}/>
                    {/*<CardLink href="/joystick/" target="_blank">Open Joystick</CardLink>*/}
                </CardBody>
            </Card>
        )
    }
}

