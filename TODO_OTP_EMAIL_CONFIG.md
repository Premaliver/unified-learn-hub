# OTP Email Configuration Setup

## Issue
Currently, the registration system sends "demo OTP" instead of real emails to user accounts.

## Root Cause
Supabase is configured to send demo emails in development mode instead of real SMTP emails.

## Solution Steps

### 1. Set Up Email Service Provider
- [ ] Choose email service (SendGrid recommended for ease of use)
- [ ] Create account at sendgrid.com
- [ ] Verify your email address
- [ ] Create API key with "Full Access" permissions
- [ ] Copy the API key (keep it secure)

### 2. Configure Supabase SMTP
- [ ] Go to Supabase Dashboard → Authentication → Email Templates
- [ ] Click "Enable custom SMTP"
- [ ] Enter SMTP settings:
  - Host: `smtp.sendgrid.net`
  - Port: `587`
  - Username: `apikey`
  - Password: `[Your SendGrid API Key]`
  - From Email: `[Your verified sender email]`

### 3. Test Configuration
- [ ] Register a new user in the app
- [ ] Check if real OTP email is received
- [ ] Verify OTP works for account verification

### 4. Alternative: Use Gmail SMTP
If SendGrid doesn't work:
- [ ] Enable 2-factor authentication on Gmail
- [ ] Generate App Password
- [ ] Use these SMTP settings:
  - Host: `smtp.gmail.com`
  - Port: `587`
  - Username: `[Your Gmail address]`
  - Password: `[App Password]`

## Security Notes
- Never commit API keys or passwords to repository
- Use environment variables for sensitive data
- Consider using Supabase's built-in email service for production

## Files to Update (if needed)
- `.env` - Add email configuration variables
- Consider adding email service configuration to environment

## Testing Checklist
- [ ] New user registration sends real OTP
- [ ] OTP email contains correct 6-digit code
- [ ] OTP verification works properly
- [ ] Password reset emails work (if implemented)
