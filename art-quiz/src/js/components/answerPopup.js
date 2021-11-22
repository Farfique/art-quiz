class Popup {
    constructor(){
        if (!Popup.instance){
            this.element = document.querySelector('.answer-popup');
            this.overlayElement = document.querySelector('.overlay');
            Popup.instance = this;
        }

        return Popup.instance;
        
    }

    show(imageObj, btnTitle, btnCallback){
        let popupIcon  = document.querySelector('.popup-icon');
        if (imageObj.correct){
            popupIcon.src = `assets/svg/correct.svg`;
        }
        else {
            popupIcon.src = `assets/svg/wrong.svg`;
        }

        let img = new Image();
        img.src = `assets/images/full/${imageObj.imageNum}full.jpg`;
        img.onload = () => {
            document.querySelector('.popup-image').src = img.src;
            document.querySelector('.popup-author').innerText = imageObj.author;
            document.querySelector('.popup-name').innerText = imageObj.name;
            document.querySelector('.popup-year').innerText = imageObj.year;
    
            let btn = document.querySelector('.popup-button');
            let newBtn = btn.cloneNode(true);
            this.element.replaceChild(newBtn, btn);
    
            newBtn.innerText = btnTitle;
            newBtn.addEventListener('click', () => {
                this.toggleShowHide();
                if (btnCallback) btnCallback();
            });
    
            this.toggleShowHide();

        }        
        
    }

    toggleShowHide(){
        this.element.classList.toggle('popup-hidden');
        this.overlayElement.classList.toggle('overlay-hidden');

    }



}

const instance = new Popup();

Object.freeze(instance);

export default instance;