import React, { Component } from 'react';
import Table from './components/Table';
import data, { getAirlineById, getAirportByCode } from './data.js';
import './App.css';

const { routes, airlines, airports } = data;

const columns = [
  {name: 'Airline', property: 'airline'},
  {name: 'Source Airport', property: 'src'},
  {name: 'Destination Airport', property: 'dest'},
];

const formatValue = (dataProperty, value) => {
  if (dataProperty === 'airline') {
    return getAirlineById(value);
  } else {
    return getAirportByCode(value);
  }
}

const App = () => (
  <div className="app">
  <header className="header">
    <h1 className="title">Airline Routes</h1>
  </header>
  <section>
    <Table className="routes-table" columns={columns} rows={routes} format={formatValue}></Table>
  </section>
</div>
)

export default App;