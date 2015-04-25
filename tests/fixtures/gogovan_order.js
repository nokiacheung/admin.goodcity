import mobile from './mobile';

FactoryGuy.define('gogovan_order', {
  sequences: {
    id: function(num) {
      return num + 100;
    },
    collectionName: function(num) {
      return 'Daniel' + num + ' Stepp' + num;
    },
    driverName: function(num) {
      return 'Driver' + num + ' Ggv' + num;
    },
  },

  default: {
    id:            FactoryGuy.generate('id'),
    name:          FactoryGuy.generate('collectionName'),
    mobile:        FactoryGuy.generate(mobile.hongKong),
    status:        'pending',

    delivery:      FactoryGuy.belongsTo("delivery"),
    createdAt:     new Date(2015, 0, 20, 13,10),
    updatedAt:     new Date(2015, 0, 20, 13,11)
  },

  gogovan_active_order: {
    price:         120.0,
    driverName:    FactoryGuy.generate('driverName'),
    driverMobile:  FactoryGuy.generate(mobile.hongKong),
    driverLicense: 'VH1002',
    status:        'active'
  }
});

export default {};
