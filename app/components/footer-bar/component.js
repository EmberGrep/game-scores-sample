import Ember from 'ember';
import { bind } from 'ember-run-decorators';

export default Ember.Component.extend({
  classNames: ['footer-bar'],

  classNameBindings: ['expanded:footer-bar--active'],

  expanded: false,

  @bind
  toggleExpanded() {
    this.toggleProperty('expanded');
  },

  actions: {
    expand() {
      this.toggleExpanded();
    },
  },
});
