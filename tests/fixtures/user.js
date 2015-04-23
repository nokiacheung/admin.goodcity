import itemsFactory from './image';

FactoryGuy.define('user', {
  sequences: {
    id: function(num) {
      return num + 100;
    },
    collectionFirstName: function(num) {
      return 'Daniel' + num;
    },
    collectionLastName: function(num) {
      return 'Stepp' + num;
    },
    collectionHKMobile: function(){
      var phone_number = Math.floor(Math.random()*8999922+67110000);
      return phone_number.toString();
    }
  },
  default: {
    id:        FactoryGuy.generate('id'),
    firstName: FactoryGuy.generate('collectionFirstName'),
    lastName:  FactoryGuy.generate('collectionLastName'),
    mobile: FactoryGuy.generate('collectionHKMobile'),
  },
  user_with_image: {
    image: FactoryGuy.belongsTo('image')
  }
});
export default {};
