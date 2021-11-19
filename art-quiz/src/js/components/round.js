import { ScreenBase } from "./ScreenBase";
import { TYPES, QUESTIONS_IN_CATEGORY } from '../consts';
import { cloneArrayOfObjects, replaceElementByClone } from "../utils";
import Popup from './answerPopup';
import ImagesGameRound from './imagesGameRound';
import PaintersGameRound from "./paintersGameRound";
import RoundResultScreen from './roundResultScreen';

export default class Round extends ScreenBase {
    constructor(category){
        super('question-screen');
        this.parent = category;
        this.type = this.getGameType(category)
        this.pictures = cloneArrayOfObjects(category.pictures);
        this.questionNumber = 0;
    }

    async init() {
        this.initBackButton();
        this.initHomeButton();
        this.renderScore();
        await this.renderGame();
        this.toggleShowHide();

    }

    initBackButton(){
        let backButton = replaceElementByClone(this.element.querySelector('.back-button'), this.element.querySelector('header'));
        backButton.addEventListener('click', (event) => {
            if (event.defaultPrevented) return;

            event.preventDefault();

            console.log("button Back on Round screen");
            this.toggleShowHide();
            this.parent.parentScreen.toggleShowHide();
        })
    }

    getGameType(category){
        console.log("getGameType, category type = ", category.type);

        if (category.type == TYPES.painters){
            return new PaintersGameRound();
        }
        else {
            return new ImagesGameRound();
        }
    }

    renderScore(){
        let ul = document.querySelector('.current-score');

        while (ul.firstChild){
            ul.removeChild(ul.lastChild);
        }

        for (let i = 0; i < QUESTIONS_IN_CATEGORY; i++){
            let circle = document.createElement('li');
            circle.classList.add('score-item', 'score-item-empty');
            ul.append(circle);
        }

    }

    async renderGame(){
        let block = this.clearGameBlockAndReturn();
        let currentImage = this.getCurrentPicture();

        await this.type.renderGame(block, currentImage);

    }

    clearGameBlockAndReturn(){
        let block = document.querySelector('.game-block');

        while (block.firstChild) {
            block.removeChild(block.lastChild);
        }

        let newBlock = block.cloneNode(true);

        let parentBlock = document.querySelector('.round-main');
        parentBlock.replaceChild(newBlock, block);

        let process = this.processAnswer.bind(this);

        newBlock.addEventListener('answered', process);

        return newBlock;
    }

    

    processAnswer(){
        console.log("current response is ", this.getCurrentPicture().author);
        this.renderAnsweredCircle();
        let pCallback = this.popupCallback.bind(this);
        Popup.show(this.getCurrentPicture(), 'Продолжить', pCallback);
    }
    

    finishRound(){
        console.log("round pictures", this.pictures);
        this.saveScore();
        this.showRoundResults();        
    }


    renderAnsweredCircle() {
        let ul = document.querySelector('.current-score');
        let currentCircle = ul.children[this.questionNumber];
        if (this.getCurrentPicture().correct) {
            currentCircle.classList.add('score-item-correct');
        }
        else {
            currentCircle.classList.add('score-item-wrong');
        }        
    }

    saveScore(){
        this.parent.pictures = cloneArrayOfObjects(this.pictures);
        console.log("category pictures after save: ", this.parent.pictures);
        this.parent.score = this.parent.getScore();
        this.parent.played = true;
        this.parent.updateCat();
    }

    showRoundResults() {
        this.toggleShowHide();
        RoundResultScreen.show(this.parent.score, QUESTIONS_IN_CATEGORY, this.parent.parentScreen);

    }    

    getCurrentPicture(){
        return this.pictures[this.questionNumber];
    }

    popupCallback(){
        if (this.questionNumber < QUESTIONS_IN_CATEGORY - 1)
            {
                this.questionNumber++;
                this.renderGame();
            }
            else {
                this.finishRound();
            }
        }



}


