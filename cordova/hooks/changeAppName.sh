#!/bin/bash

echo "IMPORTANT: CHANGING APP NAME and URL"

value=`cat appDetails.json`

environment=`node -pe 'process.env.TARGET'`

if [[ ${environment} == undefined ]]; then
  environment="staging"
fi

nameCommand="JSON.parse(process.argv[1]).$environment.name"
appName=`node -pe "$nameCommand" "$value"`

urlCommand="JSON.parse(process.argv[1]).$environment.url"
appUrl=`node -pe "$urlCommand" "$value"`

cat config.xml  | sed "s/^.*<name>.*<\/name>.*$/  <name>$appName<\/name>/"  | sed "s/id=\"[^\"]*\"/  id=\"$appUrl\"/" > config.xml.tmp
cp config.xml.tmp config.xml
rm config.xml.tmp
