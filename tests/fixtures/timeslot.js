var timeslots =  ["9AM-11AM", "11AM-1PM", "2PM-4PM", "4PM-6PM"];

FactoryGuy.define('timeslot', {
  default: {
    name: FactoryGuy.generate(function(num) {
      return timeslots[Math.floor(Math.random()*(timeslots.length))];
    })
  }
});

export default {};
