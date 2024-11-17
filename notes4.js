const noteArea = document.getElementById("noteArea");
const redoBtn = document.getElementById("redoBtn");
const shareBtn = document.getElementById("shareBtn")
const saveBtn = document.getElementById("saveBtn");

// For undo/redo functionality
let undoStack = [];
let redoStack = [];

noteArea.addEventListener("input", () => {
    undoStack.push(noteArea.innerHTML);
});

redoBtn.addEventListener("click", ()=>{
    if (undoStack.length > 0){
        const lastEdit = undoStack.pop();
        redoStack.push(noteArea.innerHTML);
    }
})