// use patient;

// db.patientsData.insertMany([ {firstName: "john", lastname: "doe", age: 30, history: {disease: "common cold", treatment: "rest and fluids"}}, {"firstname": "Jane", "lastname": "Smith", "age": 25, "history": {"disease": "Allergic Rhinitis", "treatment": "Antihistamines" }}, {"firstname": "Alice", lastname:"Johnson" , age:42, history: {disease: "Hypertension" , treatment : "lifestyle changes and meditation"}} ])

// db.patientsData.find()
// db.patientsData.updateMany({ firstname: "Alice" },{$set: { "firstname": "Michael", lastname: "Williams", age: 28, history: { disease: "Appendicitis", treatement: "Emergency appendectomy" } }} )
// db.patientsData.deleteMany({"history.disease": "Appendicitis"})



// Blog Project

//  use blog;
// switched to db blog
// blog> db.users.insertMany([{name:"Abhi",age:29,email:"abhi12@gmail.com"},{name:"arpit",age:20,email:"arpi@gmail.com"}]);
// {
//   acknowledged: true,
//   insertedIds: {
//     '0': ObjectId("64d23c5aba9916334bb759c7"),
//     '1': ObjectId("64d23c5aba9916334bb759c8")
//   }
// }
// blog> db.posts.insertOne({title:"ilovethispost",text:"awesome",tags:["sweet","tech"],creator:ObjectId("64d23c5aba9916334bb759c7"),comments:[{text:"like it baba",author: ObjectId("64d23c5aba9916334bb759c8")}]});
// {
//   acknowledged: true,
//   insertedId: ObjectId("64d23d6aba9916334bb759c9")
// }

// blog> db.posts.findOne();
// {
//   _id: ObjectId("64d23d6aba9916334bb759c9"),
//   title: 'ilovethispost',
//   text: 'awesome',
//   tags: [ 'sweet', 'tech' ],
//   creator: ObjectId("64d23c5aba9916334bb759c7"),
//   comments: [
//     {
//       text: 'like it baba',
//       author: ObjectId("64d23c5aba9916334bb759c8")
//     }
//   ]
// }

// VALIDATORS

// db.createCollection('posts', {
//   validator: {
//     $jsonSchema: {
//       bsonType: 'object',
//       required: ['title', 'text', 'creator', 'comments'],
//       properties: {
//         title: {
//      ust b     bsonType: 'string',
//           description: 'me a string and is required'
//         },
//         text: {
//           bsonType: 'string',
//           description: 'must be a string and is required'
//         },
//         creator: {
//           bsonType: 'objectId',
//           description: 'must be an objectid and is required'
//         },
//         comments: {
//           bsonType: 'array',
//           description: 'must be an array and is required',
//           items: {
//             bsonType: 'object',
//             required: ['text', 'author'],
//             properties: {
//               text: {
//                 bsonType: 'string',
//                 description: 'must be a string and is required'
//               },
//               author: {
//                 bsonType: 'objectId',
//                 description: 'must be an objectid and is required'
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// });



