module.exports = (function() {
  "use strict";
  const fs = require("fs");
  const Promise = require("bluebird");
  const csvParser = require("./lib/csv-parser");
  const request = require("request");

  // csv-json databot with ons-mapping
  const databot = function(input, output, context) {
    let wrangler;
    console.log(input);
    // Databot can accept the source data as either a TDX resource ID refering to a raw file, or a URL.
    if (!input.sourceResource && !input.sourceURL && !input.sourceFilePath) {
      output.error("invalid arguments - please supply either a source or valid mappingType");
      process.exit(1);
    }
     // The sourceXXX input can be a comma separated list of values - parse this into an array of input sources.
    let sources = [];
    if (input.sourceFilePath) {
      // Source is file(s) on local disk.
      sources = input.sourceFilePath.split(",");
    } else if (input.sourceResource) {
      // Source is TDX resource(s).
      sources = input.sourceResource.split(",");
    } else {
      // Source is remote URL(s).
      sources = input.sourceURL.split(",");
    }
    const outputFilePath = output.generateFileStorePath("json");
     // Create the output stream.
    const destStream = fs.createWriteStream(outputFilePath, {flags: input.appendOutput ? "a" : "w"});
    output.debug("fetching source for %s, writing to %s", input.sourceResource || input.sourceURL || input.sourceFilePath, outputFilePath);

    Promise.each(sources, (source, sourceIndex) => {
      // Trim any whitespace from the source identifier.
      source = source.trim();
      output.debug("wrangling source %s, writing to %s", source, outputFilePath);
      // Load the source stream based on the type of source input given.
      let sourceStream;
      if (input.sourceFilePath) {
        // Source is a file on local disk.
        sourceStream = fs.createReadStream(source);
      } else if (input.sourceResource) {
        // Source is a TDX resource.
        sourceStream = context.tdxApi.getRawFile(source);
        // output.debug(sourceStream);
      } else {
        // Source is a remote URL.
        sourceStream = request.get(source);
      }
      if (input.databotType === "csv-direct-mapping") {
        if (sources.length !== input.mapArray.length) {
          output.error("invalid arguments - Please supply valid databot inputs, check the README");
          process.exit(1);
        }
        wrangler = require("./lib/csv-direct-mapping");
        return csvParser(wrangler, input, output, sourceStream, destStream, sourceIndex);
      } else if (input.databotType === "indirect-mapping-tdx") {
        wrangler = require("./lib/indirect-mapping-tdx");
        wrangler(input, output, context, source, destStream);
      } else {
        output.error("invalid databot type - Please check README");
        process.exit(1);
      }
    })
    .then((response) => {
      output.debug("output file path is %s", outputFilePath);
      output.result({outputFilePath: outputFilePath});
      destStream.end();
    })
    .catch((err) => {
      output.abort(`ons-mapping wrangler error ${err.message}`);
    });
  };
  const input = require("nqm-databot-utils").input;
  input.pipe(databot);
}());
