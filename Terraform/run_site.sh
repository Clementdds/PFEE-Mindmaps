#!/bin/sh

#Clone
ssh-keyscan github.com >> ~/.ssh/known_hosts
git clone https://github.com/Clementdds/PFEE-Mindmaps.git

#Install
sudo apt-get update -y
sudo apt-get install -y maven openjdk-14-jdk nodejs npm nginx postgresql-12 postgresql-contrib
sudo systemctl stop nginx

#Setup db
export PGPASSWORD=${postgres_password}
psql -h ${postgres_host_without_port} -d ${postgres_dbname} -U ${postgres_user} -f /PFEE-Mindmaps/MindMapBack/MindMapBack/webapp/src/main/resources/schema.sql > /tmp/postgres_log.txt

#Log for postgres connection
echo "host: ${postgres_host_without_port}" >> /tmp/postgres_log.txt
echo "password: ${postgres_password}" >> /tmp/postgres_log.txt
echo "exported password: $PGPASSWORD" >> /tmp/postgres_log.txt
echo "dbname: ${postgres_dbname}" >> /tmp/postgres_log.txt
echo "user: ${postgres_user}" >> /tmp/postgres_log.txt

#Set bash position
cd /PFEE-Mindmaps/MindMapBack/MindMapBack/

#Backend
sudo sed -i s/pfee/postgres/g webapp/src/main/resources/application.yml
sudo sed -i s/Thomas/postgres/g webapp/src/main/resources/application.yml
sudo sed -i -z "s/password: admin/password: ${postgres_password}/g" webapp/src/main/resources/application.yml
sudo sed -i -z 's/:5432//g' webapp/src/main/resources/application.yml
sudo sed -i s/localhost/${ip_db}/g webapp/src/main/resources/application.yml

mvn package -e > /tmp/mvn_package_log.txt
cp webapp/target/webapp-0.0.1-SNAPSHOT.jar backend.jar
nohup java -jar backend.jar > /tmp/log_back.txt &
touch /tmp/BackendStarted

sleep 19 #backend take around 19 sec to start

#Website
cd ../../WebSite

API_BackEnd="http://$(curl ifconfig.me):9999"
echo "$API_BackEnd" > /tmp/auth_endpoint.txt
echo API_BackEnd="$API_BackEnd" > .env
#sudo sed -i "s/localhost/$(curl ifconfig.me)/g" src/config.js

sudo npm install
sudo npm run-script build > /tmp/log_build_website.txt
sudo mv dist html
cd ~;
echo 'server {

  listen 3000;

  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
    allow all;
  }

  error_page   500 502 503 504  /50x.html;

  location = /50x.html {
    root   /usr/share/nginx/html;
  }

}' > bashbug
sudo mv bashbug /etc/nginx/conf.d/default.conf
cd /PFEE-Mindmaps/WebSite/

sudo cp -r html/* /usr/share/nginx/html
sudo systemctl start nginx

touch /tmp/WebsiteStarted