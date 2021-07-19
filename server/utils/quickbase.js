function asRowOrderedByField(fields, data) {
  return fields.map(({ id }) => data[id]);
}

function orderDataByFields(table) {
  if (table && table.fields && table.data) {
    return {
      ...table,
      data: table.data.map((data) => asRowOrderedByField(table.fields, data)),
    };
  }
  return table;
}

module.exports = {
  orderDataByFields,
};
