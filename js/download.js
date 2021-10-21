//DOWNLOAD TO PNG
function download_chart(){

	const search_word = document.querySelector("#search_word");
	const from_date = document.querySelector('#from_date');
	const to_date = document.querySelector('#to_date');

	var a = document.createElement('a');
	a.href = myChart.toBase64Image();
	a.download = `${search_word.value}_${from_date.value}_${to_date.value}.png`;
	a.click();
	};

//DOWNLOAD TO CSV
async function table_to_csv(){

	date = document.getElementById('label_text').innerHTML

	if (date === "") {
		alert("Nincsen kiválasztva dátum.")
		return
		}
	
	const search_word = document.querySelector("#search_word");
	
	const url = `https://api.pressgraphs.com/datelist/${search_word.value}/'${date}'/'${date}'/all`
	let response = await fetch(url);
	let data = await response.json();

	var csv_data = [];
	for (let i of data) {
		var csvrow = [];
		csvrow.push(i.date);
		csvrow.push(i.site);
		csvrow.push(i.title);
		csvrow.push(i.url);
		csv_data.push(csvrow.join(";"));
		}
	csv_data = csv_data.join('\n');
	downloadCSVFile(csv_data, search_word, date);
}

function downloadCSVFile(csv_data, search_word, date) {
	//Attribution:
	//https://www.geeksforgeeks.org/how-to-export-html-table-to-csv-using-javascript/

	// Create CSV file object and feed
	// our csv_data into it
	CSVFile = new Blob([csv_data], {
		type: "text/csv"
	});

	// Create to temporary link to initiate
	// download process
	var temp_link = document.createElement('a');

	// Download csv file
	temp_link.download = `${search_word.value}_${date}.csv`;
	var url = window.URL.createObjectURL(CSVFile);
	temp_link.href = url;

	// This link should not be displayed
	temp_link.style.display = "none";
	document.body.appendChild(temp_link);

	// Automatically click the link to
	// trigger download
	temp_link.click();
	document.body.removeChild(temp_link);
}
