import { makeWords } from './makeWords';

export const animals = makeWords('animals', {
  easy: ['Elephant', 'Lion', 'Tiger', 'Monkey', 'Dog', 'Cat', 'Horse', 'Cow', 'Rabbit', 'Penguin', 'Duck', 'Frog', 'Fish', 'Bird', 'Pig', 'Sheep', 'Goat', 'Bear', 'Donkey', 'Snake'],
  medium: ['Giraffe', 'Crocodile', 'Kangaroo', 'Peacock', 'Camel', 'Zebra', 'Panda', 'Dolphin', 'Whale', 'Shark', 'Owl', 'Parrot', 'Butterfly', 'Bat', 'Hippo', 'Rhino', 'Cheetah', 'Squirrel', 'Eagle', 'Turtle'],
  hard: [
    'Chameleon', 'Octopus', 'Sloth', 'Scorpion', 'Flamingo', 'Koala', 'Woodpecker', 'Seahorse', 'Armadillo', 'Praying mantis',
    'Axolotl', 'Aye-aye', 'Pangolin', 'Quokka', 'Narwhal', 'Platypus', 'Capybara', 'Okapi', 'Saiga antelope',
    'Shoebill', 'Kakapo', 'Mantis shrimp', 'Gharial', 'Tarsier', 'Echidna', 'Fossa', 'Blue-footed booby', 'Blobfish',
  ],
});
