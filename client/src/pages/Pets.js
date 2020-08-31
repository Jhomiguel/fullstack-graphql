import React, { useState } from "react";
import gql from "graphql-tag";
import PetBox from "../components/PetBox";
import NewPet from "../components/NewPet";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "../components/Loader";

const PETS_FIELDS = gql`
  fragment PetsFields on Pet {
    id
    name
    img
    type
    vaccinated @client
    owner {
      id
      age @client
    }
  }
`;

const GET_PETS = gql`
  query getPets {
    pets: getPets {
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`;

const ADD_PET = gql`
  mutation addPet($newPet: NewPetInput!) {
    newPet(input: $newPet) {
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`;

export default function Pets() {
  const [modal, setModal] = useState(false);

  const { loading, error, data } = useQuery(GET_PETS);
  const [createPet, newPetResponse] = useMutation(ADD_PET, {
    update(cache, { data: { newPet } }) {
      const { pets } = cache.readQuery({ query: GET_PETS });
      cache.writeQuery({
        query: GET_PETS,
        data: { pets: [newPet, ...pets] },
      });
    },
  });

  const onSubmit = (input) => {
    setModal(false);
    createPet({
      variables: { newPet: input },
      optimisticResponse: {
        __typename: "Mutation",
        newPet: {
          ...input,
          id: "asdweasdqwe",
          img: "",
          __typename: "Pet",
        },
      },
    });
  };
  if (loading) return <Loader />;
  if (error || newPetResponse.error) return <p>Error</p>;

  console.log(data.pets[0]);

  const petsList = data.pets.map((pet) => (
    <div className="col-xs-12 col-md-4 col" key={pet.id}>
      <div className="box">
        <PetBox pet={pet} />
      </div>
    </div>
  ));

  if (modal) {
    return (
      <div className="row center-xs">
        <div className="col-xs-8">
          <NewPet onSubmit={onSubmit} onCancel={() => setModal(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <div className="row">{petsList}</div>
      </section>
    </div>
  );
}
