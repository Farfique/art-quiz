import Data from "../data";
import Category from "../category";
import { TYPES, QUESTIONS_IN_CATEGORY } from '../consts';
import { ScreenBase } from "./ScreenBase";





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
        console.log("this.catnumber = ", this.catNumber);
        let thisTypeStartIndex = this.getTypeStartIndex(images);
        this.toggleShowHide();
        this.categories = [];

        for (let i = 0; i < this.catNumber; i++){
            let numberStr = (i + 1).toString().padStart(2, "0");
            let cat = new Category(this, this.type, numberStr);
            this.categories.push(cat);            
            await cat.init(images, thisTypeStartIndex + i * QUESTIONS_IN_CATEGORY, QUESTIONS_IN_CATEGORY);
           
        }
        this.wasInit = true;
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