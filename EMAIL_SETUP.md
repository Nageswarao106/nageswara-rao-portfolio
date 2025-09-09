# 📧 Email Setup Instructions

## Where Messages Will Be Sent

When someone fills out your contact form, the message will be sent to **your Gmail inbox** as an email notification.

## Setup Steps

### 1. Enable 2-Factor Authentication
- Go to your [Google Account](https://myaccount.google.com/)
- Click **Security** → **2-Step Verification**
- Enable 2-Step Verification if not already enabled

### 2. Generate App Password
- In Google Account → **Security** → **2-Step Verification**
- Scroll down to **App passwords**
- Click **Select app** → **Mail**
- Click **Select device** → **Other (Custom name)**
- Enter "Portfolio Contact Form"
- Click **Generate**
- **Copy the 16-character password** (you'll need this)

### 3. Create Environment File
Create a file called `.env.local` in your `app` folder with:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

**Replace:**
- `your-email@gmail.com` with your actual Gmail address
- `your-16-character-app-password` with the password from step 2

### 4. Deploy to Vercel
- Go to your Vercel project settings
- Click **Environment Variables**
- Add these variables:
  - `EMAIL_USER` = your Gmail address
  - `EMAIL_PASS` = your app password

## What Happens When Someone Contacts You

1. **User fills contact form** on your website
2. **Email is sent** to your Gmail inbox
3. **Subject line**: "Portfolio Contact: [their subject]"
4. **Reply-to**: Their email address (you can reply directly)
5. **Content**: Formatted with all their details and message

## Email Format

You'll receive a nicely formatted email with:
- ✅ Contact person's name and email
- ✅ Subject and timestamp
- ✅ Full message content
- ✅ Quick reply instructions
- ✅ Professional HTML formatting

## Testing

1. **Local testing**: Use `npm run dev` and test the contact form
2. **Production testing**: Deploy to Vercel and test the live form
3. **Check your Gmail** for the test message

## Troubleshooting

- **"Invalid login"**: Check your app password is correct
- **"Less secure app"**: Use App Password, not regular password
- **No emails received**: Check spam folder and environment variables

## Security Notes

- ✅ App passwords are safer than regular passwords
- ✅ Environment variables keep credentials secure
- ✅ Only you receive the emails
- ✅ Users can't see your email address

---

**Ready to receive messages!** 🚀
