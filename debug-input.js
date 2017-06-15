module.exports = (function() {
  "use strict";

  return {
    tdxHost: "https://q.nqminds.com",
    shareKeyId: "BJxDTAMqW",
    shareKeySecret: "1234554321",
    commandHost: "https://cmd.nqminds.com",
    queryHost: "https://q.nqminds.com",
    timerFrequency: 60000,
    accessTokenTTL: 31536000,
    authTokenTTL: 31536000,
    inputs: {
      databotType: "csv-direct-mapping",
      sourceFilePath: "rklxq7JgmZ,HJx9kEkem-,SJl2eE1x7b,HJx1QE1gQZ,SyxrVNJeXW",
      sourceResource: "",
      sourceURL: "",
      mapArray: [
        {
          parentType: "CCG15CD",
          childType: "LSOA11CD",
        },
        {
          parentType: "LAD15CD",
          childType: "WAD15CD",
        },
        {
          parentType: "lAD11CD",
          childType: "WD11CD",
        },
        {
          parentType: "CTY15CD",
          childType: "LAD15CD",
        },
        {
          parentType: "LAD15CD",
          childType: "LSOA11CD",
        },
      ],
      appendOutput: true,
    },
    // inputs: {
    //   sourceFilePath: "",
    //   sourceResource: "",
    //   sourceURL: "",
    //   databotType: "indirect-mapping-tdx",

    // },
    fileStorePath: "jsonFiles",
  };
}());
