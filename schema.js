const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} =  require('graphql');

// Hardcoded Data
const customers = [
    {id: '1', name:'David Gabi', email:'dg@g.com', age: 42},
    {id: '2', name:'David Aybi', email:'day@g.com', age:30},
    {id: '3', name:'Davi Agabi', email:'da@g.com', age:23},
]

// Customer Type
const CustomerType = new GraphQLObjectType({
    name:'Customer',
    fields: () => ({
        id:{type:GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
})
// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        customer: {
            type: CustomerType,
            args:{
                id:{type: GraphQLString}
            },
            resolve(parentValue, args){
                for(let i =0;i < customers.length;i++){
                    if(customers[i].id == args.id){
                        return customers[i];
                    }
                }
            }
        },
        customers:{
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return customers;
            }
        }
    }
    
});
module.exports = new GraphQLSchema({
    query: RootQuery
});