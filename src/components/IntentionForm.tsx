import { useState } from 'react';
import { Send, Heart, Users, MessageCircle, Info } from 'lucide-react';
import type { MissionType, FormData } from '../types';

interface IntentionFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}

export default function IntentionForm({ onSubmit, isSubmitting }: IntentionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    missionType: 'independance',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    schoolName: '',
    studentCount: undefined,
    message: '',
    donationAmount: undefined,
    donationFrequency: 'once',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const missions = [
    { id: 'independance' as MissionType, label: '🔓 Indépendance Numérique', icon: MessageCircle, description: 'Se libérer des Big Tech' },
    { id: 'responsabilite' as MissionType, label: '⚖️ Responsabilité Éthique', icon: Heart, description: 'Protéger les données' },
    { id: 'durabilite' as MissionType, label: '🌍 Durabilité Environnementale', icon: Users, description: 'Réduire l\'empreinte carbone' },
    { id: 'apprentissage' as MissionType, label: '📚 Apprentissage & Capacités', icon: Info, description: 'Former aux bonnes pratiques' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'Le prénom doit contenir au moins 2 caractères';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Le nom doit contenir au moins 2 caractères';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (formData.missionType === 'independance' && !formData.message?.trim()) {
      newErrors.message = 'Décrivez vos défis d\'indépendance numérique';
    }

    if (formData.missionType === 'responsabilite' && !formData.message?.trim()) {
      newErrors.message = 'Expliquez vos enjeux éthiques et de protection de données';
    }

    if (formData.missionType === 'durabilite' && !formData.message?.trim()) {
      newErrors.message = 'Détaillez vos objectifs de durabilité';
    }

    if (formData.missionType === 'apprentissage' && !formData.message?.trim()) {
      newErrors.message = 'Décrivez vos besoins de formation et montée en compétences';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleMissionChange = (missionType: MissionType) => {
    setFormData((prev) => ({
      ...prev,
      missionType,
      message: '',
    }));
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Rejoignez la Démarche NIRD</h2>
        <p className="text-gray-600">Choisissez votre pilier de transformation et commençons ensemble</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {missions.map((mission) => {
          const Icon = mission.icon;
          const isSelected = formData.missionType === mission.id;
          return (
            <button
              key={mission.id}
              type="button"
              onClick={() => handleMissionChange(mission.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-emerald-600' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${isSelected ? 'text-emerald-700' : 'text-gray-600'}`}>
                {mission.label}
              </span>
              <p className="text-xs text-gray-500 mt-1">{mission.description}</p>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone (optionnel)</label>
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="+33 6 12 34 56 78"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Établissement</label>
            <input
              type="text"
              value={formData.schoolName || ''}
              onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
              placeholder="Nom de votre école/collège/lycée"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre d'étudiants</label>
            <input
              type="number"
              value={formData.studentCount || ''}
              onChange={(e) => setFormData({ ...formData, studentCount: e.target.value ? parseInt(e.target.value) : undefined })}
              placeholder="Ex: 500"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {formData.missionType === 'independance' && 'Vos défis d\'indépendance numérique'}
            {formData.missionType === 'responsabilite' && 'Vos enjeux éthiques et de données'}
            {formData.missionType === 'durabilite' && 'Vos objectifs de durabilité'}
            {formData.missionType === 'apprentissage' && 'Vos besoins de formation'}
          </label>
          <textarea
            value={formData.message || ''}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            placeholder={
              formData.missionType === 'independance' ? 'Décrivez comment réduire votre dépendance aux géants du web...' :
              formData.missionType === 'responsabilite' ? 'Expliquez vos préoccupations éthiques et de protection de données...' :
              formData.missionType === 'durabilite' ? 'Partagez vos ambitions écologiques...' :
              'Décrivez les compétences que vous souhaitez développer...'
            }
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? (
          'Envoi en cours...'
        ) : (
          <>
            <Send className="w-5 h-5" />
            Rejoindre NIRD
          </>
        )}
      </button>
    </form>
  );
}
