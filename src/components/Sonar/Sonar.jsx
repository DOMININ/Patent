import React, { useState } from 'react';
import socket from '@socket/socket';

import './sonar.scss';

const Sonar = () => {
  const [range, setRange] = useState(0);

  socket.on('data', (data) => {
    setRange(data);
  });

  return (
    <div className="sonar">
      <h4>Датчик дальности</h4>
      <span>{range}</span>
    </div>
  );
};

export default Sonar;
