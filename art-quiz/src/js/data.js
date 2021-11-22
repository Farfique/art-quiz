import { getRandomNumber } from './utils'

class Data {
    constructor(){
        if (!Data.instance){
            this.images = [];
            Data.instance = this;
        }
        return Data.instance;        
    }

    async init(){
        let result = await fetch('assets/json/images.json');
        let info = await result.json();
        this.images.push(...info.images);
        return this.images;
    }

    getRandomImage(){
        return this.images[getRandomNumber(0, this.images.length - 1)];
    }

    getImageByNumber(number){
        return this.images[number];
    }

    getLength(){
        return this.images.length;
    }

    getThreeRandomAuthors(notEqualToThisAuthor){
        let res = [];
        let allAuthors = [notEqualToThisAuthor];
        
        while (res.length < 3){
            let currAuthor = this.getRandomImage().author;
            if (!allAuthors.includes(currAuthor)){
                res.push(currAuthor);
                allAuthors.push(currAuthor);
            }
        }

        return res;
    }

    getThreeRandomImageNums(whoseAuthorsNotEqualToThisAuthor){
        let res = [];
        
        while (res.length < 3){
            let currImage = this.getRandomImage();
            let imageNum = currImage.imageNum;
            if (whoseAuthorsNotEqualToThisAuthor != currImage.author && !res.includes(imageNum)){
                res.push(imageNum);
            }
        }

        return res;

    }

    getLinkToSquareImage(imageNum){        
        return `assets/images/img/${imageNum}.jpg`;
    }
}

const instance = new Data();

Object.freeze(instance);

export default instance;