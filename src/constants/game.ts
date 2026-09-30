import { Difficulty } from '../data/types';

export const TIMER_OPTIONS = [30, 60, 90, 120];
export const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];
export const DEFAULT_TIMER = 60;
export const GET_READY_SECONDS = 3;
export const WARNING_SECONDS = 10;
export const TICK_SECONDS = 5;
/** If a difficulty filter leaves fewer words than this, all words are used instead. */
export const MIN_POOL_SIZE = 15;
