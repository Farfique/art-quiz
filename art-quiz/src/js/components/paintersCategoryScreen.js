import CategoriesScreen from "./categoriesScreen";
import { TYPES } from '../consts';

class PaintersCategoryScreen extends CategoriesScreen {
    constructor(){
        if (!PaintersCategoryScreen.instance){
            super(TYPES.painters, 'painters-categories');
            PaintersCategoryScreen.instance = this;
        }
        return PaintersCategoryScreen.instance;
    }
}

const instance = new PaintersCategoryScreen();

//Object.freeze(instance);

export default instance;