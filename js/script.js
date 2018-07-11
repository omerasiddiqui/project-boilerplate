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
    const categoryInput = $('#categoryInput');


    $('.menu').on("submit", function(e) {
        e.preventDefault();
        const name = nameInput.val();
        const price = priceInput.val();
        const comboNum = parseInt(numberInput.val());
        const description = descriptionInput.val();
        const category = categoryInput.val();
        const message = {
            comboNum,
            price,
            name,
            description,
            category
        }
        // This is where we add the messages to firebase;
        app.menu.update(message);

        // Empty input fields
        $('#nameInput').val("");
        $('#priceInput').val("");
        $('#numberInput').val("");
        $('#descriptionInput').val("");
    });

    app.menu.orderByChild("comboNum").on('child_added', function(messages) {
        const data = messages.val();
        const name = data.name;
        const comboNum = data.comboNum
        const price = data.price;
        const description = data.description;
        const key = messages.key;
        const li = `<li class="full" id="key-${key}">
                    <div class="inputField">
                            <input type='text' class="listInputFields listNumberInput" value='${comboNum}'>
                    </div>
                    <div class="inputField">
                            <input type='text' class="listInputFields listPriceInput" value='${name}'>
                    </div>
                    <div class="inputField">
                            <input type='text' class="listInputFields listNameInput" value='${price}'>
                    </div>
                    <div class="inputField">
                            <input type='text' class="listInputFields listDescriptionInput" value='${description}'>
                    </div>
                    <div class='quarter'>
                        <button class="delete" id="${key}"><i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    </li>`;
                    messageList.append(li);
                    updateFirebase(key)
;
    })

    // update firebase
    var updateFirebase = function(key) {
        console.log(key)
        const nameInputs = $(`ul #key-${key} .listNameInput`);
        const priceInputs = $(`ul #key-${key} .listPriceInput`);
        const numberInputs = $('.listNumberInput');
        const descriptionInputs = $('.listDescriptionInput');

        const name = nameInputs.val();
        const price = priceInputs.val();
        const comboNum = parseInt(numberInputs.val());
        const description = descriptionInputs.val();

        console.log(name, price)

        const data = {
            name: name,
            price: price,
            comboNum: comboNum,
            description: description
        }

        app.menu.update(data)
        
    }

    $('#save').on("click", function(e){
        updateFirebase();
    });

    

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