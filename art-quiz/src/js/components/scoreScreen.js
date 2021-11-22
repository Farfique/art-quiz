import { clearBlockAndReturn, replaceElementByClone } from "../utils";
import { ScreenBase } from "./ScreenBase";
import Data from '../data';
import Popup from './answerPopup';

export default class ScoreScreen extends ScreenBase{

    constructor(category){
        super('category-score-screen');
        this.parentScreen = category.parentScreen;
        this.pictures = category.pictures;
    }

    async init(){
        this.initBackButton();
        this.initHomeButton();

        let scoreContainer = this.clearScore();

        await this.renderPreviews(scoreContainer);

        this.toggleShowHide();
    }

    initBackButton(){
        let backButton = replaceElementByClone(this.element.querySelector('.back-button'), this.element.querySelector('header'));
        backButton.addEventListener('click', (event) => {
            if (event.defaultPrevented) return;

            event.preventDefault();

            this.toggleShowHide();
            this.parentScreen.toggleShowHide();
        })
    }

    clearScore(){
        let scoreContainer = document.querySelector('.score');
        return clearBlockAndReturn(scoreContainer, this.element);
    }

    async renderPreviews(block){
        return Promise.all(this.pictures.map(image => {
            return new Promise((resolve, reject) => {
                let divEl = document.createElement('div');
                divEl.classList.add('score-picture-div', 'button-card');
                if (!image.correct){
                    divEl.classList.add('score-wrong');
                }
                divEl.addEventListener('click', () => {
                    //let pCallback = this.popupCallback.bind(this);
                    Popup.show(image, 'Закрыть');
                })
    
                let img = new Image();
                img.src = Data.getLinkToSquareImage(image.imageNum);
                img.onload = () => {
                    let picture = document.createElement('img');
                    picture.src = img.src;
                    picture.alt = 'preview';
                    divEl.append(picture);
                    resolve(divEl);
                }
            });            
        })).then((arr) => {
            arr.forEach((divEl) => block.append(divEl));
        });

    }

}