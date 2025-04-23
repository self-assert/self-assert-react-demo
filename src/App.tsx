import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { Menu } from './Menu';
import { ALaGorraTransientSystem } from './System/ALaGorraTransientSystem';
import { CustomersView } from './Customers/View/CustomersView';
import { AddCustomerView } from './Customers/View/AddCustomerView';
import { EditCustomerView } from './Customers/View/EditCustomerView';
import { ALaGorraSystemClient } from './System/ALaGorraSystemClient';
import { ALaGorraServerSystem } from './System/ALaGorraServerSystem';
import { worker } from './Server';
import { TransientCustomersAgenda } from './Customers/System/TransientCustomersAgenda';
import { SystemSelector } from './System/View/SystemSelector';
import { Home } from './Home';

function App() {
  const [systemType, setSystemType] = React.useState<'transient' | 'server'>(
    'server'
  );
  const [rulesOnServer, setRulesOnServer] = React.useState(false);

  const system = React.useMemo(() => {
    return systemType === 'server'
      ? new ALaGorraSystemClient()
      : new ALaGorraTransientSystem();
  }, [systemType]);

  if (systemType === 'server') {
    ALaGorraServerSystem.start(
      worker,
      ALaGorraSystemClient.baseUrl,
      new TransientCustomersAgenda()
    );
  }

  return (
    <>
      <BrowserRouter>
        <div>
          <Menu />
          <SystemSelector
            systemType={systemType}
            setSystemType={setSystemType}
            rulesOnServer={rulesOnServer}
            setRulesOnServer={setRulesOnServer}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/customers"
              element={<CustomersView system={system} />}
            />
            <Route
              path="/customers/add"
              element={
                <AddCustomerView
                  system={system}
                  rulesOnServer={rulesOnServer}
                />
              }
            />
            <Route
              path="/customers/edit/:dni"
              element={
                <EditCustomerView
                  system={system}
                  rulesOnServer={rulesOnServer}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
