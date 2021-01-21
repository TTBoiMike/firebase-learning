const list = document.querySelector('ul')
const form = document.querySelector('form')

let createUserHTML = (user) => {
    // let time = user.created_at.toDate()
    let html = `
        <li>
            <div>
                ${user.username}
            </div>    
            <div>
                ${user.age}
            </div>
        </li>
    `
    list.innerHTML += html
}

// get the users collection from database (return promise)
db.collection('users').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data())
        createUserHTML(doc.data())
    })
}).catch(err => {
    console.log(err)
})

// add documents
form.addEventListener(('submit'), (e) => {
    e.preventDefault()
    const now = new Date()
    const recipe = {
        username: form.username.value,
        age: form.age.value,
        created_at: firebase.firestore.Timestamp.fromDate(now)
    }
    // add new document to a collection - returns a promise
    db.collection('users').add(recipe).then(() => {
        console.log("added to db")
    }).catch(err => {
        console.log(err)
    })
})