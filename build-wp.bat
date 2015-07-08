cd c:\Workspace\shared.goodcity
call git pull
call bower install
call npm install

cd c:\Workspace\admin.goodcity
call git pull
call bower install
call npm install

cd cordova
call cordova prepare windows
set staging=true& call ember build --environment=production

rem cordova run windows -- --phone --device
cordova build windows
