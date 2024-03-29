import Ember from 'ember';
import fetch from 'ember-network/fetch';

export default Ember.Route.extend({
  model() {
    return fetch('https://game-scores.herokuapp.com/games')
      .then((res) => res.json())
      .then((results) => results.data);
  },

  actions: {
    saveGame(afterSave, attributes, resetForm) {
      const existingModel = this.get('controller.model');

      fetch('https://game-scores.herokuapp.com/games', {
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
        resetForm();
      });
    },
  },
});
