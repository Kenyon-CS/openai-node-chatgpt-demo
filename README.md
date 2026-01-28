# OpenAI + Node.js demo (Express)

This small project runs a Node/Express server with a simple webpage.
You type a prompt, the server calls the OpenAI **Responses API**, and returns the model's answer.

This project is designed for **learning purposes**:
- how a browser talks to a server,
- how a server safely talks to an external API,
- and why **API keys must never be exposed to client-side code**.

---

## Prerequisites

- **Node.js 18+** (Node 20+ recommended)
- **npm** (comes with Node)
- An **OpenAI API key**
- Access to a terminal and a browser

---

## Getting an OpenAI API Key (Student Instructions)

You will need **your own API key**. This key is like a password:  
**do not share it** and **never put it in frontend JavaScript**.

### Step 1: Create an OpenAI Account
1. Go to: https://platform.openai.com/
2. Sign up using:
   - your email, or
   - Google / Microsoft login

### Step 2: Log in to the OpenAI Dashboard
After logging in, you should see the OpenAI developer dashboard.

### Step 3: Add Billing (Required)
OpenAI requires a **small prepaid balance** to use the API.

1. In the left menu, click **Billing**
2. Choose **Add payment method**
3. Add a credit/debit card
4. Add a **small prepaid balance** (e.g. $5)

> 💡 This demo uses *very little* credit.  
> A few dollars is plenty for class experiments.

If you skip this step, you may see errors like:
```
You exceeded your current quota
```

### Step 4: Create an API Key
1. Go to **API Keys**
2. Click **Create new secret key**
3. Copy the key immediately  
   (you won’t be able to see it again)

It will look something like:
```
sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## ⚠️ API Key Safety Rules (Very Important)

- **Never commit your API key to GitHub**
- **Never put it in browser JavaScript**
- **Only store it in `.env` files**
- Treat it like a password

If you accidentally expose a key:
1. Go back to **API Keys**
2. Delete the key immediately
3. Create a new one

---

## Project Setup

Clone the repository and install dependencies:

```bash
npm install
```
Copy the example environment file:
```
cp .env.example .env

```
Edit .env and paste your API key:
OPENAI_API_KEY=sk-your-key-here
``
## Running the Server

Use make to run the server on a port assigned to you:
```
make run PORT=41xx
```

(Replace 41xx with the port number you were given.)

Then open your browser to:
```
http://10.192.145.179:3000
```
