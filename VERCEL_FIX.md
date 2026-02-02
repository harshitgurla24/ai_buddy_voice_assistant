# 🔧 Vercel Environment Variables Setup

## ⚠️ Error: "API key not configured on server"

Ye error aa raha hai kyunki Vercel pe environment variable properly set nahi hai.

---

## ✅ Solution - Step by Step:

### Step 1: Vercel Dashboard pe jao
1. https://vercel.com/dashboard
2. Apna project select karo: **ai_buddy_voice_assistant**
3. **Settings** tab pe click karo

### Step 2: Environment Variables add karo
1. Left sidebar mein **"Environment Variables"** pe click karo
2. **"Add New"** button dabao
3. Ye details bharo:

```
Name:  GROQ_API_KEY
Value: your-actual-groq-api-key-here
```

**Note:** `.env` file se apni real API key copy karo

4. **Environments** select karo (sab check karo):
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. **"Save"** button dabao

### Step 3: Redeploy karo
1. **"Deployments"** tab pe jao
2. Latest deployment pe **"..."** (three dots) click karo
3. **"Redeploy"** select karo
4. 2-3 minutes wait karo

### Step 4: Test karo
1. Apna Vercel URL kholo
2. Mic button click karo
3. Kuch bolo
4. ✅ Ab kaam karega!

---

## 🔑 Important Notes:

### Backend (Serverless Function):
- Variable name: **`GROQ_API_KEY`** (without VITE_ prefix)
- Location: Vercel Environment Variables

### Frontend (React):
- Variable name: **`VITE_OPENAI_API_KEY`** (with VITE_ prefix)
- Location: `.env` file (local only, not on Vercel)

---

## 🎯 Alternative: Use Both Variables

Agar dono names support karni hai, add both:

```
GROQ_API_KEY = your-api-key-here
VITE_OPENAI_API_KEY = your-api-key-here
```

---

## ✅ Verification:

After redeploying, check:
1. Open browser console (F12)
2. Try voice input
3. No errors should appear
4. AI should respond properly

---

## 🆘 Still Not Working?

1. **Check Vercel Function Logs:**
   - Dashboard → Your Project → Functions → Logs
   - Dekho kya error aa raha hai

2. **Verify API Key:**
   - https://console.groq.com/keys
   - Check if key is active
   - Generate new key if needed

3. **Check API Credits:**
   - Groq dashboard check karo
   - Free tier limits check karo

---

✅ Ab redeploy karne ke baad kaam karega!
