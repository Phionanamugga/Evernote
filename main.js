// Check for Web Speech API support
const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let speechRecognition;

if (recognition) {
    speechRecognition = new recognition();
    speechRecognition.lang = 'en-US';
    speechRecognition.interimResults = false;
    speechRecognition.maxAlternatives = 1;

    speechRecognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('note-content').value += transcript;
    };

    speechRecognition.onerror = function(event) {
        alert('Speech recognition error: ' + event.error);
    };
} else {
    alert('Web Speech API is not supported in this browser.');
}

function startSpeechRecognition() {
    if (speechRecognition) {
        speechRecognition.start();
    } else {
        alert('Speech recognition is not supported.');
    }
}

function saveNote() {
    const content = document.getElementById('note-content').value;
    localStorage.setItem('noteContent', content);
    alert('Note saved!');
    
    // Fetch API Example
    const apiUrl = 'https://your-api-endpoint.com/save-note'; // Replace with your API endpoint

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ note: content })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Note saved on server:', data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function editNote() {
    document.getElementById('note-content').removeAttribute('readonly');
    alert('You can now edit the note.');
}

function deleteNote() {
    if (confirm('Are you sure you want to delete this note?')) {
        document.getElementById('note-content').value = '';
        localStorage.removeItem('noteContent');
        alert('Note deleted.');
    }
}

function saveAndClose() {
    saveNote(); // Save the note first
    window.history.back(); // Go back to the previous page
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
}

function shareNote() {
    const content = document.getElementById('note-content').value;
    const subject = encodeURIComponent('Check out my note');
    const body = encodeURIComponent(content);
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
}

function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            const photoPreview = document.getElementById('photo-preview');
            photoPreview.innerHTML = ''; // Clear previous previews
            photoPreview.appendChild(imgElement);
        };
        reader.readAsDataURL(file);
    }
}

// Load saved note content from localStorage
document.addEventListener("DOMContentLoaded", function() {
    const savedContent = localStorage.getItem('noteContent');
    if (savedContent) {
        document.getElementById('note-content').value = savedContent;
    }
});

