const entities = [
  {
    text1: 'Rostov-on-Don LCD admiral',
    text2: '3.5',
    text3: '81',
    img: 'site/img/image1.png'
  },
  {
    text1: 'Sochi Thieves',
    text2: '4',
    text3: '105',
    img: 'site/img/image2.png'
  },
  {
    text1: 'Rostov-on-Don Patriotic',
    text2: '3',
    text3: '93',
    img: 'site/img/image3.png'
  }
]

const text1 = document.querySelector('.text1')
const text2 = document.querySelector('.text2')
const text3 = document.querySelector('.text3')
const img = document.querySelector('.box__img')

const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const sl = [document.querySelector('.sl1'), document.querySelector('.sl2'), document.querySelector('.sl3')]
const sl1 = [document.querySelector('.sl11'), document.querySelector('.sl21'), document.querySelector('.sl31')]

let currentIndex = 0

const setEntity = (index) => {
  //console.log('ci= '+currentIndex, 'i= '+index);
  if (index == '-') {
    currentIndex = (currentIndex==0) ? 2 : currentIndex-1 //учтем переход по кругу влево     
  } else if (index == '+') {
    currentIndex = (currentIndex==2) ? 0 : currentIndex+1 //учтем переход по кругу вправо
  } else {
    currentIndex = index
  }

  for (i=0; i<=2; i++) {
    //sl1[i].style = (i==currentIndex) ? "color: #FFF; text-decoration: underline" : "color: rgba(255, 255, 255, 0.30)"; //font-size: 1.25em;
    //sl[i].style  = (i==currentIndex) ? "text-decoration: underline" : "";
    if (i==currentIndex) {
      sl[i].classList.add('activedot')
      sl1[i].classList.add('activeref')
    } else {
      sl[i].classList.remove('activedot')
      sl1[i].classList.remove('activeref')
    }
  }

  text1.innerText = entities[currentIndex].text1
  text2.innerText = entities[currentIndex].text2 + ' months'
  text3.innerHTML = entities[currentIndex].text3 + ' m<sup>2</sup>'
  img.style.backgroundImage = `url(${entities[currentIndex].img})`
}

prev.addEventListener('click', () => {
  setEntity('-')
})
next.addEventListener('click', () => {
  setEntity('+');
})

sl[0].addEventListener('click', () => {setEntity(0)});
sl[1].addEventListener('click', () => {setEntity(1)});
sl[2].addEventListener('click', () => {setEntity(2)});
sl1[0].addEventListener('click', () => {setEntity(0)});
sl1[1].addEventListener('click', () => {setEntity(1)});
sl1[2].addEventListener('click', () => {setEntity(2)});

setEntity(0) //по дефолту покажем 1-ый слайд
