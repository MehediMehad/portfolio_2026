import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';



// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    return NextResponse.next();
}



export const config = {
    matcher: [

    ],
}