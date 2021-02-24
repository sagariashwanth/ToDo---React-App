import { Circle, Popup } from "react-leaflet";
import React from "react";
import numeral from "numeral";

//we need different size of circles and colors for 3 casestypes,
// so we create a dictionary for eachcase
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};
export const sortData = (data) => {
  const sortedData = [...data];
  //-----------------Method one of sort-----------------------------------------------------//
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

//----------------Method two of sort--------------------------------------------------//
// return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1));

//----------This is to sort table content that displays on the right-------------------------------//
//--------------------------------------------------------------------------------------------------------

// Draw circles on the Map with interactive tooltip
export const showDataOnMap = (data, casesType = "cases") => {
  data.map((country) => (
    //circle takes in 5 different attributes
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex} // you are taking value from dictionary here
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <h1>Im a popup</h1>
      </Popup>
    </Circle>
  ));
};