export default function(){
  this.transition(
    this.hasClass('item-edit-form'),
    this.toValue(true),
    this.use('toUp', { duration: 500 })
  );
}
