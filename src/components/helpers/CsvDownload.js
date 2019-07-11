
export const covertArrayOfObjectToCsv = (arrayToConvert) => {
  const replace = str => str.replace(/""/g, '\\"').replace(/ /g, '%20');
  const formatedCsv = [];
  const headers = Object.keys(arrayToConvert[0]);
  formatedCsv.push(replace(headers.join(',')));
  arrayToConvert.forEach((row) => {
    const value = headers.map((header) => {
      const escapedValue = replace((`${row[header]}`));
      return `"${escapedValue}"`;
    });
    formatedCsv.push(value.join(','));
  });
  return formatedCsv.join('%0A');
};

export const csvDownload = (csv, csvName) => {
  const anchorElement = document.createElement('a');
  anchorElement.href = `data:attachment/csv,${csv}`;
  anchorElement.download = `${csvName}.csv`;
  anchorElement.target = '_blank';
  document.body.append(anchorElement);
  anchorElement.click();
};
