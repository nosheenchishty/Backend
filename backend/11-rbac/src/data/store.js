export const roles = {
  admin: ['users.read', 'users.write', 'reports.read', 'settings.write'],
  manager: ['users.read', 'reports.read'],
  support: ['users.read', 'tickets.write'],
};

export const users = [
  { id: 1, name: 'Maya Khan', role: 'admin' },
  { id: 2, name: 'Ali Raza', role: 'manager' },
  { id: 3, name: 'Sana Noor', role: 'support' },
];
