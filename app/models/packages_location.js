import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  packageId: attr('number'),
  itemId: attr('number'),
  quantity: attr('number'),
  locationId: attr('number'),

  package:    belongsTo('package', { async: false }),
  location: belongsTo('location', { async: false }),
});
