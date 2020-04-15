export function getItem(cname) {
  return localStorage.getItem(cname);
}

export function setItem(cname, cvalue) {
  localStorage.setItem(cname, cvalue);
}

export function removeItem(item) {
  localStorage.removeItem(item);
}
