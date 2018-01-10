import { buildSchema } from "graphql";
import Message from "./messages/messages.model";

// Construct a schema, using GraphQL schema language
export const schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    _id: ID!
    content: String
    author: String
  }

  type Query {
    getMessages: [Message]
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
    deleteMessage(id: ID!): Message
  }
`);

// The root provides a resolver function for each API endpoint
export const root = {
  getMessages: () => new Promise((resolve, reject) =>
    Message.find({}, (err, messages) => err ? reject(err) : resolve(messages))),
  getMessage: ({id}) => new Promise((resolve, reject) =>
    Message.findById(id, (err, message) => err ? reject(err) : resolve(message))),
  createMessage: ({input}) => new Promise((resolve, reject) =>
    Message.create(input, (err, message) => err ? reject(err) : resolve(message))),
  updateMessage: ({id, input}) => new Promise((resolve, reject) => 
    Message.findByIdAndUpdate(id, { $set: input }, { new: true }, (err, message) => err ? reject(err) : resolve(message))),
  deleteMessage: ({id}) => new Promise((resolve, reject) =>
    Message.findByIdAndRemove(id, (err, message) => err ? reject(err): resolve(message)))
};