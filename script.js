//setCookie function
function setCookie(name,value,days=30){
	const expires=new Date();
	expires.setTime(expires.getTime()+days*24*60*60*1000);
	let expiresString=expires.toUTCString();
	document.cookie=`${name}=${value};${expiresString};path=/`;
}


//getCookie function
function getCookie(name){
	const cookies=document.cookie.split(";");
	let result=null;
	cookies.forEach(cookie=>{
		cookie=cookie.trim();
		if(cookie.startsWith(name+"=")){
			result=cookie.substring(name.length+1);
		}
	})
	return result;
}


//send a request to get an apiKey
fetch('https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
})
.then(response => response.json())
.then(data => {
  if (data && data.key) {
    console.log('API Key:', data.key); 
	setCookie('apiKey', data.key);
  } else {
    console.error('Error: No API key received');
  }
})
.catch(error => console.error('Error:', error));

