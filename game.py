from __future__ import print_function
import random

deck = ["apple"] * 40
hand = []


def shuffleDeck(deck):
    return random.shuffle(deck)


def addCardBackToDeck(deck, hand, card):
    deck.append(card)
    return [i for i in hand if i != card]


def drawCard(deck, hand):
    hand.append(deck.pop())


def addCardToHand(hand, card):
    hand.append(card)


def drawInitialHand(deck, hand):
    for _ in range(5):
        hand.append(deck.pop())


def showHand(hand):
    print("Hand: ", end="")
    for i in range(len(hand)):
        if i != len(hand) - 1:
            print(hand[i], end=", ")
        else:
            print(hand[i], end="")
    print()


def getDeckSize(deck):
    print("Deck size: " + str(len(deck)))


def removeCardFromHand(hand, card):
    return [i for i in hand if i != card]


def putCardOnField(hand, card):
    return [i for i in hand if i != card]

print("Welcome to Zookeeper!")
print("What do you want to do?")


while True:
    print("-" * 40)
    showHand(hand)
    getDeckSize(deck)
    what = str(raw_input("""
    draw (D)
    draw initial hand (H)
    shuffle (S)
    add card to hand (via effect) (AH)
    add card back to deck (via effect) (AD)
    put card on field (P)
    remove card from hand (R) (same effect as P)
    > """))
    
    if what == "D":
        drawCard(deck, hand)
    elif what == "H":
        drawInitialHand(deck, hand)
    elif what == "S":
        deck = shuffleDeck(deck)
        print("Deck shuffled.")
    elif what == "AH":
        card = str(raw_input("What is the card? : "))
        addCardToHand(hand, card)
    elif what == "AD":
        card = str(raw_input("What is the card? : "))
        addCardToDeck(hand, card)
    elif what == "P":
        card = str(raw_input("What is the card? : "))
        hand = putCardOnField(hand, card)
    elif what == "R":
        card = str(raw_input("What is the card? : "))
        hand = removeCardFromHand(hand, card)
    else:
        print("Action does not exist. Try again.")
