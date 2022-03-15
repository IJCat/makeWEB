import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Read data from JSON file, this will set db.data content
await db.read();

// If file.json doesn't exist, db.data will be null
// Set default data
// db.data = db.data || { posts: [] } // Node < v15.x
db.data ||= { topic: [], author: [] }; // Node >= 15.x

// Create and query items using plain JS
// db.data.author.push({
//   id: 1,
//   name: 'egoing',
//   profile: 'developer',
// });
// db.data.topic.push({
//   id: 1,
//   title: 'lowdb',
//   description: 'lowdb is...',
//   author: 1,
// });
// db.data.topic.push({
//   id: 2,
//   title: 'mysql',
//   description: 'mysql is...',
//   author: 1,
// });

// const firstPost = db.data.posts[0];

// // Alternatively, you can also use this syntax if you prefer
// const { posts } = db.data;
// posts.push('hello world');

// // Finally write db.data content to file
// await db.write();

// Read data
const topics = db.chain.get('topic').find({ id: 1 }).value();
