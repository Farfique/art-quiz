import Data from '../data';
import {shuffle} from '../utils';

export default class PaintersGameRound {
    constructor(){
    }

    async renderGame(block, currentImage){
        console.log("renderGame = ", block);
        let question = document.querySelector('.question');
        question.innerText = "Кто автор этой картины?";
        
        let pictureBlock = document.createElement('div');
        pictureBlock.classList.add('picture-question-container');
        let picture = document.createElement('img');

        let img = new Image();
        img.src = Data.getLinkToSquareImage(currentImage.imageNum);


        return new Promise((resolve, reject) => {
            img.onload = () => {      
                picture.src = img.src;
                picture.alt = "painting";
    
                pictureBlock.append(picture);
                block.append(pictureBlock);
        
                let optionsBlock = document.createElement('div');
                optionsBlock.classList.add('authors-answers-container');
        
        
                let allOptions = [currentImage.author, ...Data.getThreeRandomAuthors(currentImage.author)];
                
                shuffle(allOptions);
        
                allOptions.forEach((option) => {
                    optionsBlock.append(this.createOptionFromPainter(option, currentImage));
                })
        
        
                block.append(optionsBlock);
    
                resolve();    
            }


        });
    }; 

    createOptionFromPainter(author, currentImage){
        let el = document.createElement('button');
        el.classList.add('option-painter',  'button-card');
        el.innerText = author;
        el.addEventListener('click', () => {

            currentImage.correct = (author == currentImage.author);

            let answeredEvent = new CustomEvent('answered', {bubbles: true});

            el.dispatchEvent(answeredEvent);

        });

        return el;

    }


}