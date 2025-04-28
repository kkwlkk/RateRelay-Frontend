export const onboardingText = {
    header: {
        title: "Gratulacje!",
        welcome: (username: string) => `Witaj w TrustRate, ${username}! 🎉`
    },
    whatYouCanDo: {
        title: "Co możesz teraz zrobić?",
        items: [
            "Pisz recenzje i śledź swoją aktywność",
            "Wymieniaj się opiniami z innymi użytkownikami",
            "Sprawdź dostępne recenzje w panelu"
        ]
    },
    pointsSystem: {
        title: "Jak działa system punktowy?",
        items: [
            "Punkty odzwierciedlają Twoją aktywność",
            "Im więcej recenzji, tym więcej punktów",
            "Punkty pokazują Twoje zaangażowanie w platformę"
        ]
    },
    pointsBalance: {
        title: (points: number) => `Twój aktualny stan punktów: ${points}`,
        subtitle: "Zacznij pisać recenzje i obserwuj wzrost swoich punktów!"
    },
    button: {
        text: "Przejdź do panelu"
    }
}; 