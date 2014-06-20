#Node Talk

##A simple node.js chat application

**Instalation**

-Requirements:

node.js

`apt-get install nodejs-legacy`
 
npm package installer

`apt-get install npm`

MongoDB

for installation instructions, please check: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
for the demo I used a database 'nodechat', but you can configure db settings in the db.js file

After that you are good to go!

Just clone the repo and run: 
`npm install`
that will install all the needed dependencies

now all you have to do is change the `config.host` attribute in `html/js/config.js` to work with our node server configuration Ex.: www.yourdomain.com:8000

**Demo**

App is currently running on: http://www.schmechel.com.br/nodetalk/
