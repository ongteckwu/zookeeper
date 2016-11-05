// requires utils.js

Crafty.c("CardSlotBorder", {
    init: function() {
        this.addComponent("2D, Canvas, Color");
        this.color("white");
    },

    size: function(w, h) {
        this.w = w - 2;
        this.h = h - 2;
        return this;
    },

    place: function(x, y) {
        this.x = x;
        this.y = y;
        // method chaining
        return this;
    }
})

Crafty.c("CardSlot", {
    init: function() {
        this.addComponent("2D, Canvas, Color");
        this.color("black");
    },

    size: function(w, h) {
        this.w = w + 2;
        this.h = h + 2;
        return this;
    },

    place: function(x, y) {
        this.cardSlotBorder = Crafty.e("CardSlotBorder")
                                .size(this.w, this.h)
                                .place(x+1, y+1);
        this.x = x;
        this.y = y;
        // method chaining
        return this;
    },

    setInnerColor: function(color) {
        this.cardSlotBorder.color(color);
    }
})

Crafty.c("Button", {
    required: '2D, Canvas, Color, Mouse',
    makeText: function(text) {
        var textField = Crafty.e('2D, DOM, Text')
          .attr({
            x: this.x + 10,
            y: this.y
          });
        textField.text(text);
        return this;
    } 

})

Crafty.c("DeckBorder", {
    init: function() {
        this.addComponent("2D, Canvas, Color");
        this.color("green");
    },

    size: function(w, h) {
        this.w = w - 2;
        this.h = h - 2;
        return this;
    },

    place: function(x, y) {
        this.x = x;
        this.y = y;
        // method chaining
        return this;
    }
})

Crafty.c("Deck", {
    init: function() {
        this.cardSlotBorder = Crafty.e("DeckBorder");
        this.addComponent("2D, Canvas, Color");
        this.color("black");
    },

    putDeck: function(deck) {
        this.deck = deck;
        return this;
    },

    putHand: function(hand) {
        this.hand = hand;
        return this;
    },

    size: function(w, h) {
        this.w = w + 2;
        this.h = h + 2;
        return this;
    },

    deckSize: function(deckSize) {
        this.w = this.cardSlotBorder.w + deckSize / 3;
        this.h = this.cardSlotBorder.h + 3;
        return this;
    },

    place: function(x, y) {
        this.cardSlotBorder
        .size(this.w - 2, this.h - 2)
        .place(x+1, y+1);
        this.x = x;
        this.y = y;
        var textField = Crafty.e('2D, DOM, Text')
          .attr({
            x: this.x + this.w/2.3,
            y: this.y + this.h/2.8
          });
        this.textField = textField
            .textFont({ size: '20px', weight: 'bold' })
            .text(parseInt(this.deck.length));
        // method chaining
        return this;
    },

    addCard: function(card) {
        this.deck.push(card);
        this.textField.text(parseInt(this.deck.length));
    },

    events: {
        MouseUp: function() {
            // draw a card
            hand.push(this.deck.pop());
        }
        
    },
    // ** Functionalities **

    shuffleDeck: function() {
        this.deck = shuffle(this.deck);
    }
})

Crafty.c("BackCard", {
    required: "2D, Canvas, Color, Collision, Draggable",
    size: function(w, h) {
        this.w = w;
        this.h = h;
        return this;
    },

    place: function(x, y) {
        this.x = x;
        this.y = y;
        // method chaining
        return this;
    },

    unplace: function() {
        this.x = null;
        this.y = null;
        return this;
    },

    events: {
        // MouseUp: function() {
        //     // draw a card
        //     hand.push(this.deck.pop());
        // }
        
    }
    // ** Functionalities **
})

Crafty.c("Card", {
    required: "2D, DOM, Image, Collision, Draggable",
    putHand: function(hand) {
        this.hand = hand;
        return this;
    },

    size: function(w, h) {
        this.w = w;
        this.h = h;
        return this;
    },

    place: function(x, y) {
        this.x = x;
        this.y = y;
        // method chaining
        return this;
    },

    unplace: function() {
        this.x = 5000;
        this.y = 5000;
        return this;
    },

    events: {
        // MouseUp: function() {
        //     // draw a card
        //     hand.push(this.deck.pop());
        // }
        
    }
    // ** Functionalities **
})


