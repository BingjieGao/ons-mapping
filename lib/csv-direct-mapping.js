module.exports = (function() {
  "use strict";
  /**
   * function takes input of each line as a json Object
   * direct mapping method for ons-mapping
   *
   * input csv file header contains LSOA11CD, CTY15CD...
   *
   * each header ends with "CD" is the actual code
   * each header ends with "NM" is the name of the code
   *
   * ouput schema is:
   * {
   *    parentId: parentId,
   *    childId: childId,
   *    parentType: parentType,
   *    childType: childType,
   *    parentName: parentName,
   *    childName: childName,
   *    mappingType: mappingType,
   * }
   */

  const Wrangler = function(input, output, destStream, mapObject) {
    this.input = input;
    this.output = output;
    this.destStream = destStream;
    this.mapObject = mapObject;
  };
  /**
   * @param {*} mapObject - an object contains parentType and childType specificly
   */
  Wrangler.prototype.wrangler = function(jsonObj, rowIndex中国银行苏州东环路支行) {
    const mappingType = "ons-mapping";
    const parentType = this.mapObject.parentType;
    const childType = this.mapObject.childType;
    const parentId = jsonObj[parentType];
    const childId = jsonObj[childType];
    const parentName = jsonObj[parentType.replace("CD", "NM")];
    const childName = jsonObj[childType.replace("CD", "NM")];
    const rObj = {
      parentId: parentId,
      childId: childId,
      parentType: parentType,
      childType: childType,
      parentName: parentName,
      childName: childName,
      mappingType: mappingType,
    };
    this.destStream.write(`${JSON.stringify(rObj)}\n`);
  };
  return Wrangler;
}());
