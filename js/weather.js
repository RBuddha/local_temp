//var api owm = "ebf66023875ca8ee0823bb9f4d834256";
//b75495b86d6fb668
//cab2000ff81488d5
//https://codepen.io/Fattox/pen/mPxzgg Gary Morris
$(document).ready(function() {
    getLocation();
});
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            wAPI(lat, lon); //call func wAPI with lat/lon

        });
    }
}
//create url
function wAPI(lat, lon) {
    var site = "https://api.wunderground.com/api/";
    var key = "cab2000ff81488d5";
    var conditions = "/conditions/q/";
    var format = ".json";
    var url = site + key + conditions + lat + "," + lon + format;
    //make ajax call
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        contentType: "application/json",
        dataType: 'jsonp',
        // if success show weather
        success: function(response) {

            var gotLoc = response.current_observation.display_location.full; // location info.
            var gotType = response.current_observation.weather; //description	
            var gotIcon = "http://icons.wxug.com/i/c/i/" + response.current_observation.icon + ".gif"; //alternate icon
            var gotTempC = Math.round(response.current_observation.temp_c); // Celsius.
            var gotTempF = Math.round(response.current_observation.temp_f); // Fahrenheit.
            // html
            loc.innerHTML = gotLoc; // location.
            temp.innerHTML = gotTempC + "&degC"; //temperature.
            description.innerHTML = "~ " + gotType + " ~"; //  description

            var unit = "metric";
            document.getElementById("icon").setAttribute("src", gotIcon);
            //conversion
            $("#convert").click(function() {
                switch (unit) {
                    case ("metric"):
                        temp.innerHTML = gotTempF + " &degF"; //update temp
                        unit = "nonMetric";
                        break;
                    case ("nonMetric"):
                        temp.innerHTML = gotTempC + " &degC"; // update temp 
                        unit = "metric";
                        break;
                }
            }); //end conversion

        }

    });
}