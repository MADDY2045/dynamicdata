let masterIterator = [
  { fsc_WK_NBR: 2, fsc_YR_NBR: 2022 },
  { fsc_WK_NBR: 3, fsc_YR_NBR: 2022 },
  { fsc_WK_NBR: 4, fsc_YR_NBR: 2022 },
  { fsc_WK_NBR: 5, fsc_YR_NBR: 2022 },
  { fsc_WK_NBR: 1, fsc_YR_NBR: 2023 },
  { fsc_WK_NBR: 2, fsc_YR_NBR: 2023 },
  { fsc_WK_NBR: 3, fsc_YR_NBR: 2023 },
  { fsc_WK_NBR: 1, fsc_YR_NBR: 2024 },
  { fsc_WK_NBR: 2, fsc_YR_NBR: 2024 },
  { fsc_WK_NBR: 3, fsc_YR_NBR: 2024 },
];

let tempB = {
  2022: [
    { week: 2, year: 2022, total_demand: 100 },
    { week: 3, year: 2022, total_demand: 200 },
    { week: 4, year: 2022, total_demand: 0 },
    { week: 5, year: 2022, total_demand: 0 },
  ],
  2023: [
    { week: 1, year: 2023, total_demand: 500 },
    { week: 2, year: 2023, total_demand: 700 },
    { week: 3, year: 2023, total_demand: 0 },
  ],
  2024: [
    { week: 1, year: 2024, total_demand: 800 },
    { week: 2, year: 2024, total_demand: 300 },
    { week: 3, year: 2024, total_demand: 0 },
  ],
};

const generateData = {
  getValue: function (yearObj, master, key) {
    //console.log('key:::',key);
    let temp = master;
    let output = [];
    let resp = yearObj.map((item) => {
      let acc = [];
      let indexOfAll = master.map(({ fsc_WK_NBR }, i) =>
        fsc_WK_NBR == item['week']
          ? acc.push({
              isPresent: true,
              week: fsc_WK_NBR,
              total: item['total_demand'],
            })
          : acc.push({ isPresent: false, week: fsc_WK_NBR, total: 'a' })
      );
      console.log('acc:::', acc);
      temp.map((ele, ind) => {
        if (
          acc[ind]['isPresent'] === true &&
          ele['fsc_WK_NBR'] == acc[ind]['week']
        ) {
          output[ind] = {
            week: ele['fsc_WK_NBR'],
            year: ele['fsc_YR_NBR'],
            total: acc[ind]['total'],
          };
        }
      });
    });
    //console.log('output:::',output);
    master.map((it, index) => {
      //console.log('it::',it,index);
      if (!output[index]) {
        output[index] = {
          week: it['fsc_WK_NBR'],
          year: it['fsc_YR_NBR'],
          total: 0,
        };
      }
    });
    return output;
  },
};

let tempObj = {};
Object.keys(tempB).map((key) => {
  //console.log('keys::',key);
  tempObj[key] = generateData.getValue.bind(
    null,
    tempB[key],
    masterIterator,
    key
  )();
});

console.log('tt', tempObj);
