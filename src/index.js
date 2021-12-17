import 'lodash';
import './style.css';
import './queries.css';

let maxScore = JSON.parse(localStorage.getItem('maxScore') || 0);
const getData = async (url) => {
  const myRequest = new Request(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
    mode: 'cors',
    cache: 'default',
  });
  const data = await fetch(myRequest).then(
    (response) => response.json(),
  ).then((json) => json.result);
  return data;
};
const addScore = () => {
  const name = document.querySelector('.name').value;
  const score = Number(document.querySelector('.score').value);

  if (score > maxScore) {
    maxScore = score;
    localStorage.setItem('maxScore', JSON.stringify(maxScore));
  }

  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/cmKYedACxK6LuaZtYZrZ/scores/', {
    method: 'POST',
    body: JSON.stringify({
      user: name,
      score,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });
};
const displayScores = (element) => {
  const name = element.user;
  const scoreAPI = Number(element.score);
  const ul = document.querySelector('.leaderboard-list');
  const li = document.createElement('li');
  const div = document.createElement('div');
  const p = document.createElement('p');
  const p2 = document.createElement('p');
  const hr = document.createElement('hr');
  const div2 = document.createElement('div');
  const image = document.createElement('img');
  image.style.marginRight = '10px';
  div.style.marginLeft = '16px';
  div.style.marginRight = '18px';
  div.style.alignItems = 'center';
  div.style.justifyContent = 'space-between';
  hr.style.borderRadius = '6px';
  div.style.display = 'flex';
  div2.style.display = 'flex';
  div2.style.justifyContent = 'space-between';
  hr.style.height = '5px';
  hr.style.borderWidth = '0';
  p.style.fontFamily = '\'Poppins\', sans-serif';
  p2.textContent = `${scoreAPI}`;
  hr.style.backgroundSize = `${((scoreAPI / maxScore) * 100) * 3}px 1rem`;
  hr.style.width = '300px';
  p.textContent = `${name}`;
  p.style.margin = '0';
  image.setAttribute('src', 'https://100k-faces.glitch.me/random-image');
  image.style.width = '55px';
  image.style.borderRadius = '45px';
  if (window.screen.width >= 768) {
    div2.appendChild(image);
  }
  div2.appendChild(hr);
  li.appendChild(div2);
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(p2);
  ul.appendChild(li);
};
document.querySelector('.button button').addEventListener('click', () => {
  if ((document.querySelector('.name').value) && (Number.isNaN(Number(document.querySelector('.name').value))) && (!Number.isNaN(Number(document.querySelector('.score').value)))) {
    addScore();
    document.querySelector('.name').value = '';
    document.querySelector('.score').value = '';
  }
});
document.querySelector('.score').addEventListener('change', () => {
  if ((document.querySelector('.name').value) && (Number.isNaN(Number(document.querySelector('.name').value))) && (!Number.isNaN(Number(document.querySelector('.score').value)))) {
    addScore();
    document.querySelector('.name').value = '';
    document.querySelector('.score').value = '';
  }
});

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/cmKYedACxK6LuaZtYZrZ/scores/';
let data = getData(url);
data.then((element) => {
  document.querySelector('.leaderboard-list').innerHTML = '';
  const lastResult = element;
  for (let i = 0; i < lastResult.length; i += 1) {
    displayScores(lastResult[i]);
  }
});

data = getData(url);
data.then((element) => {
  for (let i = 0; i < element.length; i += 1) {
    if (element.score > maxScore) {
      maxScore = element.score;
      localStorage.setItem('maxScore', JSON.stringify(maxScore));
    }
  }
});
document.querySelector('.refresh').addEventListener('click', () => {
  data = getData(url);
  data.then((element) => {
    document.querySelector('.leaderboard-list').innerHTML = '';
    const lastResult = element;
    for (let i = 0; i < lastResult.length; i += 1) {
      displayScores(lastResult[i]);
    }
  });
});

window.addEventListener('resize', () => {
  const event = new Event('click');
  document.querySelector('.refresh').dispatchEvent(event);
});