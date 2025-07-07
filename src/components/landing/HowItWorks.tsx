import { FaSearch, FaCommentAlt, FaStar } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function StepCard({ icon, title, description }: StepCardProps) {
  return (
    <div className="group relative bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 h-full flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex-1 flex flex-col">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
          {icon}
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100 leading-tight">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed flex-grow">
          {description}
        </p>
        <div className="flex items-center justify-center mt-auto">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-primary hover:bg-primary/75 hover:!text-white group-hover:scale-105 transition-all duration-300 rounded-md font-medium px-4 sm:px-6 py-2 border border-primary/20 hover:border-primary text-sm sm:text-base w-full sm:w-auto"
            >
              Rozpocznij
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const steps = [
    {
      icon: <FaSearch className="text-primary text-xl sm:text-2xl" />,
      title: "Odkrywaj zaufane firmy",
      description: "Wyszukuj i odkrywaj firmy w Twojej okolicy, które już zdobyły zaufanie społeczności TrustRate. Zobacz, jak są postrzegane przez innych przedsiębiorców i jak ich wizerunek kształtuje się w Internecie dzięki autentycznym rekomendacjom."
    },
    {
      icon: <FaCommentAlt className="text-primary text-xl sm:text-2xl" />,
      title: "Dziel się doświadczeniem",
      description: "Twoje doświadczenia mają realny wpływ. Dzięki dzieleniu się swoimi spostrzeżeniami, pomagają one innym w podejmowaniu świadomych decyzji. Twój feedback kształtuje wizerunek firm, wpływając na jakość usług w Twojej społeczności."
    },
    {
      icon: <FaStar className="text-primary text-xl sm:text-2xl" />,
      title: "Buduj reputację i zaufanie",
      description: "Twórz sieć wartościowych rekomendacji, które wspierają rozwój sprawdzonych firm w Twojej okolicy. Dzięki TrustRate masz realny wpływ na reputację przedsiębiorstw i możesz aktywnie kształtować rynek, tworząc przestrzeń pełną zaufania i transparentności."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
            Jak to działa?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl leading-relaxed px-4 sm:px-0">
            W TrustRate łączymy przedsiębiorców w celu wymiany wartościowego feedbacku, który ma realny wpływ na rozwój firm. Każdy udział w tej społeczności pomaga budować zaufanie i pozytywny wizerunek lokalnych usług, wpływając na przyszłość rynku.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
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