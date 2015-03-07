# GoodCity Admin App [![Circle CI](https://circleci.com/gh/crossroads/admin.goodcity.svg?style=svg)](https://circleci.com/gh/crossroads/admin.goodcity)

The GoodCity initiative is a new way to donate quality goods in Hong Kong. See www.goodcity.hk for more details.

## Installation

Install and configure nodejs https://github.com/creationix/nvm#install-script

```shell
npm install -g ember-cli bower phantomjs
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
npm install -g ember-cli
rm -rf node_modules bower_components dist tmp
npm install --save-dev ember-cli (SKIP if someone else has updated ember-cli already)
npm link ember-goodcity
ember install
ember init (SKIP if someone else has updated ember-cli already)
```

## Cordova

### Setup
* `npm install -g cordova`
* `ember cordova:prepare`
* `ln -s ../dist cordova/www` (linux/mac)
* `mklink /d cordova\www ..\dist` (windows)

Android
* Install SDK tools - https://developer.android.com/sdk/installing/index.html
* start SDK manager `android`
  - install API v19
  - install system image (performs better if matches host CPU, can be higher API version)
  - install sdk build tools
* `sudo apt-get install ant`
* start android avd manager `android avd` to create an android VM
* `ember cordova platform add android`

Windows Phone
* Install VS 2013 - http://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx
  - select "Windows Phone 8.0 SDK" for wp8
* `ember cordova platform add wp8` (for wp8)
* `ember cordova platform add windows` (for wp8.1/windows8.1)

IOS
* Install Xcode - https://developer.apple.com/xcode/downloads/
* `npm install -g ios-deploy`
* `ember cordova platform add ios`

### Run
To start app in emulator

`ember cordova run`

To start app in browser (use [ripple-emulator](https://chrome.google.com/webstore/detail/ripple-emulator-beta/geelfhphabnejjhdalkjhgipohgpdnoc?hl=en) to emulate hardware)

`npm run cordova`

### Build
Release Build

`ember cordova:build --environment=production --platform=<android|wp8|ios|windows>`

Debug Build
```sh
ember build --environment=production
cd cordova
cordova build android --debug
```

For Android release build it needs to be manually signed (key not in repo):
http://developer.android.com/tools/publishing/app-signing.html#signing-manually

### Other Commands
`ember cordova <arguments>`
http://cordova.apache.org/docs/en/4.0.0/guide_cli_index.md.html

## Development Notes

* Cordova loads app like "file://www/index.html" so can't use "/assets" or "//domain.com" style relative paths. In website mode even though the current url might be `goodcity.hk/offers/1/items` ember adds a `<base href'/'>` tag so urls in templates are still relative from the root (in cordova mode config.locationType is set to hash i.e. `goodcity.hk/#/offers/1/items` and no base tag is added).

* CustomAsynchelper for MockAjax call is mockApi, example to show how to use it:
  ```js
    mockApi('get', '/route_name', {json:data})
  ```
  Example on how to use it with FactoryGuy
  ```js
  	mockApi('get',
              '/territories',
              {territories: FactoryGuy.buildList('territory_with_many_districts', 3)});
  ```

* To keep whitespace settings consistent in source code we're using .editorconfig which can be installed in your favourite editor via http://editorconfig.org/#download
