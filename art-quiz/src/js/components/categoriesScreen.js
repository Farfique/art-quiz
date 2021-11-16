import Data from "../data";
import Category from "../category";
import { TYPES } from "./mainScreen";
import { ScreenBase } from "./ScreenBase";



const QUESTIONS_IN_CATEGORY = 10;

export default class CategoriesScreen extends ScreenBase{
    constructor(type){
        super('categories-screen');
        this.type = type;
        this.catNumber = 5;
        this.categories = [];
    }

    async init(){
        let data = new Data();
        let images = await data.init();
        this.catNumber = this.getCategoriesNumber(images);
        console.log("this.catnumber = ", this.catNumber);
        let thisTypeStartIndex = this.getTypeStartIndex(images);
        this.toggleShowHide();

        for (let i = 0; i < this.catNumber; i++){
            let numberStr = (i + 1).toString().padStart(2, "0");
            let cat = new Category(this.type, numberStr);
            this.categories.push(cat);            
            cat.init(images, thisTypeStartIndex + i * QUESTIONS_IN_CATEGORY, QUESTIONS_IN_CATEGORY);
        }
    }

    getCategoriesNumber(allDataArray){
        console.log("getCategoriesNumber is called");
        console.log("TYPES = ", TYPES);
        console.log("TYPES.length = ", Object.values(TYPES).length);
        return Math.floor(allDataArray.length/Object.values(TYPES).length/QUESTIONS_IN_CATEGORY);
    }

    getTypeStartIndex(allDataArray){
        let catTypeShift = Math.floor(allDataArray.length/Object.values(TYPES).length);
        console.log("this type = ", this.type, " and its start index = ", Object.values(TYPES).indexOf(this.type) * catTypeShift);

        return Object.values(TYPES).indexOf(this.type) * catTypeShift;
        
    }

}