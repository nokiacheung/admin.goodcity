import './offer';
import './package_type';

FactoryGuy.define('item', {
  sequences: {
    id: function(num) {
      return num + 100;
    },
    description: function(num) {
      return 'Donor Description' + num;
    }
  },
  default: {
    id:               FactoryGuy.generate('id'),
    state:            'submitted',
    createdAt:        '12/01/2014',
    updatedAt:        '12/01/2014',
    donorDescription: FactoryGuy.generate("description"),
    donorCondition:   FactoryGuy.belongsTo('donor_condition'),
  },
  item_with_offer: {
    offer: FactoryGuy.belongsTo('offer')
  },
  item_with_type: {
    packageType: FactoryGuy.belongsTo('package_type')
  }
});

export default {};
