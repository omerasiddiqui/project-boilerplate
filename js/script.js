const app = {};

app.config = () => {
// Initialize Firebase
      var config = {
        apiKey: "AIzaSyCSKPuAA3L0Q9jFyz_4HKf91_KYL1T2fZk",
        authDomain: "sams-1765b.firebaseapp.com",
        databaseURL: "https://sams-1765b.firebaseio.com",
        projectId: "sams-1765b",
        storageBucket: "",
        messagingSenderId: "342573480529"
        };
  firebase.initializeApp(config);
  app.database = firebase.database();
  app.menu = app.database.ref('/menu')
}

// Initialize app
app.init = () => {
    const messageList = $('.messages');
    const numberInput = $('#numberInput');
    const priceInput = $('#priceInput');
    const nameInput = $('#nameInput');
    const descriptionInput = $('#descriptionInput');


    $('.menu').on("submit", function(e) {
        e.preventDefault();
        const name = nameInput.val();
        const price = priceInput.val();
        const comboNum = numberInput.val();
        const description = descriptionInput.val();
        const message = {
            comboNum,
            name,
            price,
            description
        }
        // This is where we add the messages to firebase;
        app.menu.push(message);
        
        // Empty input fields
        $('#nameInput').val("");
        $('#priceInput').val("");
        $('#numberInput').val("");
        $('#descriptionInput').val("");
    });

    app.menu.limitToLast(10).on('child_added', function(messages) {
        const data = messages.val();
        const name = data.name;
        const comboNum = data.comboNum
        const price = data.price;
        const description = data.description;
        const key = messages.key;
        const li = `<li class="full" id="key-${key}">
                    <div class='quarter'>
                        <strong>${comboNum}</strong>
                        <p>$${price}</p>
                    </div>
                    <div class='quarter'>
                        <p>${name}</p>
                    </div>
                    <div class='quarter'>
                        <p class="desc">${description}</p>
                    </div>
                    <div class='quarter'>
                        <button class="delete" id="${key}"><i class="fas fa-times-circle"></i></button>
                    </div>
                    </li>`;
                    messageList.append(li);
                    messageList[0].scrollTop = messageList[0].scrollHeight;
    })

    $('ul').on('click', '.delete', function() {
        const id = $(this).attr('id');
        app.database.ref(`/menu/${id}`).remove();
    })

    app.menu.limitToLast(10).on('child_removed', function(messages) {
        console.log(messages.key)
        messageList.find(`#key-${messages.key}`).remove();
    })
}

// Document ready
$(function() {
    app.config();
    app.init();
})

// {
//     id: 1,
//     name: "Single Burger",
//     description: "A delicious burger",
//     price: "5.99"
//   },
//   {
//     id: 2,
//     name: "Double Burger",
//     description: "A delicious burger with 2 patties",
//     price: "6.99"
//   },
//   {
//     id: 3,
//     name: "Philly Cheesesteak",
//     description: "A delicious philly cheesesteak",
//     price: "6.99"
//   },
//   {
//     id: 4,
//     name: "Philly Chicken",
//     description: "A delicious Philly Chicken",
//     price: "6.99"
//   },
//   {
//     id: 5,
//     name: "Salad",
//     description: "A good salad",
//     price: "5.69"
//   },
//   {
//     id: 6,
//     name: "Chicken",
//     description: "Good chicken",
//     price: "3.29"
//   },
//   {
//     id: 7,
//     name: "chicken nuggets",
//     description: "delicious chicken nuggets",
//     price: "3.99"
//   }
// ]

