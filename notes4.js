const noteArea = document.getElementById("noteArea");
const redoBtn = document.getElementById("redoBtn");
const shareBtn = document.getElementById("shareBtn")
const saveBtn = document.getElementById("saveBtn");

// For undo/redo functionality
let undoStack = [];
let redoStack = [];

