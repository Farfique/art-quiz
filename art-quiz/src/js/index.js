import '../styles/app.scss'
import MainScreen from './components/mainScreen'
import Data from './data';


export let isLocalStorage = true;
checkLocalStorage(); 

initApp();

async function initApp(){
    await Data.init();

    console.log("inited data images = ", Data.images);

    MainScreen.init();

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





