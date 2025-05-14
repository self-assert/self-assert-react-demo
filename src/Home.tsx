import React from 'react';
import { AppConstants } from './constants';

export class Home extends React.Component {
  render() {
    return (
      <div className="container mt-4" style={{ maxWidth: '700px' }}>
        <h2>Welcome to the self-assert demo</h2>
        <p className="text-muted">
          This demo showcases the core design of{' '}
          <a href={AppConstants.repoUrl} target="_blank">
            self-assert
          </a>
          , a TypeScript library for building objects responsible for their own
          validity.
        </p>

        <p>
          Use the selector above to switch between systems. When using the
          server mode, you can inspect network behavior in the browser console
          (powered by{' '}
          <a href="https://mswjs.io" target="_blank">
            MSW
          </a>
          ).
        </p>
      </div>
    );
  }
}
