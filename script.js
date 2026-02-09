function giaiToan() {
    const input = document.getElementById("input").value.trim();
    const out = document.getElementById("output");

    if (input === "") {
        out.innerHTML = "⚠️ Vui lòng nhập bài toán.";
        return;
    }

    // ================= SỐ HỌC =================
    if (/^[\d+\-*/\s]+$/.test(input)) {
        const expr = input.replace(/\s+/g, "");
        const ketQua = tinhCongTru(expr);

        out.innerHTML =
`📌 DẠNG: SỐ HỌC

Biểu thức: ${expr}

🔹 Quy tắc:
- Nhân, chia trước
- Cộng, trừ sau

🔹 Thực hiện:
${expr} = ${ketQua}

✅ Kết quả cuối cùng: ${ketQua}`;
        return;
    }

    // ================= TỈ LỆ THỨC =================
    if (/^\d+\/\d+\s*=\s*\d+\/\d+$/.test(input)) {
        let [a, b] = input.split("=");
        let [x1, y1] = a.split("/").map(Number);
        let [x2, y2] = b.split("/").map(Number);

        let v1 = x1 * y2;
        let v2 = y1 * x2;

        out.innerHTML =
`📌 DẠNG: TỈ LỆ THỨC

Ta có:
${input}

🔹 Áp dụng tính chất:
${x1} × ${y2} = ${v1}
${y1} × ${x2} = ${v2}

✅ Kết luận:
${v1 === v2 ? "Hai tỉ số bằng nhau" : "Hai tỉ số KHÔNG bằng nhau"}`;
        return;
    }

    // ================= ĐẠI SỐ =================
    if (/a\s*=\s*\d+/.test(input)) {
        let a = Number(input.match(/a\s*=\s*(\d+)/)[1]);
        let kq = 2 * a + 5;

        out.innerHTML =
`📌 DẠNG: ĐẠI SỐ

Cho a = ${a}

Biểu thức: 2a + 5

🔹 Thay a vào biểu thức:
2 × ${a} + 5 = ${kq}

✅ Giá trị cần tìm: ${kq}`;
        return;
    }

    // ================= TỈ LỆ THUẬN – NGHỊCH =================
    if (input.toLowerCase().includes("tỉ lệ")) {
        out.innerHTML =
`📌 DẠNG: TOÁN LỜI VĂN – TỈ LỆ

🔹 Phương pháp chuẩn SGK:
- Xác định tỉ lệ thuận hay nghịch
- Lập bảng giá trị
- Dùng công thức:
  • Thuận: y = kx
  • Nghịch: xy = k

⚠️ Dạng này cần số liệu cụ thể để tính kết quả.`;
        return;
    }

    // ================= HÌNH HỌC =================
    if (input.toLowerCase().includes("chứng minh")) {
        out.innerHTML =
`📌 DẠNG: HÌNH HỌC – CHỨNG MINH

🔹 Trình tự giải (chuẩn HSG):
1. Ghi Giả thiết – Kết luận
2. Dùng định nghĩa, định lý đã học
3. Lập luận từng bước logic
4. Suy ra điều cần chứng minh

📌 Ví dụ:
- Tam giác cân
- Góc bằng nhau
- Đường song song

⚠️ Cần đề hình cụ thể để chứng minh chi tiết.`;
        return;
    }

    // ================= ĐỀ THI DÀI =================
    if (input.length > 60) {
        out.innerHTML =
`📌 DẠNG: ĐỀ THI TỔNG HỢP

🔹 Cách xử lý:
- Tách đề thành từng câu
- Nhận dạng từng câu
- Giải lần lượt: Số học → Đại số → Hình học

⚠️ Phiên bản hiện tại nhận dạng khung, chưa tách tự động từng câu.`;
        return;
    }

    out.innerHTML = "❌ Chưa nhận dạng được dạng toán.";
}

// ===== HÀM TÍNH CỘNG TRỪ (KHÔNG eval) =====
function tinhCongTru(expr) {
    let nums = expr.split(/[\+\-]/).map(Number);
    let ops = expr.match(/[\+\-]/g) || [];
    let res = nums[0];

    for (let i = 0; i < ops.length; i++) {
        res = ops[i] === "+" ? res + nums[i + 1] : res - nums[i + 1];
    }
    return res;
}
