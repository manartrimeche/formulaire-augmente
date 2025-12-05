import { useState, useEffect } from 'react';
import { Send, Heart, Users, MessageCircle, Info, Sparkles, Shield, Zap } from 'lucide-react';
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
    Numero: '',
    schoolName: '',
    studentCount: undefined,
    message: '',
    donationAmount: undefined,
    donationFrequency: 'once',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [formStrength, setFormStrength] = useState(0);
  const [showSuccess, setShowSuccess] = useState<Record<string, boolean>>({});
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiScore, setAiScore] = useState<{ quality: number; completeness: number; relevance: number } | null>(null);

  const missions = [
    { id: 'independance' as MissionType, label: ' Indépendance Numérique', icon: MessageCircle, description: 'Se libérer des Big Tech', color: 'emerald' },
    { id: 'responsabilite' as MissionType, label: ' Responsabilité Éthique', icon: Heart, description: 'Protéger les données', color: 'teal' },
    { id: 'durabilite' as MissionType, label: ' Durabilité Environnementale', icon: Users, description: 'Réduire l\'empreinte carbone', color: 'green' },
    { id: 'apprentissage' as MissionType, label: ' Apprentissage & Capacités', icon: Info, description: 'Former aux bonnes pratiques', color: 'lime' },
  ];

  // Calcul intelligent de la force du formulaire
  useEffect(() => {
    let strength = 0;
    if (formData.firstName.length >= 2) strength += 15;
    if (formData.lastName.length >= 2) strength += 15;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) strength += 20;
    if (formData.Numero) strength += 10;
    if (formData.schoolName) strength += 15;
    if (formData.studentCount && formData.studentCount > 0) strength += 10;
    if (formData.message && formData.message.length >= 20) strength += 15;
    
    setFormStrength(strength);
  }, [formData]);

  // Analyse IA du message en temps réel
  useEffect(() => {
    if (formData.message && formData.message.length >= 10) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        if (formData.message) {
          analyzeMessageWithAI(formData.message, formData.missionType);
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setAiSuggestions([]);
      setAiScore(null);
      setIsAnalyzing(false);
    }
  }, [formData.message, formData.missionType]);

  const analyzeMessageWithAI = (message: string, missionType: MissionType) => {
    const words = message.toLowerCase().split(/\s+/);
    const sentences = message.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    const keywordsByMission = {
      independance: ['google', 'microsoft', 'open source', 'souveraineté', 'alternative', 'libre', 'propriétaire', 'dépendance'],
      responsabilite: ['rgpd', 'données', 'consentement', 'protection', 'éthique', 'confidentialité', 'sécurité', 'vie privée'],
      durabilite: ['carbone', 'énergie', 'écologique', 'recyclage', 'durable', 'environnement', 'vert', 'sobriété'],
      apprentissage: ['formation', 'compétences', 'certifications', 'ateliers', 'accompagnement', 'pédagogie', 'apprentissage', 'développement']
    };

    const relevantKeywords = keywordsByMission[missionType];
    const foundKeywords = words.filter(word => 
      relevantKeywords.some(kw => word.includes(kw) || kw.includes(word))
    );

    const quality = Math.min(100, (sentences.length * 15) + (words.length * 2));
    const completeness = Math.min(100, (words.length / 30) * 100);
    const relevance = Math.min(100, (foundKeywords.length / relevantKeywords.length) * 100 + 20);

    setAiScore({ quality, completeness, relevance });

    const suggestions: string[] = [];
    
    if (foundKeywords.length === 0) {
      suggestions.push(`💡 Mentionnez des concepts clés comme "${relevantKeywords.slice(0, 3).join('", "')}" pour enrichir votre message`);
    }
    
    if (words.length < 20) {
      suggestions.push('Développez davantage vos idées pour un message plus convaincant');
    }
    
    if (sentences.length === 1 && words.length > 15) {
      suggestions.push('Structurez votre message en plusieurs phrases pour plus de clarté');
    }
    
    if (!message.includes('?') && missionType === 'apprentissage') {
      suggestions.push(' N\'hésitez pas à poser des questions sur les formations disponibles');
    }
    
    if (foundKeywords.length >= 3) {
      suggestions.push(' Excellent ! Votre message est très pertinent pour cette mission');
    }
    
    if (quality >= 80 && completeness >= 70 && relevance >= 60) {
      suggestions.push(' Message de qualité exceptionnelle ! L\'IA valide votre candidature');
    }

    setAiSuggestions(suggestions);
    setIsAnalyzing(false);
  };

  const getMissionInsights = (missionType: MissionType) => {
    const insights = {
      independance: {
        tip: 'Conseil IA : Décrivez les outils Big Tech que vous souhaitez remplacer',
        keywords: ['Google Workspace', 'Microsoft 365', 'alternatives open-source', 'souveraineté']
      },
      responsabilite: {
        tip: 'Conseil IA : Mentionnez vos préoccupations en matière de RGPD',
        keywords: ['RGPD', 'consentement', 'protection des données', 'éthique']
      },
      durabilite: {
        tip: 'Conseil IA : Parlez de vos objectifs de réduction carbone',
        keywords: ['empreinte carbone', 'énergie verte', 'recyclage', 'sobriété numérique']
      },
      apprentissage: {
        tip: 'Conseil IA : Précisez les compétences à développer',
        keywords: ['formation', 'certifications', 'ateliers', 'accompagnement']
      }
    };
    return insights[missionType];
  };

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

  const handleFieldChange = (field: keyof FormData, value: string | number | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouchedFields(prev => new Set(prev).add(field));
    
    if (touchedFields.has(field)) {
      validateField(field, value);
    }
  };

  const validateField = (field: keyof FormData, value: any) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'firstName':
      case 'lastName':
        if (!value || value.trim().length < 2) {
          newErrors[field] = 'Au moins 2 caractères requis';
        } else {
          delete newErrors[field];
          setShowSuccess(prev => ({ ...prev, [field]: true }));
          setTimeout(() => setShowSuccess(prev => ({ ...prev, [field]: false })), 2000);
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Email invalide';
        } else {
          delete newErrors.email;
          setShowSuccess(prev => ({ ...prev, email: true }));
          setTimeout(() => setShowSuccess(prev => ({ ...prev, email: false })), 2000);
        }
        break;
      case 'message':
        if (value && value.trim().length < 10) {
          newErrors.message = 'Au moins 10 caractères pour un message significatif';
        } else {
          delete newErrors.message;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const currentMissionInsights = getMissionInsights(formData.missionType);

  const handleMissionChange = (missionType: MissionType) => {
    setFormData((prev) => ({
      ...prev,
      missionType,
      message: '',
    }));
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
      {/* Effet de particules animées */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-400/10 to-lime-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="mb-8 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              Rejoignez la Démarche NIRD
            </h2>
            <p className="text-gray-600">Portail d'Intention Intelligent • Année 2025</p>
          </div>
          {formStrength > 0 && (
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-gray-700">Force du profil</span>
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    formStrength >= 80 ? 'bg-green-500' :
                    formStrength >= 50 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${formStrength}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">{formStrength}%</span>
            </div>
          )}
        </div>
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
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              Prénom
              {showSuccess.firstName && <Zap className="w-4 h-4 text-green-500 animate-bounce" />}
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleFieldChange('firstName', e.target.value)}
                onBlur={() => validateField('firstName', formData.firstName)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                  errors.firstName ? 'border-red-500 shake' : 
                  showSuccess.firstName ? 'border-green-500' :
                  'border-gray-300'
                }`}
              />
              {showSuccess.firstName && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                </div>
              )}
            </div>
            {errors.firstName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">⚠️ {errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              Nom
              {showSuccess.lastName && <Zap className="w-4 h-4 text-green-500 animate-bounce" />}
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleFieldChange('lastName', e.target.value)}
                onBlur={() => validateField('lastName', formData.lastName)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                  errors.lastName ? 'border-red-500' : 
                  showSuccess.lastName ? 'border-green-500' :
                  'border-gray-300'
                }`}
              
              />
              {showSuccess.lastName && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                </div>
              )}
            </div>
            {errors.lastName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">⚠️ {errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            Email
            {showSuccess.email && <Zap className="w-4 h-4 text-green-500 animate-bounce" />}
          </label>
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              onBlur={() => validateField('email', formData.email)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                errors.email ? 'border-red-500' : 
                showSuccess.email ? 'border-green-500' :
                'border-gray-300'
              }`}
            />
            {showSuccess.email && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              </div>
            )}
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">⚠️ {errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone (optionnel)</label>
          <input
            type="number"
            value={formData.Numero || ''}
            onChange={(e) => setFormData({ ...formData, Numero: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="+216 12 345 678"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Panneau d'insights intelligent IA */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-300/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="flex items-start gap-3 relative z-10">
            <Sparkles className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0 animate-pulse" />
            <div className="flex-1">
              
              <div className="flex flex-wrap gap-2">
                {currentMissionInsights.keywords.map((keyword, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const currentMessage = formData.message || '';
                      if (!currentMessage.toLowerCase().includes(keyword.toLowerCase())) {
                        handleFieldChange('message', currentMessage + (currentMessage ? ' ' : '') + keyword);
                      }
                    }}
                    className="text-xs bg-white px-3 py-1 rounded-full text-blue-700 border border-blue-200 hover:bg-blue-100 hover:scale-105 transition-all cursor-pointer"
                  >
                    + {keyword}
                  </button>
                ))}
              </div>
            </div>
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
            onChange={(e) => handleFieldChange('message', e.target.value)}
            onBlur={() => validateField('message', formData.message)}
            rows={5}
            placeholder={
              formData.missionType === 'independance' ? 'Décrivez comment réduire votre dépendance aux géants du web...' :
              formData.missionType === 'responsabilite' ? 'Expliquez vos préoccupations éthiques et de protection de données...' :
              formData.missionType === 'durabilite' ? 'Partagez vos ambitions écologiques...' :
              'Décrivez les compétences que vous souhaitez développer...'
            }
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">⚠️ {errors.message}</p>}
          {formData.message && formData.message.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {formData.message.length} caractères • {formData.message.length >= 20 ? '✅ Message détaillé' : '💡 Ajoutez plus de détails'}
            </p>
          )}
        </div>

        {/* Analyse IA en temps réel */}
        {isAnalyzing && (
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 fade-in">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-3 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-purple-800 font-medium">🤖 IA en train d'analyser votre message...</span>
            </div>
          </div>
        )}

        {/* Scores IA */}
        {aiScore && !isAnalyzing && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4 fade-in">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold text-purple-900">Analyse IA de votre message</h4>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">{Math.round(aiScore.quality)}%</div>
                <div className="text-xs text-gray-600 mt-1">Qualité</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-pink-600">{Math.round(aiScore.completeness)}%</div>
                <div className="text-xs text-gray-600 mt-1">Complétude</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-indigo-600">{Math.round(aiScore.relevance)}%</div>
                <div className="text-xs text-gray-600 mt-1">Pertinence</div>
              </div>
            </div>
            {aiSuggestions.length > 0 && (
              <div className="space-y-2">
                {aiSuggestions.map((suggestion, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-2 text-sm text-gray-700 flex items-start gap-2">
                    <span className="flex-shrink-0">{suggestion.split(' ')[0]}</span>
                    <span>{suggestion.substring(suggestion.indexOf(' ') + 1)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Indicateur de progression */}
      {formStrength > 0 && formStrength < 100 && (
        <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 fade-in">
          <p className="text-sm text-yellow-800 flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span>
              {formStrength < 50 && 'Ajoutez plus d\'informations pour renforcer votre candidature'}
              {formStrength >= 50 && formStrength < 80 && 'Bon départ ! Quelques détails supplémentaires optimiseront votre profil'}
              {formStrength >= 80 && 'Excellent ! Votre profil est presque complet'}
            </span>
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || formStrength < 40}
        className={`w-full mt-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl relative overflow-hidden ${
          formStrength >= 80 ? 'pulse-glow' : ''
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Transmission en cours...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {formStrength >= 80 ? ' Lancer la Mission NIRD !' : 'Rejoindre NIRD'}
          </>
        )}
        {formStrength >= 80 && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
        )}
      </button>

      {formStrength < 40 && formStrength > 0 && (
        <p className="text-xs text-gray-500 text-center mt-2">
          Complétez les champs essentiels pour activer le portail
        </p>
      )}
    </form>
  );
}
