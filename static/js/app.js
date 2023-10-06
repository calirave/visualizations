//fetch the JSON data and console log it

//Use d3 to readin samples.json
const geourl = "./data/geography.json";
const vacurl = "./data/filtered_vac.json";
const remoteurl =
  "https://storage.googleapis.com/covid19-open-data/v3/demographics.json";

function init() {
  //populate the dropdown selector
  let dropdownSelector = d3.select("#selDataset");

  //load the names object to get subjectIDs

  d3.json(remoteurl).then(function (mypull) {
    let mynames = mypull.data;

    for (i = 0; i < mynames.length; i++) {
      dropdownSelector
        .append("option")
        .text(mynames[i][0])
        .property("value", mynames[i][0]);
    } //close for loop
    let firstid = mynames[0][0];

    //call the charting/plotting functions with the location key from the first element
    demographics(firstid);
    barchart(firstid);
    map(firstid);
  });
} //close function

//build the map
function map(locid) {
  // Create a map object.
  let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
  });

  // Add a tile layer.
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);

  d3.json(geourl).then(function (data) {
    let mygeo = data;

    //create an empty array variable to store the retrieved record
    foundRecord = [];
    let myloc = locid;
    //search for an array by the passed in location id, location_key is in the first column
    for (i = 0; i < mygeo.length; i++) {
      if (mygeo[i].location_key === myloc) {
        mytemp = mygeo[i];
        foundRecord.push(mytemp);
        break; //stop the loop once a match is found
      }
    } //close for

    //extract longitude and latitude
    let mylat = foundRecord[0].latitude;
    let mylong = foundRecord[0].longitude;

    console.log(`Lat ${mylat}, Lon ${mylong}`);
    //create a list for lat, lang
    let location = [];
    location.push(mylat);
    location.push(mylong);
    console.log(location);
    // Create a marker object.

    //add circle to map
    L.circle(location, {
      fillOpacity: 0.75,
      color: "red",
      fillColor: "blue",
      radius: 50,
    })
      .bindPopup(`<h1>${myloc}</h1>`)
      .addTo(myMap);

    // //plot the graph
    Plotly.newPlot("map");
  }); //close d3 call
} //close map function

//build the barchart
function barchart(id) {
  //populate the vaccination data
  d3.json(vacurl).then(function (vacdata) {
    let myvac = vacdata;

    var foundRecord = []; //create an empty array to hold the matched array

    //search for an array by the passed in location id, location_key is in the first column
    for (i = 0; i < myvac.length; i++) {
      if (myvac[i].location_key === id) {
        mytemp = myvac[i];
        foundRecord.push(mytemp);
        break; //stop the loop once a match is found
      }
    } //close for

    //build the trace
    let trace1 = {
      x: foundRecord.map((row) => row.cumulative_persons_vaccinated),
      y: "Fully Vaccinated",
      text: "Fully Vaccinated",
      name: "Fully Vaccinated",
      type: "bar",
      orientation: "h",
    }; //close trace

    let trace2 = {
      x: foundRecord.map((row) => row.cumulative_persons_fully_vaccinated),
      y: "Vaccinated",
      text: "Vaccinated",
      name: "Vaccinated",
      type: "bar",
      orientation: "h",
    }; //close trace

    //build the layout
    let layout = {
      title: "Vaccination Counts",
      xaxis: { title: "Vaccination" },
      yaxis: { title: "Populations" },
    }; //close layout
    //plot the graph
    Plotly.newPlot("bar", [trace1, trace2], layout);
  }); //close d3 call
} //close function

//build the demographic panel
function demographics(id) {
  //clear the demographic panel
  d3.select("#sample-metadata").html("");

  //populate the samples
  d3.json(remoteurl).then(function (mypull) {
    let mysample = mypull.data;
    let mylocation = id;
    //console.log("Demographics Location", id);
    var foundRecord = []; //create an empty array to hold the matched array

    //search for an array by the passed in location id, location_key is in the first column
    for (i = 0; i < mysample.length; i++) {
      if (mysample[i][0] === id) {
        mytemp = mysample[i];
        foundRecord.push(mytemp);
        break; //stop the loop once a match is found
      }
    } //close for

    //create variables for the values in the array
    let location = foundRecord[0][0];
    let population = foundRecord[0][1];
    let popmale = foundRecord[0][2];
    let popfemale = foundRecord[0][3];
    let hdi = foundRecord[0][9];
    let age_0_9 = foundRecord[0][10];
    let age_10_19 = foundRecord[0][11];
    let age_20_29 = foundRecord[0][12];
    let age_30_39 = foundRecord[0][13];
    let age_40_49 = foundRecord[0][14];
    let age_50_59 = foundRecord[0][15];
    let age_60_69 = foundRecord[0][16];
    let age_70_79 = foundRecord[0][17];
    let age_old = foundRecord[0][18];

    //create the string to insert into the box
    var textContent = `
      Location ID: ${location}, 
      Population: ${population}, 
      Male Population: ${popmale}, 
      Female Population: ${popfemale}, 
      Human Development Index: ${hdi},
      Ages 0-9: ${age_0_9},
      Ages 10-19 ${age_10_19},
      Ages 20-29 ${age_20_29},
      Ages 30-39 ${age_30_39},
      Ages 40-49 ${age_40_49},
      Ages 50-59 ${age_50_59},
      Ages 60-69 ${age_60_69},
      Ages 70-79 ${age_70_79},
      Ages 80 and older ${age_old}

    `;

    d3.select("#sample-metadata").append("h5").text(textContent);
  }); //close d3
} //close function demographics

//call update function on change in the dropdown
d3.selectAll("#selDataset").on("change", updatePlotly);

//take value of the dropdown choice and pass it to other functions
function updatePlotly() {
  let dropdown = d3.select("#selDataset");
  let choice = dropdown.property("value");
  barchart(choice);
  //   bubblechart(choice);
  demographics(choice);
}

init();
