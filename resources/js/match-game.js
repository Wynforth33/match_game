const MatchGame = {
  flippedCards: [],

  /*
    Generates and returns an array of matching card values.
   */
  generateCardValues: ()=> {
    const possibleValues = [];
    const randomValues = [];
    for (let i = 1; i <= 8 ; i++){
      possibleValues.push(i);
      possibleValues.push(i);
    }
    while (possibleValues.length > 0) {
      const randomIndex = Math.floor(Math.random() * possibleValues.length);
      const randomValue = possibleValues.splice(randomIndex, 1)[0];
      randomValues.push(randomValue);
    }
    return randomValues;
  },

  /*
    Converts card values to jQuery card objects and adds them to the supplied game
    object.
  */
  renderCards: (cardValues, $game)=> {
    const colors = [
      'hsl(25, 85%, 65%)',
      'hsl(55, 85%, 65%)',
      'hsl(90, 85%, 65%)',
      'hsl(160, 85%, 65%)',
      'hsl(220, 85%, 65%)',
      'hsl(265, 85%, 65%)',
      'hsl(310, 85%, 65%)',
      'hsl(360, 85%, 65%)'];
    $game.empty();
    for (let j = 0; j < cardValues.length; j++){
      const cardValue = cardValues[j];
      const cardColor = colors[cardValue-1];
      const cardData = {
        value: cardValue,
        color: cardColor,
        isFlipped: false
      };
      const $card = $('<div class="card col-xs-3"></div>');
      $card.data(cardData);
      $game.append($card);
    };
    $('.card').click(function(){
      MatchGame.flipCard($(this), $('#game'))
    });
  },

  /*
    Flips over a given card and checks to see if two cards are flipped over.
    Updates styles on flipped cards depending whether they are a match or not.
   */
  flipCard: ($card, $game)=> {
    if ($card.data('isFlipped')) {
      return;
    }
    $card.css('background-color', $card.data('color'))
    .text($card.data('value'))
    .data('isFlipped', true);
    MatchGame.flippedCards.push($card);
    if (MatchGame.flippedCards.length === 2) {
      const card1 = MatchGame.flippedCards[0];
      const card2 = MatchGame.flippedCards[1];
      if (card1.data('value') === card2.data('value')) {
        const successCss = {
          backgroundColor: 'rgb(153,153,153)',
          color: 'rgb(204,204,204)'
        };
        card1.css(successCss);
        card2.css(successCss);
      } else {
        window.setTimeout(function(){
          card1.css('background-color', 'rgb(32,64,86)')
            .text('')
            .data('isFlipped', false);
          card2.css('background-color', 'rgb(32,64,86)')
            .text('')
            .data('isFlipped', false);
        }, 500);
      }
      MatchGame.flippedCards = [];
    }
  }
};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  const $game = $('#game .row');
  const values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});
