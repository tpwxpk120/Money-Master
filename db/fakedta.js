import dotenv from 'dotenv';
import { MongoClient, ObjectId } from "mongodb"; 
dotenv.config();

const categorys = [
    'salary',
    'food',
    'tip',
    'project',
    'movie',
    'bills',
    'medical',
    'fee',
    'tax'
];
const types = [
    'income',
    'expense',
];
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
function randomCategory() {
    return categorys[Math.floor(Math.random() * categorys.length)];
}
function randomType() {
    return types[Math.floor(Math.random() * types.length)];
}
function randomAmount() {
    return Math.floor(Math.random() * 1000);
}
function randomNote() {
    return 'note';
}
function randomData(id) {
    return {
        date: String(randomDate(new Date(2020, 0, 1), new Date())),
        category: randomCategory(),
        type: randomType(),
        amount: randomAmount(),
        description: randomNote(),
        userId: id,
    };
}

function randomEmail() {
    return Math.random().toString(36).substring(2, 15) + '@gmail.com';
}
function randomPassword() {
    return Math.random().toString(36).substring(2, 15);
}
function randomName() {
    return Math.random().toString(36).substring(2, 15);
}

function randomUser() {
    return {
        name: randomName(),
        email: randomEmail(),
        password: randomPassword(),
    }   
}

const urlBase = 'https://money-master-kx3c.onrender.com/api/v1/'
const addusers = "https://money-master-kx3c.onrender.com/api/v1/user/register"
const adddata = "https://money-master-kx3c.onrender.com/api/v1/transactions/add-transection"
const getuserid = "https://money-master-kx3c.onrender.com/api/v1/user/login"
// fate 1 users
function addUsers() {
    fetch(addusers, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(randomUser()),
    })
        .then(response => {
            console.log(response.status);
            // return response.json();
        }
        )

}
// for (let i = 0; i < 1000; i++) {
//     addUsers();
//     // sleep(1000);
//     setTimeout(() => {
//         // console.log(i);
//     }, 1000);
// }
const mongoUrl = process.env.MONGO_URL;
const db = new MongoClient(mongoUrl);
const dbo = db.db("test");
const user_collection = dbo.collection("user");
const data_collection = dbo.collection("transections");

// fake 1000 users
// for (let i = 0; i < 500; i++) {
//     try {
//         user_collection.insertOne(randomUser());
//     }
//     catch (err) {
//         console.log(err);
//     }
    
// }
async function getusers() {
    let users = await user_collection.find({_id: new ObjectId('654af52e4bf2c079f45f69f4')}).limit(3);
    return users.toArray();
}
// console.log(getusers());

async function showusers() {
    let users = await getusers();
    console.log(users);
}
// showusers();

showusers();

// // fake 1000 data for 200 users
// for (let i = 0; i < 2; i++) {
//     try {
//         user_id = user_collection.find({}).limit(200).toArray();
//         console.log(user_id);
//         // console.log(user_id);
//         // for (let j = 0; j < 1000; j++) {
//         //     //get user id as stirng
//         //     const id = user_id['$oid'];
//         //     var datas = [];
//         //     for (let k = 0; k < 1000; k++) {
//         //         datas.push(randomData(id));
//         //     }
//         //     data_collection.insertMany(datas);
//         // }
//     }
//     catch (err) {
//         console.log(err);
//     }
    
// }

