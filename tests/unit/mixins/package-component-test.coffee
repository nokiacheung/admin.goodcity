`import Ember from 'ember'`
`import PackageComponentMixin from 'goodcity/mixins/package-component'`

module 'PackageComponentMixin'

# Replace this with your real tests.
test 'it works', ->
  PackageComponentObject = Ember.Object.extend PackageComponentMixin
  subject = PackageComponentObject.create()
  ok subject
