# Fix User Role Dashboard Redirect Issue

## Tasks to Complete

- [x] Fix loginUser in auth.ts to return user with role
- [x] Update Auth.tsx to navigate teacher to `/faculty-dashboard` after login/registration
- [x] Add `/faculty-dashboard` route in App.tsx with ProtectedRoute
- [x] Wrap dashboard routes in App.tsx with ProtectedRoute and appropriate allowedRoles
- [x] Test login/registration navigation for all roles
- [x] Test refresh behavior on each dashboard
- [x] Verify ProtectedRoute redirects work correctly
