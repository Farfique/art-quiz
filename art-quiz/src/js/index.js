import '../styles/app.scss'
import MainScreen from './components/mainScreen'
import Data from './data';
import Settings from './components/settingsScreen';


export let isLocalStorage = true;
checkLocalStorage(); 

initApp();

async function initApp(){
    await Data.init();
    Settings.init();
    MainScreen.init();
    selfCheck();

}

function checkLocalStorage() {
    try {
        localStorage.setItem('test', '1');
        localStorage.getItem('test');
    }
    catch {
        isLocalStorage = false;    
        alert('Please turn on local storage');   
    }
  }

  function selfCheck(){
    console.log('*************** Привет, проверяющий! ***************');
    console.log('Я выполнила следующие пункты:');
    console.log('1. Стартовая страница +15/20');
    console.log('1.1 Вёрстка, дизайн +5/10');
    console.log('1.2 навигация по страницам приложения +10/10');
    console.log("");
    console.log('2. Настройки +35/40');
    console.log('2.1 Настройки звука +5/10');
    console.log('2.2 Включение таймера +10/10');
    console.log('2.3 Ввод времени для ответа +10/10');
    console.log('2.4 Сохранение настроек +10/10');
    console.log("");
    console.log('3. Страница категорий +25/30');
    console.log('3.1 Верстка +5/10');
    console.log('3.2 Карточка сыгранной категории +10/10');
    console.log("3.3 Результат раунда на сыгранной категории +10/10");
    console.log("");
    console.log("4. Страница с вопросами +45/50");
    console.log("4.1 Верстка, дизайн +5/10");
    console.log("4.2 Рандом из ответов +10/10");
    console.log("4.3 Индикаторы разного цвета +10/10");
    console.log("4.4 Модалка с правильным ответом +10/10");
    console.log("4.5 Скрин окончания игры с результатом +10/10");
    console.log("");
    console.log("5. Страница с результатами +45/50");
    console.log("5.1 Верстка +5/10");
    console.log("5.2 Превью всех картин +10/10");
    console.log("5.3 Черно-белые неправильные, цветные правильные +10/10");
    console.log("5.4 При клике выводится инфо +10/10");
    console.log("5.5 Новый раунд - новые результаты +10/10");
    console.log("");
    console.log("6. Плавная смена изображений +10/10");
    console.log("7. Анимация 0/20");
    console.log("8. Допфункционал 0/20");
    console.log("");

    console.log("ИТОГО: 175 баллов");
    console.log("");
  }





