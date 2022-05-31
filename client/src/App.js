import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import {
    Container,
    Col,
    Row,
    Form,
    Table,
    Modal,
    Button,
    ToggleButton,
    ButtonGroup,
    ButtonToolbar,
    Dropdown,
    Alert
} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";

function App() {
    const [dockedData, getDockedData] = useState([])
    const dockedURL = '/api/list/0';

    const [outboundData, getOutboundData] = useState([])
    const outboundURL = '/api/list/1';

    const [inboundData, getInboundData] = useState([])
    const inboundURL = '/api/list/2';

    const [maintenanceData, getMaintenanceData] = useState([])
    const maintenanceURL = '/api/list/3';

    useEffect(() => {
        fetchDockedData()
    }, [])
    useEffect(() => {
        fetchOutboundData()
    }, [])
    useEffect(() => {
        fetchInboundData()
    }, [])
    useEffect(() => {
        fetchMaintenanceData()
    }, [])


    const fetchDockedData = () => {
        fetch(dockedURL)
            .then((res) =>
                res.json())

            .then((response) => {
                console.log(response);
                getDockedData(response);
            })

    }
    const fetchOutboundData = () => {
        fetch(outboundURL)
            .then((res) =>
                res.json())

            .then((response) => {
                console.log(response);
                getOutboundData(response);
            })

    }
    const fetchInboundData = () => {
        fetch(inboundURL)
            .then((res) =>
                res.json())

            .then((response) => {
                console.log(response);
                getInboundData(response);
            })

    }
    const fetchMaintenanceData = () => {
        fetch(maintenanceURL)
            .then((res) =>
                res.json())

            .then((response) => {
                console.log(response);
                getMaintenanceData(response);
            })

    }

    const [selectedData, setModal] = useState([])
    //let selectedData = undefined;

    const [showModal, setVisible] = useState(false);
    const [showModalError, setShowModalError] = useState(false);

    const hideModal = () => setVisible(false);
    const openModal = (item) => {
        setShowModalError(false);
        setVisible(true);
        setModal(item);
        setRadioValue(item?.swimlane.toString());
        console.log('selectedData:');
        console.log(selectedData);
        console.log(item?.swimlane);
    };

    const [radioValue, setRadioValue] = useState('0');

    const radios = [
        {name: 'Docked', value: '0'},
        {name: 'Outbound', value: '1'},
        {name: 'Inbound', value: '2'},
        {name: 'Maintenance', value: '3'}
    ];

    function deleteData() {
        fetch('/api/deleteboat/' + selectedData.id, {
            method: "DELETE"
        })
            //.then(resp => resp.json())
            .then(() => updateTables())
    }

    function editData() {
        fetch('/api/editboat/' + selectedData.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(selectedData)
        })
            .then(response => {
                if (response.status !== 200) {
                    setShowModalError(true);
                    console.log('show modal error');
                    return;
                } else {
                    hideModal();
                    updateTables();
                }
            })

    };

    function submitForm(e) {
        e.preventDefault();
        if (selectedData === undefined) {
            addData(e.target)
        } else {
            editData();
        }
    };

    function addData(targetData) {
        let sendData = {};
        sendData["vessel_name"] = targetData.vessel_name.value;
        sendData["operator_name"] = targetData.operator_name.value;
        fetch('/api/addboat', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
            .then(response => {
                if (response.status !== 200) {
                    setShowModalError(true);
                    return;
                } else {
                    hideModal();
                    updateTables();
                }
            })
    }

    function updateTables() {
        fetchDockedData();
        fetchOutboundData();
        fetchInboundData();
        fetchMaintenanceData();
    }

    /*TODO: turn each table into reusable components*/
    return (
        <div className="App">
            <header className="App-header">

                <h1>swimlane-tracker</h1>
            </header>

            <Container>
                <Row>
                    <Col>
                        <Button className="float-start" variant="secondary" onClick={() => openModal(undefined)}>
                            Add boat
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm>
                        <Table striped bordered hover responsive>
                            <thead>
                            <th>Docked</th>
                            </thead>
                            <tbody>
                            {dockedData.map((item, i) => (
                                <tr key={i} onClick={() => openModal(item)}>
                                    <td>{item.vessel_name}</td>
                                </tr>
                            ))}

                            </tbody>
                        </Table>
                    </Col>
                    <Col sm>
                        <Table striped bordered hover>
                            <thead>
                            <th>Outbound</th>
                            </thead>
                            <tbody>
                            {outboundData.map((item, i) => (
                                <tr key={i} onClick={() => openModal(item)}>
                                    <td>{item.vessel_name}</td>
                                </tr>
                            ))}

                            </tbody>
                        </Table>
                    </Col>
                    <Col sm>
                        <Table striped bordered hover>
                            <thead>
                            <th>Inbound</th>
                            </thead>
                            <tbody>
                            {inboundData.map((item, i) => (
                                <tr key={i} onClick={() => openModal(item)}>
                                    <td>{item.vessel_name}</td>
                                </tr>
                            ))}

                            </tbody>
                        </Table>
                    </Col>
                    <Col sm>
                        <Table striped bordered hover>
                            <thead>
                            <th>Maintenance</th>
                            </thead>
                            <tbody>
                            {maintenanceData.map((item, i) => (
                                <tr key={i} onClick={() => openModal(item)}>
                                    <td>{item.vessel_name}</td>
                                </tr>
                            ))}

                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedData === undefined ? 'Add Boat' : 'Edit Boat'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitForm}>
                    <Modal.Body>
                        <ButtonGroup style={{visibility: selectedData !== undefined ? "visible" : "hidden"}}>
                            {radios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant={'outline-info'}
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => {
                                        setRadioValue(e.currentTarget.value);
                                        selectedData.swimlane = e.currentTarget.value;
                                    }}>
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>


                        <Form.Group controlId="vessel_name">
                            <Form.Label>Boat Name</Form.Label>
                            <Form.Control type="text" defaultValue={selectedData?.vessel_name}
                                          onChange={(e) => {
                                              if (selectedData !== undefined) {
                                                  selectedData.vessel_name = e.currentTarget.value;
                                              }
                                          }
                                          }/>
                        </Form.Group>
                        <Form.Group controlId="operator_name">
                            <Form.Label>Operator Name</Form.Label>
                            <Form.Control type="text"
                                          defaultValue={selectedData?.operator_name}
                                          onChange={(e) => {
                                              if (selectedData !== undefined) {
                                                  selectedData.operator_name = e.currentTarget.value;
                                              }
                                          }
                                          }
                            />
                        </Form.Group>


                    </Modal.Body>
                    <Modal.Footer>
                        <Container>
                            <Row>
                                <Alert variant='warning' show={showModalError}>
                                    Error submitting data! Please fields are properly filled and try again.
                                </Alert>
                            </Row>
                            <Row>
                                <Col className="float-start">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="danger">
                                            Delete
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item hidden={selectedData === undefined} variant="danger"
                                                           onClick={() => {
                                                               deleteData();
                                                               hideModal();
                                                           }}>
                                                Confirm Delete
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Col className="float-end">
                                    <ButtonToolbar className="float-end">
                                        <Button onClick={hideModal}>
                                            Cancel
                                        </Button>
                                        <Button variant="secondary" type="submit">
                                            Save
                                        </Button>
                                    </ButtonToolbar>
                                </Col>

                            </Row>
                        </Container>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default App;
