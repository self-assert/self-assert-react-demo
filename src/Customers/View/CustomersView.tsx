import React from 'react';
import { Link } from 'react-router';
import { Button, Container, Table } from 'react-bootstrap';

import { Customer } from '../Customer';
import { SystemViewProps } from '../../Types';

export class CustomersView extends React.Component<
  SystemViewProps,
  { customers: Customer[] }
> {
  constructor(props: SystemViewProps) {
    super(props);
    this.state = {
      customers: [],
    };
  }

  async componentDidMount() {
    const customers = await this.props.system
      .getCustomersAgenda()
      .getCustomers();

    this.setState({ customers });
  }

  async delete(aDNI: number) {
    await this.props.system
      .getCustomersAgenda()
      .removeCustomerIdentifiedAs(aDNI);
    await this.componentDidMount();
  }

  render() {
    return (
      <Container style={{ marginTop: '10px', maxWidth: '700px' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DNI</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.customers.map((customer) => (
              <tr key={customer.getDNI()}>
                <td>{customer.getFirstName()}</td>
                <td>{customer.getLastName()}</td>
                <td>{customer.getDNI()}</td>
                <td>
                  <Link to={`/customers/edit?dni=${customer.getDNI()}`}>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                    >
                      Update
                    </Button>
                  </Link>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => this.delete(customer.getDNI())}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="text-end">
                <Link to="/customers/add">
                  <Button variant="primary">Add Customer</Button>
                </Link>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Container>
    );
  }
}
