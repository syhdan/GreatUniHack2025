import { PrismaClient } from '@prisma/client';
import { guides as allGuides } from '../lib/guides-data';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  for (const guideData of allGuides) {
    const hashedPassword = await bcrypt.hash('password', 10); // Default password for all seeded guides

    const user = await prisma.user.create({
      data: {
        email: guideData.email,
        name: guideData.name,
        password: hashedPassword,
        isTourGuide: true,
      },
    });

    const guide = await prisma.guide.create({
      data: {
        userId: user.id,
        city: guideData.city,
        country: guideData.country,
        rating: guideData.rating,
        reviews: guideData.reviews,
        price: guideData.price,
        image: guideData.image,
        specialties: guideData.specialties.join(','),
        languages: guideData.languages.join(','),
        experience: guideData.experience,
        bio: guideData.bio,
        tours: guideData.tours.join(','),
        availability: guideData.availability,
        yearsExperience: guideData.yearsExperience,
      },
    });
    console.log(`Created guide with id: ${guide.id} and user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
