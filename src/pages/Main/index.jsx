import React from "react";

import { FaGithub, FaPlus } from "react-icons/fa";
import useMain from "../hooks/main.ts";
import { Container, Form, SubmitButton } from "./styles.js";

function Main() {
  const { handleInputChange, newRepo } = useMain();
  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>

      <Form onSubmit={() => {}}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton>
          <FaPlus color="#fff" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}

export default Main;
