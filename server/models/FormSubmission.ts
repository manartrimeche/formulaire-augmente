import mongoose, { Document, Schema } from 'mongoose';

export interface IFormSubmission extends Document {
  mission_type: 'independance' | 'responsabilite' | 'durabilite' | 'apprentissage';
  first_name: string;
  last_name: string;
  email: string;
  Numero?: string;
  message?: string;
  school_name?: string;
  student_count?: number;
  created_at: Date;
}

const FormSubmissionSchema = new Schema<IFormSubmission>({
  mission_type: {
    type: String,
    required: true,
    enum: ['independance', 'responsabilite', 'durabilite', 'apprentissage'],
  },
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  Numero: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
  school_name: {
    type: String,
    trim: true,
  },
  student_count: {
    type: Number,
    min: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Submission = mongoose.model<IFormSubmission>('Submission', FormSubmissionSchema);
