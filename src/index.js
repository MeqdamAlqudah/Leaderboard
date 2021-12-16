import 'lodash';
import './style.css';
import './queries.css';

async function getData(url) {
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
}
function addScore() {
  const name = document.querySelector('.name').value;
  const score = document.querySelector('.score').value;
  const ul = document.querySelector('.leaderboard-list');
  const li = document.createElement('li');
  const p = document.createElement('p');
  p.textContent = `${name} : ${score}`;
  p.style.margin = '0';
  li.appendChild(p);
  ul.appendChild(li);
  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/n4PCKW3vrOv1EwCy3CAq/scores/', {
    method: 'POST',
    body: JSON.stringify({
      user: name,
      score,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });
}
const displayScores = (element) => {
  const name = element.user;
  const scoreAPI = element.score;
  const ul = document.querySelector('.leaderboard-list');
  const li = document.createElement('li');
  const p = document.createElement('p');
  p.textContent = `${name} : ${scoreAPI}`;
  p.style.margin = '0';
  li.appendChild(p);
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
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/n4PCKW3vrOv1EwCy3CAq/scores/';
let data = getData(url);
data.then((element) => {
  document.querySelector('.leaderboard-list').innerHTML = '';
  const lastResult = element;
  for (let i = 0; i < lastResult.length; i += 1) {
    displayScores(lastResult[i]);
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
