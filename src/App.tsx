import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Menu } from './Menu';
import { ALaGorraTransientSystem } from './System/ALaGorraTransientSystem';
import { CustomersView } from './Customers/View/CustomersView';

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
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
