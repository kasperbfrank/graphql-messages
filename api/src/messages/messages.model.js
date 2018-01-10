import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  id: String,
  author: String,
  content: String
}, { collection: 'Messages' });

export default mongoose.model('Message', messageSchema);