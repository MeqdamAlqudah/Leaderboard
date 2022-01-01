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

  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/hSln0Q85wcoqO8IhOhNI/scores/', {
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
const error = document.querySelector('.Add-list li p.error');
const name = document.querySelector('.name');
const score = document.querySelector('.score');
document.querySelector('.button button').addEventListener('click', (e) => {
  // eslint-disable-next-line no-restricted-properties
  if (((!window.isNaN(name.value)) || (window.isNaN(score.value)))) {
    e.preventDefault();
    error.textContent = 'Please enter a valid value';
  } else if ((!name.value.length || !score.value.length)) {
    e.preventDefault();
    error.textContent = 'Please enter a valid value';
  } else if (name.value.length > 20) {
    e.preventDefault();
    error.textContent = 'You are allowed just with 20 word name';
  } else if (score.value.length > 99999) {
    e.preventDefault();
    error.textContent = 'Max score is 99999';
  } else {
    error.textContent = '';
    addScore();
    document.querySelector('.name').value = '';
    document.querySelector('.score').value = '';
  }
});
document.querySelector('.score').addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    // eslint-disable-next-line no-restricted-properties
    if (((!window.isNaN(name.value)) || (window.isNaN(score.value)))) {
      e.preventDefault();
      error.textContent = 'Please enter a valid value';
    } else if ((!name.value.length || !score.value.length)) {
      e.preventDefault();
      error.textContent = 'Please enter a valid value';
    } else if (name.value.length > 20) {
      e.preventDefault();
      error.textContent = 'You are allowed just with 20 word name';
    } else if (score.value.length > 99999) {
      e.preventDefault();
      error.textContent = 'Max score is 99999';
    } else {
      error.textContent = '';
      addScore();
      document.querySelector('.name').value = '';
      document.querySelector('.score').value = '';
    }
  }
});

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/hSln0Q85wcoqO8IhOhNI/scores/';
let data = getData(url);
data.then((element) => {
  document.querySelector('.leaderboard-list').innerHTML = '';
  const lastResult = element.sort((a, b) => b.score - a.score);
  for (let i = 0; i < lastResult.length; i += 1) {
    displayScores(lastResult[i]);
  }
});

data = getData(url);
data.then((element) => {
  for (let i = 0; i < element.length; i += 1) {
    if (element[i].score > maxScore) {
      maxScore = element[i].score;
      localStorage.setItem('maxScore', JSON.stringify(maxScore));
    }
  }
});
document.querySelector('.refresh').addEventListener('click', () => {
  data = getData(url);
  data.then((element) => {
    document.querySelector('.leaderboard-list').innerHTML = '';
    const lastResult = element.sort((a, b) => b.score - a.score);
    for (let i = 0; i < lastResult.length; i += 1) {
      displayScores(lastResult[i]);
    }
  });
});

window.addEventListener('resize', () => {
  const event = new Event('click');
  document.querySelector('.refresh').dispatchEvent(event);
});
