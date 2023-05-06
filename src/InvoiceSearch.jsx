import React, { useState } from "react";
import axios from "axios";
import InvoiceDetails from "./InvoiceDetails";
import { Container, Row, Col, Form, Button, Table, Alert } from "react-bootstrap";

function InvoiceSearch() {
    const [invoiceRef, setInvoiceRef] = useState("");
    const [studentId, setStudentId] = useState("");
    const [invoices, setInvoices] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [invoice, setInvoice] = useState(null); // Updated
    const [error, setError] = useState("");

    const handleBack = () => {
        setInvoice(null); // Updated
        setInvoiceRef("");
    };

    const handleSearchByRef = () => {
        axios
            .get(`http://localhost:8081/api/invoice/searchbyreferenceNo/${invoiceRef}`)
            .then((response) => {
                setShowResults(false);
                setError("");
                setStudentId("");
                setInvoice(response.data); // Updated
            })
            .catch((error) => {
                setError("Invoice not found");
            });
    };

    const handleSearchByStudentId = () => {
        axios
            .get(`http://localhost:8081/api/invoice/searchbystudentId/${studentId}`)
            .then((response) => {
                setShowResults(true);
                setError("");
                setInvoices(response.data);
            })
            .catch((error) => {
                setError("Student not found");
                setShowResults(false);
                setInvoices([]);
            });
    };

    const handleSearchOtherInvoices = () => {
        setShowResults(false);
        setError("");
        setInvoices([]);
        setInvoiceRef("");
        setStudentId("");
    };
    if (invoice) {
        return <InvoiceDetails invoice={invoice} handleBack={handleBack} />;
    }

    return (
        <Container>
        {error && <Alert variant="danger">{error}</Alert>}
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="invoiceRef">
                <Form.Control
                  type="text"
                  placeholder="Enter invoice reference number"
                  value={invoiceRef}
                  onChange={(e) => setInvoiceRef(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleSearchByRef} className="mt-2">
                Search by reference
              </Button>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group controlId="studentId">
                <Form.Control
                  type="text"
                  placeholder="Enter student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleSearchByStudentId} className="mt-2">
                Search by student ID
              </Button>
            </Form>
          </Col>
        </Row>
        {showResults && (
          <div className="mt-4">
            {invoices.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Invoice reference number</th>
                    <th>Total amount</th>
                    <th>Due date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.invoiceReferenceNumber}>
                      <td>{invoice.invoiceReferenceNumber}</td>
                      <td>£{invoice.totalAmount}</td>
                      <td>{invoice.dueDate}</td>
                      <td style={{color: invoice.status === 'PAID' ? 'green' : 'red'}}>{invoice.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No invoices found for this student ID.</p>
            )}
            <Button variant="secondary" onClick={handleSearchOtherInvoices} className="mt-2">
              Search other invoices
            </Button>
          </div>
        )}
      </Container>
    );
}

export default InvoiceSearch;
