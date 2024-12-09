export function setCookie(name, value, days = 30) {
	const expires = new Date();
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
  }
  
  function getCookie(name) {
	const cookies = document.cookie.split(";");
	for (let cookie of cookies) {
		cookie = cookie.trim();
		if (cookie.startsWith(name + "=")) {
			return cookie.substring(name.length + 1);
		}
	}
	return null;
  }
  
  function generateUniqueId() {
	return 'id-' + Math.random().toString(36).substr(2, 9);
  }
  
  
  async function get_key() {
	try {
		const response = await fetch('https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
  
		if (!response.ok) {
			throw new Error(`Error fetching API key: ${response.statusText}`);
		}
  
		const data = await response.json();
		if (data && data.key) {
			setCookie('apiKey', data.key);
			return data.key;
		} else {
			console.error('Error: No API key received');
			return null;
		}
	} catch (error) {
		console.error('Error:', error);
		return null;
	}
  }
  
  async function set_tenant(api_key, tenantName) {
	try {
		const response = await fetch('https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-zocom': api_key,
			},
			body: JSON.stringify({ name: tenantName }),
		});
  
		if (!response.ok) {
			throw new Error(`Error setting tenant: ${response.statusText}`);
		}
  
		const data = await response.json();
		if (data && data.id) {
			setCookie('tenant-name', data.id);
			setCookie('tenant-id', data.name);
		} else {
			console.error('Error: No tenant data received');
		}
	} catch (error) {
		console.error('Error:', error);
	}
  }
  
  (async () => {
	  let apiKey = getCookie('apiKey');
	  if (!apiKey) {
		  apiKey = await get_key();
	  }
	
	  let tenantId = getCookie('tenant-id');
	  if (!tenantId && apiKey) {
		  const tenantName = generateUniqueId();
		  await set_tenant(apiKey, tenantName);
	  } else if (tenantId) {
		  console.log('Existing tenant found:', tenantId);
	  } else {
		  console.error('Error: Unable to proceed without an API key or tenant.');
	  }
	})();

	  
import { get_menu } from "./api.js";
get_menu();