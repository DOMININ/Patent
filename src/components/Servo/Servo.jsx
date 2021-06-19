import React, { useState, useEffect, useCallback } from 'react';
import socket from '@socket/socket';

import './servo.scss';

const Servo = () => {
  const [position, setPosition] = useState('0');

  const onChange = (e) => {
    setPosition(e.target.value);
  };

  const setServoPosition = useCallback(() => {
    socket.emit('servomotor', { position });
  }, [position]);

  useEffect(() => {
    setServoPosition();
  }, [position, setServoPosition]);

  return (
    <div className="servo">
      <h4>Сервомотор</h4>
      <input type="range" min="0" max="180" step="10" value={position} onChange={onChange}></input>
    </div>
  );
};

export default Servo;
