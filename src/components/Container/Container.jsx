import React from 'react';
import Card from '../Card/Card';
import { Droppable } from 'react-beautiful-dnd';
import './container.scss';

const Container = (props) => {
  const title = props.item.title === 'Arduino' ? 'Ардуино' : 'Модули';

  return (
    <div className="containers__item">
      <h3 className="containers__title">{title}</h3>
      <div className="modules">
        <Droppable droppableId={`${props.index}`}>
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={props.isNotEmpty.length !== 0 ? 'modules__list' : 'modules__list--empty'}
            >
              <Card columnIndex={props.index} text={props.item.cards} />
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Container;
