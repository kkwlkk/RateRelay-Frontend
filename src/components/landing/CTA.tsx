'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, Building2 } from 'lucide-react';

export function CTA() {
  const features = [
    "Weryfikacja tożsamości",
    "Rekomendacje od innych firm",
    "Bezpieczne współprace"
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/30 rounded-full filter blur-[128px] opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/30 rounded-full filter blur-[128px] opacity-50 translate-x-1/2 translate-y-1/2"></div>
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-primary px-4 py-2 rounded-full mb-8 border border-gray-200/50 dark:border-gray-700/50"
          >
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">Dołącz do społeczności zaufanych firm</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Gotowy, aby zwiększyć
            <span className="text-primary block">wiarygodność swojej firmy?</span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Dołącz do przedsiębiorców, którzy wymieniają doświadczenia i budują autentyczny wizerunek swoich firm na TrustRate
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/login" className="focus:outline-none" tabIndex={-1}>
              <Button
                size="lg"
                className="group bg-primary/80 text-white hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg rounded-xl focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              >
                Rozpocznij za darmo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/features" className="focus:outline-none" tabIndex={-1}>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg rounded-xl focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                Zobacz, jak to działa
              </Button>
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                <span><strong className="text-gray-900 dark:text-white">100+</strong> firm</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span><strong className="text-gray-900 dark:text-white">4.9</strong> ocena</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}