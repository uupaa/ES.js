// ES test

require("../lib/WebModule.js");

// publish to global
WebModule.publish = true;


require("./wmtools.js");
require("../lib/ES.js");
require("../release/ES.n.min.js");
require("./testcase.js");

