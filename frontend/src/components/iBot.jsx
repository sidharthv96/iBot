import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sensors} from "../actions";
import {CardColumns, Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Joystick, Temperature, Ultrasonic} from "./Sensors";
import {Buzzer, Led, Robot} from "./Actuators";


class iBot extends Component {


    // resetForm = () => {
    //     this.setState({text: "", updateDeviceId: null});
    // };
    //
    // selectForEdit = (id) => {
    //     let device = this.props.sensors[id];
    //     this.setState({text: device.text, updateDeviceId: id});
    // };
    //
    // submitDevice = (e) => {
    //     e.preventDefault();
    //     if (this.state.updateDeviceId === null) {
    //         this.props.addDevice(this.state.text);
    //     } else {
    //         this.props.updateDevice(this.state.updateDeviceId, this.state.text);
    //     }
    //     this.resetForm();
    // };

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            // text: "",
            // isOpen: false
        };
    }

    componentDidMount() {
        // this.props.fetchSensors();
        setInterval(this.props.fetchSensors.bind(this), 1000);
        setInterval(this.props.fetchActuators.bind(this), 1000);
        // setInterval(this.props.fetchSensors(),1000);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    createSensor(sensor, id){
        // console.log(id);
        switch(sensor.name){
            case 'joystick':
                return <Joystick device={sensor}/>;
            case 'ultrasonic':
                return <Ultrasonic device={sensor}/>;
            case 'temperature':
                return <Temperature device={sensor}/>;
            default:
                return;
        }

    }

    createActuator(sensor, id){
        console.log(sensor);
        switch(sensor.name){
            case 'led':
                return <Led device={sensor}/>;
            case 'motor':
                return <Robot device={sensor}/>;
            case 'buzzer':
                return <Buzzer device={sensor}/>;
            default:
                return;
        }

    }

    render() {
        return (
            <div>
                <Navbar color="primary" dark expand="md">
                    <NavbarBrand href="/">iBot</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/rules/">Rules</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="http://localhost:8080/">Block Editor</NavLink>
                            </NavItem>
                            {/*<NavItem>*/}
                            {/*<NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>*/}
                            {/*</NavItem>*/}
                        </Nav>
                    </Collapse>
                </Navbar>
                <Container>

                    {/*<h3>Add new device</h3>*/}
                    {/*<form onSubmit={this.submitDevice}>*/}
                    {/*<InputGroup>*/}
                    {/*<Input*/}
                    {/*value={this.state.text}*/}
                    {/*placeholder="Enter device here..."*/}
                    {/*onChange={(e) => this.setState({text: e.target.value})}*/}
                    {/*required />*/}
                    {/*<InputGroupAddon addonType="append"><Button type="submit" color="primary">Save Device</Button></InputGroupAddon>*/}

                    {/*</InputGroup>*/}


                    {/*</form>*/}
                    <h1>Connected Sensors</h1>
                    <CardColumns>
                        {this.props.sensors.map((device, id) => (this.createSensor(device,id)))}
                        {/*{this.props.devices.map((device, id) => (this.createSensor(device,id)))}*/}
                    </CardColumns>
                    <br/>
                    <h1>Connected Actuators</h1>
                    <CardColumns>
                        {this.props.actuators.map((device, id) => (this.createActuator(device,id)))}
                        {/*{this.props.devices.map((device, id) => (this.createSensor(device,id)))}*/}
                    </CardColumns>
                    {/*<table>*/}
                    {/*<tbody>*/}
                    {/*</tbody>*/}
                    {/*</table>*/}
                    {/*<Button onClick={this.resetForm}>Reset</Button>*/}

                </Container>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        sensors: state.sensors,
        actuators: state.actuators,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSensors: () => {
            dispatch(sensors.fetchSensors());
        },
        fetchActuators: () => {
            dispatch(sensors.fetchActuators());
        },

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(iBot);

