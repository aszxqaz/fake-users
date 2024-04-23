export type UserData = {
    id: string;
    fullname: string;
    address: string;
    phone: string;
};

export const item: UserData = {
    id: '0bf28f4b-ed3a-4fbe-8331-9558c14201b7',
    fullname: 'Peter Mustermann',
    address: 'Brandenburgische Straße 98, Berlin Neukoln, Germant',
    phone: '502-110-23-43',
};

let items = [
    item,
    item,
    item,
    item,
    item,
    item,
    item,
    item,
    item,
    item,
    item,
    item,
    item,
    item,
    item,
    item,
    item,
    item,
    item,
    item,
];

// items = items.concat([...items, ...items]);

export { items };
