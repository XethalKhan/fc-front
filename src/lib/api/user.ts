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

async function logoutRequest(token: string){

  let data = {token: token};

  let response = await window.fetch(URL + "logout", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  },
    body: JSON.stringify(data)
  });

  return response;

}

async function createUserRequest(full_name: string, email: string, password: string){

  let data = {payload: {
    full_name: full_name,
    email: email,
    password: password
  }};

  let response = await window.fetch(URL + "user", {
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
export const logout = logoutRequest;
export const createUser = createUserRequest;

const toBeExported = {
  login,
  logout,
  createUser
}

export default toBeExported;
