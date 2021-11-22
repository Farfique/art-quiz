import MainScreen from './mainScreen';
import { replaceElementByClone } from '../utils';

export class ScreenBase {
    constructor(className){
        this.element = document.querySelector('.' + className);
    }


    toggleShowHide(){
        this.element.classList.toggle('screen-hidden');
    }

    initHomeButton(){
        let homeButton = replaceElementByClone(this.element.querySelector('.home-button'), this.element.querySelector('header'));
        homeButton.addEventListener('click', (event) => {
            if (event.defaultPrevented) return;

            event.preventDefault();
            this.toggleShowHide();
            MainScreen.toggleShowHide();
        })
    }




}