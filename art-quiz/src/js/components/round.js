import { ScreenBase } from "./ScreenBase";
import { TYPES, QUESTIONS_IN_CATEGORY } from '../consts';
import { clearBlockAndReturn, cloneArrayOfObjects, replaceElementByClone } from "../utils";
import Popup from './answerPopup';
import ImagesGameRound from './imagesGameRound';
import PaintersGameRound from "./paintersGameRound";
import RoundResultScreen from './roundResultScreen';
import Settings from './settingsScreen';
import MainScreen from './mainScreen';

export default class Round extends ScreenBase {
    constructor(category){
        super('question-screen');
        this.parent = category;
        this.type = this.getGameType(category)
        this.pictures = cloneArrayOfObjects(category.pictures);
        this.questionNumber = 0;
        this.timeoutId = null;
        this.intervalId = null;
    }

    async init() {
        this.initBackButton();
        this.initHomeButton();
        this.renderScore();
        let block = await this.renderGame();
        this.toggleShowHide();
        
    }

    initBackButton(){
        let backButton = replaceElementByClone(this.element.querySelector('.back-button'), this.element.querySelector('header'));
        backButton.addEventListener('click', (event) => {
            if (event.defaultPrevented) return;

            event.preventDefault();
            this.stopTimers();
            this.toggleShowHide();
            this.parent.parentScreen.toggleShowHide();
        })
    }

    initHomeButton(){
        let homeButton = replaceElementByClone(this.element.querySelector('.home-button'), this.element.querySelector('header'));
        homeButton.addEventListener('click', (event) => {
            if (event.defaultPrevented) return;

            event.preventDefault();
            this.stopTimers();
            this.toggleShowHide();
            MainScreen.toggleShowHide();
        })
    }

    getGameType(category){

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

        let timerEl = document.querySelector('.timer');

        if (Settings.timer){
            timerEl.innerText = Settings.timeAmount;
            timerEl.classList.remove('hidden');

            this.timeoutId = setTimeout(() => {
                let timeoutEvent = new CustomEvent('timeout');
                clearInterval(this.intervalId);
                block.dispatchEvent(timeoutEvent);
    
            }, Settings.timeAmount * 1000);
    
            let timeleft = Settings.timeAmount;
            this.intervalId = setInterval(() => {
                timerEl.innerText = --timeleft;
            }, 1000);
        }
        else {
            timerEl.classList.add('hidden');
        }

       

        return block;

    }

    clearGameBlockAndReturn(){
        let parentBlock = document.querySelector('.round-main');

        let block = clearBlockAndReturn(document.querySelector('.game-block'), parentBlock);

        let process = this.processAnswer.bind(this);

        block.addEventListener('answered', () => {
            this.stopTimers();
            
            this.processAnswer();
        });

        block.addEventListener('timeout', () => {
            block.removeEventListener('answered', process);
            this.getCurrentPicture().correct = false;
            this.processAnswer();
        })

        return block;
    }

    stopTimers(){
        if (Settings.timer){
            clearTimeout(this.timeoutId);
            clearInterval(this.intervalId);
        }
    }

    

    

    processAnswer(){
        this.playAnswerSound();
        this.renderAnsweredCircle();
        let pCallback = this.popupCallback.bind(this);
        Popup.show(this.getCurrentPicture(), 'Продолжить', pCallback);
    }
    

    finishRound(){
        this.saveScore();
        this.showRoundResults();        
    }

    playAnswerSound(){
        if (this.getCurrentPicture().correct) {
            Settings.winPlay();
        }
        else {
            Settings.losePlay();
        }      
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
        this.parent.saveScore(this.pictures);
    }

    showRoundResults() {
        this.toggleShowHide();
        Settings.finishPlay();
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


