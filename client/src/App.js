import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import {Container, Col, Row, Form, Table, Modal, Button, ToggleButton, ButtonGroup} from "react-bootstrap";

function App() {
    const [dockedData, getDockedData] = useState([])
    const dockedURL = 'http://localhost:3001/api/list/0';

    const [outboundData, getOutboundData] = useState([])
    const outboundURL = 'http://localhost:3001/api/list/1';

    const [inboundData, getInboundData] = useState([])
    const inboundURL = 'http://localhost:3001/api/list/2';

    const [maintenanceData, getMaintenanceData] = useState([])
    const maintenanceURL = 'http://localhost:3001/api/list/3';

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

    const hideModal = () => setVisible(false);
    const openModal = (item) => {
        setVisible(true);
        setModal(item);
        setRadioValue(item?.swimlane.toString());
        console.log('selectedData:');
        console.log(selectedData);
        console.log(item.swimlane);
    };

    const [radioValue, setRadioValue] = useState('0');

    const radios = [
        {name: 'Docked', value: '0'},
        {name: 'Outbound', value: '1'},
        {name: 'Inbound', value: '2'},
        {name: 'Maintenance', value: '3'}
    ];

    function deleteData() {

    }
    function editData() {
        fetch('http://localhost:3001/api/editboat/' + selectedData.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(selectedData)})
            //.then(resp => resp.json())
            .then(() => updateTables())

        };

    function addData() {

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
                <Row className="justify-content-md-center">
                    <Button variant="secondary" onClick={() => openModal(undefined)}>
                        Add boat
                    </Button>

                </Row>
                <Row className="justify-content-md-center">
                    <Col>
                        <Table striped bordered hover>
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
                    <Col>
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
                    <Col>
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
                    <Col>
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
                <Modal.Body>
                    <Form>
                        <ButtonGroup>
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
                                        selectedData.swimlane = e.currentTarget.value;}}>
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>


                        <Form.Group controlId="vessel_name">
                            <Form.Label>Boat Name</Form.Label>
                            <Form.Control type="text" value={selectedData?.vessel_name}/>
                        </Form.Group>
                        <Form.Group controlId="operator_name">
                            <Form.Label>Operator Name</Form.Label>
                            <Form.Control type="text" value={selectedData?.operator_name}/>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button hidden={selectedData === undefined} variant="secondary" onClick={() => {deleteData(); hideModal();}}>
                        Delete
                        </Button>
                    <Button variant="secondary" onClick={() => {editData(); hideModal(); }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default App;
