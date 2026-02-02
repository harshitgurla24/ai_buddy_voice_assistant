# 🚀 Vercel Deployment Guide - AI Buddy

## 📋 Prerequisites
1. ✅ GitHub account
2. ✅ Vercel account (sign up at vercel.com)
3. ✅ Groq API key

---

## 🔧 Step-by-Step Deployment

### Step 1: Prepare Your Code

**1.1 Create GitHub Repository**
```bash
# Open terminal in project folder
cd "C:\Users\NG 16\OneDrive\Desktop\beginning_react\ai_buddy"

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - AI Buddy Voice Assistant"
```

**1.2 Push to GitHub**
```bash
# Create new repository on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/ai-buddy.git
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy on Vercel

**2.1 Login to Vercel**
- Go to https://vercel.com
- Click "Sign Up" or "Login"
- Use GitHub to login

**2.2 Import Project**
1. Click **"Add New..."** → **"Project"**
2. Select **"Import Git Repository"**
3. Find your **"ai-buddy"** repo
4. Click **"Import"**

**2.3 Configure Build Settings**
- **Framework Preset**: Vite
- **Root Directory**: `./` (leave as is)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

**2.4 Add Environment Variables**
Click **"Environment Variables"** and add:

```
Name: VITE_OPENAI_API_KEY
Value: your-groq-api-key-here
```

**Important**: ✅ Check all environments (Production, Preview, Development)

**2.5 Deploy**
- Click **"Deploy"**
- Wait 2-3 minutes
- ✅ Done! You'll get a URL like: `https://ai-buddy-xyz.vercel.app`

---

### Step 3: Update Frontend Configuration (Optional)

If you want to use a custom domain or specific API URL:

**3.1 Add Custom Domain (Optional)**
1. Go to project settings
2. Click "Domains"
3. Add your custom domain

**3.2 Environment Variable for API**
Add this in Vercel:
```
Name: VITE_API_URL
Value: https://your-project.vercel.app
```

---

## 🎯 Testing Your Deployment

1. **Open your Vercel URL**: `https://your-project.vercel.app`
2. **Test microphone** (allow permissions)
3. **Speak in English/Hindi/Hinglish**
4. **Verify AI responses**

---

## 🔑 Important Notes

### API Key Security
- ✅ **NEVER commit `.env` file to Git**
- ✅ Always use Vercel Environment Variables
- ✅ Groq API key is hidden in serverless function

### Speech Recognition
- ⚠️ **HTTPS Required**: Speech API only works on HTTPS
- ✅ Vercel provides HTTPS automatically
- ✅ Works on all browsers (Chrome, Edge recommended)

### Limitations
- 🔄 **Serverless timeout**: 10 seconds on free plan
- 💾 **No persistent backend**: Vercel functions are stateless
- ✅ **Chat history**: Saved in browser localStorage only

---

## 🛠️ Updating Deployment

**Push updates:**
```bash
git add .
git commit -m "Update: feature description"
git push origin main
```

Vercel will **automatically redeploy** within 1-2 minutes! 🚀

---

## 📱 Mobile Access

1. Copy your Vercel URL
2. Open on any mobile device
3. Works perfectly on iOS & Android!

---

## 🆘 Troubleshooting

### Issue: "API Key not configured"
**Solution**: Add `VITE_OPENAI_API_KEY` in Vercel Environment Variables

### Issue: "Speech recognition not working"
**Solution**: 
- Use HTTPS URL (Vercel provides)
- Allow microphone permissions
- Use Chrome or Edge browser

### Issue: "Failed to fetch"
**Solution**: 
- Check Vercel function logs
- Verify API key is correct
- Check Groq API credits

### Issue: Build failed
**Solution**:
```bash
# Test build locally first
npm run build

# If successful, push to GitHub
git push origin main
```

---

## 📊 Monitoring

**View Logs:**
1. Go to Vercel Dashboard
2. Select your project
3. Click "Functions" → "Logs"
4. See real-time API calls

**Analytics:**
- Vercel provides free analytics
- Track usage, performance, errors

---

## 💰 Pricing

**Vercel Free Plan:**
- ✅ Unlimited deployments
- ✅ HTTPS included
- ✅ 100GB bandwidth/month
- ✅ Serverless functions
- ✅ Perfect for personal projects!

**Groq API:**
- ✅ FREE tier available
- ✅ Very generous limits
- ✅ Fast responses

---

## 🎉 You're Done!

Your AI Voice Assistant is now **live on the internet**! 🌐

Share your URL with friends and family! 🚀📱

**Example URL**: `https://ai-buddy-xyz.vercel.app`
