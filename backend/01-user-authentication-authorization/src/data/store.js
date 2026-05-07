export const users = [
  { id: 1, name: 'Maya Khan', email: 'maya@demo.app', password: 'SecurePass!23', role: 'admin', otp: '482901' },
  { id: 2, name: 'Ali Raza', email: 'ali@demo.app', password: 'EditorPass!23', role: 'editor', otp: '183024' },
];

export const rolePermissions = {
  admin: ['users:read', 'users:write', 'audit:read'],
  editor: ['content:read', 'content:write'],
  user: ['profile:read', 'profile:write'],
};
