
const ctx = document.getElementById('myChart').getContext('2d');
const config = {
type: 'bar',
options: {
interaction: {
  intersect: true,
  mode: 'nearest',
},
responsive: true,
maintainAspectRatio: true,
onClick : function clickHandler(evt) {
  const points = myChart.getElementsAtEventForMode(evt, 'nearest', {intersect: true}, true);
  if (points.length) {
	const firstPoint = points[0];
	var label = myChart.data.labels[firstPoint.index];
	var value = myChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
  //Display label
	const elem = document.querySelector('#label_text');
	elem.innerText = label;
	getDateList(label);
  }
},
plugins: {
  legend: {
	display: false,
  },
  title: {
	display: true,
	text: 'Találatok száma a keresőszóra:'
  }
}
},
  
data: {
labels: [],
datasets: [{
  label: "",
  data: [],
  backgroundColor: 'rgba(255, 205, 86, 0.2)',
  borderColor: 'rgb(1,13,133)',
  borderWidth: 0.5,
}]
}
}

//DRAW CHART
var myChart = new Chart(ctx,config);

