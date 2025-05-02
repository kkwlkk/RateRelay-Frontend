import { IconType } from 'react-icons';
import { Button } from '@/components/ui/button';
import { FaCheckCircle } from 'react-icons/fa';

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  features: string[];
}

export function FeatureCard({ icon: Icon, title, description, features }: FeatureCardProps) {
  return (
    <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex-1 flex flex-col">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-500 transform group-hover:scale-110" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-200/50 to-primary-300/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 rounded-2xl border-2 border-primary-200/30 group-hover:border-primary-300/50 transition-all duration-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="text-primary text-2xl transform group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-6 text-lg">{description}</p>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <FaCheckCircle className="text-primary mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <Button variant="outline" className="w-full text-primary hover:bg-primary hover:text-white transition-colors rounded-md font-medium">
            Dowiedz się więcej
          </Button>
        </div>
      </div>
    </div>
  );
} 