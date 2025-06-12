import { connectToDatabase } from './connection';
import { User } from '../models/User';
import { Game } from '../models/Game';
import { Review } from '../models/Review';

export async function seedDatabase() {
  try {
    await connectToDatabase();
    
    // Clear existing data
    await User.deleteMany({});
    await Game.deleteMany({});
    await Review.deleteMany({});

    // Insert users
    const users = await User.create([
      { username: "User123", password: "hashed_password_1" },
      { username: "shadowheart_fan", password: "hashed_password_2" },
      { username: "gale_lover", password: "hashed_password_3" }
    ]);
    console.log('Created users:', users.map(u => u._id));

    // Insert games
    const games = await Game.create([
      { title: "Baldur's Gate 3" }
    ]);
    console.log('Created games:', games.map(g => g._id));

    // Insert reviews
    const reviews = await Review.create([
      {
        userId: users[0]._id,
        gameId: games[0]._id,
        username: "User123",
        gameName: "Baldur's Gate 3",
        rating: 5,
        content: "yes",
        dateCreated: "2024-01-15"
      },
      {
        userId: users[1]._id,
        gameId: games[0]._id,
        username: "shadowheart_fan",
        gameName: "Baldur's Gate 3",
        rating: 4,
        content: "I like shadowheart",
        dateCreated: "2024-02-03"
      },
      {
        userId: users[2]._id,
        gameId: games[0]._id,
        username: "gale_lover",
        gameName: "Baldur's Gate 3",
        rating: 5,
        content: "I like this game",
        dateCreated: "2024-01-28"
      }
    ]);
    console.log('Created reviews:', reviews.map(r => r._id));

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}