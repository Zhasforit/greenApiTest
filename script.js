function getInputs() {
  const id = document.getElementById("idInstance").value.trim();
  const token = document.getElementById("apiTokenInstance").value.trim();

  if (!id || !token) {
    alert("Пожалуйста, введите idInstance и ApiTokenInstance.");
    throw new Error("idInstance или ApiTokenInstance не указаны.");
  }

  return { id, token };
}

function showResponse(data) {
  document.getElementById("responseField").textContent = JSON.stringify(data, null, 2);
}

async function getSettings() {
  const { id, token } = getInputs();
  const res = await fetch(`https://api.green-api.com/waInstance${id}/getSettings/${token}`);
  const data = await res.json();
  showResponse(data);
}

async function getStateInstance() {
  const { id, token } = getInputs();
  const res = await fetch(`https://api.green-api.com/waInstance${id}/getStateInstance/${token}`);
  const data = await res.json();
  showResponse(data);
}

async function sendMessage() {
  const { id, token } = getInputs();
  const phone = document.getElementById("phoneNumber").value.trim();
  const message = document.getElementById("messageText").value.trim();

  const res = await fetch(`https://api.green-api.com/waInstance${id}/sendMessage/${token}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      chatId: `${phone}@c.us`,
      message
    })
  });
  const data = await res.json();
  showResponse(data);
}

async function sendFileByUrl() {
  const { id, token } = getInputs();
  const phone = document.getElementById("phoneNumberFile").value.trim();
  const url = document.getElementById("fileUrl").value.trim();

  const res = await fetch(`https://api.green-api.com/waInstance${id}/sendFileByUrl/${token}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      chatId: `${phone}@c.us`,
      urlFile: url,
      fileName: url.split('/').pop()
    })
  });
  const data = await res.json();
  showResponse(data);
}
