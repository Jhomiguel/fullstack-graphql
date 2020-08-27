const { gql } = require("apollo-server");

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: String!
  }

  input PetInput {
    id: ID
    name: String
    type: String
  }

  input NewPetInput {
    name: String!
    type: String!
  }

  input UpdatePetInput {
    id: ID!
    name: String
    type: String
  }

  input RemovePetInput {
    id: ID!
  }

  type User {
    id: ID!
    username: String!
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
