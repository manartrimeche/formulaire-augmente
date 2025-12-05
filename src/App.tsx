import { useState } from 'react';
import { Rocket } from 'lucide-react';
import IntentionForm from './components/IntentionForm';
import ConfirmationPage from './components/ConfirmationPage';
import { api } from './lib/api';
import type { FormData } from './types';

type AppState = 'form' | 'confirmation';

function App() {
  const [appState, setAppState] = useState<AppState>('form');
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await api.createSubmission({
        mission_type: data.missionType,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        Numero: data.Numero,
        message: data.message,
        school_name: data.schoolName,
        student_count: data.studentCount,
      });

      console.log('Submission successful:', response);
      setSubmittedData(data);
      setAppState('confirmation');
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      alert(`Erreur: ${errorMessage}. Veuillez vérifier votre connexion et réessayer.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewSubmission = () => {
    setAppState('form');
    setSubmittedData(null);
  };

  if (appState === 'confirmation' && submittedData) {
    return <ConfirmationPage formData={submittedData} onNewSubmission={handleNewSubmission} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-6">
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Rocket className="w-12 h-12 text-emerald-600" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Démarche NIRD
          </h1>
        </div>
        <p className="text-xl text-gray-700 font-light">
         Numérique Indépendant, Responsable et Durable<br/>
          <span className="text-sm text-gray-600">Aidez votre établissement à se libérer des Big Tech</span>
        </p>
      </div>

      <IntentionForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />

      <div className="max-w-4xl mx-auto mt-12 text-center">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Les 4 Piliers de la Transformation Numérique
          </h3>
          <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-emerald-500">
              <p className="font-bold">Indépendance</p>
              <p className="text-xs mt-1">Moins dépendre des géants du web</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-teal-500">
              <p className="font-bold">Responsabilité</p>
              <p className="text-xs mt-1">Données et éthique numérique</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
              <p className="font-bold">Durabilité</p>
              <p className="text-xs mt-1">Impact environnemental réduit</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-lime-500">
              <p className="font-bold">Apprentissage</p>
              <p className="text-xs mt-1">Capacités et connaissances</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
