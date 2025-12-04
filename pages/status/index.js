import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}
export default function StatusPage() {
  return (
    <>
      <h1>Status:</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updated = {
    text: (
      <p>
        <b>Última atualização:</b> Carregando...
      </p>
    ),
    version: "",
    maxConections: "",
    openedConnections: "",
  };

  if (!isLoading && data) {
    updated = {
      text: (
        <p>
          <b>{"Última atualização: "}</b>
          {new Date(data.updated_at).toLocaleString("pt-BR")}
        </p>
      ),
      version: (
        <p>
          <b>{"Versão da base de dados: "}</b>
          {data.dependencies.database.version}
        </p>
      ),
      maxConections: (
        <p>
          <b>{"Máximo de conexões na base de dados: "}</b>
          {data.dependencies.database.max_connections}
        </p>
      ),
      openedConnections: (
        <p>
          <b>{"Conexões abertas na base de dados: "}</b>
          {data.dependencies.database.opened_connections}
        </p>
      ),
    };
  }

  return (
    <>
      {updated.text}
      {updated.version}
      {updated.maxConections}
      {updated.openedConnections}
    </>
  );
}
