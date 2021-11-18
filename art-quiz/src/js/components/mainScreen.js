import ImagesCategoryScreen from './imagesCategoryScreen';
import PaintersCategoryScreen from './paintersCategoryScreen';
import { ScreenBase } from './ScreenBase';
import { TYPES } from '../consts';
 


class MainScreen extends ScreenBase{
    constructor(){
        if (!MainScreen.instance){
            super('main-screen');
            this.paintersScreen = null;
            this.imagesScreen = null;
        }
        return MainScreen.instance;
        
    }

    init(){
        
        let paintersCatBtn = document.querySelector('.painters-btn');
        let imagesCatBtn = document.querySelector('.images-btn');
        //let settingsBtn = document.querySelector('.settings-btn');
        
        
        paintersCatBtn.addEventListener('click', () => {
            this.callCatScreen(TYPES.painters);
        });
        
        imagesCatBtn.addEventListener('click', () => {
            this.callCatScreen(TYPES.images);
        });
    }

    callCatScreen(type){
        this.toggleShowHide();

        if (type == TYPES.images){
            ImagesCategoryScreen.wasInit? ImagesCategoryScreen.toggleShowHide() : ImagesCategoryScreen.init();
        }
        else {
            PaintersCategoryScreen.wasInit? PaintersCategoryScreen.toggleShowHide() : PaintersCategoryScreen.init();
        }
    }
}

const instance = new MainScreen();
Object.freeze(instance);
export default instance;