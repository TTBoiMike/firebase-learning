const list = document.querySelector('ul')
const form = document.querySelector('form')

let createUserHTML = (user, id) => {
    let html = `
        <li data-id=${id}>
            <div>
                ${user.username}
            </div>    
            <div>
                ${user.age}
            </div>
            <button class="btn btn-danger btn-sm my-2">Delete</button>
        </li>
    `
    list.innerHTML += html
}

// get the users collection from database (return promise)
db.collection('users').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data())
        createUserHTML(doc.data(), doc.id)
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

// delete document from collection
list.addEventListener('click' , (e) =>{
    if(e.target.tagName == "BUTTON") {
        const id = e.target.parentElement.getAttribute('data-id')
        // deletr document by id (returns promise)
        db.collection('users').doc(id).delete().then(() => {
            console.log("recipe deleted")
        })
    }
})