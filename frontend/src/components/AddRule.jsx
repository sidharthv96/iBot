import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sensors} from "../actions";
import {
    Collapse,
    Container,
    FormGroup,
    Input,
    Label,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink
} from 'reactstrap';


class AddRule extends Component {


    resetForm = () => {
        this.setState({text: "", updateDeviceId: null});
    };

    selectForEdit = (id) => {
        let device = this.props.devices[id];
        this.setState({text: device.text, updateDeviceId: id});
    };

    submitDevice = (e) => {
        e.preventDefault();
        if (this.state.updateDeviceId === null) {
            this.props.addDevice(this.state.text);
        } else {
            this.props.updateDevice(this.state.updateDeviceId, this.state.text);
        }
        this.resetForm();
    };

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            sensors: [],
            actuators: [],
            sensor: "",
            sensor_events: [],
            sensor_event: "",
            sensor_event_visible: false,
            sensor_value: "",
            actuator: "",
            actuator_actions: [],
            actuator_action: "",
            actuator_value: "",
            isOpen: false
        };
    }

    componentDidMount() {
        this.props.fetchSensors();
        // setInterval(this.props.fetchSensors.bind(this), 1000);
        // setInterval(this.props.fetchSensors(),1000);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    sensorSelected(event){
        this.setState({sensor: event.target.value});
        console.log(event.target);
        this.props.fetchSensorEvents(event.target.value);
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
                                <NavLink href="/">Devices</NavLink>
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
                    <h1>Add Rule</h1>
                    <FormGroup>
                        <Label for="sensorSelect">Select</Label>
                        <Input type="select" name="sensor" id="sensorSelect" onChange={(e) => this.sensorSelected(e)} value={this.state.sensor}>
                            <option value="">Select Sensor</option>
                            {this.props.sensors.map((sensor,id) => {
                                return (<option key={sensor.pk} value={sensor.pk}>{sensor.name}</option>);
                            })}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="sensorEventSelect">Select</Label>
                        <Input type="select" name="sensor_event" id="sensorEventSelect" onChange={(e) => this.setState({sensor_event: e.target.value})} value={this.state.sensor}>
                            <option value="">Select Sensor Event</option>
                            {this.props.sensor_events.map((sensor_event,id) => {
                                return (<option key={sensor_event.pk} value={sensor_event.pk}>{sensor_event.name}</option>);
                            })}
                        </Input>
                    </FormGroup>
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
        devices: state.devices,
        sensors: state.sensors,
        sensor_events: state.sensor_events,
        actuators: state.actuators
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSensors: () => {
            dispatch(sensors.fetchSensors());
        },
        fetchSensorEvents: (sensor) => {
            dispatch(sensors.fetchSensorEvents(sensor));
        },
        addDevice: (text) => {
            dispatch(sensors.addDevice(text));
        },
        updateDevice: (id, text) => {
            dispatch(sensors.addDevice(id, text));
        },
        deleteDevice: (id) => {
            dispatch(sensors.deleteDevice(id));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(AddRule);

