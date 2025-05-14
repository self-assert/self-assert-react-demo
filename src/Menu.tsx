import React from 'react';
import { Link } from 'react-router';
import { Nav } from 'react-bootstrap';
import { AppConstants } from './constants';

export class Menu extends React.Component {
  render() {
    return (
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/customers">
            Customers
          </Nav.Link>
        </Nav.Item>
        {/**
         * The accounting module is not yet implemented
         */}
        {/* <Nav.Item>
          <Nav.Link as={Link} to="/invoices">
            Invoices
          </Nav.Link>
        </Nav.Item> */}
        <div className="flex-grow-1"></div>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to={AppConstants.documentationUrl}
            target="_blank"
          >
            Documentation
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={AppConstants.repoUrl} target="_blank">
            <img src="/github-mark.png" alt="Source code" height="25px" />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}
