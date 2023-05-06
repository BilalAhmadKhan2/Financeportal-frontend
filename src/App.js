import React from 'react';
import InvoiceSearch from './InvoiceSearch';
import { Container, Navbar } from 'react-bootstrap';
import './App.css'; // Import the CSS file

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>Finance Portal</Navbar.Brand>
          </Container>
        </Navbar>
      </header>
      <div className="flex-grow-1 main-content">
        <main className="py-3">
          <InvoiceSearch />
        </main>
      </div>
      <footer>
        <Container fluid className="bg-dark text-white text-center py-3">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </Container>
      </footer>
    </div>
  );
}

export default App;
