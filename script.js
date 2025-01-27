// Получаем элементы модального окна
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeBtn = document.querySelector('.close');
const form = document.getElementById('callbackForm');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const vinInput = document.getElementById('vin');
const partInput = document.getElementById('part');

// Номер WhatsApp менеджера (замените на реальный номер)
const managerWhatsApp = '79991234567';

// Открытие модального окна
openModalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Обработка ввода номера телефона
phoneInput.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '').substr(0, 11);
});

// Закрытие модального окна при клике на крестик
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Обработка отправки формы
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Получаем данные из форм
  const name = nameInput.value;
  const phone = phoneInput.value;
  const vin = vinInput.value;
  const part = partInput.value;

  // Отправка сообщения в Telegram
  function sendTelegramMessage(name, phone, vin, part) {
    fetch(`https://api.telegram.org/bot7285199642:AAEX_8LRoECZnGVTcdrMDqZChhWDy0x7HW0/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: '5199635738',
         text: `
					🆕 НОВАЯ ЗАЯВКА 🆕
					🙋🏻‍♂️ Имя: ${name}
					📞 Номер тел.: ${phone}
					👉 VIN-код: ${vin}
					🛠️ Запчасть: ${part}
					`,
      }),
    });
  }

  sendTelegramMessage(name, phone, vin, part);

  modal.style.display = 'none';
  form.reset();
});
// Слайд-шоу
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.slideshow-dots');
const prevButton = document.getElementById('prevSlide');
const nextButton = document.getElementById('nextSlide');

// Создаем точки для навигации
slides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.onclick = () => showSlide(index);
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showSlide(n) {
  // Убираем активный класс у всех слайдов и точек
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  // Обновляем индекс слайда
  slideIndex = n;
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;

  // Показываем текущий слайд и активируем соответствующую точку
  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

// Добавляем обработчики событий для кнопок навигации
prevButton.addEventListener('click', () => showSlide(slideIndex - 1));
nextButton.addEventListener('click', () => showSlide(slideIndex + 1));

// Автоматическое переключение слайдов каждые 5 минут
function autoSlide() {
  showSlide(slideIndex + 1);
}

// Показываем первый слайд
showSlide(0);

// Запускаем автоматическое переключение
setInterval(autoSlide, 5000);