// const { projects, clients } = require("../sampleData.js");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const Client = require("../models/Clients.js");
const Project = require("../models/Projects.js");

// Project type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType, //adding relation between other types or data
      resolve(parent, args) {
        return Client.findById(parent.clientId);
        // return clients.find((client) => client.id === args.id);
      },
    },
  }),
});
// client type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
        // return projects;
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
        // return projects.find((project) => project.id === args.id);
      },
    },

    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
        // return clients;
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
        // return clients.find((client) => client.id === args.id);
      },
    },
  },
});


// mutations or create client
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // create client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();
      },
    },
    // delete client
    deleteClient:{
      type:ClientType,
      args:{
        id:{type:GraphQLNonNull(GraphQLID)}
      },
      resolve(parent,args){
        return Client.findByIdAndDelete(args.id);
      }
      
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
