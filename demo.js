const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

const typeDefs = gql`
  """
  This gonna appear above graphql tools
  """
  union Footware = Sneaker | Boot

  type User {
    email: String!
    avatar: String!
    friends: [User!]!
  }

  enum ShoeType {
    Jordan
    Nike
    Adidas
    Air
    Boots
  }
  interface Shoe {
    brand: ShoeType!
    size: Int!
  }

  type Sneaker implements Shoe {
    brand: ShoeType!
    size: Int!
    sport: String!
  }

  type Boot implements Shoe {
    brand: ShoeType!
    size: Int!
    hasRubber: Boolean!
  }

  input ShoesInput {
    brand: ShoeType
    size: Int
  }

  input NewShoeInput {
    brand: ShoeType!
    size: Int!
  }

  "QUERY AND MUTATION"
  type Query {
    me: User!
    shoes(input: ShoesInput): [Footware]!
  }

  type Mutation {
    newShoe(input: NewShoeInput!): Shoe!
  }
`;

const resolvers = {
  Query: {
    shoes(_, { input }) {
      return [
        { brand: "Nike", size: 11, sport: "Basket" },
        { brand: "Boots", size: 12, hasRubber: true },
      ];
    },
    me() {
      return {
        email: "email@email.com",
        avatar: "urlAvatar",
        friends: [],
      };
    },
  },
  Mutation: {
    newShoe(_, { input }) {
      return input;
    },
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) return "Sneaker";
      return "Boot";
    },
  },
  Footware: {
    __resolveType(shoe) {
      if (shoe.sport) return "Sneaker";
      return "Boot";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(() => console.log("on port 4000"));
