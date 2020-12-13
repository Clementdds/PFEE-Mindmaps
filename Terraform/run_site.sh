#!/bin/sh

ssh-keyscan github.com >> ~/.ssh/known_hosts
git clone https://github.com/Clementdds/PFEE-Mindmaps.git
sudo apt-get update -y
sudo apt-get install -y maven openjdk-14-jdk nodejs npm
cd PFEE-Mindmaps/MindMapBack/MindMapBack
mvn package -e > /tmp/mvn_package_log.txt
cp webapp/target/webapp-0.0.1-SNAPSHOT.jar backend.jar
nohup java -jar backend.jar > /tmp/log_back.txt &
touch BackendStarted /tmp
cd ../../WebSite
npm install
nohup npm run start > /tmp/log_website.txt &
touch WebsiteStarted /tmp