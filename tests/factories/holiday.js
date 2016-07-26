import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('holiday',{
  sequences: {
    name: (num) => `Holiday_${num}`
  },

  default: {
    name:   FactoryGuy.generate('name'),
    holiday: new Date(2016, 0, 20, 13,11),
    year: 2016,
  }

});
export default {};
