let player = {
    name: "Per",
    chips: 200
}

let playerCards = []
let playerSum = 0
let dealerCards = []
let dealerSum = 0
let hasBlackJack = false
let isAlive = false 
let message = ""
let messageEl = document.getElementById("message-el")
let playerSumEl = document.getElementById("player-sum-el")
let playerCardsEl = document.getElementById("player-cards-el")
let playerEl = document.getElementById("player-el")
let dealerCardsEl = document.getElementById("dealer-cards-el")
let dealerSumEl = document.getElementById("dealer-sum-el")

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    hasBlackJack = false
    
    let playerFirstCard = getRandomCard()
    let playerSecondCard = getRandomCard()
    playerCards = [playerFirstCard, playerSecondCard]
    playerSum = playerFirstCard + playerSecondCard
    
    let dealerFirstCard = getRandomCard()
    let dealerSecondCard = getRandomCard()
    dealerCards = [dealerFirstCard, dealerSecondCard]
    dealerSum = dealerFirstCard + dealerSecondCard
    
    renderGame()
}

function renderGame() {
    playerCardsEl.textContent = " Player Cards: "
    for (let i = 0; i < playerCards.length; i++) {
        playerCardsEl.textContent += playerCards[i] + " "
    }
    
    if (isAlive === true){
        dealerCardsEl.textContent = "Dealer Cards: " + dealerCards[0] + " ?"
        dealerSumEl.textContent = "Dealer Sum: ?"
    } else {
        dealerCardsEl.textContent = "Dealer Cards: " + dealerCards.join(" ")
        dealerSumEl.textContent = "Dealer Sum: " + dealerSum
    }

    playerSumEl.textContent = "Player Sum: " + playerSum
    if (playerSum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (playerSum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard()
        playerCards.push(card)
        playerSum += card
        renderGame()

        if (playerSum >= 21) {
            endGame()
        }
    }
}

// Dealer's turn logic (automatically runs after player stands or busts)
function dealerTurn() {
    while (dealerSum < 17) {
        let card = getRandomCard()
        dealerCards.push(card)
        dealerSum += card
    }
}

function endGame() {
    if (playerSum <= 21){
        dealerTurn()
    } 
    renderGame()
    
    dealerCardsEl.textContent = "Dealer Cards: " + dealerCards.join(" ")
    dealerSumEl.textContent = "Dealer Sum: " + dealerSum
    
    if (playerSum > 21) {
        message = "You busted! Dealer wins."
    } else if (dealerSum > 21 && playerSum === 21) {
        message = "Blackjack!"
    } else if (dealerSum > 21){
        message = "Dealer busted. You win!"
    } else if (playerSum > dealerSum) {
        message = "You win!"
    } else if (playerSum < dealerSum) {
        message = "Dealer wins!"
    } else {
        message = "It's a tie!"
    }

    messageEl.textContent = message
}
