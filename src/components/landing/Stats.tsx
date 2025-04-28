export function Stats() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-lg hover:bg-primary-50 transition-colors">
            <div className="text-4xl font-bold text-primary mb-2">100+</div>
            <div className="text-gray-600">Firm na platformie</div>
          </div>
          <div className="p-6 rounded-lg hover:bg-primary-50 transition-colors">
            <div className="text-4xl font-bold text-primary mb-2">100+</div>
            <div className="text-gray-600">Wymian doświadczeń</div>
          </div>
          <div className="p-6 rounded-lg hover:bg-primary-50 transition-colors">
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <div className="text-gray-600">Wysokiej satysfakcji</div>
          </div>
          <div className="p-6 rounded-lg hover:bg-primary-50 transition-colors">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-gray-600">Miast na mapie TrustRate</div>
          </div>
        </div>
      </div>
    </section>
  );
} 