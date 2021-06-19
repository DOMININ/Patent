const items = [
  {
    title: 'Arduino',
    cards: [],
  },
  {
    title: 'Modules',
    cards: ['Diod', 'Servo', 'Sonar'],
  },
];

const tasks = (state = items, action) => {
  switch (action.type) {
    case 'REORDER_CARDS':
      const { source, destination } = action.payload;
      const { index: sourceCardIndex, droppableId: sourceId } = source;
      const { index: destinationCardIndex, droppableId: destinationId } = destination;
      const sourceColumnIndex = +sourceId;
      const destinationColumnIndex = +destinationId;

      return state.map((item, currentColumnIndex) => {
        if (destinationColumnIndex === currentColumnIndex) {
          const [sourceCard] = state[sourceColumnIndex].cards.splice(sourceCardIndex, 1);
          const destinationCards = Array.from(state[destinationColumnIndex].cards);
          destinationCards.splice(destinationCardIndex, 0, sourceCard);
          item.cards = destinationCards;
        }

        return item;
      });
    default:
      return state;
  }
};

export default tasks;
