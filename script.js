// Simulasi user database (username dan password)
const users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" }
];

// Event listener untuk form login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        // Simpan user yang login ke localStorage
        localStorage.setItem('loggedInUser', username);
        showAttendanceSection();
    } else {
        document.getElementById('loginStatus').textContent = 'Username atau password salah!';
    }
});

// Menampilkan bagian absensi setelah login
function showAttendanceSection() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById('userDisplay').textContent = loggedInUser;
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('attendanceSection').classList.remove('hidden');
        loadAttendance();
    }
}

// Event listener untuk tombol Check In
document.getElementById('checkInBtn').addEventListener('click', function() {
    recordAttendance('Check In');
});

// Event listener untuk tombol Check Out
document.getElementById('checkOutBtn').addEventListener('click', function() {
    recordAttendance('Check Out');
});

// Fungsi untuk mencatat absensi
function recordAttendance(action) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const currentTime = new Date().toLocaleString();
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || [];

    attendanceData.push({ user: loggedInUser, time: currentTime, action: action });
    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
    loadAttendance();
}

// Fungsi untuk memuat riwayat absensi
function loadAttendance() {
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || [];
    const tbody = document.querySelector('#attendanceTable tbody');
    tbody.innerHTML = '';

    attendanceData.forEach(entry => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${entry.time}</td><td>${entry.action}</td>`;
        tbody.appendChild(tr);
    });
}

// Event listener untuk tombol Logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    document.getElementById('attendanceSection').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
});

// Cek apakah user sudah login sebelumnya
if (localStorage.getItem('loggedInUser')) {
    showAttendanceSection();
}
