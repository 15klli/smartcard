// personal.js
var blueBtn ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAABIpJREFUaAXtWk9IVEEYn2/LSomIiAJDMLU6GWkQ/TtoGQSdDDL04iYdulqXDhF76FBQdO0Q/iFIMqhLQaCmh0oI0sgumlYQGkVERGilven7vX2zvre7rr6debgub2D3zXvzfd/8fvPNm/m+4QkRlnAEcnoEKB26A60vCr/9mD4qhagUUq5NJ5Mzz4j+MImRzRuL+gZvHpxJxpVCcNfZ3t2zs+K+EHJnsnBu39NYQYE4NXq77o0bp4cgPPfl+/RrkCNBw+zBJxGSf90KuVa3JK1hEselkFVC0NjWTUV73J5c7QaMaanIlWxftW8gVjvnbs/Vek2s//KnD/9egmScg3iksEZUBVf7nYtfn6wUcsANrJhtqCsOqKN4CKoFJdenZRy69z+BOWlR9BL06uTFXUhwpbsx9GDowRwfgbyfop5IJghnSClpR8vTKkuIXWTJYvQhIzTFIzv6ru3IMBHx3hxcCYxg+bnnW+TM74sV0b4GDqG2gUKCiSUFExbcNlnW3NdNheuuTtw69DUImoFM0fLm3gtiZmZCCKvVJkf0kQPiLorQDfvHdcHP4sStVsjaOgEwNOrBmmj/uk9yro2BNwIrZyQPmdCV8fajQ+mwV5zpq5aWvMTy9dx+vby5Z28JrW4Z6Kj9nU4+m2dGCcbJiUb21k+ejk0TnXWPM4FyiJ8sa+45wTp3WaeRbUClKZOenzZjUxRTDABtciQOv+88lpGcGyRkJes4A9NocroaIYgFhQHHABqee99xbAR1PwU60HV0Yo5NPybSyhohiNWS36P1eOf8eC4ZEXRhA7ZgM7k9m3ttgtjniKzT6BwLSjYg3DrKBgnZANvutmzq2gQrov3VUopiLPsLrZZ+gNk2nC0Etv3oppPVJigj8dM3knIwXQfZPFO2lO1sbCgdbYIq/BIcfimj2lfHVsK2hkFtghp9L6pK/CIuKrSIgDZBBM52H04gvUh/S2uWwo5dLaLPS1NYWEqbIFk0BvO8lh5YuBt/Ley2/dBgcKP+NFOltQmOd9QO8VSa4iPHUsSWqV34e2LbYFu8H04infKnnSqtTRD5nJSRezCNwDm1C39PlA0pqNtErqhNEPCLCuQ1HvFfyAoQOPujNC8NXdiALeSI8y3Z14wQfHu77gtDiAEGsoKyaE8l6n4KdKDr6MRMJcBGCAIUp0Y3GGAXLxAb+BDimR9P2ukS69i6bAO2/AxOJlljBNEJklVFkm8fcdrzINPCgzbIQFaRgw3YMlWMJrxOJt7EoF8xwBjeJ1406suivR/t8Mu1Z2JbsSyrFETwzkEenuNzDqPFKEGFDEA5n7sjOOVBpsHLbCl7qFTwYVOicISO7cVegQM8dAqEIEg4i8R5JnfBzjg4KFexJaIfBAjj7dhDV+ixofKUQwBTFj9PoU7PbSA3RheZQBBqGg0Jag7gsquHHlx2F2gCCD2oOYDLru71IH/YBkT4PGrZkfkEkMDscFDqHoIcKNtH7nw9zp9HBRblqM5NXYEVmGFPcVC2+X6+5OPHeB6CoJrXn1MqX+bTB7GKU3gNRyBHR+A/KFjbvWAqMXEAAAAASUVORK5CYII=';
var blackBtn = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAABGdBTUEAALGPC/xhBQAAAGBQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+k/ojQAAAB90Uk5Tku22e5Om5p1S9AYv2NdRZ9TngkM4zxXq+gEF/hwEAACtyAgAAAEPSURBVEjH7dfJDsIgEAZgtPu+0wXo//5vqdWDRolQJkYPnUOTknwJKcNMh60yCOEQYSBXJk9wjJNkAc5ydQh5RsBCONmrRsiA1TGAAx/4l3hZ3LDq2DAKMQ6sUzuxqprtyk7T9mwqtQdnBVC3PZ9n3rc1UGT2OE6Ql4/XMkcS2+JYIEqfF9IIIrbDWQLvdc1DktlgVSB632OEQlngCnn6jtMclRmrBqXuYEo0yog71PqcqNEZsY9Wj1v4Rjyg1+MegxGP4HrMMZrwIqZZj+dJLN/EpG3TPtiHo2LfTRJSepIuBu1KkooBrQzRCiCt9NKK/q3d+Pd24+9uN8RGd/xWHPgPMGlAIY1GpKGMMg5eABt/m2jV+VhbAAAAAElFTkSuQmCC';
var intro = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAOpQTFRFCbwHEL8IDMIMVf9VCrwICbwJCbsICrwICr0KCbwICrsKCrsKC7wICrwICrwICbwHCrwHCrwHgP+ACrsICrsHCrsHC7wLDb8NCrsIF9EXD7wIEsgSCr0IEL0ICrwHCrsIDsEODL4JCr4KCrwICbwIIL8gC7sHC7wJCbwHC7sJCrwICbsHC7wLCrwIDb8NFMQUCbsHM8wzC7sLFb8VCbwHC74HCrwICbwHCbwIDLwIK9UrDbwNCrwHCrsHDb4NCrwICbsIDbwNCb8JJNskCbsHCrwHCbsICrsICrwJCrsJCrwIC78LAAAACbsHY88pWAAAAE10Uk5T8iAVA6Fv4uwypE9LX+7n+rPVAu201hcoyAsiDmQf1MslVkqbxQiPcthanfkuhRQN/AUtDPNHftm/QQYmzvEn494TOAf0q8DHlZaCGACxwwcmAAABVElEQVQ4y4VT5ZqDMBDMubtrz/1quBVanDDv/zoHtIFAex/zJ9nsJFmZJWkJXYpURRQVNZL06pSwDY0tlLBi2iC4iQeYsmYIgqHJJuAlLk+gIeCPqndHPhDSivBjw5mkNUwc2ENGoDaCcdrAOIBNpwQ3RDBI5zAIELoFIYFT3T/m3nCQ5ATqgf3fjY8ONoLtMg54NCPE8GcHFyfAeh+IGcPPtkS3wPK7xOFmurzWxw7LFpZOJJgz8w79pXxdRcSeMCGRCPLMekhui/UXW4wgIyIqtEZ+IXbZVoNKFBg190qEvXNmGFCICIH3X51if1haAsSM0OP8vQ7OrjkTpPHFI+5vODP/oh7kc17dCnmQVZpFii9PPCFPsyrUAuSF4ko9h6LUXLMyDN+7HKFoFt/uNP3AGye7abtrgvn6/pwTTF1yrwsk1yradtm3D0776LUP7//j/we4FhraWNMyLgAAAABJRU5ErkJggg==';
var feedback = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAAAWNJREFUaAXtmssNwjAMhpOKMTjwkNgF2IMpgAMwBXsAuyDxODAHISlVTzGylMS41Z9T5Dqx/X9GTVGMwYACqhWwVHbP7Wz+du+jcW5I+aiwW/uqbLUa7a6XWD5VzBhsnSguJOoB1LmGeWQMIravqSE3OdxIyuRawQf39dT96jKSoGCORUOhwKLyCmwOggIiFw0BgkXlFdgcBAVELhoCBIvKK7A5fRZlBn9spifnzILpHnWz1pzH+9sy+jDR2PsWTSZYSvlEcO3y3hNEgS3rjk5AsKPg2rRBsJWio5Pk92COkwylXY4TjuoWdf5fT6p4rj2ZIE4yXKkL+alu0Rw1o8AcKv5zDxD8p/o5YveeYPJ7ECeZhD7DSYYhXu9/gyiQ0QWqXUBQNR5GciDIEEm1CwiqxsNIDgQZIql2ob8m/D3McIuvvs2nugSfXMiVGGSLhkumvxYS+8mbmwux8oEREQpkUeADV8xGaoJtaEsAAAAASUVORK5CYII=';
var aboutUs = 'data:image/png;base64,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'
var app = getApp()
Page({
  data: {
    routers: [
      {
        name: '消费记录',
        url: '../paymentRecord/paymentRecord',
        icon: blueBtn
      },
      {
        name: '挂失',
        url: '../reportLost/reportLost',
        icon: blackBtn
      },
      {
        name: '修改拾卡信息',
        url: '',
        icon: blueBtn
      },
      {
        name: '修改一卡通密码',
        url: '',
        icon: blackBtn
      },
      {
        name: '修改注册信息',
        url: '',
        icon: blueBtn
      },
      {
        name: '开发中',
        url: '',
        icon: intro
      },
      {
        name: '开发中',
        url: '',
        icon: intro
      },
      {
        name: '关于我们',
        url: '',
        icon: aboutUs
      },
      {
        name: '反馈',
        url: '',
        icon: feedback
      }
    ]
  },
  
})
