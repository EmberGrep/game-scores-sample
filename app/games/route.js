import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return fetch('http://localhost:8000/games')
      .then((res) => res.json())
      .then((results) => results.data);
  },
});
