/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  Container,
  Owner,
  Loading,
  BackButton,
  IssuesList,
  PageAction,
  Filter,
} from "./styles";
import { FaArrowLeft } from "react-icons/fa";
import useRepo from "../../hooks/Repo/useRepo.ts";

const status = [
  { value: "open", label: "Abertas" },
  { value: "closed", label: "Fechadas" },
  { value: "all", label: "Todas" },
];

function Repository() {
  const { repository, loading, issues, handlePage, page, setType } = useRepo();
  if (loading) {
    return (
      <Loading>
        <h1>Carregando</h1>
      </Loading>
    );
  }
  return (
    <div>
      <Container>
        <BackButton to="/">
          <FaArrowLeft color="#000" size={30} />
        </BackButton>

        <Owner>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssuesList>
          <Filter>
            <p>Filtrar por: </p>
            <select
              name="status"
              id="status"
              onChange={(e) => setType(e.target.value)}
            >
              {status.map((value) => {
                return (
                  <option key={value.value} value={value.value}>
                    {value.label}
                  </option>
                );
              })}
            </select>
          </Filter>
          {issues.map((issue) => {
            return (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />

                <div>
                  <strong>
                    <a href={issue.html_url} target="_blank" rel="noreferrer">
                      {issue.title}
                    </a>

                    {issue.labels.map((label) => {
                      return <span key={String(label.id)}>{label.name}</span>;
                    })}
                  </strong>

                  <p>{issue.user.login}</p>
                </div>
              </li>
            );
          })}
        </IssuesList>
        <PageAction>
          <button
            type="button"
            onClick={() => handlePage("back")}
            disabled={page < 2}
          >
            Voltar
          </button>
          <button type="button" onClick={() => handlePage("next")}>
            Próxima
          </button>
        </PageAction>
      </Container>
    </div>
  );
}

export default Repository;
