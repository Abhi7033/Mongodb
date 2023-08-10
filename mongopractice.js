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



// INDEXING
// SINGLE INDEXING
// Syntax to create a single index
// db.collection.createIndex({ field_name: 1 });

// Example: Creating a single index on the "email" field of a "users" collection
// db.users.createIndex({ email: 1 });

// COMPOUND INDEXING
// Syntax to create a compound index
// db.collection.createIndex({ field1_name: 1, field2_name: -1 });

// Example: Creating a compound index on "city" (ascending) and "age" (descending) fields of a "users" collection
// db.users.createIndex({ city: 1, age: -1 });

// AGGREGATION FRAMEWORK
// UNDERSTANDING THE GROUP STAGE 
// db.persons.aggregate([
//     { $match: { gender: 'female' } },
//     { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } }
// ]).pretty();


// $project
// db.persons.aggregate([
//     {
//       $project: {
//         _id: 0,
//         gender: 1,
//         fullName: {
//           $concat: [
//             { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
//             {
//               $substrCP: [
//                 '$name.first',
//                 1,
//                 { $subtract: [{ $strLenCP: '$name.first' }, 1] }
//               ]
//             },
//             ' ',
//             { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
//             {
//               $substrCP: [
//                 '$name.last',
//                 1,
//                 { $subtract: [{ $strLenCP: '$name.last' }, 1] }
//               ]
//             }
//           ]
//         }
//       }
//     }
//   ]).pretty();

// ISOWEEKYEAR
// db.persons.aggregate([
//     {
//       $project: {
//         _id: 0,
//         name: 1,
//         email: 1,
//         birthdate: { $toDate: '$dob.date' },
//         age: "$dob.age",
//         location: {
//           type: 'Point',
//           coordinates: [
//             {
//               $convert: {
//                 input: '$location.coordinates.longitude',
//                 to: 'double',
//                 onError: 0.0,
//                 onNull: 0.0
//               }
//             },
//             {
//               $convert: {
//                 input: '$location.coordinates.latitude',
//                 to: 'double',
//                 onError: 0.0,
//                 onNull: 0.0
//               }
//             }
//           ]
//         }
//       }
//     },
//     {
//       $project: {
//         gender: 1,
//         email: 1,
//         location: 1,
//         birthdate: 1,
//         age: 1,
//         fullName: {
//           $concat: [
//             { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
//             {
//               $substrCP: [
//                 '$name.first',
//                 1,
//                 { $subtract: [{ $strLenCP: '$name.first' }, 1] }
//               ]
//             },
//             ' ',
//             { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
//             {
//               $substrCP: [
//                 '$name.last',
//                 1,
//                 { $subtract: [{ $strLenCP: '$name.last' }, 1] }
//               ]
//             }
//           ]
//         }
//       }
//     },
//     { $group: { _id: { birthYear: { $isoWeekYear: "$birthdate" } }, numPersons: { $sum: 1 } } },
//     { $sort: { numPersons: -1 } }
//   ]).pretty();

// UNWIND
// db.friends.aggregate([
//     { $unwind: "$hobbies" }, 
//     { $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } } }
//   ]).pretty();

// USING PROJECTION WITH Array
// db.friends.aggregate([
//     { $project: { _id: 0, examScore: { $slice: ["$examScores", 2, 1] } } }
//   ]).pretty();

// LENGTH OF THE Array
// db.friends.aggregate([
//     { $project: { _id: 0, numScores: { $size: "$examScores" } } }
//   ]).pretty();


// FilTER
// db.friends.aggregate([
//     {
//       $project: {
//         _id: 0,
//         scores: { $filter: { input: '$examScores', as: 'sc', cond: { $gt: ["$$sc.score", 60] } } }
//       }
//     }
//   ]).pretty();


// MULTIPLE OPERATIONS IN AN Array
// db.friends.aggregate([
//     { $unwind: "$examScores" },
//     { $project: { _id: 1, name: 1, age: 1, score: "$examScores.score" } },
//     { $sort: { score: -1 } },
//     { $group: { _id: "$_id", name: { $first: "$name" }, maxScore: { $max: "$score" } } },
//     { $sort: { maxScore: -1 } }
//   ]).pretty();

// BUCKET
// db.persons
//   .aggregate([
//     {
//       $bucket: {
//         groupBy: '$dob.age',
//         boundaries: [18, 30, 40, 50, 60, 120],
//         output: {
//           numPersons: { $sum: 1 },
//           averageAge: { $avg: '$dob.age' }
//         }
//       }
//     }
//   ])
//   .pretty();

// db.persons.aggregate([
//     {
//       $bucketAuto: {
//         groupBy: '$dob.age',
//         buckets: 5,
//         output: {
//           numPersons: { $sum: 1 },
//           averageAge: { $avg: '$dob.age' }
//         }
//       }
//     }
//   ]).pretty();


// SKIP & LIMIT
// db.persons.aggregate([
//     { $match: { gender: "male" } },
//     { $project: { _id: 0, gender: 1, name: { $concat: ["$name.first", " ", "$name.last"] }, birthdate: { $toDate: "$dob.date" } } },
//     { $sort: { birthdate: 1 } },
//     { $skip: 10 },
//     { $limit: 10 }
//   ]).pretty();

// PIPELINES RESULT IN NEW COLLECTIONS
// db.persons.aggregate([
//     {
//       $project: {
//         _id: 0,
//         name: 1,
//         email: 1,
//         birthdate: { $toDate: '$dob.date' },
//         age: "$dob.age",
//         location: {
//           type: 'Point',
//           coordinates: [
//             {
//               $convert: {
//                 input: '$location.coordinates.longitude',
//                 to: 'double',
//                 onError: 0.0,
//                 onNull: 0.0
//               }
//             },
//             {
//               $convert: {
//                 input: '$location.coordinates.latitude',
//                 to: 'double',
//                 onError: 0.0,
//                 onNull: 0.0
//               }
//             }
//           ]
//         }
//       }
//     },
//     {
//       $project: {
//         gender: 1,
//         email: 1,
//         location: 1,
//         birthdate: 1,
//         age: 1,
//         fullName: {
//           $concat: [
//             { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
//             {
//               $substrCP: [
//                 '$name.first',
//                 1,
//                 { $subtract: [{ $strLenCP: '$name.first' }, 1] }
//               ]
//             },
//             ' ',
//             { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
//             {
//               $substrCP: [
//                 '$name.last',
//                 1,
//                 { $subtract: [{ $strLenCP: '$name.last' }, 1] }
//               ]
//             }
//           ]
//         }
//       }
//     },
//     { $out: "transformedPersons" }
//   ]).pretty();

// $GEONEAR
// db.transformedPersons.aggregate([
//     {
//       $geoNear: {
//         near: {
//           type: 'Point',
//           coordinates: [-18.4, -42.8]
//         },
//         maxDistance: 1000000,
//         num: 10,
//         query: { age: { $gt: 30 } },
//         distanceField: "distance"
//       }
//     }
//   ]).pretty();

