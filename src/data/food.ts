import { makeWords } from './makeWords';

export const food = makeWords('food', {
  easy: ['Pizza', 'Burger', 'Vada Pav', 'Dosa', 'Samosa', 'Ice Cream', 'Mango', 'Idli', 'Banana', 'Apple', 'Chai', 'Roti', 'French Fries', 'Sandwich', 'Maggi', 'Chocolate', 'Watermelon', 'Popcorn', 'Cake', 'Paratha'],
  medium: ['Pav Bhaji', 'Biryani', 'Pani Puri', 'Masala Dosa', 'Jalebi', 'Gulab Jamun', 'Modak', 'Chole Bhature', 'Dhokla', 'Rasgulla', 'Bhel Puri', 'Pakora', 'Butter Chicken', 'Naan', 'Lassi', 'Kulfi', 'Upma', 'Poha', 'Dal Baati', 'Rajma Chawal'],
  hard: [
    'Sev Puri', 'Misal Pav', 'Puran Poli', 'Thepla', 'Aloo Tikki Chaat', 'Litti Chokha', 'Kaju Katli', 'Ras Malai', 'Sabudana Khichdi', 'Hyderabadi Haleem',
    'Nihari', 'Appam with stew', 'Kothu parotta', 'Mysore pak', 'Pakhala bhata', 'Khar', 'Undhiyu', 'Mangalore buns',
    'Bebinca', 'Momos with thukpa', 'Galouti kebab', 'Bisi bele bath', 'Chakhao kheer', 'Sarson da saag', 'Kashmiri gushtaba',
    'Pesarattu', 'Makki di roti', 'Dhuska',
  ],
});
