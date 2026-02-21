/**
 * Слайдер проектов
 * @version 1.0.0
 */

// Данные проектов
const PROJECTS = [
    {
        city: 'Rostov-on-Don LCD admiral',
        time: '3.5',
        area: '81',
        image: 'site/img/image1.png',
        title: 'Rostov-on-Don, Admiral'
    },
    {
        city: 'Sochi Thieves',
        time: '4',
        area: '105',
        image: 'site/img/image2.png',
        title: 'Sochi Thieves'
    },
    {
        city: 'Rostov-on-Don Patriotic',
        time: '3',
        area: '93',
        image: 'site/img/image3.png',
        title: 'Rostov-on-Don Patriotic'
    }
];

// Константы
const SLIDES_COUNT = PROJECTS.length;
const LAST_INDEX = SLIDES_COUNT - 1;
const SWIPE_THRESHOLD = 50; // Минимальная дистанция для свайпа

// Состояние
let currentIndex = 0;

// DOM элементы
const elements = {
    // Текстовые элементы
    city: document.querySelector('.text1'),
    time: document.querySelector('.text2'),
    area: document.querySelector('.text3'),
    
    // Изображение
    image: document.querySelector('.box__img'),
    
    // Навигация (текстовые ссылки)
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Навигация (точки)
    dots: document.querySelectorAll('.nav-dot'),
    
    // Кнопки управления
    prevBtn: document.querySelector('.prev'),
    nextBtn: document.querySelector('.next')
};

/**
 * Проверка наличия всех необходимых DOM элементов
 * @returns {boolean} - true если все элементы найдены
 */
function checkElements() {
    const requiredElements = [
        elements.city, elements.time, elements.area, elements.image,
        elements.navLinks.length, elements.dots.length,
        elements.prevBtn, elements.nextBtn
    ];
    
    const allElementsExist = requiredElements.every(el => 
        typeof el === 'object' ? el !== null : el > 0
    );
    
    if (!allElementsExist) {
        console.error('Ошибка: Не все необходимые DOM элементы найдены');
        return false;
    }
    
    return true;
}

/**
 * Обновление активного состояния навигационных элементов
 * @param {number} index - индекс активного слайда
 */
function updateNavigationState(index) {
    // Обновление текстовых ссылок
    elements.navLinks.forEach((link, i) => {
        const isActive = i === index;
        link.classList.toggle('nav-link--active', isActive);
        link.setAttribute('aria-selected', isActive.toString());
    });
    
    // Обновление точек
    elements.dots.forEach((dot, i) => {
        const isActive = i === index;
        dot.classList.toggle('activedot', isActive);
        dot.setAttribute('aria-selected', isActive.toString());
    });
}

/**
 * Обновление контента слайда
 * @param {number} index - индекс активного слайда
 */
function updateContent(index) {
    const project = PROJECTS[index];
    
    // Обновление текста
    elements.city.textContent = project.city;
    elements.time.textContent = project.time + ' months';
    elements.area.innerHTML = project.area + ' m<sup>2</sup>';
    
    // Обновление изображения
    elements.image.style.backgroundImage = `url('${project.image}')`;
    
    // Обновление aria-меток для изображения
    elements.image.setAttribute('aria-label', `Изображение проекта: ${project.title}`);
    
    // Обновление aria-меток для панелей слайдов
    document.querySelectorAll('[role="tabpanel"]').forEach((panel, i) => {
        panel.id = `slide-${i}`;
        panel.setAttribute('aria-labelledby', `tab-${i}`);
    });
}

/**
 * Переключение на указанный слайд
 * @param {number|string} target - индекс слайда или '+'/'-' для навигации
 * @returns {boolean} - успешность переключения
 */
function setSlide(target) {
    // Проверка наличия элементов
    if (!checkElements()) return false;
    
    let newIndex;
    
    // Определение нового индекса
    if (target === '-') {
        newIndex = currentIndex === 0 ? LAST_INDEX : currentIndex - 1;
    } else if (target === '+') {
        newIndex = currentIndex === LAST_INDEX ? 0 : currentIndex + 1;
    } else if (typeof target === 'number' && target >= 0 && target < SLIDES_COUNT) {
        newIndex = target;
    } else {
        console.error('Ошибка: Неверный индекс слайда', target);
        return false;
    }
    
    // Если индекс не изменился, ничего не делаем
    if (newIndex === currentIndex) return true;
    
    // Обновление состояния
    currentIndex = newIndex;
    
    // Обновление UI
    updateNavigationState(currentIndex);
    updateContent(currentIndex);
    
    return true;
}

/**
 * Обработка свайпов на мобильных устройствах
 */
function initSwipeHandler() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    elements.image.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    elements.image.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > SWIPE_THRESHOLD) {
            if (diff > 0) {
                setSlide('+'); // Свайп влево
            } else {
                setSlide('-'); // Свайп вправо
            }
        }
    });
}

/**
 * Обработка клавиатурной навигации
 */
function initKeyboardHandler() {
    document.addEventListener('keydown', (e) => {
        // Игнорируем нажатия, если пользователь вводит текст
        if (e.target.matches('input, textarea')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                setSlide('-');
                break;
            case 'ArrowRight':
                e.preventDefault();
                setSlide('+');
                break;
        }
    });
}

/**
 * Инициализация обработчиков событий
 */
function initEventListeners() {
    // Кнопки "предыдущий/следующий"
    elements.prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setSlide('-');
    });
    
    elements.nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setSlide('+');
    });
    
    // Навигационные ссылки
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(link.dataset.index);
            setSlide(index);
        });
    });
    
    // Точки навигации
    elements.dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(dot.dataset.index);
            setSlide(index);
        });
    });
    
    // Предотвращение перехода по якорям
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => e.preventDefault());
    });
}

/**
 * Инициализация слайдера
 */
function initSlider() {
    // Проверка наличия элементов
    if (!checkElements()) return;
    
    // Инициализация обработчиков
    initEventListeners();
    initSwipeHandler();
    initKeyboardHandler();
    
    // Установка начального слайда
    setSlide(0);
    
    console.log('Слайдер успешно инициализирован');
}

// Запуск после полной загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
} else {
    initSlider();
}