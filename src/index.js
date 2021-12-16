import 'lodash';
import './style.css';
import './queries.css';

const addScore = () => {
  let name = document.querySelector('.name').value;
  let score = document.querySelector('.score').value;
  const ul = document.querySelector('.leaderboard-list');
  const li = document.createElement('li');
  const p = document.createElement('p');
  p.textContent = `${name} : ${score}`;
  p.style.margin = '0';
  li.appendChild(p);
  ul.appendChild(li);
  name = '';
  score = '';
};

document.querySelector('.button button').addEventListener('click', () => {
  if (document.querySelector('.name').value) {
    addScore();
  }
});