import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

connect()

export async function POST(request: NextApiRequest){
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        // remoe in production
        console.log(reqBody);
        
        // Check user nae is already exists
        const user = await User.findOne({email});

        if (user){
            return NextApiResponse.json({
                
            })
        }
    }
    catch(err:any){
        return NextApiResponse.json({
            err.message
        }, {status:500})
    }
}