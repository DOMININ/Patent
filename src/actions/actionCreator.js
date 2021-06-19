export const reorderCards = (source, destination) => ({
  type: 'REORDER_CARDS',
  payload: {
    source,
    destination,
  },
});
