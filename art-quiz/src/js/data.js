import { getRandomNumber } from './utils'

export default class Data {
    constructor(){
        this.images = [];
    }

    async init(){
        let result = await fetch('/assets/json/images.json');
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

    isSameAuthor(current, compare){
        return getImageByNumber(current).author === this.getImageByNumber(compare).author;
    }

    isSameImage(current, compare){
        return getImageByNumber(current).name === this.getImageByNumber(compare).name;
    }

    getThreeImagesWithDifferentAuthors(current){
        let arr = [];
        
    }
}