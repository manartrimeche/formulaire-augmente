const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface FormSubmissionData {
  mission_type: string;
  first_name: string;
  last_name: string;
  email: string;
  Numero?: string;
  message?: string;
  school_name?: string;
  student_count?: number;
}

export const api = {
  // Create a new submission
  async createSubmission(data: FormSubmissionData) {
    const response = await fetch(`${API_BASE_URL}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    return response.json();
  },

  // Get all submissions
  async getAllSubmissions() {
    const response = await fetch(`${API_BASE_URL}/submissions`);

    if (!response.ok) {
      throw new Error('Failed to fetch submissions');
    }

    return response.json();
  },

  // Get a single submission by id
  async getSubmission(id: number) {
    const response = await fetch(`${API_BASE_URL}/submissions/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch submission');
    }

    return response.json();
  },

  // Delete a submission
  async deleteSubmission(id: number) {
    const response = await fetch(`${API_BASE_URL}/submissions/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete submission');
    }

    return response.json();
  },

  // Health check
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  },
};
