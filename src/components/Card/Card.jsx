import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './card.scss';

const Card = (props) => {
  const langRU = {
    Sonar: 'Датчик дальности',
    Servo: 'Сервомотор',
    Diod: 'Светодиод',
  };

  const langEN = {
    Sonar: 'Sonar',
    Servo: 'Servo',
    Diod: 'Diod',
  };

  return (
    <>
      {props.text.map((item, index) => (
        <Draggable key={index} draggableId={`card-${props.columnIndex}-${index}`} index={index}>
          {(provided) => (
            <li
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              key={index}
              className="modules__item"
            >
              <h4>{localStorage.getItem('lang') === 'RU' ? langRU[item] : langEN[item]}</h4>
              <img src={`img/${item}.png`} width="100" height="100" alt={item} />
            </li>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default Card;
