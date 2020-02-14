import Logo from './webpack-logo.jpeg';

function addImage() {
  const img = document.createElement('img');
  img.alt = 'Webpack Logo';
  img.width = 300;
  img.src = Logo;

  const body = document.querySelector('body');
  body.appendChild(img);
}

export default addImage;
