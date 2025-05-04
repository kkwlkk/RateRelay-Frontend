import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { HiShieldCheck, HiChatBubbleBottomCenterText, HiBriefcase } from 'react-icons/hi2';
import { LuBadgeCheck } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, TargetAndTransition } from 'framer-motion';

const features = [
  {
    icon: <HiBriefcase className="text-primary-foreground text-xl" />,
    title: "Elitarna przestrzeń biznesu",
    description: "Wyłącznie dla zweryfikowanych właścicieli firm."
  },
  {
    icon: <HiChatBubbleBottomCenterText className="text-primary-foreground text-xl" />,
    title: "Twoje słowo ma wartość",
    description: "Kształtuj wizerunek najlepszych marek."
  },
  {
    icon: <LuBadgeCheck className="text-primary-foreground text-xl" />,
    title: "Buduj reputację",
    description: "Dziel się doświadczeniem. Zmieniaj rynek."
  },
  {
    icon: <HiShieldCheck className="text-primary-foreground text-xl" />,
    title: "Pełna anonimowość",
    description: "Twoje dane są zawsze chronione."
  }
];

interface BackgroundOrbProps {
  className: string;
  animation: TargetAndTransition;
}

const BackgroundOrb = ({ className, animation }: BackgroundOrbProps) => (
  <motion.div
    className={`absolute w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 ${className}`}
    animate={animation}
    transition={{
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse"
    }}
  />
);

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white overflow-hidden min-h-screen flex items-center py-20">
      <div className="absolute inset-0 overflow-hidden">
        <BackgroundOrb
          className="top-0 -left-40 bg-purple-500"
          animation={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
        />
        <BackgroundOrb
          className="-bottom-40 right-0 bg-primary"
          animation={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-50"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-12 md:py-20 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/20">
                ✨ Zaufana platforma dla polskiego biznesu
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Wspieraj lokalne firmy
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-500 to-purple-400">
                buduj ich wizerunek
              </span>
              zdobywaj zaufanie
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto lg:mx-0">
              TrustRate – Wymieniaj wartościowy feedback, który kształtuje wizerunek Twojego biznesu.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-12">
              <Link href="/businesses" className="focus:outline-none" tabIndex={-1}>
                <Button
                  size="lg"
                  className="group bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                >
                  Rozpocznij teraz
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaArrowRight />
                  </motion.span>
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20 rounded-3xl transform -rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/20 via-transparent to-primary/20 rounded-3xl transform rotate-6" />

              <div className="relative space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                        <p className="text-gray-300 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <FaChevronDown className="text-white/50 text-2xl" />
      </motion.div>
    </section>
  );
}