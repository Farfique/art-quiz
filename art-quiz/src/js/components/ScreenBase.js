export class ScreenBase {
    constructor(className){
        this.element = document.querySelector('.' + className);
    }


    toggleShowHide(){
        this.element.classList.toggle('screen-hidden');
    }
}