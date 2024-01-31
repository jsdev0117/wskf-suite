import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const Client = () => {
  const httpLink = createHttpLink({
    uri: "https://wskf-suite.hasura.app/v1/graphql",
  });
  const authLink = setContext(async (_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        "content-type": "application/json",
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return client;
};

export default Client;
