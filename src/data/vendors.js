const vendors = [
 {
 id: 'ivory-cafe',
 name: 'Ivory Cafe',
 location: 'KICT, Ground Floor',
 openHours: '9:30 am - 10:00 pm',
 isOpen: true,
 menu: [
 { id: 'my-1', name: 'Chocolate Brownie', description: '...', price: 7, category: 'Pastries',
available: true },
 { id: 'my-2', name: 'Strawberry Cheesecake', description: '...', price: 10, category:
'Pastries', available: false },
 { id: 'my-3', name: 'Cafe Latte', description: '...', price: 6, category:
'Drinks', available: true },
 ],
 },
 {
 id: 'kafe-aminah',
 name: 'Kafe Mahallah Aminah',
 location: 'Mahallah Aminah, Ground Floor',
 openHours: '8:00 am - 9:00 pm',
 isOpen: true,
 menu: [
 { id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal and rice', price: 9, category: 'Rice', available: true },
 { id: 'ami-2', name: 'Air Bandung', description: 'Rose syrup with milk', price:
3, category: 'Drinks', available: true },
 ],
 },
]
export default vendors