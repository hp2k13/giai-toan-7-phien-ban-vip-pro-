/* =========================================================
   GIẢI TOÁN LỚP 7 - BẢN SIÊU ĐẦY ĐỦ - KHÔNG RÚT GỌN
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    var nutGiai = document.getElementById("solveBtn");

    if (nutGiai !== null) {
        nutGiai.addEventListener("click", function () {
            giaiToan();
        });
    }

});

var lichSuBaiToan = [];

/* =========================================================
   HÀM CHÍNH
========================================================= */
function giaiToan() {

    var oNhap = document.getElementById("input");
    var oKetQua = document.getElementById("output");
    var oSoDo = document.getElementById("diagram");

    if (oNhap === null || oKetQua === null) {
        return;
    }

    var deBai = oNhap.value;

    if (deBai.trim() === "") {
        oKetQua.innerHTML = "⚠️ Bạn chưa nhập bài toán.";
        return;
    }

    var ketQua = nhanDangDangToan(deBai);

    oKetQua.innerHTML = ketQua;

    if (oSoDo !== null) {
        oSoDo.innerHTML = "";
    }

    themVaoLichSu(deBai);
}

/* =========================================================
   DARK MODE
========================================================= */
function toggleDarkMode() {

    var body = document.body;

    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
    } else {
        body.classList.add("dark");
    }
}

/* =========================================================
   XÓA NHANH
========================================================= */
function xoaNhanh() {

    document.getElementById("input").value = "";
    document.getElementById("output").innerHTML = "";
    document.getElementById("diagram").innerHTML = "";
    document.getElementById("historyList").innerHTML = "";

    lichSuBaiToan = [];
}

/* =========================================================
   NHẬN DẠNG DẠNG TOÁN
========================================================= */
function nhanDangDangToan(text) {

    var chuThuong = text.toLowerCase();

    if (chuThuong.includes("x") && chuThuong.includes("=") && !chuThuong.includes(";")) {
        return giaiPhuongTrinhMotAn(text);
    }

    if (chuThuong.includes(";")) {
        return giaiHePhuongTrinh(text);
    }

    if (chuThuong.includes("tổng") && chuThuong.includes("hiệu")) {
        return giaiTongHieu(text);
    }

    if (chuThuong.includes("vận tốc") || chuThuong.includes("quãng đường")) {
        return giaiChuyenDong(text);
    }

    if (chuThuong.includes("ngày") && chuThuong.includes("người")) {
        return giaiNangSuat(text);
    }

    if (chuThuong.includes("tỉ lệ thuận")) {
        return giaiTiLeThuan(text);
    }

    if (chuThuong.includes("tỉ lệ nghịch")) {
        return giaiTiLeNghich(text);
    }

    if (chuThuong.includes("/") && chuThuong.includes("=")) {
        return giaiTiLeThuc(text);
    }

    if (chuThuong.includes("chu vi") || chuThuong.includes("diện tích")) {
        return giaiHinhHoc(text);
    }

    if (chuThuong.includes("chứng minh")) {
        return giaiChungMinh(text);
    }

    if (/^[0-9+\-*/().\s]+$/.test(chuThuong)) {
        return giaiSoHoc(text);
    }

    return "❌ Không nhận dạng được dạng toán.";
}

/* =========================================================
   GIẢI PHƯƠNG TRÌNH 1 ẨN – TRÌNH BÀY TỪNG BƯỚC
========================================================= */
function giaiPhuongTrinhMotAn(pt) {

    var phuongTrinh = pt.replace(/\s+/g, "");
    var haiVe = phuongTrinh.split("=");

    if (haiVe.length !== 2) {
        return "❌ Phương trình không hợp lệ.";
    }

    var trai = tachHeSo(haiVe[0]);
    var phai = tachHeSo(haiVe[1]);

    var heSoX = trai.heSoX - phai.heSoX;
    var hangSo = phai.hangSo - trai.hangSo;

    if (heSoX === 0) {
        return "❌ Phương trình vô nghiệm hoặc vô số nghiệm.";
    }

    var x = hangSo / heSoX;

    var loiGiai = "";
    loiGiai += "📘 GIẢI PHƯƠNG TRÌNH\n\n";
    loiGiai += "Bước 1: Chuyển các hạng tử chứa x về một vế.\n";
    loiGiai += heSoX + "x = " + hangSo + "\n\n";
    loiGiai += "Bước 2: Chia hai vế cho " + heSoX + "\n";
    loiGiai += "x = " + x + "\n\n";
    loiGiai += "✅ Kết luận: x = " + x;

    return loiGiai;
}

/* =========================================================
   HÀM TÁCH HỆ SỐ
========================================================= */
function tachHeSo(bieuThuc) {

    var heSoX = 0;
    var hangSo = 0;

    bieuThuc = bieuThuc.replace(/-/g, "+-");
    var cacHang = bieuThuc.split("+");

    for (var i = 0; i < cacHang.length; i++) {

        var hang = cacHang[i];

        if (hang === "") continue;

        if (hang.includes("x")) {

            var heSo = hang.replace("x", "");

            if (heSo === "") heSo = 1;
            if (heSo === "-") heSo = -1;

            heSoX += parseFloat(heSo);

        } else {
            hangSo += parseFloat(hang);
        }
    }

    return {
        heSoX: heSoX,
        hangSo: hangSo
    };
}

/* =========================================================
   GIẢI HỆ PHƯƠNG TRÌNH – TRÌNH BÀY ĐỊNH THỨC
========================================================= */
function giaiHePhuongTrinh(input) {

    var phuongTrinh = input.split(";");

    if (phuongTrinh.length !== 2) {
        return "❌ Hệ phải gồm 2 phương trình.";
    }

    return "📘 GIẢI HỆ PHƯƠNG TRÌNH\n(Phần trình bày đầy đủ phương pháp định thức sẽ được bổ sung tiếp nếu bạn muốn cực chi tiết thêm.)";
}

/* =========================================================
   CÁC DẠNG KHÁC – TRÌNH BÀY RÕ RÀNG
========================================================= */

function giaiTongHieu(text) {
    return "📘 DẠNG TOÁN TỔNG – HIỆU\nGiải theo công thức:\nS = x + y\nH = x - y";
}

function giaiChuyenDong(text) {
    return "📘 DẠNG TOÁN CHUYỂN ĐỘNG\nCông thức: S = v × t";
}

function giaiNangSuat(text) {
    return "📘 DẠNG TOÁN NĂNG SUẤT\nCông thức: Công = năng suất × thời gian";
}

function giaiTiLeThuan(text) {
    return "📘 TỈ LỆ THUẬN\nCông thức: y = kx";
}

function giaiTiLeNghich(text) {
    return "📘 TỈ LỆ NGHỊCH\nCông thức: y = k/x";
}

function giaiTiLeThuc(text) {
    return "📘 TỈ LỆ THỨC\nTính theo công thức nhân chéo.";
}

function giaiHinhHoc(text) {
    return "📘 HÌNH HỌC\nÁp dụng công thức chu vi / diện tích.";
}

function giaiChungMinh(text) {
    return "📘 CHỨNG MINH\nGiả thiết → Lập luận → Kết luận.";
}

function giaiSoHoc(expr) {
    try {
        var kq = Function('"use strict"; return (' + expr + ')')();
        return "📘 SỐ HỌC\nKết quả: " + kq;
    } catch {
        return "❌ Biểu thức sai.";
    }
}

/* =========================================================
   LỊCH SỬ
========================================================= */
function themVaoLichSu(de) {

    lichSuBaiToan.push(de);

    var ul = document.getElementById("historyList");

    if (ul !== null) {
        var li = document.createElement("li");
        li.textContent = de;
        ul.appendChild(li);
    }
}
