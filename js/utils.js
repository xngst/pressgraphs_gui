
//FILL IN TODAY
document.getElementById("to_date").value = get_today();
document.getElementById("from_date").value = two_weeks_before_today();

//GET TODAY
function get_today(){
  var utc = new Date().toJSON().slice(0,10);
  return utc
};

function two_weeks_before_today(){
  var utc = new Date()
  utc.setDate(utc.getDate() - 15);
  utc = utc.toJSON().slice(0,10);
  return utc
	}
