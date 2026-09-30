import { makeWords } from './makeWords';

// Entries are only for the guessing game. Edit freely.
export const politicians = makeWords('politicians', {
  easy: ['Narendra Modi', 'Rahul Gandhi', 'Amit Shah', 'Arvind Kejriwal', 'Mamata Banerjee', 'Yogi Adityanath', 'Indira Gandhi', 'Jawaharlal Nehru', 'Sardar Patel'],
  medium: ['Sonia Gandhi', 'Manmohan Singh', 'Atal Bihari Vajpayee', 'Nitin Gadkari', 'Rajnath Singh', 'Nirmala Sitharaman', 'Smriti Irani', 'Uddhav Thackeray', 'Devendra Fadnavis', 'Sharad Pawar', 'Akhilesh Yadav', 'Lalu Prasad Yadav', 'Nitish Kumar', 'Priyanka Gandhi', 'Mayawati'],
  hard: ['S. Jaishankar', 'Eknath Shinde', 'Bhagwant Mann', 'M. K. Stalin', 'Lal Bahadur Shastri'],
});
