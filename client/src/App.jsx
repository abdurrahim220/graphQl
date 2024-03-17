import "./App.css";
import AddClientModel from "./components/AddClientModel";
import Clients from "./components/Clients";
import Header from "./components/Header";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "https://graphql-oolb.onrender.com/graphql",
  // uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClientModel/>
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
