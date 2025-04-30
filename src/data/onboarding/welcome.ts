export interface HowItWorksStep {
    number: number;
    title: string;
    description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
    {
        number: 1,
        title: "Dziel się feedbackiem",
        description: "Przeglądaj firmy uczestniczące w naszym programie, zbieraj swoje sugestie, pomysły oraz wątpliwości a następnie przekaż je w formie feedbacku do właściciela biznesu"
    },
    {
        number: 2,
        title: "Punkty za feedback",
        description: "Każdorazowo pozostawiony feedback, który zostanie zaakceptowany przez drugą stronę wiąże się z otrzymaniem symbolicznego 0,5 punkta za przesłany feedback"
    },
    {
        number: 3,
        title: "Wymiana punktów",
        description: "Zdobyte punkty umożliwiają Tobie zobieranie feedbacku o swojej firmie."
    }
]; 