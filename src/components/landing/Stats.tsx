export function Stats() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-lg hover:bg-primary-50 transition-colors">
            <div className="text-4xl font-bold text-primary mb-2">1000+</div>
            <div className="text-gray-600">Aktywne firmy</div>
          </div>
          <div className="p-6 rounded-lg hover:bg-primary-50 transition-colors">
            <div className="text-4xl font-bold text-primary mb-2">1000+</div>
            <div className="text-gray-600">Recenzje klientów</div>
          </div>
          <div className="p-6 rounded-lg hover:bg-primary-50 transition-colors">
            <div className="text-4xl font-bold text-primary mb-2">95%</div>
            <div className="text-gray-600">Zadowolonych klientów</div>
          </div>
          <div className="p-6 rounded-lg hover:bg-primary-50 transition-colors">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-gray-600">Miasta objęte</div>
          </div>
        </div>
      </div>
    </section>
  );
} 