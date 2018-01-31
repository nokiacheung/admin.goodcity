import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('orders_package',{
  sequences: {
    id: function(num) {
      return num + 100;
    }
  },
  default: {
    id:              FactoryGuy.generate('id'),
    quantity:        1,
    sentOn:          '',
    state:           '',
    package:            FactoryGuy.belongsTo('package')
    //designation:     FactoryGuy.belongsTo('designation'),
  }
});
export default {};
