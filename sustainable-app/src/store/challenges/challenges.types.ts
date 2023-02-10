import {Model} from '../store.types';

export interface ChallengeState {
  globalChallenges: GlobalChallenge[]
}

export interface Challenge extends GlobalChallenge {
    alarm_time: Date;
    alarm_day: string;
    startDate: Date;
    endDate: Date;
    goal: number;
    unit: string;
}

export interface GlobalChallenge extends Model {
    name: string;
    category: string;
    measurable: boolean;
    color: string;
    frequency: number;
    note: string;
    question: string;
}
