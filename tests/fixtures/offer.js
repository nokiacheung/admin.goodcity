import itemsFactory from './item';

FactoryGuy.define('offer', {
  sequences: {
    id: function(num) {
      return num + 100;
    },
  },

  default: {
    id: FactoryGuy.generate('id'),
    language: 'en',
    state: 'draft',
    origin: 'trial',
    stairs: true,
    parking: true,
    estimatedSize: '12cm',
    notes: 'dummy text',
    createdBy: FactoryGuy.belongsTo("user"),
    reviewedBy: FactoryGuy.belongsTo("user"),
    delivery: FactoryGuy.belongsTo("delivery"),
    createdAt: new Date(2015, 0, 20, 13,10),
    updatedAt: new Date(2015, 0, 20, 13,11)
  },
  offer_with_items: {
    items: function(){ return FactoryGuy.buildList('item', 2); }
  }
});

export default {};
