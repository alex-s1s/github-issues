import React from "react";

import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import useMain from "../../hooks/Main/main.ts";
import {
  Container,
  Error,
  Form,
  SubmitButton,
  List,
  DeleteButton,
} from "./styles.ts";

function Main() {
  const {
    handleInputChange,
    newRepo,
    handleSubmit,
    error,
    loading,
    repository,
    handleDelete,
  } = useMain();
  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>
      {error && <Error>{error}</Error>}

      <List>
        {repository.map((repo) => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <a href="">
              <FaBars size={20} />
            </a>
          </li>
        ))}
      </List>
    </Container>
  );
}

export default Main;
