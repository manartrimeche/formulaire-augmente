const getAPIBaseUrl = () => {
  // En production sur Vercel
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return '/api';
  }
  // En développement local
  return import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
};

const API_BASE_URL = getAPIBaseUrl();

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
    try {
      const url = `${API_BASE_URL}/submissions`;
      console.log('API URL:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur ${response.status}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
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
