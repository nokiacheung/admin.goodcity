# GoodCity Admin App [![Circle CI](https://circleci.com/gh/crossroads/admin.goodcity.svg?style=svg)](https://circleci.com/gh/crossroads/admin.goodcity)

The GoodCity initiative is a new way to donate quality goods in Hong Kong. See www.goodcity.hk for more details.

## Installation

Install and configure nodejs https://github.com/creationix/nvm#install-script

```shell
npm install -g ember-cli bower phantomjs
git clone https://github.com/crossroads/shared.goodcity.git
cd shared.goodcity
npm link
cd ..
git clone https://github.com/crossroads/admin.goodcity.git
cd admin.goodcity
npm link shared.goodcity
ember install
```

## Running

* `npm start`
* Visit your app at http://localhost:4201.

## Running Tests

* `npm test`

## Building

* `npm build`
* `EMBER_CLI_CORDOVA=0 ember build --environment=production`

## Deployment

Staging site

`npm run deploy-staging`

Live site

`npm run deploy-live`

Note you will need to have your SSH key installed on the destination servers before deployment will work.

## Upgrading Ember CLI

Follow these steps to update the project version of ember-cli.
If someone else has done the upgrade and you're just refreshing code ignore the SKIP lines.

```shell
npm uninstall -g ember-cli
npm cache clean
bower cache clean
rm -rf node_modules bower_components dist tmp
npm install -g ember-cli
npm install --save-dev ember-cli (SKIP if someone else has updated ember-cli already)
npm link shared.goodcity
ember init (SKIP if someone else has updated ember-cli already)
ember install
```

## Cordova
Documentation has moved to https://github.com/crossroads/shared.goodcity/blob/master/docs/cordova.md
