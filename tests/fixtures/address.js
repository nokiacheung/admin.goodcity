FactoryGuy.define('address', {
  sequences: {
    id: function(num) {
      return num + 100;
    },
  },

  default: {
    id: FactoryGuy.generate('id'),
    flat: "901-B",
    building: "Plaza",
    street: "Palace Street",
    addressType: "colletion",

    addressableType: "Contact",
    addressable:     FactoryGuy.belongsTo("contact"),
  }
});

export default {};
