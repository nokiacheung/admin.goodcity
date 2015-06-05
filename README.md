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

### Setup
* `npm install -g cordova`
* `ember cordova:prepare`
* `cd cordova`
* `cordova prepare`

Android
* Install stand alone SDK tools - https://developer.android.com/sdk/installing/index.html
* set environment variables<br/>
  `export ANDROID_HOME=/<installation location>/android-sdk`<br/>
  `export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools`
* start SDK manager from terminal `android`
  - install "Android 5.1.1 (API 22)/SDK Platform"
  - install "Tools/Android SDK Build-tools" (latest version)
  - install "Tools/Android SDK Platform-tools" (latest version)
* `sudo apt-get install ant`
Android Emulator setup (not needed if using a real phone)
* start SDK manager from terminal `android`
  - install "Android 5.1.1 (API 22)/Google APIs Intel x86 Atom System Image"
* open from menu "Tools > Manage AVDs > Create"
* fill out create new AVD and click ok

Windows Phone
* Install VS 2013 - http://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx

IOS
* Install Xcode - https://developer.apple.com/xcode/downloads/
* `npm install -g ios-deploy`

### Run
To start app in emulator

`ember cordova emulate android`

To deploy to connected device

`ember cordova run windows --device --phone` (WP8.1)<br/>
`ember cordova run android`

---

To deploy to Android you need to have USB debugging enabled, to do so:

* enable `settings > developer options > android debugging`

If developer options is missing:

* go to `settings > about phone`
* tap `build number` seven times

### Build
Release Build

`ember cordova:build --environment=production --platform=<android|wp8|ios|windows>`

Debug Build
```sh
cd cordova
ember build --environment=production
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

* Shared brocfile imports can be found in shared.goodcity/index.js
