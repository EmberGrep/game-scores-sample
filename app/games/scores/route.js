import Ember from 'ember';
const {all, hash} = Ember.RSVP;

export default Ember.Route.extend({
  model(params) {
    return fetch(`http://localhost:8000/games/${params.gameId}`)
      .then((res) => res.json())
      .then((game) => {
        const scores = game.data.relationships.scores.map((score) => {
          return fetch(`http://localhost:8000/game-scores/${score.id}`)
            .then((res) => res.json());
        });

        return hash({
          game: game.data,
          scores: all(scores),
        });
      });
  },
});
