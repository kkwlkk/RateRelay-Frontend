export type ReferralProgressDto = {
    goalName: string;
    goalDescription: string;
    targetValue: number;
    currentValue: number;
    rewardPoints: number;
    isCompleted: boolean;
    dateCompleted: Date | null;
    referredUserName: string;
    progressPercentage: number;
}

export type ReferralRewardDto = {
    goalName: string;
    rewardPoints: number;
    dateAwarded: Date | null;
    referredUserName: string;
}

export type ReferralStatsResponseDto = {
    totalReferrals: number;
    activeReferrals: number;
    completedGoals: number;
    totalPointsEarned: number;
    pendingRewards: number;
    referralCode: string;
    referredByCode: string;
    progress: ReferralProgressDto[];
    recentRewards: ReferralRewardDto[];
}

export type ReferralGoalsResponseDto = {
    id: number;
    name: string;
    description: string;
    goalType: string;
    targetValue: number;
    rewardPoints: number;
    isActive: boolean;
    sortOrder: number;
}

export type GenerateReferralCodeResponseDto = {
    referralCode: string;
}

export type LinkReferralCodeResponseDto = {
    referrerName: string;
    welcomeBonus: number;
}