
const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController');

//หน้าจอผู้ใช้ทั่วไป
router.get('/', controller.getIndex);
router.get('/stalls', controller.getStalls);
router.get('/complaint/:id', controller.getDetail);
//หน้าจอAdmin
router.post('/respond', controller.postResponse);
router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);
router.get('/logout', controller.logout);

module.exports = router;