import DS from 'ember-data';
import Ember from 'ember';

var attr = DS.attr;

export default DS.Model.extend({
  building:  attr('string'),
  area:      attr('string'),
  stockitId: attr('number'),

  name: Ember.computed('building', 'area', function(){
    return this.get('building') + this.get('area');
  }),
});
