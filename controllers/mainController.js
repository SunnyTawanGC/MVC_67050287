const db = require('../models/db');

//รายการร้องเรียนทั้งหมด
exports.getIndex = (req, res) => {
    const data = db.readData();
    const complaints = data.complaints.map(c => {
        const stall = data.stalls.find(s => s.id == c.stallId);
        return { 
            ...c, 
            stallName: stall ? stall.name : 'ไม่พบชื่อร้าน' 
        };
    });
    complaints.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.render('index', { complaints });
};

//รายละเอียดการร้องเรียน
exports.getDetail = (req, res) => {
    const data = db.readData();
    const id = parseInt(req.params.id);
    const complaint = data.complaints.find(c => c.id === id);

    if (!complaint) return res.redirect('/');

    const stall = data.stalls.find(s => s.id == complaint.stallId);
    const canteen = data.canteens.find(ct => ct.id == stall.canteenId);

    res.render('detail', { 
        c: complaint,
        stallName: stall.name,
        canteenName: canteen.name
    });
};

//บันทึกการตอบกลับ
exports.postResponse = (req, res) => {
    const data = db.readData();
    const id = parseInt(req.body.complaintId);
    const message = req.body.message;

    const complaint = data.complaints.find(c => c.id === id);
    if (complaint) {
        complaint.responses.push({
            date: new Date().toISOString().split('T')[0],
            message: message
        });
        complaint.status = "ดำเนินการแล้ว";
        db.saveData(data);
    }
    res.redirect('/complaint/' + id);
};

//แสดงสถิติร้านอาหาร
exports.getStalls = (req, res) => {
    const data = db.readData();
    const stallsWithCount = data.stalls.map(s => {
        const count = data.complaints.filter(c => c.stallId == s.id).length;
        const canteen = data.canteens.find(ct => ct.id == s.canteenId);
        return {
            ...s,
            count: count,
            canteenName: canteen ? canteen.name : '-'
        };
    });
    res.render('stalls', { stalls: stallsWithCount });
};

//Login
exports.getLogin = (req, res) => {
    res.render('login');
};

//ตรวจรหัสผ่าน
exports.postLogin = (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '1234') {
        req.session.isLoggedIn = true; 
        req.session.save(() => {
            res.redirect('/');
        });
    } else {
        res.send('<h1>รหัสผิด! <a href="/login">ลองใหม่</a></h1>');
    }
};

//Logout
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};