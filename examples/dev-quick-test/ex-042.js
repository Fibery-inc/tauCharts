dev.spec({
  type: "stacked-bar",
  dimensions: {
    __2: { type: "order", scale: "period" },
    ROW_NUMBER_1: { type: "measure", scale: "linear" },
    __3: { type: "category", scale: "ordinal" },
  },
  guide: [
    {
      x: { label: "YEAR(Birth date)", tickPeriod: "year", tickFormat: "year" },
      y: { label: "Count of records" },
      color: { label: "Sex" },
    },
  ],
  x: ["__2"],
  y: ["ROW_NUMBER_1"],
  color: ["__3"],
  data: [
    ["m", 4, "2008-01-01T00:00:00.000Z"],
    ["m", 1, "2010-01-01T00:00:00.000Z"],
    ["f", 1, "2014-01-01T00:00:00.000Z"],
    ["f", 1, "2013-01-01T00:00:00.000Z"],
    ["m", 4, "2013-01-01T00:00:00.000Z"],
    ["f", 1, "2001-01-01T00:00:00.000Z"],
    ["m", 3, "2007-01-01T00:00:00.000Z"],
    ["m", 3, "2014-01-01T00:00:00.000Z"],
    ["m", 1, "2009-01-01T00:00:00.000Z"],
    ["m", 3, "2012-01-01T00:00:00.000Z"],
    ["f", 2, "2011-01-01T00:00:00.000Z"],
    ["m", 3, "2006-01-01T00:00:00.000Z"],
    ["m", 1, "2002-01-01T00:00:00.000Z"],
    ["f", 1, "2012-01-01T00:00:00.000Z"],
    ["f", 1, "2010-01-01T00:00:00.000Z"],
    ["m", 1, "2005-01-01T00:00:00.000Z"],
  ].map(function (row) {
    return {
      __3: row[0],
      ROW_NUMBER_1: row[1],
      __2: row[2],
    };
  }),
});
