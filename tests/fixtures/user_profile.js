FactoryGuy.define('user_profile', {
  sequences: {
    collectionFirstName: function(num) {
      return 'Daniel' + num;
    },
    collectionLastName: function(num) {
      return 'Stepp' + num;
    },
    collectionMobile: function(){
      return Math.floor(Math.random()*8999922+671100001);
    },
    collectionHKMobile: function(){
      var phone_number = Math.floor(Math.random()*8999922+67110000);
      return phone_number;
    }
  },
  default: {
    firstName: FactoryGuy.generate('collectionFirstName'),
    lastName: FactoryGuy.generate('collectionLastName'),
  },
  with_non_hk_mobile: {
    mobile: FactoryGuy.generate('collectionMobile'),
    district_id: 1
  },
  with_hk_mobile: {
    mobile: FactoryGuy.generate('collectionHKMobile'),
    district_id: 2
  }
});
export default {};
