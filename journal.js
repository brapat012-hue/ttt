let totalPoints = parseInt(localStorage.getItem('journalPoints')) || 0;
document.getElementById('points').textContent = "Total Points: " + totalPoints;

document.getElementById('submitBtn').addEventListener('click', submitEntry);


document.getElementById('clearBtn').addEventListener('click', clearEntries);

function submitEntry() {
  const entryText = document.getElementById('journalEntry').value.trim();
  const messageDiv = document.getElementById('message');

  if (entryText === "") {
    messageDiv.textContent = "Please write something before submitting!";
    return;
  }

  const entry = {
    text: entryText,
    date: new Date().toLocaleString()
  };

  const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  entries.unshift(entry);
  localStorage.setItem('journalEntries', JSON.stringify(entries));

  totalPoints += 10;
  localStorage.setItem('journalPoints', totalPoints);

  messageDiv.textContent = "🌟 Great job reflecting today! You earned 10 points.";
  document.getElementById('points').textContent = "Total Points: " + totalPoints;

  document.getElementById('journalEntry').value = "";
  displayEntries();
}

function displayEntries() {
  const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
  const entryList = document.getElementById('entryList');
  entryList.innerHTML = "";

  entries.forEach(entry => {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');
    entryDiv.innerHTML = `
      <div class="date">${entry.date}</div>
      <div class="text">${entry.text}</div>
    `;
    entryList.appendChild(entryDiv);
  });
}


function clearEntries() {
  if (confirm("Are you sure you want to clear all your journal entries and reset points?")) {
    localStorage.removeItem('journalEntries');
    localStorage.removeItem('journalPoints');
    totalPoints = 0;
    document.getElementById('points').textContent = "Total Points: " + totalPoints;
    document.getElementById('entryList').innerHTML = "";
    document.getElementById('message').textContent = "All entries cleared.";
  }
}


displayEntries();
