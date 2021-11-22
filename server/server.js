const express = require('express');
const { ApolloServer } = require ('apollo-server-express');
const path = require('path');

const { ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled } = require('apollo-server-core');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

async function startServer() {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
    plugins: [ // Show GraphQL playground
      process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
      ] 
  })

  // Serve up static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  await server.start();

  server.applyMiddleware({ app });
}

startServer();

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});