import { ScreenBase } from "./ScreenBase";

class RoundResultScreen extends ScreenBase{
    constructor(){
        if (!RoundResultScreen.instance)
        {
            super('round-result-screen');
            RoundResultScreen.instance = this;
        }
        return RoundResultScreen.instance;
    }

    show(score, total, categoryScreen){
        this.toggleShowHide();
        let scoreElement = document.querySelector('.round-score');
        scoreElement.innerText = `${score} / ${total}`;



        let btn = document.querySelector('.button-round-score');
        let newBtn = btn.cloneNode(true);
        let containerEl = this.element.querySelector('div');
        containerEl.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', () => {
            this.toggleShowHide();
            categoryScreen.toggleShowHide();
        });
    }

}

const instance = new RoundResultScreen();

Object.freeze(instance);

export default instance;