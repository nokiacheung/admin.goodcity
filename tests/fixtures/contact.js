FactoryGuy.define('contact',{
  sequences: {
    name: function(num) {
      return 'Daniel' + num;
    },
    collectionMobile: function(){
      return Math.floor(Math.random()*8999922+671100001);
    },
  },
  default: {
    name:   FactoryGuy.generate('name'),
    mobile: FactoryGuy.generate('collectionMobile'),
  }
});
export default {};
