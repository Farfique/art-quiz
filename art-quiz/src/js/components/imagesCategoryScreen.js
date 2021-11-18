import CategoriesScreen from "./categoriesScreen";
import { TYPES } from '../consts';

class ImagesCategoryScreen extends CategoriesScreen {
    constructor(){
        if (!ImagesCategoryScreen.instance){
            super(TYPES.images, 'images-categories');
            ImagesCategoryScreen.instance = this;
        }
        return ImagesCategoryScreen.instance;
    }
}

const instance = new ImagesCategoryScreen();

//Object.freeze(instance);

export default instance;