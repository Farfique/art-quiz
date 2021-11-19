export function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle(array) {
    let currentIndex = array.length - 1,  
    randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(getRandomNumber(0, 1) * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  export function cloneArrayOfObjects(arr){
    return arr.map((obj) => {
      return Object.assign({}, obj);
    })
  }

  export function replaceElementByClone(element, parent){

    let newBlock = element.cloneNode(true);
    parent.replaceChild(newBlock, element); 
    
    return newBlock;
}