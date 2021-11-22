import { TYPES } from "./consts";
import Round from "./components/round";
import Data from "./data";
import ScoreScreen from "./components/scoreScreen";
import { saveToLocalStorage, retrieveFromLocalStorage, cloneArrayOfObjects } from "./utils";

export default class Category {

    constructor(parentScreen, type, numberStr){
        this.parentScreen = parentScreen;
        this.type = type;
        this.number = numberStr;
        this.played = false; 
        this.pictures = [];
        this.score = 0;
        this.el = null;
    }

    async init(allImages, indexStart, questionsNum){
        this.played = (retrieveFromLocalStorage(this.getPlayedLocalStorageString) == 'true') || false;

        if (this.played){
            this.pictures = JSON.parse(retrieveFromLocalStorage(this.getPicturesArrayLocalStorageString));
            console.log("this.pictures after localStorage");
        }
        if (this.pictures.length == 0){
            console.log("no pictures");
            for (let i = indexStart; i < indexStart + questionsNum; i++){
                let image = Object.assign({}, allImages[i]);
                this.pictures.push(image);
            };
        }
        
        this.score = this.getScore();
        console.log("category type = ", this.type, ", category number = ", this.number, ", category image 1 = ", this.pictures[0], ", length = ", this.pictures.length);
        await this.renderCat();
    }

    typeToString(type){
        switch(type){
            case TYPES.painters: return 'p';
            case TYPES.images: return 'i';
        }
    }

    get getPlayedLocalStorageString(){
        return `cat-${this.typeToString(this.type)}-${this.number}-played`;
    }

    get getPicturesArrayLocalStorageString(){
        return `cat-${this.typeToString(this.type)}-${this.number}-pictures`;
    }

    getScore(){
        return this.pictures.reduce((sum, image) => {
            return sum + (image.correct? 1 : 0)
        }, 0);
    }



    async renderCat(){
        
        return new Promise((resolve, reject) => {
            let cats = this.parentScreen.element.querySelector('.categories');
            let el = document.createElement('div');
            el.classList.add(`cat-${this.typeToString(this.type)}`, 'category',  'button-card');
            
            let numberEl = document.createElement('div');
            numberEl.classList.add('card-header');
            numberEl.innerText = this.number;
            el.append(numberEl);


            if (this.played){
                this.renderScoreButton(el);
            }
   
            this.el = el;

            el.addEventListener('click', (event) => {
                if (event.defaultPrevented) return;
                this.parentScreen.toggleShowHide();
                let round = new Round(this);
                round.init();
            })

            let backgrImage = new Image();
            backgrImage.src = Data.getLinkToSquareImage(this.pictures[0].imageNum);
            backgrImage.onload = () => {
                if (!this.played){
                    el.classList.add('category-not-played');
                    el.style.backgroundImage = `linear-gradient(black, black), url(${backgrImage.src})`;
                }
                else {
                    el.style.backgroundImage = `url(${backgrImage.src})`;
                }

                cats.append(el);

                resolve(el);
                    
            }
            
           

        })

    }

    renderScoreButton(parentEl){
        let score = document.createElement('button');
        score.classList.add('cat-score', 'button-card');
        score.innerText = this.score;
        parentEl.append(score);
        score.addEventListener('click', (event) => {
            event.preventDefault();
            let scoreScreen = new ScoreScreen(this);
            
            this.parentScreen.toggleShowHide();
            scoreScreen.init();
        })
        return score;
    }

    updateCat(){
        

        let backgrImage = new Image();
            backgrImage.src = Data.getLinkToSquareImage(this.pictures[0].imageNum);
            backgrImage.onload = () => {
                this.el.style.backgroundImage = `url(${backgrImage.src})`; 
                this.el.classList.remove('category-not-played');

            }
        let scoreBtn = this.el.querySelector('cat-score');
        if (!scoreBtn){
            scoreBtn = this.renderScoreButton(this.el);
        }

        scoreBtn.innerText = this.score;
        

    }

    saveScore(arrayOfPictures){
        this.pictures = cloneArrayOfObjects(arrayOfPictures);
        console.log("category pictures after save: ", this.pictures);
        this.score = this.getScore();
        this.played = true;
        saveToLocalStorage(this.getPlayedLocalStorageString, 'true');
        saveToLocalStorage(this.getPicturesArrayLocalStorageString, JSON.stringify(this.pictures));
        this.updateCat();
    }
}