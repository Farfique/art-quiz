import Data from "../data";
import Category from "../category";
import { TYPES, QUESTIONS_IN_CATEGORY } from '../consts';
import { ScreenBase } from "./ScreenBase";
import MainScreen from './mainScreen';





export default class CategoriesScreen extends ScreenBase{
    constructor(type, className){
        super(className);
        this.type = type;
        this.catNumber = 5;
        this.categories = [];
        this.data = null;
        this.wasInit = false;
    }

    async init(){        
        let images = Data.images;
        this.catNumber = this.getCategoriesNumber(images);
        let thisTypeStartIndex = this.getTypeStartIndex(images);
        this.toggleShowHide();
        this.categories = [];

        for (let i = 0; i < this.catNumber; i++){
            let numberStr = (i + 1).toString().padStart(2, "0");
            let cat = new Category(this, this.type, numberStr);
            this.categories.push(cat);            
            await cat.init(images, thisTypeStartIndex + i * QUESTIONS_IN_CATEGORY, QUESTIONS_IN_CATEGORY);
           
        }

        this.initBackButton();
        this.initHomeButton();

        this.wasInit = true;
    }

    initBackButton(){
        let backButton = this.element.querySelector('.back-button');
        backButton.addEventListener('click', (event) => {
            if (event.defaultPrevented) return;

            event.preventDefault();
            this.toggleShowHide();
            MainScreen.toggleShowHide();
        })
    }

    getCategoriesNumber(allDataArray){
        return Math.floor(allDataArray.length/Object.values(TYPES).length/QUESTIONS_IN_CATEGORY);
    }

    getTypeStartIndex(allDataArray){
        let catTypeShift = Math.floor(allDataArray.length/Object.values(TYPES).length);

        return Object.values(TYPES).indexOf(this.type) * catTypeShift;
        
    }

}