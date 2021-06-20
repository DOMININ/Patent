import React from 'react';
import { connect } from 'react-redux';
import { reorderCards } from './actions/actionCreator';
import { DragDropContext } from 'react-beautiful-dnd';

import Container from '@components/Container/Container';
import Diod from '@components/Diod/Diod';
import Sonar from '@components/Sonar/Sonar';
import Servo from '@components/Servo/Servo';

import './arduinoMain.scss';

const ArduinoMain = (props) => {
  const { tasks } = props;

  const components = {
    Diod: Diod,
    Sonar: Sonar,
    Servo: Servo,
  };

  const onDragEnd = ({ source, destination }) => {
    if (
      !destination ||
      (source.droppableId === destination.droppableId && source.index === destination.index)
    ) {
      return;
    }

    props.dispatch(reorderCards(source, destination));
  };

  return (
    <>
      <main className="containers">
        <DragDropContext onDragEnd={onDragEnd}>
          {tasks.map((item, index) => (
            <Container isNotEmpty={item.cards} key={index} item={item} index={index} />
          ))}
        </DragDropContext>
        <div className="containers__control">
          <h3>{localStorage.getItem('lang') === 'RU' ? 'Панель управления' : 'Panel control'}</h3>
          {tasks[0].cards.map((item, key) => {
            return <div key={key}>{React.createElement(components[item])}</div>;
          })}
        </div>
      </main>
    </>
  );
};

const mapStateToProps = function (state) {
  return {
    tasks: state.tasks,
  };
};

export default connect(mapStateToProps)(ArduinoMain);
