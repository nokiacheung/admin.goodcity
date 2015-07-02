rem ember cordova:prepare
cd cordova
git pull
call cordova prepare windows
set staging=true& call ember build --environment=production
cordova run windows -- --phone --device
