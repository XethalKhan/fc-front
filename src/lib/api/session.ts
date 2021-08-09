import { dateToString } from "./../util";

const URL: string = "http://localhost:3000/";

interface SessionFilter{
  id?: number,
  date?: Date
}

async function filter(token: string, filter: SessionFilter){

  let access: string = URL + "/session?token=" + token;

  if(filter.date){
    access += "&date=" + dateToString(filter.date);
  }

  if(filter.id){
    access += "&id=" + filter.id;
  }

  //access = access.slice(0, -1);

  let response = await window.fetch(access, {
    method: "GET"
  });

  return response;

}

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

async function active(token: string){

  let access: string = URL + "session/active?token=" + token;

  let response = await window.fetch(access, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  return response;

}

export const filterSession = filter;
export const startSession = start;
export const endSession = end;
export const activeSession = active;

let toBeExported = {
  filterSession,
  startSession,
  endSession,
  activeSession
}

export default toBeExported;
