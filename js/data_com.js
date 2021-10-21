
//GET COUNNT
async function getCount(search_word, from_date, to_date) {
  const sw = search_word.value.toLowerCase();

//DATA VALIDATION

  if (sw === ""){
	alert("Hiányzó keresőszó.");
	document.getElementById('search_word').focus()
	return
	};

  if (from_date.value === ""){
	alert("Hiányzó kezdő dátum.");
	document.getElementById('from_date').focus()
	return
	};

  if (to_date.value === ""){
	alert("Hiányzó befejező dátum.");
	document.getElementById('to_date').focus()
	return
	};
	 
  var date_regex = /^\d{4}-\d{2}-\d{2}$/;
  if (date_regex.test(from_date.value) == false){
	alert("Nem megfelelő dátum formátum. Helyes formátum: 2021-09-01");
	document.getElementById('from_date').focus()
	return
	};
  if (date_regex.test(to_date.value) == false){
	alert("Nem megfelelő dátum formátum. Helyes formátum: 2021-09-01");
	document.getElementById('to_date').focus()
	return
	};
  const api_key = getApiKey()
  const date_count_url = `https://api.pressgraphs.com/datecount/v2/${api_key}/${sw}&'${from_date.value}'&'${to_date.value}'&all`;
  let response = await fetch(date_count_url);
  let data = await response.json();
  
  //DATES
  const dates = [];
  for (let i = 0; i < data.length; i++) {
	   dates.push(data[i].date)
  };
	
  //COUNTS
  const counts = [];
  for (let i = 0; i < data.length; i++) {
	   counts.push(data[i].count)
  };

  updateCountChart(dates,counts);
};

//GET DATE LIST
async function getDateList(date){

	//CLEAR TABLE
	$("#mytbody tr").remove(); 
	$("#mytbody th").remove(); 
	
	//API CALL
	const sw = search_word.value.toLowerCase()
	const url = `https://api.pressgraphs.com/datelist/${sw}/'${date}'/'${date}'/all`
	let response = await fetch(url);
	let data = await response.json();
	
	//WRITE DATA TO TABLE
	tabBody = document.getElementsByTagName("tbody").item(0);
	let head1 = document.createElement("th");
	let head2 = document.createElement("th");
	var headText1 = document.createTextNode("Újság");
	var headText2 = document.createTextNode("Cikkcím");
	head1.appendChild(headText1);
	head2.appendChild(headText2);
	tabBody.appendChild(head1);
	tabBody.appendChild(head2);
	
	document.getElementById('mytable').scrollIntoView();
	
	for (let i of data) {
		let row = document.createElement("tr");
		cell1 = document.createElement("td");
		cell2 = document.createElement("td");
		textnode1=document.createTextNode(i.site);
		var mlink = document.createElement("a");
		mlink.setAttribute("href", i.url);
		//mlink.setAttribute("class", "first after");
		mlink.setAttribute("target", '_blank');
		var linkText = document.createTextNode(i.title);
		mlink.appendChild(linkText);
		cell1.appendChild(textnode1);
		cell2.appendChild(mlink);
		row.appendChild(cell1);
		row.appendChild(cell2);
		tabBody.appendChild(row);
	};
};

//UPDATE CHART
async function updateCountChart(dates, counts){

  const search_word = document.querySelector("#search_word");
  const from_date = document.querySelector('#from_date');
  const to_date = document.querySelector('#to_date');
  myChart.options.plugins.title.text = `'${search_word.value}' ${from_date.value} ${to_date.value}`;
  myChart.data.labels = dates;
  myChart.data.datasets[0].data = counts;
  myChart.update();
	};
