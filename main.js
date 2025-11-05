class Book {
    constructor(title,author,year,id) {
        this.title=title
        this.author=author
        this.year=year
        this.id=id
    }

}

class BookManager {
    constructor() {
        this.books=JSON.parse(localStorage.getItem("books"))||[]
    }
    addBook(title,author,year){
   const newBook=new Book(title,author,year,Date.now())
        this.books.push(newBook)
       this.saveBook()
    }
    removeBook(id){
     this.books=this.books.filter(e=>e.id!==id)
     this.saveBook()
    }

    saveBook(){
        localStorage.setItem("books",JSON.stringify(this.books))
    }
}

const manager=new BookManager()
const titleInput=document.getElementById("title")
const authorInput=document.getElementById("author")
const yearInput=document.getElementById("year")
const addBtn=document.getElementById("addBtn")
const list=document.getElementById("list")

addBtn.addEventListener(("click"),()=>{
    const title=titleInput.value.trim()
    const author=authorInput.value.trim()
    const year=yearInput.value.trim()

    if(title===""||author===""||year===""){
        alert("Enter a valid information")
        return
    }

    manager.addBook(title,author,year)
    
    renderBooks();
    titleInput.value=""
    authorInput.value=""
    yearInput.value=""
})

function renderBooks() {
    list.innerHTML = "";

    manager.books.forEach(element => {
        const div=document.createElement("div")
        div.classList.add("book")
        const h3=document.createElement("h3")
        h3.textContent=element.title

        const h5=document.createElement("h5")
        h5.textContent=element.author

        const p=document.createElement("p")
        p.textContent=element.year

        const del=document.createElement("button")
        del.textContent="Delete"

        del.addEventListener("click", () => {
    manager.removeBook(element.id);
    renderBooks(); 
});
        div.append(h3,h5,p,del)
        list.append(div)
    });
}

renderBooks();
