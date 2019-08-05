import React from 'react';
import ReactDOM from 'react-dom';

import Certificate from './components/Certficate/Certificate';

const parameters = [
  'debug',
  'siteId',
  'uid',
  'certificateDOMParent',
  'certificateText',
  'noRevisions',
  'logo',
  'icon',
  'wordproofApi',
];

let settings = {
  firstModalClick: true,
  wordproofApi: 'https://wsfy.wordproof.io/api/',
  fetchArticlesEndpoint: 'articles'
};

document.addEventListener('DOMContentLoaded', function () {
  const schema = document.querySelector('script.wordproof-schema');

  setSettings();

  if (schema) {
    initModal();
    initLink();
  }
});

/**
 * Render modal and set event listeners
 */
function initModal() {
  //Render Modal
  renderModal();

  //Close Modal
  let modal = getModal();
  modal.querySelector('.wordproof-modal-background').addEventListener('click', closeModal);
  modal.querySelector('.wordproof-modal-close').addEventListener('click', closeModal);

  //Open Modal
  if (window.location.href.indexOf("#wordproof") > -1) {
    openModal();
  }
}

function initLink() {
  let link = document.querySelector('.wordproof-certificate-link');

  if (wproof.certificateDOMParent) {
    const newLocation = document.querySelector(wproof.certificateDOMParent);

    if (newLocation) {
      link = newLocation.appendChild(link);
    }
  }

  link.style.display = 'flex';
  link.addEventListener('click', openModal);
}

function renderModal() {
  ReactDOM.render(<Certificate settings={wproof} />, document.querySelector('#wordproof-certificate-container'));
}

function getModal() {
  return document.querySelector('#wordproof-certificate-container .shadowHost').shadowRoot.querySelector('.modal');
}

function openModal() {
  if (settings.firstModalClick) {
    fetchArticles();
    settings.firstModalClick = false;
  }
  getModal().classList.add('is-active');
}

function closeModal() {
  getModal().classList.remove('is-active');
}

function fetchArticles() {
  if (wproof.wsfy.active && !wproof.wsfy.noRevisions) {
    fetch(settings.wordproofApi + 'site/' + wproof.wsfy.siteId + '/' + settings.fetchArticlesEndpoint + '/' + wproof.uid).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((schema) => {
      if (typeof schema === 'object' && !(schema instanceof Array)) {
        const script = document.querySelector('script.wordproof-schema');
        script.innerHTML = JSON.stringify(schema);
        document.dispatchEvent(new CustomEvent('newArticles', {detail: schema}));
      }
    });
  }
}

function setSettings() {
  debug();

  if (wproof.wsfy.noRevisions) {
    settings.fetchArticlesEndpoint = 'article';
  }

  if (wproof.debug) {
    settings.wordproofApi = 'http://wsfy.test/api/';
  }
}

function debug() {
  if (wproof.debug) {
    parameters.forEach((parameter) => {
      console.log(parameter + ' => ' + wproof[parameter]);
    });
  }
}