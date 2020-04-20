import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { showActorById, getImage } from "../api";

const Actor = () => {
  const [initialized, setInitialized] = useState(false);
  let [actor, setActor] = useState();

  let { id } = useParams();
  
  const getActorById = async (id) => {
    const res = await showActorById(id);
    setActor(res.data);
  };

  useEffect(() => {
    if (!initialized) {
      getActorById(id);
      setInitialized(true);
    }
  }, [initialized, id]);

  return (
    <div>
      {actor && (
        <div style={{ padding: "2rem" }}>
          <img src={getImage(actor.profile_path, "profile_h")} />
          <div style={{ fontSize: "1rem", textAlign: "left" }}>
            <p>
              <strong>Name:</strong> {actor.name}
            </p>
            {actor.birthday && (
              <p>
                <strong>Birthday</strong>: actor.birthday{" "}
              </p>
            )}
            {actor.biography && (
              <p>
                <strong>Biography</strong>: {actor.biography}
              </p>
            )}
            {actor.place_of_birth && (
              <p>
                <strong>Place of Birth</strong>: {actor.place_of_birth}
              </p>
            )}
            {actor.popularity && (
              <p>
                <strong>Polularity</strong>: {actor.popularity}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Actor;
