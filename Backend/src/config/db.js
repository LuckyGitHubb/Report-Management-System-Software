import {PrismaClient}  from '@prisma/client';

const prisma = new PrismaClient({
    log:
    process.env.NODE_ENV==="development" 
    ? ["query","error","warn"]
    : ["error"]
})

const connectDB = async()=>{
    try {
        await prisma.$connect();
        console.log('Database is connected')
    } catch (error) {
        console.log(`Database connection error: ${error}`)
        process.exit(1)
    }
}
const disconnectDB = async()=>{
    await prisma.$disconnect();
}

export {prisma,connectDB,disconnectDB} 