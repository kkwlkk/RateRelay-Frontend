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
        description: "Za każdy pozostawiony feedback, który zostanie zaakceptowany przez drugą stronę otrzymasz wirtualne 0,5 punkta za przesłany feedback oraz 0,5 punkta jeśli zdecydujesz się pozostawić opinię o firmie jeśli ją znasz"
    },
    {
        number: 3,
        title: "Wymiana punktów",
        description: "Zdobywaj punkty przez zostawianie feedbacków i ocen o innych firmach. Punkty pozwalają innym komentować Twoją firmę. To takie proste."
    }
]; 