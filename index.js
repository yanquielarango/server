const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');



const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config');



const PORT = process.env.PORT || 5001;


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, {  useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB conected');
    return server.listen({port: PORT});
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
   