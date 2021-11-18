import Data from '../data';
import {shuffle} from '../utils';

export default class ImagesGameRound {
    constructor(){
    }


    async renderGame(block, currentImage){
        let question = document.querySelector('.question');
        question.innerText = `Автором какой картины является ${currentImage.author}?`;
        

        let optionsBlock = document.createElement('div');
        optionsBlock.classList.add('pictures-answers-container');


        let allOptions = [currentImage.imageNum, ...Data.getThreeRandomImageNums(currentImage.author)];
        console.log("pictures options before shuffle = ", allOptions);
        shuffle(allOptions);
        console.log("pictures options after shuffle = ", allOptions);

        allOptions.forEach(async (imageNum) => {
            optionsBlock.append(await this.createOptionFromImage(imageNum));
        })


        block.append(optionsBlock);

    }

    async createOptionFromImage(imageNum){

        return new Promise((resolve, reject) => {
            let el = document.createElement('div');

            let img = new Image();
            img.src = Data.getLinkToSquareImage(imageNum);
            img.onload = () => {      
                el.style.backgroundImage = `url(${img.src})`;
                el.classList.add('option-image');
                el.innerText = imageNum;
                el.addEventListener('click', () => {
                    console.log(`button with imageNum ${imageNum} was clicked`);
                });
        
                resolve(el);            
            }
    
        })

        
    }

}