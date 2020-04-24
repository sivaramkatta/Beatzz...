export function getItem(cname) {
  return localStorage.getItem(cname);
}

export function setItem(cname, cvalue) {
  localStorage.setItem(cname, cvalue);
}

export function removeItems(iem) {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
}
