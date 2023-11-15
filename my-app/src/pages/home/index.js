import { Button, InputGroup } from "react-bootstrap"
import Form from 'react-bootstrap/Form';

import { useCallback, useEffect, useState } from "react";

import styles from './styles.scss';

import axios from "axios";

export default function Home() {
    const [gender, setGender] = useState(0);
    const [age, setAge] = useState(0);
    const [sleepDuration, setSleepDuration] = useState(0);
    const [physical, setPhysical] = useState(0);
    const [stress, setStress] = useState(0);
    const [bmi, setBMI] = useState(0);
    const [bloodPressure, setBloodPressure] = useState(0);
    const [heart, setHeart] = useState(0);
    const [steps, setSteps] = useState(0);
    const [sleepDisorder, setDisorder] = useState(0);

    const obj = {
        Gender: gender,
        Age: age,
        SleepDuration: sleepDuration,
        Physical: physical,
        StressLevel: stress,
        BMI: bmi,
        BloodPressure: bloodPressure,
        Heart: heart,
        Steps: steps,
        SleepDisorder: sleepDisorder
    }

    const sendObj = useCallback(async () => {
        try {
            const res = await axios.post('http://localhost:5194/IA', obj)
            console.log(res)
        } catch (error) {
            console.log("failed")
        }
    })

    // const fetchData = useCallback(async () => {
    //     try {
    //         const res = await axios.get('http://localhost:5194/IA')
    //         console.log(res.data)
    //     } catch (error) {
    //         console.log("erro")
    //     }
    // }, []);

    // useEffect(() => {
    //     fetchData()
    // }, [fetchData]);

    return (
        <div className="sreen">
            <div className="sua-classe">
                <Form.Select onClick={(e) => setGender(e.target.value)} className="mb-3" aria-label="Default select example">
                    <option>Gender</option>
                    <option value="0">Famale</option>
                    <option value="1">Male</option>
                </Form.Select>
                <InputGroup onChange={(e) => setAge(e.target.value)} className="mb-3">
                    <InputGroup.Text>Age</InputGroup.Text>
                    <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                </InputGroup>
                <InputGroup onChange={(e) => setSleepDuration(e.target.value)} className="mb-3">
                    <InputGroup.Text>Sleep Duration</InputGroup.Text>
                    <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                </InputGroup>
                <InputGroup onChange={(e) => setPhysical(e.target.value)} className="mb-3">
                    <InputGroup.Text>Physical Activity Level</InputGroup.Text>
                    <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                </InputGroup>
                <InputGroup onChange={(e) => setStress(e.target.value)} className="mb-3">
                    <InputGroup.Text>Stress Level</InputGroup.Text>
                    <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                </InputGroup>
                <Form.Select onClick={(e) => setBMI(e.target.value)} className="mb-3" aria-label="Default select example">
                    <option>BMI Category</option>
                    <option value="0">Normal</option>
                    <option value="1">Overweight</option>
                    <option value="2">Normal Weight</option>
                    <option value="3">Obese</option>
                </Form.Select>
                <InputGroup onChange={(e) => setBloodPressure(e.target.value)} className="mb-3">
                    <InputGroup.Text>Blood Pressure</InputGroup.Text>
                    <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                </InputGroup>
                <InputGroup onChange={(e) => setHeart(e.target.value)} className="mb-3">
                    <InputGroup.Text>Heart Rate</InputGroup.Text>
                    <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                </InputGroup>
                <InputGroup onChange={(e) => setSteps(e.target.value)} className="mb-3">
                    <InputGroup.Text>Daily Steps</InputGroup.Text>
                    <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
                </InputGroup>
                <Form.Select onClick={(e) => setDisorder(e.target.value)} className="mb-3" aria-label="Default select example">
                    <option>Sleep Disorder</option>
                    <option value="0">None</option>
                    <option value="1">Sleep Apnea</option>
                    <option value="2">Insomnia</option>
                </Form.Select>
                <div>
                    <Button variant="primary" onClick={() => sendObj()}>Send</Button>{' '}
                </div>
            </div>
        </div>
    )
}