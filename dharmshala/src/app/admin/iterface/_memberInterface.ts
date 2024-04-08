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

    password:string;
    token:string;
    members:{
            role: string
            name:string;
            lastName:string;
            email:string;
            phone:string;
            memberType:string;
            address:string;
            description:string
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