import Data from '../data';
import {shuffle} from '../utils';

export default class ImagesGameRound {
    constructor(){
    }


    async renderGame(block, currentImage){
        return new Promise((resolve, reject) => {
            let question = document.querySelector('.question');
            question.innerText = `Автором какой картины является ${currentImage.author}?`;
            
    
            let optionsBlock = document.createElement('div');
            optionsBlock.classList.add('pictures-answers-container');
    
    
            let allOptions = [currentImage.imageNum, ...Data.getThreeRandomImageNums(currentImage.author)];
            shuffle(allOptions);
    
            allOptions.forEach(async (imageNum) => {
                optionsBlock.append(await this.createOptionFromImage(imageNum, currentImage));
            })
    
    
            block.append(optionsBlock);

            resolve();
    
        })
        
    }

    async createOptionFromImage(imageNum, currentImage){

        return new Promise((resolve, reject) => {
            let el = document.createElement('div');

            let img = new Image();
            img.src = Data.getLinkToSquareImage(imageNum);
            img.onload = () => {      
                el.style.backgroundImage = `url(${img.src})`;
                el.classList.add('option-image', 'button-card');
                el.addEventListener('click', () => {

                    currentImage.correct = (imageNum == currentImage.imageNum);

                    let answeredEvent = new CustomEvent('answered', {bubbles: true});

                    el.dispatchEvent(answeredEvent);

                });
        
                resolve(el);            
            }
    
        })

        
    }

}