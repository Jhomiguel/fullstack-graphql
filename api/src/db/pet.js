const nanoid = require("nanoid");

const createPetModel = (db) => {
  return {
    findMany(filter) {
      return db.get("pet").filter(filter).value();
    },

    findOne(filter) {
      return db.get("pet").find(filter).value();
    },

    create(pet) {
      const newPet = { id: nanoid(), createdAt: Date.now(), ...pet };

      db.get("pet").push(newPet).write();

      return newPet;
    },

    update(pet) {
      return db.get("pet").find({ id: pet.id }).assign(pet).write();
    },

    remove(id) {
      const removedPet = db.get("pet").find({ id }).value();
      db.get("pet").remove({ id }).write();
      return removedPet;
    },
  };
};

module.exports = createPetModel;
