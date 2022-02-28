
const mainDiv = document.getElementById('main')

const searchButton = () => {
    const input = document.getElementById('inputValue')
    const error = document.getElementById('error');

    const inputValue = parseInt(input.value)
    if (isNaN(inputValue) || inputValue === '') {
        error.innerText = 'plz give a number'
        input.value = '';
        mainDiv.innerHTML = '';
    }
    else if (inputValue <= 0) {
        error.innerText = 'plz give positive number'
        input.value = '';
        mainDiv.innerHTML = '';
    }
    else {
        mainDiv.innerHTML = '';
        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
            .then(res => res.json())
            .then(data => displayCards(data.cards))
        input.value = '';
        error.innerHTML = '';

    }
}

const displayCards = (cards) => {
    for (const card of cards) {
        const div = document.createElement('div')
        div.className = 'col-lg-4 col-md-6 g-4'
        div.innerHTML = `
        <div>
          <img height="300px" width="250px" src="${card.image}" alt="">
          <button onclick="cardDetails('${card.code}')" class="btn btn-primary mt-2">See Details</button>
         </div>
        `
        mainDiv.appendChild(div)

    }
}

const cardDetails = (code) => {
    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
        .then(res => res.json())
        .then(data => {
            const allCards = data.cards
            const singleCard = allCards.find(card => card.code === code)
            console.log(singleCard)
            const div = document.createElement('div')
            mainDiv.innerHTML = '';
            div.innerHTML = `
        <div class='text-center'>
          <img height="300px" width="250px" src="${singleCard.image}" alt="">
          <p >${singleCard.code}</p>
          <p>${singleCard.suit}</p>
          </div>
        `
            mainDiv.appendChild(div)
        })
}

