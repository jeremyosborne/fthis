#!/usr/bin/env node
/* jshint undef:true, unused:true, node:true */

var fs = require("fs");
var glob = require("glob");
var path = require("path");


var SCRIPT_NAME = path.basename(__filename, ".js");
var SCRIPT_DIR = __dirname;

var argv = require('minimist')(process.argv.slice(2), {
    boolean: [
        "l"
    ],
    alias: {
        l: "list",
        t: "template",
        h: "help",
    },
    default: {
        t: "index.html",
    }
});


if (require.main !== module) {
    throw new Error("\n\nPlease do not import this module.\n\n");
}


if (argv.h) {
    console.log("\n%s v%s", SCRIPT_NAME, require("./package.json").version);
    console.log("Usage:");
    console.log("\t# list what templates are available");
    console.log("\t%s -l", SCRIPT_NAME);
    console.log("");
    console.log("\t# generate a file from template and place in outfile");
    console.log("\t%s [-t templateName] [outfile]", SCRIPT_NAME);
    console.log("");
} else if (argv.l) {
    console.log("\nTemplates available:");
    glob.sync("*.*", {
        cwd: path.join(SCRIPT_DIR, "templates"),
    }).forEach(function(f) {
        console.log("\t%s", f);
    });
    console.log("");
} else {
    // Assume template directory is flat.
    var templateName = path.basename(argv.t);
    var outFile = argv._[0] || path.join(process.cwd(), templateName);
    try {
        var contents = fs.readFileSync(path.join(SCRIPT_DIR, "templates", templateName), "utf-8");
        if (fs.existsSync(outFile)) {
            throw new Error(outFile + " already exists, will not overwrite.");
        }
        fs.writeFileSync(outFile, contents);
        console.log("fthis file output ->", outFile);
    } catch(e) {
        console.error("Error processing command:", e.message);
    }
}
