import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return fetch('http://localhost:8000/games')
      .then((res) => res.json())
      .then((results) => results.data);
  },

  actions: {
    saveGame(afterSave, attributes) {
      const existingModel = this.get('controller.model');

      fetch('http://localhost:8000/games', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            type: 'game',
            attributes,
          },
        }),
      }).then((res) => res.json())
      .then((results) => {
        this.set('controller.model', [...existingModel, results.data]);
        afterSave();
      });
    },
  },
});
