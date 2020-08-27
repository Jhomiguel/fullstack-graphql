/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    getPets(_, { input }, context) {
      return context.models.Pet.findMany(input);
    },
    getPet(_, { input }, context) {
      return context.models.Pet.findOne(
        { name: input.name } || { id: input.id }
      );
    },
  },
  Mutation: {
    newPet(_, { input }, context) {
      return context.models.Pet.create(input);
    },
    updatePet(_, { input }, context) {
      return context.models.Pet.update(input);
    },
    removePet(_, { input: { id } }, context) {
      return context.models.Pet.remove(id);
    },
  },
  Pet: {
    // img(pet) {
    //   return pet.type === "DOG"
    //     ? "https://placedog.net/300/300"
    //     : "http://placekitten.com/300/300";
    // },
  },
  User: {},
};
