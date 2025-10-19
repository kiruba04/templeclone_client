import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Alert, Form, Button, Row, Col } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import "./main.css";
const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchAppointments('https://templeclone-backend.onrender.com/api/register/nextfive');
  }, []);

  const fetchAppointments = async (url) => {
    try {
      const response = await axios.get(url);
      setAppointments(response.data);
      setError('');
    } catch (error) {
      setError('Error fetching appointments');
    }
  };

  const handleFetchAppointments = () => {
    if (startDate && endDate) {
      fetchAppointments(`https://templeclone-backend.onrender.com/api/register/range?startDate=${startDate}&endDate=${endDate}`);
    } else {
      fetchAppointments('https://templeclone-backend.onrender.com/api/register/nextfive');
    }
  };

  const exportToExcel = () => {
    const data = appointments.map(appointment => ({
      'Pooja Name': appointment.poojaid.poojaname,
      'Devotee Name': appointment.userid.username,
      'Token Number': appointment.tokennumber,
      'Date': new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Appointments');

    XLSX.writeFile(workbook, 'appointments.xlsx');
  };

  return (
    <div>
      <h2 className='heading'>View Registeration</h2>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Button variant='success' className="mt-3 mr" onClick={handleFetchAppointments}>Fetch Appointments</Button>
        <Button variant='outline-success'  className="mt-3 ml-10" onClick={exportToExcel}>Download as Excel</Button>
      </Form>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {appointments.length === 0 ? (
        <p className="mt-3">No Registeration found</p>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Pooja Name</th>
              <th>Devotee Name</th>
              <th>Token Number</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.poojaid.poojaname}</td>
                <td>{appointment.userid.username}</td>
                <td>{appointment.tokennumber}</td>
                <td>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ViewAppointments;
