import { ScreenBase } from "./ScreenBase";
import { saveToLocalStorage , retrieveFromLocalStorage } from '../utils';
import MainScreen from './mainScreen';


class SettingsScreen extends ScreenBase {
    constructor(){
        if (!SettingsScreen.instance){
            super('settings-screen');
            this.sound = undefined;
            this.timer = undefined;
            this.timeAmount = undefined;           
            this.winSound = null;
            this.loseSound = null;
            this.finishSound = null;
            SettingsScreen.instance = this;
        }

        return SettingsScreen.instance;
        
    }

    get soundKey(){
        return 'settings-sound-on';
    }

    get timerKey(){
        return 'settings-timer-on';
    }

    get timeAmountKey(){
        return 'timer-amount';
    }

    winPlay(){
        this.playSound(this.winSound);
    }
    losePlay(){
        this.playSound(this.loseSound);
    }
    finishPlay(){
        this.playSound(this.finishSound);
    }

    playSound(sound){
        if (this.sound && sound){
            sound.play();
        }
    }


    init(){
        this.sound = (retrieveFromLocalStorage(this.soundKey) == 'true')? true : false;
        this.timer = (retrieveFromLocalStorage(this.timerKey) == 'true')? true : false;
        this.timeAmount = (retrieveFromLocalStorage(this.timeAmountKey)) || 30;
        this.initBackButton();
        this.initHomeButton();
        this.render();
        this.loadSounds();
    }

    initBackButton(){
        let backButton = this.element.querySelector('.back-button');
        backButton.addEventListener('click', (event) => {
            if (event.defaultPrevented) return;

            event.preventDefault();

            console.log("button Back on Settings screen");
            this.toggleShowHide();
            MainScreen.toggleShowHide();
        })
    }

    render(){
        let soundSwitcher = this.element.querySelector('.switch-sound'); //label
        soundSwitcher.querySelector('input').checked = this.sound;
        soundSwitcher.addEventListener('change', () => {
            console.log("sound setting has changed, new value = ", soundSwitcher.querySelector('input').checked);
            this.sound = soundSwitcher.querySelector('input').checked;
            saveToLocalStorage(this.soundKey, this.sound);
        })

        let timerSwitcher = this.element.querySelector('.switch-timer'); //label
        timerSwitcher.querySelector('input').checked = this.timer;
        this.toggleShowHideNumberContainer();

        timerSwitcher.addEventListener('change', () => {
            console.log("timer setting has changed, new value = ", timerSwitcher.querySelector('input').checked);
            this.timer = timerSwitcher.querySelector('input').checked;
            saveToLocalStorage(this.timerKey, this.timer);
            this.toggleShowHideNumberContainer();
        })

        let buttonLess = this.element.querySelector('.timer-less');
        let timerInput = this.element.querySelector('.timer-amount');
        let buttonMore = this.element.querySelector('.timer-more');

        timerInput.value = this.timeAmount;
        
        buttonLess.addEventListener('click', () => {
            console.log("button Less clicked");
            timerInput.stepDown(5);
            let change = new Event('change');
            timerInput.dispatchEvent(change);
        })

        buttonMore.addEventListener('click', () => {
            console.log("button More clicked");
            timerInput.stepUp(5);
            let change = new Event('change');
            timerInput.dispatchEvent(change);
        })

        timerInput.addEventListener('change', () => {
            this.timeAmount = +timerInput.value;
            console.log("timerAmout = ", this.timeAmount)
            saveToLocalStorage(this.timeAmountKey, this.timeAmount);            
        });

    }

    toggleShowHideNumberContainer(){
        let container = this.element.querySelector('.number-container');
        if (!this.timer){
            container.classList.add('hidden');
        }
        else {
            container.classList.remove('hidden');
        }
    }

    async loadSounds(){
        console.log("load sounds");
        this.winSound = await this.loadSound('win');
        this.loseSound = await this.loadSound('lose');
        this.finishSound = await this.loadSound('finish');
        
    }

    async loadSound(fileName){
        return new Promise((resolve, reject) => {
            let prop = new Audio();
            prop.src = `/assets/sound/${fileName}.wav`;
            console.log("prop = ", prop);
            prop.addEventListener('canplaythrough', () => {
                resolve(prop);
            });
        })
    }
}

let instance = new SettingsScreen();
export default instance;