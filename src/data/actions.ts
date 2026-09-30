import { makeWords } from './makeWords';

export const actions = makeWords('actions', {
  easy: ['Brushing teeth', 'Swimming', 'Sleeping', 'Dancing', 'Cooking', 'Driving', 'Running', 'Crying', 'Laughing', 'Singing', 'Eating', 'Drinking water', 'Walking', 'Jumping', 'Clapping', 'Sneezing', 'Yawning', 'Reading a book', 'Talking on phone', 'Washing hands'],
  medium: ['Taking a selfie', 'Playing cricket', 'Playing football', 'Riding a bicycle', 'Going to the gym', 'Opening an umbrella', 'Playing guitar', 'Painting a wall', 'Ironing clothes', 'Milking a cow', 'Sweeping the floor', 'Playing carrom', 'Flying a kite', 'Taking a bath', 'Combing hair', 'Climbing a tree', 'Boxing', 'Bowling', 'Playing badminton', 'Doing yoga'],
  hard: [
    'Flying an airplane', 'Being a superhero', 'Fighting a monster', 'Walking a tightrope', 'Being a robot', 'Skydiving', 'Photographing a wedding', 'Cutting onions', 'Riding a roller coaster', 'Catching a mosquito',
    'Parallel parking', 'Defusing a pretend bomb', 'Escaping a maze', 'Decoding a secret message', 'Performing a magic trick', 'Building furniture without instructions',
    'Negotiating at a flea market', 'Conducting an orchestra', 'Walking on the moon', 'Training a guide dog', 'Searching for buried treasure', 'Making pottery on a wheel',
    'Directing a film scene', 'Repairing a punctured bicycle', 'Trying to catch a runaway balloon', 'Competing in a cooking show', 'Translating ancient hieroglyphics', 'Sneaking past a laser maze',
  ],
});
