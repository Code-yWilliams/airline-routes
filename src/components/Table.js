import React from 'react';

const Table = ({ className="table", columns=[{name: "columnName", property: "value" }], rows=[{id: 1, value: "cell"}], format=(_, val) => val }) => {

  const tableHeaders = () => {
    return columns.map(col => {
      return <th key={col.name}>{col.name}</th>
    })
  }

  // for each row, iterate over the column property names and use each one to format a table cell
  const tableBodyRows = () => {
    return rows.map(row => {
      return (
        <tr>
          {columns.map(col => {
            const dataProperty = col.property;
            const value = row[col.property];

            return ( <td key={`${dataProperty}:${value}`}>{format(dataProperty, value)}</td> )
          })}
        </tr>
      )
    });
  }

  return (
    <table className={className}>
      <thead>
        <tr>
          {tableHeaders()}
        </tr>
      </thead>

      <tbody>
        {tableBodyRows()}
      </tbody>
    </table>
  )
}

export default Table;