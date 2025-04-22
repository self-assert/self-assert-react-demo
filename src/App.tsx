import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Menu } from './Menu';
import { ALaGorraTransientSystem } from './System/ALaGorraTransientSystem';
import { CustomersView } from './Customers/View/CustomersView';
import { AddCustomerView } from './Customers/View/AddCustomerView';
import { EditCustomerView } from './Customers/View/EditCustomerView';

function App() {
  const system = new ALaGorraTransientSystem();

  return (
    <>
      <BrowserRouter>
        <div>
          <Menu />
          <Routes>
            <Route path="/" element={null} />
            <Route
              path="/customers"
              element={<CustomersView system={system} />}
            />
            <Route
              path="/customers/add"
              element={<AddCustomerView system={system} />}
            />
            <Route
              path="/customers/edit/:dni"
              element={<EditCustomerView system={system} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
