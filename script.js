// inspiration from: https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "data.json", false);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function init() {
  loadJSON(function (response) {
    var data = JSON.parse(response).data;
    console.log(data);
    var x_values = data.map((line) => line[0]);
    var y_values = data.map((line) => line[1]);
    var chartData = {
      labels: x_values,
      datasets: [
        {
          label: "My dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: y_values,
        },
      ],
    };

    window.onload = function () {
      var chartOptions = { responsive: true };
      var chart = document.getElementById("canvas").getContext("2d");
      window.myBar = new Chart(chart).Line(chartData, chartOptions);
    };
  });
}

init();
