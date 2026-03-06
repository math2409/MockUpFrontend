var msgs = [
  { "msg": "Hello World", "user": "System", "date": new Date().toLocaleString() },
  { "msg": "Blah Blah", "user": "System", "date": new Date().toLocaleString() },
  { "msg": "I love cats", "user": "System", "date": new Date().toLocaleString() }
];

function update(tab) {
  const messageList = document.getElementById('messages-list');
  messageList.innerHTML = '';
  
  tab.forEach(m => {
    const div = document.createElement('div');
    div.className = 'message-item';
    
    div.innerHTML = `
      <div class="message-meta">
        <span class="message-user">${m.user || 'Anonymous'}</span>
        <span class="message-date">${m.date || ''}</span>
      </div>
      <div class="message-content">${m.msg}</div>
    `;
    messageList.appendChild(div);
  });
}

// Event Listeners
document.getElementById('post-btn').addEventListener('click', () => {
  const textInput = document.getElementById('message-text');
  const userInput = document.getElementById('username');
  
  if (textInput.value.trim() === '') return;

  const newMsg = {
    msg: textInput.value,
    user: userInput.value || 'Anonymous',
    date: new Date().toLocaleString()
  };

  msgs.push(newMsg);
  update(msgs);
  
  textInput.value = '';
});

document.getElementById('refresh-btn').addEventListener('click', () => {
  update(msgs);
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.textContent = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
});

// Initial display
update(msgs);
