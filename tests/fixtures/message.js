FactoryGuy.define('message', {
  sequences: {
    id: function(num) {
      return num + 100;
    },
  },

  default: {
    id: FactoryGuy.generate('id'),
    offer: FactoryGuy.belongsTo("offer"),
    item: FactoryGuy.belongsTo("item"),
    sender: FactoryGuy.belongsTo("user"),
    state: 'unread',
    isPrivate: false,
    body: "Message Example Test",
    createdAt: new Date(),
  }
});

export default {};
