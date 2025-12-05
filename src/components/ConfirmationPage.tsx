import { CheckCircle, Sparkles, Rocket, MessageCircle, Heart, Users, Info, Calendar } from 'lucide-react';
import type { FormData } from '../types';

interface ConfirmationPageProps {
  formData: FormData;
  onNewSubmission: () => void;
}

export default function ConfirmationPage({ formData, onNewSubmission }: ConfirmationPageProps) {
  const currentYear = new Date().getFullYear();

  const getIconForMission = () => {
    switch (formData.missionType) {
      case 'independance':
        return <MessageCircle className="w-16 h-16 text-emerald-500" />;
      case 'responsabilite':
        return <Heart className="w-16 h-16 text-teal-500" />;
      case 'durabilite':
        return <Users className="w-16 h-16 text-green-500" />;
      case 'apprentissage':
        return <Info className="w-16 h-16 text-lime-500" />;
      default:
        return <Rocket className="w-16 h-16 text-emerald-500" />;
    }
  };

  const getPersonalizedMessage = () => {
    switch (formData.missionType) {
      case 'independance':
        return {
          title: `Salutations, ${formData.firstName} ! 👋`,
          subtitle: 'Ton message a bien été acheminé vers nos serveurs centraux 📡',
          message: `Bravo pour ton engagement envers l'indépendance numérique ! Ton demande de nous aider à libérer ton établissement des Big Tech a été enregistrée avec succès. Nos "Agents de Support" 🕵️ te répondront sous peu avec un plan d'action personnalisé.`,
          impact: 'Ensemble, libérons nos écoles des géants du web pour une numérique plus libre et responsable.',
          annualGoal: `🏆 Objectif NIRD ${currentYear} : Accompagner 50 établissements vers l'indépendance numérique`,
          yearMention: `Ton soutien en ${currentYear} est crucial pour notre progression ! 📈`,
          followUp: `Reste connecté pour suivre nos exploits tout au long de l'année ${currentYear} !`,
        };
      case 'responsabilite':
        return {
          title: `Un immense 'GG', ${formData.firstName} ! 🏆`,
          subtitle: 'Merci pour ton engagement éthique 💙',
          message: `Ton établissement souhaite mettre en place une gouvernance éthique du numérique. Nous avons noté ton engagement pour la protection des données et la responsabilité éthique. Nos experts te proposeront bientôt des solutions robustes pour sécuriser les données de ton établissement.`,
          impact: `Objectif NIRD : Mettre en place une gouvernance éthique du numérique dans 100 établissements`,
          annualGoal: `🔐 En ${currentYear}, nous travaillons à protéger les données de 10 000+ étudiants`,
          yearMention: `Grâce à toi, nous pouvons avancer sur le projet de sécurisation des données cette année ${currentYear}`,
          followUp: `Suis notre progression vers un numérique plus éthique et responsable tout au long de l'année ${currentYear} !`,
        };
      case 'durabilite':
        return {
          title: `Merci pour ton engagement écologique, ${formData.firstName} ! 🌱`,
          subtitle: 'Pour une planète plus verte 🌍',
          message: `Ton école souhaite réduire son empreinte numérique et environnementale. Nous avons bien reçu ta demande et nous allons te proposer des actions concrètes pour une transition durable. Ensemble, transformons le numérique éducatif !`,
          impact: `Réduire de 40% l'empreinte carbone du numérique éducatif`,
          annualGoal: `🌿 Objectif ${currentYear} : Aider 100 établissements à devenir numériquement durables`,
          yearMention: `Ton implication en ${currentYear} nous rapproche de la neutralité carbone ! ♻️`,
          followUp: `Suis notre chemin vers un numérique durable tout au long de l'année ${currentYear} !`,
        };
      case 'apprentissage':
        return {
          title: `Excellent, ${formData.firstName}, investissons dans les compétences ! 🎓`,
          subtitle: 'Former pour transformer 📚',
          message: `Ton établissement veut renforcer ses capacités en numérique responsable. Nous nous engageons à te fournir des ressources de formation, des webinaires exclusifs et un accompagnement personnalisé pour monter en compétences.`,
          impact: `Former 1000 éducateurs aux bonnes pratiques du numérique durable`,
          annualGoal: `📖 Objectif NIRD ${currentYear} : Certifier 500+ professionnels en numérique responsable`,
          yearMention: `En ${currentYear}, ensemble créons des leaders du numérique responsable !`,
          followUp: `Reste connecté à nos ressources pédagogiques tout au long de l'année ${currentYear} !`,
        };
      default:
        return {
          title: `Merci ${formData.firstName} ! 🙏`,
          subtitle: 'Ton engagement a été enregistré',
          message: `Votre engagement a été enregistré avec succès.`,
          impact: "Ensemble pour un numérique plus responsable.",
          annualGoal: `Objectif ${currentYear} : Transformer le numérique éducatif`,
          yearMention: `Ton soutien en ${currentYear} compte beaucoup pour nous !`,
          followUp: `Suis nos exploits tout au long de l'année ${currentYear} !`,
        };
    }
  };

  const message = getPersonalizedMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>

          <div className="relative">
            <div className="flex justify-center mb-6">
              <div className="relative">
                {getIconForMission()}
                <div className="absolute -top-2 -right-2">
                  <CheckCircle className="w-8 h-8 text-green-500 bg-white rounded-full" />
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                {message.title}
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {message.subtitle}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {message.message}
              </p>

              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200 mb-6">
                <div className="flex items-start gap-3">
                  <Rocket className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800 mb-2">Notre Vision</h3>
                    <p className="text-gray-700">{message.impact}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-lime-50 to-green-50 rounded-xl p-6 border-2 border-lime-200 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 text-lime-600 mt-1 flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800 mb-2">{message.annualGoal}</h3>
                    <p className="text-gray-700 text-sm mt-2">{message.yearMention}</p>
                    <p className="text-gray-700 text-sm mt-2">✨ {message.followUp}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-500 mb-1">Pilier</p>
                  <p className="font-semibold text-gray-800 capitalize">
                    {formData.missionType === 'independance' ? '🔓 Indépendance' :
                     formData.missionType === 'responsabilite' ? '⚖️ Responsabilité' :
                     formData.missionType === 'durabilite' ? '🌍 Durabilité' :
                     formData.missionType === 'apprentissage' ? '📚 Apprentissage' :
                     'NIRD'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-500 mb-1">Établissement</p>
                  <p className="font-semibold text-gray-800 text-sm">{formData.schoolName || 'Non spécifié'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-500 mb-1">Référence</p>
                  <p className="font-semibold text-gray-800 font-mono text-xs">
                    #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                </div>
              </div>

              <button
                onClick={onNewSubmission}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Nouvelle Adhésion
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
             Merci de rejoindre la démarche NIRD pour un numérique plus responsable !
          </p>
        </div>
      </div>
    </div>
  );
}
