module.exports = (function() {
  "use strict";

  return {
    tdxHost: "https://q.nq-m.com",
    shareKeyId: "H1g9B29Ele",
    shareKeySecret: "1234554321",
    commandHost: "https://cmd.nq-m.com",
    queryHost: "https://q.nq-m.com",
    timerFrequency: 60000,
    accessTokenTTL: 31536000,
    authTokenTTL: 31536000,
    inputs: {
      databotType: "csv-direct-mapping",
      sourceFilePath: "",
      sourceResource: "rklxq7JgmZ,HJx9kEkem-,SJl2eE1x7b,HJx1QE1gQZ,SyxrVNJeXW",
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
