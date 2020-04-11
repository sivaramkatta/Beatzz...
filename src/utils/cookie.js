export function getItem(cname) {
  return localStorage.getItem(cname);
}

export function setItem(cname, cvalue) {
  localStorage.setItem(cname, cvalue);
}

export function removeAllItems(item) {
  localStorage.removeItem(item);
}
