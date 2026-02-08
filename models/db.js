const fs = require('fs');
const path = require('path');

//นำทางไปยังdatabaseที่เราเก็บข้อมูล
const dbPath = path.join(__dirname, '../data/database.json');

//อ่านข้อมูล
exports.readData = () => {
    const rawData = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(rawData);
};

//บันทึกข้อมูล
exports.saveData = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};