const URL: string = "http://localhost:3000/";

async function loginRequest(email: string, password: string){

  let data = {payload: {email: email, password: password}};

  let response = await window.fetch(URL + "login", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  },
    body: JSON.stringify(data)
  });

  return response;

}

export const login = loginRequest;

export default loginRequest;
