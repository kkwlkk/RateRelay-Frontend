export enum UserPermission {
    None = 0,

    // Tickets
    ViewAllTickets = 1,
    EditAllTickets = 2,
    AssignTickets = 4,
    ChangeTicketStatus = 8,
    AddInternalComments = 16,
    ViewInternalTicketData = 32,
    HandleAssignedTickets = 64,
    MarkTicketsObsolete = 128,
    ViewTicketHistory = 256,
    DeleteTickets = 512,

    // Businesses
    ViewAllBusinesses = 1024,
    ManageBusinessPriority = 4096,
    CreateBusiness = 2048,
    DeleteBusiness = 16384,

    ViewAllUsers = 8192,
};