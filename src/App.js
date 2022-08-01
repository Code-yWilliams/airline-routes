import React, { Component } from 'react';
import data, { getAirlineById, getAirportByCode } from './data.js';
import './App.css';

const { routes, airlines, airports } = data;

const App = () => (
  <div className="app">
  <header className="header">
    <h1 className="title">Airline Routes</h1>
  </header>
  <section>
    <table>
      <tr>
        <th>Airline</th>
        <th>Departing Airport</th>
        <th>Arriving Airport</th>
      </tr>
      {routes.map(route => {
        return <tr>
          <td>{getAirlineById(route.airline)}</td>
          <td>{getAirportByCode(route.src)}</td>
          <td>{getAirportByCode(route.dest)}</td>
        </tr>
      })}
    </table>
  </section>
</div>
)

export default App;