export interface Student {
  id: string
  email: string
  name: string
}

export interface PrintFile {
  id: string
  fileUrl: string
  copies: number
  colorMode: "BLACK_WHITE" | "COLOR"
  orientation: "PORTRAIT" | "LANDSCAPE"
  printOnBothSides: boolean
  pageRange: string
  customRange: string | null
}

export interface Order {
  id: string
  otpCode: string
  status: OrderStatus
  studentId: string
  createdAt: string
  prints: PrintFile[]
  student: Student
}


export enum OrderStatus {
PENDING,
PRINTING,
COMPLETED,
FAILED
}
