import { TYPES } from "./components/mainScreen";
export default class Category {

    constructor(type, numberStr){
        this.type = type;
        this.number = numberStr;
        this.played = false;
        this.pictures = [];
        this.score = 0;
    }

    init(allImages, indexStart, questionsNum){
        for (let i = indexStart; i < indexStart + questionsNum; i++){
            let image = Object.assign({}, allImages[i]);
            this.pictures.push(image);
        };
        this.score = this.getScore();
        console.log("category type = ", this.type, ", category number = ", this.numberStr, ", category image 1 = ", this.pictures[0], ", length = ", this.pictures.length);
        this.renderCat();
    }

    typeToString(type){
        switch(type){
            case TYPES.painters: return 'p';
            case TYPES.images: return 'i';
        }
    }

    getScore(){
        this.pictures.reduce((sum, image) => {
            return sum + (image.correct? 1 : 0)
        }, 0);
    }



    renderCat(){
        let cats = document.querySelector('.categories');
        let el = document.createElement('div');
        el.classList.add(`cat-${this.typeToString(this.type)}`, 'category');
        
        let numberEl = document.createElement('div');
        numberEl.classList.add('card-header');
        numberEl.innerText = this.number;
        el.append(numberEl);
        if (this.played){
            let score = document.createElement('button');
            score.classList.add('cat-score', 'button-font');
            score.innerText = this.score;
            el.append(score);
        }
        
        cats.append(el);

    }
}