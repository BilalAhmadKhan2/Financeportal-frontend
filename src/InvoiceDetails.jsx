import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function InvoiceDetails({ invoice, handleBack }) {
  const [paid, setPaid] = useState(invoice.status === 'PAID');
  const [statusMessage, setStatusMessage] = useState('');
  const [updatedInvoice, setUpdatedInvoice] = useState(invoice);

  useEffect(() => {
    // Fetch updated invoice data when paid status is updated
    if (paid) {
      axios.get(`http://localhost:8081/api/invoice/searchbyreferenceNo/${invoice.invoiceReferenceNumber}`)
        .then(response => {
          setUpdatedInvoice(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [paid, invoice]);

  const handlePay = () => {
    axios.put(`http://localhost:8081/api/invoice/updatestatus/${invoice.invoiceReferenceNumber}`)
      .then(response => {
        setPaid(true);
        setStatusMessage('Invoice Paid Successfully');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Container>
      <h2>Invoice Details</h2>
      {updatedInvoice && (
        <div>
          <Row>
            <Col><strong>Invoice reference number:</strong> {updatedInvoice.invoiceReferenceNumber}</Col>
          </Row>
          <Row>
            <Col><strong>Student ID:</strong> {updatedInvoice.studentId}</Col>
          </Row>
          <Row>
            <Col><strong>Total amount:</strong> £{updatedInvoice.totalAmount}</Col>
          </Row>
          <Row>
            <Col><strong>Due date:</strong> {updatedInvoice.dueDate}</Col>
          </Row>
          <Row>
            <Col><strong>Due type:</strong> {updatedInvoice.dueType}</Col>
          </Row>
          <Row>
            <Col><strong>Status:</strong> 
            {updatedInvoice.status === 'OUTSTANDING' && <span style={{ color: 'red' }}>{updatedInvoice.status}</span>}
            {updatedInvoice.status === 'PAID' && <span style={{ color: 'green' }}>{updatedInvoice.status}</span>}
            </Col>
          </Row>
        </div>
      )}
      <Button onClick={handleBack} className="mt-3">Search another Invoice</Button>
      {updatedInvoice.status === 'OUTSTANDING' && !paid && <Button onClick={handlePay} className="mt-3 mx-3">Pay</Button>}
      {statusMessage && (
        <Alert variant="success" className="mt-3">{statusMessage}</Alert>
      )}
    </Container>
  );
}

export default InvoiceDetails;
