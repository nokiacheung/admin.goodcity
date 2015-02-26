# GoodCity App [![Build Status](https://travis-ci.org/crossroads/app.goodcity.svg?branch=master)](https://travis-ci.org/crossroads/app.goodcity)

The GoodCity initiative is a new way to donate quality goods in Hong Kong. See www.goodcity.hk for more details.

## Installation

Install and configure nodejs https://github.com/creationix/nvm#install-script

```shell
npm install -g ember-cli
npm install -g bower
npm install -g phantomjs
git clone https://github.com/crossroads/ember-goodcity.git
cd ember-goodcity
npm link
cd ..
git clone https://github.com/crossroads/goodcity.admin.git
cd goodcity.admin
npm link ember-goodcity
ember install
```

## Running

* `npm start`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test`

## Building

* `ember build`
* `ember build --environment=production`

## Upgrading Ember CLI

Follow these steps to update the project version of ember-cli.
If someone else has done the upgrade and you're just refreshing code ignore the SKIP lines.

```shell
npm uninstall -g ember-cli
npm cache clean
bower cache clean
npm install -g ember-cli
rm -rf node_modules bower_components dist tmp
npm install --save-dev ember-cli (SKIP if someone else has updated ember-cli already)
npm install
bower install
ember init (SKIP if someone else has updated ember-cli already)
```

## Deployment to production server

Stop any running instance of `ember server` and type `./deploy`. This will build the files in production mode, put them in dist/ and upload them to the goodcity.hk server.

```shell
echo "Building app.goodcity.hk [production]" && \
ember build --environment=production && \
echo "Removing existing files on app.goodcity.hk" && \
ssh deployer@app.goodcity.hk 'rm -rf /var/www/html/app.goodcity.hk/*' && \
echo "Uploading new files to app.goodcity.hk" && \
scp -r dist/* deployer@app.goodcity.hk:/var/www/html/app.goodcity.hk/
```

For more information on using ember-cli, visit [http://iamstef.net/ember-cli/](http://iamstef.net/ember-cli/).

#### CustomAsynchelper for MockAjax call is mockApi.

*Example to show how to use it*

```
   mockApi('get', '/route_name', {json:data})

   To use it with FactoryGuy use like given example

    mockApi('get',
            '/territories',
            {territories: FactoryGuy.buildList('territory_with_many_districts', 3)});
```
