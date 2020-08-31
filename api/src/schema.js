const { gql } = require("apollo-server");

/**
 * Type Definitions for our Schema using the SDL.
 */
("! = Not null");
const typeDefs = gql`
  type Pet {
    id: ID!
    createdAt: String!
    img: String
    name: String!
    type: String!
    owner: User!
  }

  type User {
    id: ID!
    username: String!
    pets: [Pet]!
  }

  input PetInput {
    id: ID
    name: String
    type: String
  }

  input NewPetInput {
    name: String!
    type: String!
    img: String
  }

  input UpdatePetInput {
    id: ID!
    name: String
    type: String
  }

  input RemovePetInput {
    id: ID!
  }

  type Query {
    getPets(input: PetInput): [Pet]
    getPet(input: PetInput): Pet
  }

  type Mutation {
    newPet(input: NewPetInput!): Pet!
    updatePet(input: UpdatePetInput!): Pet!
    removePet(input: RemovePetInput!): Pet!
  }
`;

module.exports = typeDefs;
