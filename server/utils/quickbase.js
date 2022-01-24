function asRowOrderedByField(fields, data) {
  //return fields.map(({ id }) => data[id]);
  return fields.reduce((acc, field) => {
    acc[field.label.toLowerCase()] = data[field.id].value;
    return acc;
  }, {});

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
