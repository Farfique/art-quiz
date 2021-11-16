import CategoriesScreen from './categoriesScreen'
import { ScreenBase } from './ScreenBase';
 

export const TYPES = Object.freeze({
    painters: "painters",
    images: "images"
})


export class MainScreen extends ScreenBase{
    constructor(){
        super('main-screen');
        this.paintersScreen = null;
        this.imagesScreen = null;
    }

    init(){
        //let mainScreen = document.querySelector('.main-screen ');
        let categoriesScreen = document.querySelector('.categories-screen');
        
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
        let catScreen = new CategoriesScreen(type);
        catScreen.init();
    }
}