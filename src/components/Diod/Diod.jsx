import React, { useState } from 'react';
import socket from '@socket/socket';

import './diod.scss';

const Diod = () => {
  const [isActive, setIsActive] = useState(false);

  const setDiodOn = () => {
    socket.emit('lights', { status: '1' });
    setIsActive(true);
  };

  const setDiodOff = () => {
    socket.emit('lights', { status: '0' });
    setIsActive(false);
  };

  return (
    <div className="led">
      <h4>Светодиод</h4>
      {isActive ? (
        <button onClick={setDiodOff}>Выкл</button>
      ) : (
        <button onClick={setDiodOn}>Вкл</button>
      )}
    </div>
  );
};

export default Diod;
