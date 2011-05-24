var sys = require("sys"), 
	http = require("http"),
	url = require("url"),
	path = require("path"),
	fs = require("fs");
	
http.createServer(function(request, response) {
	var the_url = url.parse(request.url).pathname;
	var some_file_name = path.join(process.cwd(), the_url);
	path.exists(some_file_name, function(exists) {
		if (!exists) {
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write("404 Nothing Here\n");
			response.end();
			return;
		}
		fs.readFile(some_file_name, "binary", function(err, file) {
			if (err) {
				response.writeHead(500, {"Content-Type" : "text/plain"});
				response.write(err + "\n");
				response.end();
				return;
			}
			response.writeHead(200);
			response.write(file, "binary");
			response.end();
		});
	});
}).listen(8080);
sys.puts("http://localhost:8080/ ,if you are running this locally.");