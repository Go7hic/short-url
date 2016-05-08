'use strict';

const RANGE = 999999
const locationRef = window.location
const StorageRef = window.localStorage

const urlForm = document.querySelector('#url-form')
const addrDom = document.querySelector('#addr')
const urlAnchor = document.querySelector('.url-anchor')

urlForm.onsubmit = function(event) {
  event.preventDefault()
};

function redirectWithout() {
  let raw_id = locationRef.search.slice(locationRef.search.indexOf('=') + 1)
  locationRef.replace(StorageRef.getItem(raw_id))
}

function shorten() {

  let url = addrDom.value
  let pat = /(\w+):\/\/[0-9A-Za-z]+\.\w+/g;
  if (!pat.test(url) || url === "") {
    return;
  }

  let existing_id = null
  let shortId = Math.floor(Math.random() * RANGE)

  for (var i = 0; i < StorageRef.length; i++) {
    if (url === StorageRef.getItem(StorageRef.key(i))) {
      existing_id = StorageRef.key(i)
      break;
    }
  }

  if (existing_id !== null) {
    createAnchor(existing_id)
  } else {
    let new_shortId = Math.floor(Math.random() * RANGE)
    StorageRef.setItem(new_shortId, url)
    createAnchor(new_shortId)
  }

}

function createAnchor(id) {
  let anchor = document.querySelector('.url-anchor')
  
  anchor.href = locationRef.origin + locationRef.pathname + '?u=' + id
  anchor.text = id != undefined ? locationRef.origin + locationRef.pathname + '?u=' + id : ''
}


if (locationRef.search !== "") {
  redirectWithout()
} else {
  shorten()
  createAnchor()
  // urlAnchor.onclick = function (event) {
  //   event.preventDefault()
  //   let newId = urlAnchor.href.slice(urlAnchor.href.indexOf('=') + 1)
  //   locationRef.replace(StorageRef.getItem(newId))
  // };
  
}
