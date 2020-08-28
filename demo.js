const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

const typeDefs = gql`
  """
  This gonna appear above graphql tools
  """
  union Footware = Sneaker | Boot

  type User {
    id: ID!
    email: String!
    avatar: String!
    shoes: [Shoe]!
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
    user: User!
  }

  type Sneaker implements Shoe {
    brand: ShoeType!
    size: Int!
    sport: String!
    user: User!
  }

  type Boot implements Shoe {
    brand: ShoeType!
    size: Int!
    hasRubber: Boolean!
    user: User!
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
    shoes(input: ShoesInput): [Shoe]!
  }

  type Mutation {
    newShoe(input: NewShoeInput!): Shoe!
  }
`;

const user = {
  id: 1,
  email: "email@email.com",
  avatar: "urlAvatar",
  friends: [],
  shoes: [],
};

const shoes = [
  { brand: "Nike", size: 11, sport: "Basket", user: 1 },
  { brand: "Boots", size: 12, hasRubber: true, user: 1 },
];

const resolvers = {
  Query: {
    shoes(_, { input }) {
      return shoes;
    },
    me() {
      return user;
    },
  },
  Mutation: {
    newShoe(_, { input }) {
      return input;
    },
  },
  User: {
    shoes() {
      return shoe;
    },
  },
  Sneaker: {
    user() {
      return user;
    },
  },
  Boot: {
    user() {
      return user;
    },
  },

  Shoe: {
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
