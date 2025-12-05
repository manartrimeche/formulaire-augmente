export type MissionType = 'independance' | 'responsabilite' | 'durabilite' | 'apprentissage';

export interface FormData {
  missionType: MissionType;
  firstName: string;
  lastName: string;
  email: string;
  Numero?: string;
  message?: string;
  schoolName?: string;
  studentCount?: number;
  donationAmount?: number;
  donationFrequency?: 'once' | 'monthly' | 'yearly';
}

export interface Submission {

  _id: string;
  mission_type: MissionType;
  first_name: string;
  last_name: string;
  email: string;
  Numero?: string;
  message?: string;
  school_name?: string;
  student_count?: number;
  createdAt: string;
  updatedAt: string;
}