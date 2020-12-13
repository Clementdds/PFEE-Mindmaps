#!/bin/sh

ssh-keyscan github.com >> ~/.ssh/known_hosts
git clone git@github.com:Clementdds/PFEE-Mindmaps.git
sudo apt-get update -y
sudo apt-get install -y maven openjdk-14-jdk nodejs npm
cd MindMapBack/MindMapBack
mvn compile
nohup mvn exec:java -Dexec.mainClass=com.pfee.mindmap.MindmapApplication & > /tmp/log_back.txt
cd ../../WebSite
npm install
nohup npm run & > /tmp/log_website.txt