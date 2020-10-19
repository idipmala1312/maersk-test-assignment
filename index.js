
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const cardColors = ['--GB', '--DB', '--DC', '--GC'];

function createNumberPad(numbers) {
    const cardPanel = document.getElementById('card-panel');
    while (cardPanel.hasChildNodes()) {
        cardPanel.removeChild(cardPanel.firstChild);
    }
    for (let j = 0; j < numbers.length; j++) {
        let card = document.createElement('div');
        card.classList.add('card')
        card.setAttribute('id', `card-${j}`);
        let spanChild = document.createElement('span');
        spanChild.classList.add('card-text')
        card.appendChild(spanChild).appendChild(document.createTextNode(numbers[j]));
        const updatedCard = applyCardColor(j,card);
        cardPanel.appendChild(updatedCard);
    }
}

function applyCardColor(index, card) {
    const color = pickColorForCard();
    if(!isBGColorReapeatingForAdjacentCard(index, color)) {
        card.setAttribute('color-code', color);
        card.style.backgroundColor = `var(${color})`;
        card.style.borderLeft = `5px solid var(${color})`;
    } else {
        applyCardColor(index, card);
    }
    return card;
}

function pickColorForCard() {
    return cardColors[Math.floor(Math.random() * cardColors.length)];
}

function isBGColorReapeatingForAdjacentCard(index, color) {
    const adjacentNodes = [];
    adjacentNodes.push(document.getElementById(`card-${index+1}`));
    adjacentNodes.push(document.getElementById(`card-${index-3}`));
    adjacentNodes.push(document.getElementById(`card-${index+3}`));
    adjacentNodes.push(document.getElementById(`card-${index-1}`));
    for(let i=0; i < adjacentNodes.length; i++) {
        if(adjacentNodes[i] && adjacentNodes[i].getAttribute('color-code') === color){
           return true;
        }
    }
    return false; 
}

function shuffleArray() {
    return createNumberPad(numbers.sort(() => Math.random() - 0.5));
}

function sortArray() {
    return createNumberPad(numbers.sort())
}

createNumberPad(numbers);