// ======================================================
// GIẢI TOÁN LỚP 7 - VERSION FULL KHỚP INDEX.HTML
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
    var nutGiai = document.getElementById("solveBtn");
    if (nutGiai) {
        nutGiai.addEventListener("click", function () {
            giaiBaiToan();
        });
    }
});

var lichSu = [];

// ======================================================
// HÀM CHÍNH
// ======================================================

function giaiBaiToan() {

    var inputEl = document.getElementById("input");
    var outputEl = document.getElementById("output");
    var badgeEl = document.getElementById("badge");
    var diagramEl = document.getElementById("diagram");

    var deBai = inputEl.value.trim();

    if (deBai === "") {
        outputEl.innerHTML = "⚠️ Vui lòng nhập bài toán.";
        return;
    }

    // Xóa sơ đồ cũ
    diagramEl.innerHTML = "";

    var ketQua = nhanDangDangToan(deBai);

    badgeEl.innerHTML = ketQua.badge;
    outputEl.innerHTML = ketQua.text;

    themLichSu(deBai);
}

// ======================================================
// DARK MODE
// ======================================================

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// ======================================================
// XÓA NHANH
// ======================================================

function xoaNhanh() {
    document.getElementById("input").value = "";
    document.getElementById("output").innerHTML = "";
    document.getElementById("badge").innerHTML = "";
    document.getElementById("diagram").innerHTML = "";
    document.getElementById("historyList").innerHTML = "";
    lichSu = [];
}

// ======================================================
// NHẬN DẠNG DẠNG TOÁN
// ======================================================

function nhanDangDangToan(text) {

    var lower = text.toLowerCase();

    // 1. Hệ phương trình
    if (text.includes(";")) {
        return giaiHe(text);
    }

    // 2. Tỉ lệ thức
    if (text.match(/^\d+\/\d+\s*=\s*x\/\d+$/i)) {
        return giaiTiLeThuc(text);
    }

    // 3. Tỉ lệ thuận
    if (lower.includes("tỉ lệ thuận")) {
        return giaiTiLeThuan(text);
    }

    // 4. Tỉ lệ nghịch
    if (lower.includes("tỉ lệ nghịch")) {
        return giaiTiLeNghich(text);
    }

    // 5. Tổng hiệu
    if (lower.includes("tổng") && lower.includes("hiệu")) {
        return giaiTongHieu(text);
    }

    // 6. Chuyển động
    if (lower.includes("vận tốc") || lower.includes("quãng đường")) {
        return giaiChuyenDong(text);
    }

    // 7. Năng suất
    if (lower.includes("ngày") && lower.includes("người")) {
        return giaiNangSuat(text);
    }

    // 8. Hình học
    if (lower.includes("chu vi") || lower.includes("diện tích")) {
        return giaiHinhHoc(text);
    }

    // 9. Chứng minh
    if (lower.includes("chứng minh")) {
        return giaiChungMinh(text);
    }

    // 10. Phương trình 1 ẩn
    if (text.includes("=") && text.includes("x")) {
        return giaiPhuongTrinh(text);
    }

    // 11. Số học
    if (/^[0-9+\-*/().\s]+$/.test(text)) {
        return giaiSoHoc(text);
    }

    return {
        badge: "❓ Không xác định",
        text: "Không nhận dạng được dạng toán."
    };
}

// ======================================================
// PHƯƠNG TRÌNH 1 ẨN
// ======================================================

function giaiPhuongTrinh(pt) {

    pt = pt.replace(/\s+/g, "");
    var parts = pt.split("=");

    if (parts.length !== 2) {
        return { badge: "❌ Lỗi", text: "Phương trình không hợp lệ." };
    }

    var left = tachHeSo(parts[0]);
    var right = tachHeSo(parts[1]);

    var a = left.a - right.a;
    var b = right.b - left.b;

    if (a === 0) {
        return { badge: "⚠️ Đặc biệt", text: "Phương trình vô nghiệm hoặc vô số nghiệm." };
    }

    var x = b / a;

    return {
        badge: "📘 Phương trình",
        text:
        "Bước 1: Chuyển vế\n" +
        a + "x = " + b + "\n\n" +
        "Bước 2: Chia hai vế cho " + a + "\n" +
        "x = " + x + "\n\n" +
        "✅ Kết luận: x = " + x
    };
}

function tachHeSo(expr) {

    var a = 0;
    var b = 0;

    expr = expr.replace(/-/g, "+-");
    var terms = expr.split("+");

    for (var i = 0; i < terms.length; i++) {

        var t = terms[i];
        if (t === "") continue;

        if (t.includes("x")) {

            var coeff = t.replace("x", "");

            if (coeff === "") coeff = 1;
            if (coeff === "-") coeff = -1;

            a += parseFloat(coeff);

        } else {
            b += parseFloat(t);
        }
    }

    return { a: a, b: b };
}

// ======================================================
// HỆ PHƯƠNG TRÌNH
// ======================================================

function giaiHe(text) {

    var eq = text.split(";");

    if (eq.length !== 2) {
        return { badge: "❌ Lỗi", text: "Hệ phải có 2 phương trình." };
    }

    var e1 = tachHePhuongTrinh(eq[0]);
    var e2 = tachHePhuongTrinh(eq[1]);

    var D = e1.a * e2.b - e2.a * e1.b;
    var Dx = e1.c * e2.b - e2.c * e1.b;
    var Dy = e1.a * e2.c - e2.a * e1.c;

    if (D === 0) {
        return { badge: "⚠️ Đặc biệt", text: "Hệ vô nghiệm hoặc vô số nghiệm." };
    }

    var x = Dx / D;
    var y = Dy / D;

    return {
        badge: "📗 Hệ phương trình",
        text:
        "D = " + D + "\n" +
        "Dx = " + Dx + "\n" +
        "Dy = " + Dy + "\n\n" +
        "x = " + x + "\n" +
        "y = " + y + "\n\n" +
        "✅ Kết luận: (" + x + ", " + y + ")"
    };
}

function tachHePhuongTrinh(pt) {

    pt = pt.replace(/\s+/g, "");
    var parts = pt.split("=");

    var left = parts[0];
    var c = parseFloat(parts[1]);

    left = left.replace(/-/g, "+-");
    var terms = left.split("+");

    var a = 0;
    var b = 0;

    for (var i = 0; i < terms.length; i++) {

        var t = terms[i];
        if (t === "") continue;

        if (t.includes("x")) {
            var coeff = t.replace("x", "");
            if (coeff === "") coeff = 1;
            if (coeff === "-") coeff = -1;
            a += parseFloat(coeff);
        } else if (t.includes("y")) {
            var coeff2 = t.replace("y", "");
            if (coeff2 === "") coeff2 = 1;
            if (coeff2 === "-") coeff2 = -1;
            b += parseFloat(coeff2);
        }
    }

    return { a: a, b: b, c: c };
}

// ======================================================
// TỈ LỆ THỨC
// ======================================================

function giaiTiLeThuc(text) {

    var match = text.match(/^(\d+)\/(\d+)\s*=\s*x\/(\d+)$/i);

    var a = parseFloat(match[1]);
    var b = parseFloat(match[2]);
    var c = parseFloat(match[3]);

    var x = (a * c) / b;

    return {
        badge: "📙 Tỉ lệ thức",
        text:
        a + "/" + b + " = x/" + c + "\n" +
        "Nhân chéo:\n" +
        a + " × " + c + " = " + b + "x\n" +
        x + " = x\n\n" +
        "✅ Kết luận: x = " + x
    };
}

// ======================================================
// CÁC MODULE KHÁC (CƠ BẢN)
// ======================================================

function giaiTiLeThuan(text) {
    return { badge: "📕 Tỉ lệ thuận", text: "Áp dụng công thức y = kx" };
}

function giaiTiLeNghich(text) {
    return { badge: "📕 Tỉ lệ nghịch", text: "Áp dụng công thức y = k/x" };
}

function giaiTongHieu(text) {
    return { badge: "📘 Tổng - Hiệu", text: "Lập hệ phương trình để giải." };
}

function giaiChuyenDong(text) {
    return { badge: "🚗 Chuyển động", text: "S = v × t" };
}

function giaiNangSuat(text) {
    return { badge: "👷 Năng suất", text: "Công = năng suất × thời gian" };
}

function giaiHinhHoc(text) {
    return { badge: "📐 Hình học", text: "Áp dụng công thức chu vi / diện tích" };
}

function giaiChungMinh(text) {
    return { badge: "🧠 Chứng minh", text: "Giả thiết → Suy luận → Kết luận" };
}

function giaiSoHoc(expr) {
    try {
        var kq = Function('"use strict"; return (' + expr + ')')();
        return { badge: "🔢 Số học", text: expr + " = " + kq };
    } catch {
        return { badge: "❌ Lỗi", text: "Biểu thức không hợp lệ." };
    }
}

// ======================================================
// LỊCH SỬ
// ======================================================

function themLichSu(de) {
    lichSu.push(de);
    var ul = document.getElementById("historyList");
    var li = document.createElement("li");
    li.textContent = de;
    ul.appendChild(li);
}
