import prisma from "../prismaClient";

async function main() {
    const newUser = await prisma.user.create({
        data: {
            email: 'test@example.com',
            name: 'Test User',
        },
    });
    console.log('Created user:', newUser);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
