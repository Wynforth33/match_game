const MatchGame = {};


/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  const $game = $('#game .row');
  const values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});



/*
  Generates and returns an array of matching card values.
 */
MatchGame.generateCardValues = function () {
  const possibleValues = [];
  const randomValues = [];
  for (var i = 1; i <= 8 ; i++){
    possibleValues.push(i);
    possibleValues.push(i);
  }
  while (possibleValues.length > 0) {
    const randomIndex = Math.floor(Math.random() * possibleValues.length);
    const randomValue = possibleValues.splice(randomIndex, 1);
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
  for (let i = 0; i < cardValues.length; i++){
    const cardValue = cardValues[i];
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
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */
MatchGame.flipCard = function($card, $game) {

};
