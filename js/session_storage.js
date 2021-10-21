
//SESSION STORAGE

localToSessionStorage();
authenticate();

function localToSessionStorage(){
	sessionStorage.setItem('api_key', localStorage.getItem('api_key'));
	};

function getApiKey(){
	const api_key = sessionStorage.getItem('api_key');
	return api_key
	};
	
async function authenticate(){
		const api_key = getApiKey()
		console.log(api_key)
		auth_url = `https://api.pressgraphs.com/auth/${api_key}`
		console.log(auth_url)
		let response = await fetch(auth_url);
		let data = await response.json();
		console.log(data)
		if (data[0] === "auth_true") {
			//auth ok
			}
		
		//else{
		//	window.location.replace("index.html");
		//	}
		};

function logout(){
	localStorage.clear();
	sessionStorage.clear();
	window.location.replace("index.html");
	};
