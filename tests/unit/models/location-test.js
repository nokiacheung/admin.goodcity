import { test, moduleForModel } from 'ember-qunit';

moduleForModel('location', 'Location Model', {
});

test('check attributes', function(assert){
  assert.expect(2);
  var model = this.subject();
  var area = Object.keys(model.toJSON()).indexOf('area') > -1;
  var building = Object.keys(model.toJSON()).indexOf('building') > -1;

  assert.ok(building);
  assert.ok(area);
});

test('Checking computed properties', function(assert) {
  assert.expect(1);
  var location = this.subject({ area: 24, building: 'Office' });
  assert.equal(location.get('name'), "Office24");
});

