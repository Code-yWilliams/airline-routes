import React, { useState } from 'react';

const Table = ({ className="table", columns=[{name: "columnName", property: "value" }], rows=[{id: 1, value: "cell"}], perPage=25, format=(_, val) => val }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const tableHeaders = () => {
    return columns.map(col => {
      return <th key={col.name}>{col.name}</th>
    })
  }

  const currentRows = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = currentPage * perPage;
    return rows.slice(startIndex, endIndex);
  }

  // for each row, iterate over the column property names and use each one to format a table cell
  const tableBodyRows = () => {
    return currentRows().map(row => {
      return (
        <tr key={JSON.stringify(row)}>
          {columns.map(col => {
            const dataProperty = col.property;
            const value = row[col.property];

            return ( <td key={`${dataProperty}:${value}`}>{format(dataProperty, value)}</td> )
          })}
        </tr>
      )
    });
  }

  const showingNofTotal = () => {
    const start = ((currentPage - 1) * perPage) + 1;
    const end = currentPage * perPage;
    const total = rows.length
    return (
      <p>
        {`Showing ${start} - ${end} of ${total}`}
      </p>
    )
  }

  const isOnFirstPage = () => {
    return currentPage === 1;
  }

  const isOnLastPage = () => {
    return rows.length / perPage <= currentPage;
  }

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const nextPage = () => {
   setCurrentPage(currentPage + 1);
  }

  return (
    <>
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
      <div className="pagination">
        {showingNofTotal()}
        <button id="btn-prev-page" disabled={isOnFirstPage()} onClick={() => prevPage()}>Previous Page</button>
        <button id="btn-next-page" disabled={isOnLastPage()} onClick={() => nextPage()}>Next Page</button>
      </div>
    </>
  )
}

export default Table;