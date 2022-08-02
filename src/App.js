import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import Select from './components/Select';
import DATA, { allAirportNames, allAirlineNames, getAirlineNameById, getAirportNameByCode } from './data.js';
const { routes, airlines, airports } = DATA;

const App = () => {
  const [currentAirlineName, setCurrentAirlineName] = useState('All');
  const [currentAirportName, setCurrentAirportName] = useState('All');

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];
  
  const formatValue = (dataProperty, value) => {
    if (dataProperty === 'airline') {
      return getAirlineNameById(value);
    } else {
      return getAirportNameByCode(value);
    }
  }

  const filteredRoutes = () => {
    return routes.filter(route => {
      return (
        (currentAirlineName === 'All' || currentAirlineName === getAirlineNameById(route.airline)) &&
        (currentAirportName === 'All' || currentAirportName === getAirportNameByCode(route.src) || currentAirportName === getAirportNameByCode(route.dest))
      )
    })
  }

  const filteredAirlines = () => {
    return filteredRoutes().map(route => getAirlineNameById(route.airline))
                           .concat("All");
  }

  const filteredAirports = () => {
    return filteredRoutes().map(route => [getAirportNameByCode(route.src), getAirportNameByCode(route.dest)])
                           .flat()
                           .concat("All");
  }

  const selectAirline = (e) => {
    const airlineName = e.target.value;
    setCurrentAirlineName(airlineName);
  }

  const selectAirport = (e) => {
    const airportName = e.target.value;
    setCurrentAirportName(airportName);
  }

  const resetFilters = () => {
    const airlineSelector = document.querySelector('select[name="airlines"]');
    const airportSelector = document.querySelector('select[name="airports"]');
    [airlineSelector, airportSelector].forEach(selector => {
      selector.value = "All";
      selector.dispatchEvent(new Event('change', { bubbles: true }));
    })
  }

  return  (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          <Select name="airlines" label="Show routes on:" options={allAirlineNames()} enabledOptions={filteredAirlines()} onChange={selectAirline}></Select>
          <Select name="airports" label="flying to or from:" options={allAirportNames()} enabledOptions={filteredAirports()} defaultValue="All" onChange={selectAirport}></Select>
          <button onClick={resetFilters}>Show All Routes</button>
        </p>
        <Table className="routes-table" columns={columns} rows={filteredRoutes()} format={formatValue}></Table>
      </section>
    </div>
  )
}

export default App;