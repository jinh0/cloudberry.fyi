// IGNORE THIS FILE! It's useless

import mongoose, { Schema } from 'mongoose'

type Waiter = {
  uid: string
  email: string
  code: Uppercase<string>
  crn: number
  date?: Date
  status?: 'pending' | 'completed'
}

const schema = new Schema({
  uid: { type: String, required: true },
  email: { type: String, required: true },
  code: { type: String, required: true },
  crn: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
})

const Waiter = mongoose.model('Waiter', schema)

// function connectToDb() {
//   const uri = `mongodb+srv://jinh0:cloudberry123@cloudberry.yk6ww.mongodb.net/?retryWrites=true&w=majority`

//   mongoose.connect(uri)
// }

// connectToDb()

// const waiter = new Waiter<Waiter>({
//   crn: 1000,
//   email: 'lilan0213@gmail.com',
//   uid: 'something',
//   code: 'PSYC-213',
// })

// waiter.save()

export {}
