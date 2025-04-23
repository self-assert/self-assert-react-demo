import { Container } from 'react-bootstrap';

export function SystemSelector({
  systemType,
  setSystemType,
  rulesOnServer,
  setRulesOnServer,
}: {
  systemType: 'transient' | 'server';
  setSystemType: (t: 'transient' | 'server') => void;
  rulesOnServer: boolean;
  setRulesOnServer: (b: boolean) => void;
}) {
  return (
    <Container style={{ marginTop: '10px', maxWidth: '700px' }}>
      <div className="mb-3">
        <label className="form-label me-2 fw-bold">Select system type:</label>
        <select
          className="form-select w-auto d-inline-block"
          value={systemType}
          onChange={(e) =>
            setSystemType(e.target.value as 'transient' | 'server')
          }
        >
          <option value="transient">Transient (local)</option>
          <option value="server">Server (client/server)</option>
        </select>
        {systemType === 'server' && (
          <div className="alert alert-info mt-3 center" role="alert">
            Server mode is fully mocked using <code>msw</code>. Open the console
            to inspect requests.
            <p className="mb-2 mt-3 text-muted">
              <strong>Note:</strong> You can choose whether validation rules run
              on the client or the server. Enabling this simulates a scenario
              where the model is validated by the backend only.
            </p>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                checked={rulesOnServer}
                onChange={(e) => setRulesOnServer(e.target.checked)}
                id="serverRulesCheck"
              />
              <label
                className="form-check-label ms-2"
                htmlFor="serverRulesCheck"
              >
                Validate rules on the server
              </label>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
