import { Button, InputGroup } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

import { useCallback, useEffect, useState } from "react";

import styles from './styles.scss';

import axios from "axios";

export default function Home() {
    const [accuracy, setAccuracy] = useState('')

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get('http://localhost:5194/IA')
        } catch (error) {
            console.log("erro")
        }
    }, []);

    // useEffect(() => {
    //     fetchData()
    // }, [fetchData]);

    return (
        <div className="sreen">
            <div className="sua-classe">
                <Form.Select className="mb-3" aria-label="Default select example">
                    <option>Gender</option>
                    <option value="0">Famale</option>
                    <option value="1">Male</option>
                </Form.Select>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Age</InputGroup.Text>
                    <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Sleep Duration</InputGroup.Text>
                    <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Physical Activity Level</InputGroup.Text>
                    <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Stress Level</InputGroup.Text>
                    <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                </InputGroup>
                <Form.Select className="mb-3" aria-label="Default select example">
                    <option>BMI Category</option>
                    <option value="0">Normal</option>
                    <option value="1">Overweight</option>
                    <option value="2">Normal Weight</option>
                    <option value="3">Obese</option>
                </Form.Select>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Blood Pressure</InputGroup.Text>
                    <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Heart Rate</InputGroup.Text>
                    <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Daily Steps</InputGroup.Text>
                    <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                </InputGroup>
                <Form.Select className="mb-3" aria-label="Default select example">
                    <option>Sleep Disorder</option>
                    <option value="0">None</option>
                    <option value="1">Sleep Apnea</option>
                    <option value="2">Insomnia</option>
                </Form.Select>
                <div>
                    <Button variant="primary" onClick={() => fetchData()}>Send</Button>{' '}
                </div>
                {/* <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            
                        </Card.Text>
                    </Card.Body>
                </Card> */}
            </div>
        </div>
    )
}