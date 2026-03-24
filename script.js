function fact(n) {
  let prod = 1;
  for (let i = 1; i <= n; i++) {
    prod *= i;
  }
  return prod;
}

function applique(f, tab) {
  return tab.map(f);
}

// Structure avec métadonnées : pseudo + date
var msgs = [];

function formatDate(date) {
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function update(tab) {
  const messageList = document.querySelector('.list');
  messageList.innerHTML = '';
  applique((t) => {
    const li = document.createElement('li');
    li.className = 'message-item';

    const meta = document.createElement('div');
    meta.className = 'message-meta';

    const userSpan = document.createElement('span');
    userSpan.className = 'message-user';
    userSpan.textContent = t.user || 'Anonyme';

    const dateSpan = document.createElement('span');
    dateSpan.textContent = t.date ? formatDate(t.date) : '';

    meta.appendChild(userSpan);
    meta.appendChild(dateSpan);

    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = t.msg;

    li.appendChild(meta);
    li.appendChild(content);
    messageList.appendChild(li);
  }, tab);
}

function loadMessages() {
  fetch('https://b800f681-8147-4c5b-8ed9-65a5aecb2b88-00-1x53opyg88r7x.kirk.replit.dev/msg/getAll')
    .then(response => response.json())
    .then(data => {
      update(data);
    })
}

// Bouton Post : ajoute un message avec pseudo + date courante
const postBtn = document.getElementById('post-btn');
postBtn.addEventListener('click', () => {
  const pseudoInput = document.getElementById('pseudo-input');
  const messageInput = document.getElementById('message-input');

  const pseudo = pseudoInput.value.trim() || 'Anonyme';
  const text = messageInput.value.trim();

  if (!text) return;

  const encodedMsg = encodeURIComponent(text);

  fetch(`https://b800f681-8147-4c5b-8ed9-65a5aecb2b88-00-1x53opyg88r7x.kirk.replit.dev/msg/post/${encodedMsg}`)
    .then(response => response.json())
    .then(data => {
    console.log("Message envoyé, id :", data.id);
      loadMessages();
    })

  messageInput.value = '';
});

// Bouton Update : réaffiche la liste depuis la variable msgs (utile après modification console)
const updateBtn = document.getElementById('update-btn');
updateBtn.addEventListener('click', () => update(msgs));

// Bouton thème clair/sombre
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.textContent = '🌙 Dark';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️ Light';
  }
});

// Affichage initial
loadMessages()