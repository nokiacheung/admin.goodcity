####Upgrade Ember 1.10.0
I have done following changes in the app:

1. In Brocfile.js:
 ```
 vendorFiles: { 'handlebars.js': null } 
 ```
2. In bower.json
 ```
   Ember version - "1.10.0" 
 ```
3. In package.json
   ```
  a) Ember-cli version - "0.1.15" 
  b) ember-cli-htmlbars version "^0.7.4" 
  ```

4. Added changes in templates/:
  - For translation:
    ```
    Replace {{t "notifications.text" textBinding=nextNotification.text}} by {{t "notifications.text" text=nextNotification.text}}
    
    Replace {{translateAttr title="items.edit_images.delete_tooltip"}} by title={{t "items.edit_images.delete_tooltip"}}
     ```
 -  Changed else-if ladder 

####Ember-data Upgrade
1. In bower.json
 ```
   ember-data version: "1.0.0-beta.15"
  ```

####Developers have to follow these steps to use upgraded versions
 ```
  npm uninstall -g ember-cli
  npm cache clean
  bower cache clean
  rm -rf node_modules bower_components dist tmp
  npm install -g ember-cli
  ember install:npm ember-cli
  ember install
  bower install
```
