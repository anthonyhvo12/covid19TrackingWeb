/**
 * Process user input and return the COVID-19 data for the corresponding
 * location.
 */
function processInput() {
    const input = document.getElementById('search').value;
    // handle the case in which there is no user input
    if (input.length == 0) {
        alert("Please Enter Country Name or State Name Info Before Clicking The Submit Button");
    } else {
        getDataByCountry(input);
    }
}

/**
 * Handle successful API calls for data by country. A successful call
 * simply means the request has gone through, but the requested data is not
 * necessarily found like in the case of error 404.
 */
function handleLoadedSearch(input) {
    document.getElementById('icon').src = "https://image.flaticon.com/icons/svg/2904/2904382.svg";
    document.getElementById('icon-citation').innerHTML = "Icon made by Smashicons from www.flaticon.com";
    // If the country search is unsuccessful (error 404), try searching by state
    if (this.status == 404) {
        getDataByState(input);
    }
    // Process the input
    else {
        const data = JSON.parse(this.responseText);
        processCountryData(data);
    }
}

/**
 * Handle unsuccessful API calls for data.
 */
const handleError = () => {
    console.log("An error occured!")
}

/**
 * Process data by country and update the display.
 */
const processCountryData = (data) => {
    var newVal = document.getElementById("add-new-info");
    newVal.innerHTML = "Confirmed: " + data[data.length - 1].Confirmed + "<br />" +
        "Deaths: " + data[data.length - 1].Deaths + "<br />" +
        "Recovered: " + data[data.length - 1].Recovered + "<br />" +
        "Date Record: " + (new Date(data[data.length - 1].Date)).toDateString();
    document.getElementById("search-country-state").appendChild(newVal);
}

/**
 * Process data by state and update the display.
 */
function processStateData() {
    if (this.status == 404) {
        alert("Location not found! Please try again!");
    }
    else {
        const data = JSON.parse(this.responseText);
        const newVal = document.getElementById("add-new-info");
        // handle the case in which recovery data is unavailable
        var dataRecovered = data.recovered;
        if (dataRecovered == null) {
            dataRecovered = "Unavailable";
        }
        newVal.innerHTML = "Confirmed: " + data.positive + "<br />" +
            "Deaths: " + data.death + "<br />" +
            "Recovered: " + dataRecovered + "<br />" +
            "Date Record: " + (new Date(data.dateChecked)).toDateString();
            console.log(data.dateChecked);
        document.getElementById("search-country-state").appendChild(newVal);
    }
}

/**
 * Get the data by country by calling the COVID19API API.
 */
const getDataByCountry = (input) => {
    const globalReq = new XMLHttpRequest();
    globalReq.open("GET", "https://api.covid19api.com/total/country/" + encodeURIComponent(input));
    globalReq.onload = handleLoadedSearch.bind(globalReq, input);
    globalReq.onerror = handleError.bind(globalReq);
    globalReq.send();
}

/**
 * Get the data by US state by calling the COVID19 Tracking Project API.
 */
const getDataByState = (input) => {
    let stateReq = new XMLHttpRequest();
    let stateName = input.toLowerCase();
    let stateCode = USStatesCodeName[stateName];
    stateReq.open("GET", 'https://covidtracking.com/api/v1/states/' + stateCode + '/current.json');
    stateReq.onload = processStateData.bind(stateReq);
    stateReq.onerror = handleError.bind(stateReq);
    stateReq.send();
}

/**
 * Mappings of US state names to their state codes. Used by 
 * the COVID19 Tracking Project API.
 */
let USStatesCodeName = {
    "alabama": "al",
    "alaska": "ak",
    "american samoa": "as",
    "arizona": "az",
    "arkansas": "ar",
    "california": "ca",
    "colorado": "co",
    "connecticut": "ct",
    "delaware": "de",
    "washington dc": "dc",
    "federated states of micronesia": "fm",
    "florida": "fl",
    "georgia": "ga",
    "guam": "gu",
    "hawaii": "hi",
    "idaho": "id",
    "illinois": "il",
    "indiana": "in",
    "iowa": "ia",
    "kansas": "ks",
    "kentucky": "ky",
    "louisiana": "la",
    "maine": "me",
    "marshall islands": "mh",
    "maryland": "md",
    "massachusetts": "ma",
    "michigan": "mi",
    "minnesota": "mn",
    "mississippi": "ms",
    "missouri": "mo",
    "montana": "mt",
    "nebraska": "ne",
    "nevada": "nv",
    "new hampshire": "nh",
    "new jersey": "nj",
    "new mexico": "nm",
    "new york": "ny",
    "north carolina": "nc",
    "north dakota": "nd",
    "northern mariana islands": "mp",
    "ohio": "oh",
    "oklahoma": "ok",
    "oregon": "or",
    "palau": "pw",
    "pennsylvania": "pa",
    "puerto rico": "pr",
    "rhode island": "ri",
    "south carolina": "sc",
    "south dakota": "sd",
    "tennessee": "tn",
    "texas": "tx",
    "utah": "ut",
    "vermont": "vt",
    "virgin islands": "vi",
    "virginia": "va",
    "washington": "wa",
    "west virginia": "wv",
    "wisconsin": "wi",
    "wyoming": "wy",
}

