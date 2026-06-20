export interface User {
id: string;
email: string;
name: string | null;
batch: string | null;
department: string | null;
image: string | null;
}

export interface Payment {
amount: number;
status: string;
createdAt: string;
}

export interface PrintFile {
id: string;
fileUrl: string;
copies: number;
colorMode: "BLACK_WHITE" | "COLOR";
orientation: "PORTRAIT" | "LANDSCAPE";
printOnBothSides: boolean;
pageRange: string;
customRange: string | null;
}

export interface Order {
id: string;
otpCode: string;
status: OrderStatus;

userId: string;

paymentStatus: string;

createdAt: string;

prints: PrintFile[];

user: User;

payment?: Payment;
}

export enum OrderStatus {
PENDING = "PENDING",
PRINTING = "PRINTING",
PRINTED = "PRINTED",
FAILED = "FAILED"
}
