import { FaSearch, FaCommentAlt, FaStar } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function StepCard({ icon, title, description }: StepCardProps) {
  return (
    <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-6 text-lg">{description}</p>
        <div className="flex items-center justify-center">
          <Button 
            variant="ghost" 
            className="text-primary hover:!bg-primary hover:!text-white group-hover:scale-105 transition-all duration-300 rounded-md font-medium px-6 py-2 border border-primary/20 hover:border-primary"
          >
            Rozpocznij
          </Button>
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const steps = [
    {
      icon: <FaSearch className="text-primary text-2xl" />,
      title: "Odkrywaj sprawdzone firmy",
      description: "Wyszukuj i odkrywaj firmy w Twojej okolicy, które już zdobyły zaufanie społeczności TrustRate. Zobacz, jak są postrzegane przez innych przedsiębiorców i jak ich wizerunek kształtuje się w Internecie dzięki autentycznym rekomendacjom."
    },
    {
      icon: <FaCommentAlt className="text-primary text-2xl" />,
      title: "Dziel się wiedzą i doświadczeniem",
      description: "Twoje doświadczenia mają realny wpływ. Dzięki dzieleniu się swoimi spostrzeżeniami, pomagają one innym w podejmowaniu świadomych decyzji. Twój feedback kształtuje wizerunek firm, wpływając na jakość usług w Twojej społeczności."
    },
    {
      icon: <FaStar className="text-primary text-2xl" />,
      title: "Buduj zaufanie i wpływ",
      description: "Twórz sieć wartościowych rekomendacji, które wspierają rozwój sprawdzonych firm w Twojej okolicy. Dzięki TrustRate masz realny wpływ na reputację przedsiębiorstw i możesz aktywnie kształtować rynek, tworząc przestrzeń pełną zaufania i transparentności."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Jak to działa?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">W TrustRate łączymy przedsiębiorców w celu wymiany wartościowego feedbacku, który ma realny wpływ na rozwój firm. Każdy udział w tej społeczności pomaga budować zaufanie i pozytywny wizerunek lokalnych usług, wpływając na przyszłość rynku.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 