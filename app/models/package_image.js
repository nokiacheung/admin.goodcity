import Image from './image';
import DS from 'ember-data';

var belongsTo = DS.belongsTo;

export default Image.extend({
  package:  belongsTo('package', { async: false })
});
