import { TYPES } from "./consts";
import Round from "./components/round";

export default class Category {

    constructor(parentScreen, type, numberStr){
        this.parentScreen = parentScreen;
        this.type = type;
        this.number = numberStr;
        this.played = true; //temp
        this.pictures = [];
        this.score = 0;
        this.el = null;
    }

    init(allImages, indexStart, questionsNum){
        for (let i = indexStart; i < indexStart + questionsNum; i++){
            let image = Object.assign({}, allImages[i]);
            this.pictures.push(image);
        };
        this.score = this.getScore();
        console.log("category type = ", this.type, ", category number = ", this.number, ", category image 1 = ", this.pictures[0], ", length = ", this.pictures.length);
        this.renderCat();
    }

    typeToString(type){
        switch(type){
            case TYPES.painters: return 'p';
            case TYPES.images: return 'i';
        }
    }

    getScore(){
        return this.pictures.reduce((sum, image) => {
            return sum + (image.correct? 1 : 0)
        }, 0);
    }



    renderCat(){
        let cats = this.parentScreen.element.querySelector('.categories');
        let el = document.createElement('div');
        el.classList.add(`cat-${this.typeToString(this.type)}`, 'category');
        
        let numberEl = document.createElement('div');
        numberEl.classList.add('card-header');
        numberEl.innerText = this.number;
        el.append(numberEl);
        if (this.played){
            let score = document.createElement('button');
            score.classList.add('cat-score');
            score.innerText = this.score;
            el.append(score);
        }
        this.el = el;

        el.addEventListener('click', () => {
            this.parentScreen.toggleShowHide();
            let round = new Round(this);
            round.init();
        })
        
        cats.append(el);

    }

    updateCat(){
        let scoreBtn = this.el.querySelector('cat-score');
        if (!scoreBtn){
            scoreBtn = document.createElement('button');
            scoreBtn.classList.add('cat-score');
            scoreBtn.innerText = this.score;
            this.el.append(scoreBtn);
        }

        scoreBtn.innerText = this.score;

    }
}