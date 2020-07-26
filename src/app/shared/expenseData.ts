export interface expenseData{
    groupId: any;
    expenseTitle:string;
    expenseDescription:string;
    expenseAmount:number;
    createdBy: string;
    updatedBy: string;
    paidBy:Array<object>;
    usersInvolved:Array<object>;
 }