import { User } from '@users/common';
import papa from 'papaparse';

export async function getCsvFromUsers(users: User[]) {
    return papa.unparse(users);
}

export async function exportUsers(users: User[]) {
    const csv = await getCsvFromUsers(users);
    const blob = new Blob([csv], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `users-${Date.now()}.csv`;
    link.href = url;
    link.click();
}
