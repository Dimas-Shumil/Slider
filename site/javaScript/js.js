const entities = [
    {
      text1: 'Rostov-on-Don LCD admiral',
      text2: '3.5 months',
      text3: '81 m<sup>2</sup>',
      img: 'site/img/image1.png'
    },
    {
      text1: 'Sochi Thieves',
      text2: '4 months',
      text3: '105 m<sup>2</sup>',
      img: 'site/img/image2.png'
    },
    {
      text1: 'Rostov-on-Don Patriotic',
      text2: '3 months',
      text3: '93 m<sup>2</sup>',
      img: 'site/img/image3.png'
    }
  ]
  
  const text1 = document.querySelector('.text1')
  const text2 = document.querySelector('.text2')
  const text3 = document.querySelector('.text3')
  const img = document.querySelector('.box__img')
  
  const setEntity = (index) => {
    text1.innerText = entities[index].text1
    text2.innerText = entities[index].text2
    text3.innerText = entities[index].text3
    img.style.backgroundImage = `url(${entities[index].img})`
  }
  
  const prev = document.querySelector('.prev')
  const next = document.querySelector('.next')
  const sl1 = document.querySelector('.sl1')
  const sl2 = document.querySelector('.sl2')
  const sl3 = document.querySelector('.sl3')
  const sl11 = document.querySelector('.sl11')
  const sl21 = document.querySelector('.sl21')
  const sl31 = document.querySelector('.sl31')
  let currentIndex = 0
  
  prev.addEventListener('click', () => {
    setEntity(currentIndex - 1);
    currentIndex -= 1;
  })
  next.addEventListener('click', () => {
    setEntity(currentIndex + 1);
    currentIndex += 1;
  })
  
  sl1.addEventListener('click', () => {
    setEntity(0);
    currentIndex = 0;
  })
  sl2.addEventListener('click', () => {
    setEntity(1);
    currentIndex = 1;
  })
  sl3.addEventListener('click', () => {
    setEntity(2);
    currentIndex = 2;
  })

  sl11.addEventListener('click', () => {
    setEntity(0);
    currentIndex = 0;
  })
  sl21.addEventListener('click', () => {
    setEntity(1);
    currentIndex = 1;
  })
  sl31.addEventListener('click', () => {
    setEntity(2);
    currentIndex = 2;
  })