#!/usr/bin/env node
/* jshint undef:true, unused:true, node:true */

var fs = require("fs");
var path = require("path");

var argv = require('minimist')(process.argv.slice(2), {
    alias: {
        t: "template",
        h: "help",
    },
    default: {
        t: "index.html",
    }
});


if (require.main !== module) {
    throw new Error("Please do not import this module.");
}


if (argv.h) {
    console.log("\nUsage:\n\tpoof [-t templateName] # generate a file from template\n");
} else {
    var templateName = path.basename(argv.t);
    var contents = fs.readFileSync(path.join("./", "templates", templateName), "utf-8");
    fs.writeFileSync(path.join(process.cwd(), templateName), contents);

}
