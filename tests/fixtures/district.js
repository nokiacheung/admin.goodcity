
var district_list =  ["Yuen Long","Kwu Tung","Tai Wai","Taipo","Tai Tong","Tai Tam"];

FactoryGuy.define('district', {
  sequences: {
    district_name: function(num) {
       return district_list[num-1];
    }
  },

  default:{ name: FactoryGuy.generate("district_name"),
            territory_id: 1
  },
  district_belongs_territory: {
    territory: FactoryGuy.belongsTo('territory')
  },
});
export default {};
