const { ApolloServer, gql } = require('apollo-server');

// Definicja typów
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Resolvery definiują sposób uzyskiwania danych dla każdego typu
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// Inicjalizacja serwera Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Uruchomienie serwera Apollo
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
