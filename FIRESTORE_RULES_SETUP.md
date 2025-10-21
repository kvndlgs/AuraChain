# Firestore Security Rules - Deployment Guide

## Overview
This guide explains how to deploy the Firestore security rules to your Firebase project to secure your database.

## What are Firestore Security Rules?
Security rules control who can read and write data to your Firestore database. They run on Firebase servers and ensure data security even if someone bypasses your frontend code.

## Deployment Methods

### Method 1: Firebase Console (Recommended for First-Time Setup)

1. **Open Firebase Console**
   - Go to https://console.firebase.google.com/
   - Select your project: `aurachain-de2b1`

2. **Navigate to Firestore Rules**
   - In the left sidebar, click on **Firestore Database**
   - Click on the **Rules** tab at the top

3. **Copy the Rules**
   - Open the `firestore.rules` file in this project
   - Copy the entire contents

4. **Paste into Console**
   - Delete the existing rules in the Firebase Console
   - Paste the new rules from `firestore.rules`

5. **Publish**
   - Click the **Publish** button
   - Rules will be deployed in a few seconds

6. **Verify**
   - You should see "Last updated: a few seconds ago"
   - Rules are now active!

### Method 2: Firebase CLI (For Automated Deployment)

1. **Install Firebase CLI** (if not already installed)
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase** (if not already done)
   ```bash
   firebase init firestore
   ```
   - Select your project
   - Use `firestore.rules` as the rules file
   - Decline creating indexes file if asked

4. **Deploy Rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

5. **Verify**
   - Check the console output for success message
   - Or visit Firebase Console to verify

## Security Rules Breakdown

### Users Collection (`/users/{userId}`)
```
✅ Users can read their own profile
✅ Users can create their own profile
✅ Users can update their own profile
❌ Users cannot delete profiles
```

### Schools Collection (`/schools/{schoolId}`)
```
✅ All authenticated users can read schools
✅ Only admins can create schools
✅ Only school admin can update their school
❌ Only school admin can delete their school
```

### Teachers Collection (`/teachers/{teacherId}`)
```
✅ Teachers can read their own profile
✅ Teachers can create their own profile (must match userId)
✅ Teachers can update their own profile
❌ Cannot delete teacher profiles
```

### Students Collection (`/students/{studentId}`)
```
✅ Students can read their own profile
✅ Teachers can read all student profiles
✅ Students can create their own profile
✅ Students can update their own profile
❌ Cannot delete student profiles
```

### Default Auras (`/meriits/{auraid}`)
```
✅ All authenticated users can read
✅ Only admins can create/modify default auras
```

### Custom Auras (`/customauras/{customauraid}`)
```
✅ All authenticated users can read
✅ Teachers can create custom auras (must be the creator)
✅ Teachers can update their own custom auras
✅ Teachers can delete their own custom auras
```

### Awarded Auras (`/awardedauras/{awardId}`)
```
✅ Students can read auras awarded to them
✅ Teachers can read auras they issued
✅ Admins can read all awarded auras
✅ Only active teachers can create new awards
❌ Auras cannot be modified after creation (immutable)
❌ Auras cannot be deleted (permanent record)
```

### Collections (`/collections/{collectionId}`)
```
✅ All authenticated users can read
✅ Teachers and admins can create collections
✅ Creators can update their collections
✅ Creators can delete their collections
```

## Testing Security Rules

### Test in Firebase Console

1. Go to **Firestore Database** > **Rules** tab
2. Click on **Rules Playground** (if available)
3. Test different scenarios:

**Example: Student Reading Their Own Profile**
```
Operation: get
Path: /users/abc123
Auth: { uid: 'abc123' }
Expected: ✅ Allow
```

**Example: Student Reading Another User's Profile**
```
Operation: get
Path: /users/xyz789
Auth: { uid: 'abc123' }
Expected: ❌ Deny
```

### Test in Your Application

After deploying rules, test these scenarios in your app:

1. **Sign up as a student** → Should create profile successfully
2. **Try to read another user's profile** → Should fail
3. **Sign up as a teacher** → Should create teacher profile
4. **Teacher tries to award aura** → Should succeed
5. **Student tries to award aura** → Should fail

## Troubleshooting

### Error: "Missing or insufficient permissions"
- **Cause**: User doesn't have permission for the operation
- **Fix**: Check if user is authenticated and has correct role

### Error: "PERMISSION_DENIED"
- **Cause**: Security rules are blocking the operation
- **Fix**: Verify the rules match your intended access patterns
- **Debug**: Check Firebase Console > Firestore > Usage tab for denied requests

### Error: "Document doesn't exist"
- **Cause**: Trying to access a document that hasn't been created
- **Fix**: Ensure user profile is created after signup

### Rules Not Working After Deployment
- **Wait**: Rules can take a few seconds to propagate
- **Refresh**: Close and reopen your app
- **Clear Cache**: Clear browser cache and try again
- **Verify**: Check Firebase Console that rules were published

## Best Practices

1. **Always Authenticate**: All rules require authentication (`isAuthenticated()`)
2. **Validate Data**: Use `request.resource.data` to validate incoming data
3. **Least Privilege**: Grant minimum permissions needed
4. **No Deletions**: Prevent deletion of important records (users, auras)
5. **Immutable Records**: Auras cannot be modified after creation
6. **Test Thoroughly**: Test all user roles and edge cases

## Security Checklist

Before going to production:

- [ ] Rules deployed to Firebase
- [ ] Tested all user roles (teacher, student, parent, admin)
- [ ] Verified students can only see their own data
- [ ] Verified teachers can award auras
- [ ] Verified auras cannot be modified or deleted
- [ ] Verified unauthorized access is blocked
- [ ] Checked Firebase Console for rule violations

## Next Steps

1. Deploy these rules to Firebase
2. Test authentication flows
3. Verify all CRUD operations work as expected
4. Monitor Firebase Console > Usage for any security violations
5. Update rules as needed when adding new features

## Additional Resources

- [Firestore Security Rules Documentation](https://firebase.google.com/docs/firestore/security/get-started)
- [Security Rules Testing](https://firebase.google.com/docs/rules/unit-tests)
- [Common Security Patterns](https://firebase.google.com/docs/firestore/security/rules-conditions)
