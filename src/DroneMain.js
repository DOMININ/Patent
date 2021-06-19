import React from 'react';
import Commands from './components/Control/Control';

import styles from './droneMain.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Commands />
    </div>
  );
}

export default App;
