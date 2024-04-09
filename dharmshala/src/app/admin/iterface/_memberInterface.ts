export interface Members{
    id:number;
    name:string;
    lastName:string;
    email:string;
    phone:string;
    memberType:string;
    address:string;
    description:string
    role:string
}

export interface adminCreateAccount{

    password:string|null| undefined;
    token:string|null| undefined;
    members:{
            role: string|null| undefined
            name:string|null| undefined;
            lastName:string|null| undefined;
            email:string|null| undefined;
            phone:string|null| undefined;
            memberType:string|null| undefined;
            address:string|null| undefined;
            description:string|null| undefined
    }
}


export interface admin{

    id:number;
    membersId:number;
    password:string;
    members:{
            id:number;
            membersId:number;
            name:string;
            lastName:string;
            email:string;
            phone:string;
            memberType:string;
            address:string;
            description:string
    }
}