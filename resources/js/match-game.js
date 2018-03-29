const MatchGame = {};
let flippedCards = [];
/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/



/*
  Generates and returns an array of matching card values.
 */
MatchGame.generateCardValues = function () {
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
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/
MatchGame.renderCards = function(cardValues, $game) {
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
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */


MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped')) {
    return;
  }
  $card.css('background-color', $card.data('color'))
  .text($card.data('value'))
  .data('isFlipped', true);
  flippedCards.push($card);
  if (flippedCards.length === 2) {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
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
    flippedCards = [];
  }
};

$(document).ready(function() {
  const $game = $('#game .row');
  const values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});
