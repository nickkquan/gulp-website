var StaticServer = require("static-server");

var server = new StaticServer({
	rootPath: "./public/",
	port: 3000
});

server.start(function() {
	console.log("Battlecruiser operational on port: ", server.port);
});
