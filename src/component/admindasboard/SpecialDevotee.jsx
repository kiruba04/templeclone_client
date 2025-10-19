import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import * as XLSX from 'xlsx';

const Volunteerview = () => {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        let query = '';
        if (phone) {
            query = `phone=${phone}`;
        } else if (name) {
            query = `name=${name}`;
        } else {
            setError('Please enter a phone number or name to search.');
            return;
        }

        try {
            const response = await axios.get(`https://templeclone-backend.onrender.com/api/specialdevotee?${query}`);
            setUserDetails(response.data);
            setError('');
        } catch (error) {
            setError('User not found');
            setUserDetails(null);
        }
    };

    const handleRegisterNewDevotee = () => {
        navigate('/addspecialdevotee');
    };

    const handleEdit = () => {
        if (userDetails) {
            navigate('/addspecialdevotee', { state: { userDetails } });
        }
    };

    const handleDownload = async () => {
        try {
            const response = await axios.get('https://templeclone-backend.onrender.com/api/specialdevotee/alluser');
            const filteredUsers = response.data.map(({ password, isAdmin,_id,createdAt,updatedAt,__v,  ...rest }) => rest);

            if (!filteredUsers || filteredUsers.length === 0) {
                setError('No data available to download.');
                return;
            }

            const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Special Devotees');

            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'special_devotees.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            setError('Error downloading data');
        }
    };

    return (
        <div>
            <h2 className='heading'>Search Special Invites</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter phone number"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                    />
                </Form.Group>
                <Button onClick={handleSearch}>Search</Button>
                <Button variant="link" onClick={handleRegisterNewDevotee}>Register New Special Devotee</Button>
            </Form>
            {error && (
                <Row className="mt-3">
                    <Col>
                        <Alert variant="danger">{error}</Alert>
                    </Col>
                </Row>
            )}
            {userDetails && (
                <Card.Body className='carddisplay'>
                    <Card.Title className='text-center p-3 line'>Devotee Details</Card.Title>
                    <Card.Text className='carddetails'>
                        <div className='details'>
                            Name: {userDetails.username}
                        </div>
                        <div className='details'>
                            Phone Number: {userDetails.phone}
                        </div>
                        <div className='details'>
                            Address: {userDetails.address}
                        </div>
                    </Card.Text>
                    <Button variant="outline-info" className='placebtn' onClick={handleEdit}>Edit</Button>
                </Card.Body>
            )}
            <div className="mt-3">
                <Button variant="outline-success" onClick={handleDownload}>Download All Special Devotees</Button>
            </div>
        </div>
    );
};

export default Volunteerview;
