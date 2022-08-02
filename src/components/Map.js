import React from 'react';
import { getAirportInfoByCode } from '../data';

const Map = ({ routes }) => {
  return (
    <svg className="map" viewBox="-180 -90 360 180">
      <g transform="scale(1 -1)">
        <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
      
        {routes.map(route => {
          const srcAirport = getAirportInfoByCode(route.src);
          const srcLat = srcAirport.lat;
          const srcLong = srcAirport.long;

          const destAirport = getAirportInfoByCode(route.dest);
          const destLat = destAirport.lat;
          const destLong = destAirport.long;

          return (
            <g key={`${route.airline} ${route.src} ${route.dest}`}>
            <circle className="source" cx={srcLong} cy={srcLat}>
              <title>{srcAirport.name}</title>
            </circle> 
            <circle className="destination" cx={destLong} cy={destLat}>
              <title>{destAirport.name}</title>
            </circle>
            <path d={`M${srcLong} ${srcLat} L ${destLong} ${destLat}`} />
          </g>
          )
        })}
      </g>
    </svg>
  )
}

export default Map;