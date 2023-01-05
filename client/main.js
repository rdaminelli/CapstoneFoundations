const flashcards = document.getElementsByClassName("flashcards")[0];
const createBox = document.getElementsByClassName("create-box")[0];
const question = document.getElementById("question");
const answer = document.getElementById("answer");

function hideCreateBox(){
    createBox.style.display = "none"
}

function showCreateCardBox(){
    createBox.style.display = "block"
}

const displayFlashcards = (arr) => {
    flashcards.innerHTML = ``;
    arr.map(flashcard => {
        var card = document.createElement('div');
        card.className = "flashcard";

        var delCardBtn = document.createElement('div')
        delCardBtn.innerHTML = `<button style="float:right; padding:5px" onclick="deleteCard(${flashcard.id})">X</button>`
        card.appendChild(delCardBtn)

        var h2_question = document.createElement("h2");
        h2_question.setAttribute("style", "border-top:1px solid red; padding:15px; margin-top:30px");
        h2_question.innerHTML = flashcard.question;
        card.appendChild(h2_question);

        var h2_answer = document.createElement("h2");
        h2_answer.setAttribute("style", "text-align:center; display:none; color:red");
        h2_answer.innerHTML = flashcard.answer;
        card.appendChild(h2_answer);

        card.addEventListener("click", () => {
            if(h2_answer.style.display === "none"){
                h2_answer.style.display = "block";
            } else {
                h2_answer.style.display = "none";
            }
        })

        flashcards.appendChild(card);
    })
}

const getFlashcards = () => {
    axios.get("http://localhost:4004/api/flashcards/")
    .then(res => displayFlashcards(res.data))
    .catch(err => console.log(err))
}

const addFlashcard = (event) => {
    event.preventDefault();
    let body = {
        question: question.value,
        answer: answer.value
    };
    axios.post("http://localhost:4004/api/flashcards/", body)
    .then(res => displayFlashcards(res.data))
    .catch(err => console.log(err))
    
    question.value = "";
    answer.value = "";
}

const delFlashcards = () => {
    axios.delete("http://localhost:4004/api/flashcards/")
    .then(res => displayFlashcards(res.data))
    .catch(err => console.log(err))
}

const deleteCard = (id) => {
    axios.delete(`http://localhost:4004/api/flashcards/${id}`)
    .then(res => displayFlashcards(res.data))
    .catch(err => console.log(err))
}
