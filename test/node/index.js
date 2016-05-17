// ES test

require("../../lib/WebModule.js");

WebModule.VERIFY  = true;
WebModule.VERBOSE = true;
WebModule.PUBLISH = true;


require("../wmtools.js");
require("../../lib/ES.js");
require("../../release/ES.n.min.js");
require("../testcase.js");

