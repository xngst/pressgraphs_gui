//SEARCH EVENT LISTENER
document.querySelector("#search").addEventListener("click", startSearch);
document.querySelector("#scroll_to_top").addEventListener("click", scrollToTop);

function scrollToTop(){
  document.getElementById('search_word').scrollIntoView();
  return
}

//SEARCH
async function startSearch() {
  const search_word = document.querySelector("#search_word");
  const from_date = document.querySelector("#from_date");
  const to_date = document.querySelector("#to_date");
  getCount(search_word,from_date,to_date);
}

//BIND SEARCH TO ENTER
var input = document.getElementById("search_word");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("search").click();
  };
});
