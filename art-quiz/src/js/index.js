import '../styles/app.scss'
import MainScreen from './components/mainScreen'
import Data from './data'




initApp();

async function initApp(){
    await Data.init();

    console.log("inited data images = ", Data.images);

    MainScreen.init();

}




