import Ember from 'ember';
import fetch from 'ember-network/fetch';
const {all, hash} = Ember.RSVP;

export default Ember.Route.extend({
  model(params) {
    return fetch(`https://game-scores.herokuapp.com/games/${params.gameId}`)
      .then((res) => res.json())
      .then((game) => {
        const scores = game.data.relationships.scores.map((score) => {
          return fetch(`https://game-scores.herokuapp.com/game-scores/${score.id}`)
            .then((res) => res.json());
        });

        return hash({
          game: game.data,
          scores: all(scores).then((scores) => scores.map((score) => score.data)),
        });
      });
  },

  actions: {
    saveScore(afterSave, game, attributes, resetForm) {
      const existingScores = this.get('controller.model.scores');

      fetch('https://game-scores.herokuapp.com/game-scores', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            type: 'game',
            attributes,
            relationships: {
              game: {
                type: 'games',
                id: game.id,
              },
            },
          },
        }),
      }).then((res) => res.json())
      .then((results) => {
        this.set('controller.model.scores', [...existingScores, results.data]);
        afterSave();
        resetForm();
      });
    }
  }
});
