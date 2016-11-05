$(document).ready(function() {
  Crafty.init(2000,2000, document.getElementById('game'));

  var WIDTH = 80;
  var HEIGHT = 90;
  var INIT_TOP = 15;
  var INIT_LEFT = 15;
  OTHER_LEFT = WIDTH * 9.5;

  var yourOpponentDeck = Crafty.e("Deck")
    .putDeck([])
    .size(WIDTH, HEIGHT)
    .place(INIT_LEFT, INIT_TOP)
    .deckSize(30);

  var myEntity1 = Crafty.e("Button")
   .attr({x: INIT_LEFT + 15, y: INIT_TOP + 5 + HEIGHT , w:50, h:25, z:1 })
   .makeText('END TURN')
   .color('pink')
   .bind('MouseUp',function(e){ alert('big black box was touched', e); });

  deck2 = []
  for (var i=0; i<20; i++) {
    deck2.push(Crafty.e("Card")
                    .image("images/test_monkey.jpg")
                    .size(WIDTH, HEIGHT)
                    .place(OTHER_LEFT + (WIDTH + 5) * i, HEIGHT*4.5)
                    .onHit("Deck", function(obj) {
                      var deck = Crafty(obj[0].obj[0]);
                      deck.hand.removeCard()
                      deck.addCard(this);
                      this.unplace()
                          .stopDrag();
                    }))
  }
  var yourDeck = Crafty.e("Deck")
    .putDeck([])
    .size(WIDTH, HEIGHT)
    .place(80 + 8*WIDTH, 10 + 6*HEIGHT)
    .deckSize(30);
  
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 7; j++) {
      // zookeeper layer trimming
      if ((j == 0 || j == 6) && [1,2,4,5].includes(i)) {
        continue;
      }
      //  battlefield layer
      else if ((j == 2 || j == 4) && (i >= 1 && i <= 5)) {
        Crafty.e("CardSlot")
        .size(WIDTH, HEIGHT)
        .place(INIT_LEFT + 35 + WIDTH+i*WIDTH, INIT_TOP+j*HEIGHT)
        .setInnerColor("red");
      }
      // farm layer
      else if ((j == 1 || j == 5) && (i >= 1 && i <= 5)) {
        Crafty.e("CardSlot")
        .size(WIDTH, HEIGHT)
        .place(INIT_LEFT + 35 + WIDTH+i*WIDTH, INIT_TOP+j*HEIGHT)
        .setInnerColor("brown");
      }      
      // bottom zookeeper 
      else if (j == 6 && i == 3) {
        Crafty.e("CardSlot")
          .size(WIDTH-1, HEIGHT)
          .place(INIT_LEFT + 35 + WIDTH+i*WIDTH, INIT_TOP+j*HEIGHT+1);
      }
      else {
        Crafty.e("CardSlot")
          .size(WIDTH, HEIGHT)
          .place(INIT_LEFT + 35 + WIDTH+i*WIDTH, INIT_TOP+j*HEIGHT);
      }
    }
  }

  // initialize decks
  // on deck touch, draw a card
  var textField = Crafty.e('2D, DOM, Text')
          .attr({
            x: WIDTH*11.5,
            y: INIT_TOP,
            w: 1000
          })
          .text("YOUR OPPONENT'S HAND")
          .textFont({ size: '20px', weight: 'bold' });

  var textField = Crafty.e('2D, DOM, Text')
          .attr({
            x: WIDTH*12.5,
            y: HEIGHT*7-15,
            w: 1000
          })
          .text("YOUR HAND")
          .textFont({ size: '20px', weight: 'bold' });

  var handPrototype = {
    addCard: function(card) {
      this.push(card);
      card.place(OTHER_LEFT + (WIDTH + 5) * i, HEIGHT * 5.5)
    },

    removeCard: function(card) {
      this.pop(card);
    }
  }

  var yourHand = [];
  yourHand.prototype = handPrototype;
  yourDeck.putHand(yourHand);

  for (var i = 0; i < 1; i++) {
    // yourHand.push()
  }

    var yourOpponentHand = [];
  for (var i = 0; i < 7; i++) {
    yourOpponentHand.push(Crafty.e("BackCard")
                    .color("green")
                    .size(WIDTH, HEIGHT)
                    .place(OTHER_LEFT + (WIDTH + 5) * i, HEIGHT)
                    )
  }
})