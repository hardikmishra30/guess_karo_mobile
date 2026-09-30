import { makeWords } from './makeWords';

export const heroes = makeWords('heroes', {
  easy: ['Shah Rukh Khan', 'Salman Khan', 'Aamir Khan', 'Akshay Kumar', 'Amitabh Bachchan', 'Ajay Devgn', 'Hrithik Roshan', 'Ranbir Kapoor', 'Ranveer Singh', 'Rajinikanth'],
  medium: ['Allu Arjun', 'Prabhas', 'Ram Charan', 'Jr NTR', 'Vicky Kaushal', 'Kartik Aaryan', 'Varun Dhawan', 'Tiger Shroff', 'Sunil Shetty', 'Sanjay Dutt', 'Govinda', 'Anil Kapoor', 'Dharmendra', 'Kamal Haasan', 'Mahesh Babu', 'Shahid Kapoor'],
  hard: ['Ayushmann Khurrana', 'Rajkummar Rao', 'Nawazuddin Siddiqui', 'Pankaj Tripathi', 'Irrfan Khan', 'Rajesh Khanna', 'Dev Anand', 'Raj Kapoor'],
});
