export default function(){
  this.transition(
    this.hasClass('item-edit-form'),
    this.toValue(true),
    this.use('toUp', { duration: 500 })
  );

  this.transition(
    this.fromRoute('offers.submitted'),
    this.toRoute('review_offer.items'),
    this.use('toRight', { duration: 3000 }),
    this.reverse('toLeft')
  );
}
