# 🔗 Asana Integration Assignment

This project integrates with the Asana API to demonstrate a complete OAuth 2.0 PKCE authentication flow, secure webhook registration, and event handling for project-related updates.

## 🚀 Features

- ✅ OAuth 2.0 Authorization using PKCE
- ✅ Automatic Webhook Registration (with de-duplication check)
- ✅ Signature Verification for Incoming Webhooks
- ✅ Real-time Logging of Asana Events
- ✅ Session-based token management
- ✅ Fully written in modern ES Modules (ESM)

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- Axios
- Morgan
- Crypto
- Asana API
- dotenv for configuration

---

## 🛆 Installation

```bash
git clone https://github.com/your-username/asana-integration-assignment.git
cd asana-integration-assignment
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory and add the following:

```env
ASANA_CLIENT_ID=your_asana_client_id
ASANA_CLIENT_SECRET=your_asana_client_secret
ASANA_REDIRECT_URI=http://localhost:3000/oauth/callback
ASANA_PROJECT_GID=your_project_gid
ASANA_WORKSPACE_GID=your_workspace_gid
PORT=3000
```

---

## ▶️ Usage

### 1. Start the server:

```bash
npm run dev
```

### 2. Begin OAuth Flow

Visit:

```
http://localhost:3000/oauth/authorize
```

Authorize the app, and it will:

- Complete the token exchange
- Automatically register a webhook for the given project

---

### 3. Webhook Callback URL

Asana will send webhook events to:

```
POST http://<your-ngrok-url>/webhook/asana
```

Use [Ngrok](https://ngrok.com/) or similar to expose your local server:

```bash
ngrok http 3000
```

Update the callback URL in `registerWebhook()` logic with the live ngrok URL.

---

## 📥 Webhook Handling

Webhook events are validated using the `x-hook-secret` and `x-hook-signature` headers. Logs are printed in the console with details of each event:

```bash
📥 Received 1 event(s) from Asana:
1. Resource 1234567890 (task) - Action: changed
```

---

## ✅ TODO / Future Improvements

- [ ] Add database support to persist webhook secrets
- [ ] Refresh tokens on expiry
- [ ] Unit tests for webhook handler
- [ ] IP Whitelisting for security

---

## 👨‍💼 Author

- **Ayush Jain**  
- Project for Kroolo Asana Integration Assignment

---

## 📃 License

This project is licensed under the MIT License.