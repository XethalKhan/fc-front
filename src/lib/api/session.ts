const URL: string = "http://localhost:3000/";

async function start(token: string){

  let current: Date = new Date();

  let data = {payload: {date: current.toISOString()}, token: token};

  let response = await window.fetch(URL + "session/start", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response;

}

async function end(token: string){

  let data = {token: token};

  let response = await window.fetch(URL + "session/end", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response;

}

export const startSession = start;
export const endSession = end;

let toBeExported = {
  startSession,
  endSession
}

export default toBeExported;
