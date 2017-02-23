'use strict';

const RANGE = 999999
const locationRef = window.location
const storageRef = window.localStorage

const urlForm = document.querySelector('#url-form')
const addrDom = document.querySelector('#addr')
const urlAnchor = document.querySelector('.url-anchor')

urlForm.onsubmit = function(event) {
  event.preventDefault()
};

function redirectWithout() {
  const raw_id = locationRef.search.slice(locationRef.search.indexOf('=') + 1)
  locationRef.replace(storageRef.getItem(raw_id))
}

function shorten() {

  const url = addrDom.value
  const pat = /(\w+):\/\/[0-9A-Za-z]+\.\w+/g;
  if (!pat.test(url) || url === "") {
    return;
  }

  let existing_id = null
  let shortId = Math.floor(Math.random() * RANGE)

  for (var i = 0; i < storageRef.length; i++) {
    if (url === storageRef.getItem(storageRef.key(i))) {
      existing_id = storageRef.key(i)
      break;
    }
  }

  if (existing_id !== null) {
    createAnchor(existing_id)
  } else {
    let new_shortId = Math.floor(Math.random() * RANGE)
    storageRef.setItem(new_shortId, url)
    createAnchor(new_shortId)
  }

}

function createAnchor(id) {
  const anchor = document.querySelector('.url-anchor')
  
  anchor.href = locationRef.origin + locationRef.pathname + '?u=' + id
  anchor.text = id != undefined ? locationRef.origin + locationRef.pathname + '?u=' + id : ''
}


if (locationRef.search !== "") {
  redirectWithout()
} else {
  shorten()
  createAnchor()
}
