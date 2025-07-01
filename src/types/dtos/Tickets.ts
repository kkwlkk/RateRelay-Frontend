export enum TicketType {
    BusinessReview = 0,
    UserReport = 1,
    SystemIssue = 2,
    FeatureRequest = 3,
    GeneralInquiry = 4
}

export enum TicketStatus {
    Open = 0,
    InProgress = 1,
    Resolved = 2,
    Closed = 3,
    Reopened = 4,
    OnHold = 5,
    Obsolete = 6
}

export type TicketSubjectsDto = {
    businessId?: number;
    reviewId?: number;
};

export type TicketCommentDto = {
    id: number;
    authorId: number;
    authorName: string;
    content: string;
    createdAtUtc: Date;
    editedAtUtc?: Date;
    isInternal: boolean;
    isSystemGenerated: boolean;
}

export type TicketStatusHistoryDto = {
    createdAtUtc: Date;
    fromStatus: TicketStatus;
    toStatus: TicketStatus;
    changedByName: string;
    changedReason: string;
}

export type GetUserTicketsResponseDto = {
    id: number;
    title: string;
    description: string;
    type: TicketType;
    status: TicketStatus;
    createdAtUtc: Date;
    lastActivityAtUtc: Date;
    reporterId: number;
    reporterName: string;
    isAssigned: boolean;
    assignedToName?: string;
    subjects: TicketSubjectsDto;
}

export type GetUserTicketDetailsDto = {
    id: number;
    title: string;
    description: string;
    type: TicketType;
    status: TicketStatus;
    createdAtUtc: Date;
    lastActivityAtUtc: Date;
    reporterId: number;
    reporterName: string;
    isAssigned: boolean;
    assignedToName?: string;
    isOpen: boolean;
    isResolved: boolean;
    subjects: TicketSubjectsDto;
    comments: TicketCommentDto[];
    statusHistory: TicketStatusHistoryDto[];
}