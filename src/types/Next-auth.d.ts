import 'next-auth';

declare module 'next-auth' {
    interface User {
        _id?: string;
        isVerified?:boolean;
        isAcceptingMessages?:boolean;
        username?:string;
    }
    interface Session {
        user : {
            _id?: string;
            isVerified?:boolean;
            isAcceptingMessages?:boolean;
            username?:string;
        } & DefaultSession['user'];
    }
}

// other way to modify interface
declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        isVerified?:boolean;
        isAcceptingMessages?:boolean;
        username?:string;
    }
}