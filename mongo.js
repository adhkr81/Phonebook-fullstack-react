const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const user = process.argv[3]
const phoneNumber = process.argv[4]



const url = `mongodb+srv://adhkr:${password}@cluster0.q7n1fgq.mongodb.net/phoneBook?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phone = mongoose.model('Phone', noteSchema)


if (password.length > 0 && !user && !phoneNumber) {
    mongoose
    .connect(url)
    .then((result) => {
      console.log('connected')
  
  
      Phone.find({})
      .then(result => {
      result.forEach(current => {
        console.log(current)
      })
      mongoose.connection.close()
    })
  
    })
    .catch((err) => console.log(err))
}





mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const phone = new Phone({
      name: user,
      number: phoneNumber,
    })

    return phone.save()
  })
  .then(() => {
    console.log(`added ${user} number ${phoneNumber} to phonebook`)
    return mongoose.connection.close()

  })
  .catch((err) => console.log(err))







