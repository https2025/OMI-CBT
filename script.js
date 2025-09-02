// Data Management System
class DataManager {
    constructor() {
        this.initializeData();
    }
    
    initializeData() {
        // Check if data exists in localStorage
        if (!localStorage.getItem('omi-cbt-data')) {
            // Initialize with default data
            const defaultData = {
                users: [
                    { id: 1, username: 'admin', password: this.hashPassword('admin123'), role: 'admin', name: 'Administrator', status: 'active' },
                    { id: 2, username: 'guru', password: this.hashPassword('guru123'), role: 'guru', name: 'Budi Santoso, S.Kom', status: 'active' },
                    { id: 3, username: 'siswa', password: this.hashPassword('siswa123'), role: 'siswa', name: 'Ahmad Leon', status: 'active' }
                ],
                questions: [
                    {
                        id: 1,
                        question: "Apa fungsi utama dari RAM dalam komputer?",
                        options: [
                            "Menyimpan data secara permanen",
                            "Menyimpan data sementara saat komputer menyala",
                            "Memproses data",
                            "Menampilkan output ke layar"
                        ],
                        correctAnswer: 1,
                        subject: "Teknologi Informasi",
                        difficulty: "mudah",
                        createdBy: 2
                    },
                    {
                        id: 2,
                        question: "Jelaskan perbedaan antara LAN dan WAN!",
                        options: [
                            "LAN lebih cepat dari WAN",
                            "LAN mencakup area geografis yang lebih luas",
                            "LAN menggunakan kabel sedangkan WAN menggunakan wireless",
                            "LAN untuk jaringan lokal, WAN untuk jaringan yang lebih luas"
                        ],
                        correctAnswer: 3,
                        subject: "Teknologi Informasi",
                        difficulty: "sedang",
                        createdBy: 2
                    },
                    {
                        id: 3,
                        question: "Apa yang dimaksud dengan enkripsi data?",
                        options: [
                            "Proses menghapus data",
                            "Proses mengompres data",
                            "Proses mengamankan data dengan mengubahnya menjadi kode",
                            "Proses memindahkan data"
                        ],
                        correctAnswer: 2,
                        subject: "Teknologi Informasi",
                        difficulty: "sulit",
                        createdBy: 2
                    },
                    {
                        id: 4,
                        question: "Manakah yang bukan termasuk perangkat input?",
                        options: [
                            "Keyboard",
                            "Mouse",
                            "Scanner",
                            "Monitor"
                        ],
                        correctAnswer: 3,
                        subject: "Teknologi Informasi",
                        difficulty: "mudah",
                        createdBy: 2
                    },
                    {
                        id: 5,
                        question: "Apa kepanjangan dari CPU?",
                        options: [
                            "Central Processing Unit",
                            "Computer Personal Unit",
                            "Central Program Unit",
                            "Computer Processing Unit"
                        ],
                        correctAnswer: 0,
                        subject: "Teknologi Informasi",
                        difficulty: "mudah",
                        createdBy: 2
                    }
                ],
                exams: [
                    {
                        id: 1,
                        name: "Ujian Tengah Semester Ganjil",
                        subject: "Teknologi Informasi",
                        date: "2023-09-25",
                        duration: 90,
                        questionIds: [1, 2, 3, 4, 5],
                        createdBy: 2,
                        status: "active"
                    },
                    {
                        id: 2,
                        name: "Try Out UAMBN",
                        subject: "Keagamaan",
                        date: "2023-09-30",
                        duration: 120,
                        questionIds: [1, 2, 3],
                        createdBy: 2,
                        status: "draft"
                    }
                ],
                examResults: [
                    {
                        id: 1,
                        examId: 1,
                        userId: 3,
                        score: 85,
                        answers: {0: 1, 1: 3, 2: 2, 3: 3, 4: 0},
                        startTime: "2023-09-20T10:00:00",
                        endTime: "2023-09-20T11:25:00",
                        status: "completed"
                    },
                    {
                        id: 2,
                        examId: 1,
                        userId: 3,
                        score: 78,
                        answers: {0: 1, 1: 3, 2: 1, 3: 3, 4: 0},
                        startTime: "2023-09-15T09:00:00",
                        endTime: "2023-09-15T10:15:00",
                        status: "completed"
                    }
                ]
            };
            
            localStorage.setItem('omi-cbt-data', JSON.stringify(defaultData));
        }
    }
    
    getData() {
        return JSON.parse(localStorage.getItem('omi-cbt-data'));
    }
    
    saveData(data) {
        localStorage.setItem('omi-cbt-data', JSON.stringify(data));
    }
    
    hashPassword(password) {
        // Simple hash function for demo purposes
        // In real applications, use a proper hashing library
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString(16);
    }
    
    // User management
    getUsers() {
        return this.getData().users;
    }
    
    getUserById(id) {
        return this.getUsers().find(user => user.id === id);
    }
    
    getUserByUsername(username) {
        return this.getUsers().find(user => user.username === username);
    }
    
    addUser(user) {
        const data = this.getData();
        const newId = Math.max(...data.users.map(u => u.id), 0) + 1;
        user.id = newId;
        user.password = this.hashPassword(user.password);
        data.users.push(user);
        this.saveData(data);
        return newId;
    }
    
    updateUser(id, updatedUser) {
        const data = this.getData();
        const index = data.users.findIndex(user => user.id === id);
        if (index !== -1) {
            if (updatedUser.password) {
                updatedUser.password = this.hashPassword(updatedUser.password);
            }
            data.users[index] = { ...data.users[index], ...updatedUser };
            this.saveData(data);
            return true;
        }
        return false;
    }
    
    deleteUser(id) {
        const data = this.getData();
        data.users = data.users.filter(user => user.id !== id);
        this.saveData(data);
        return true;
    }
    
    // Question management
    getQuestions() {
        return this.getData().questions;
    }
    
    getQuestionById(id) {
        return this.getQuestions().find(question => question.id === id);
    }
    
    addQuestion(question) {
        const data = this.getData();
        const newId = Math.max(...data.questions.map(q => q.id), 0) + 1;
        question.id = newId;
        data.questions.push(question);
        this.saveData(data);
        return newId;
    }
    
    updateQuestion(id, updatedQuestion) {
        const data = this.getData();
        const index = data.questions.findIndex(question => question.id === id);
        if (index !== -1) {
            data.questions[index] = { ...data.questions[index], ...updatedQuestion };
            this.saveData(data);
            return true;
        }
        return false;
    }
    
    deleteQuestion(id) {
        const data = this.getData();
        data.questions = data.questions.filter(question => question.id !== id);
        this.saveData(data);
        return true;
    }
    
    // Exam management
    getExams() {
        return this.getData().exams;
    }
    
    getExamById(id) {
        return this.getExams().find(exam => exam.id === id);
    }
    
    addExam(exam) {
        const data = this.getData();
        const newId = Math.max(...data.exams.map(e => e.id), 0) + 1;
        exam.id = newId;
        data.exams.push(exam);
        this.saveData(data);
        return newId;
    }
    
    updateExam(id, updatedExam) {
        const data = this.getData();
        const index = data.exams.findIndex(exam => exam.id === id);
        if (index !== -1) {
            data.exams[index] = { ...data.exams[index], ...updatedExam };
            this.saveData(data);
            return true;
        }
        return false;
    }
    
    deleteExam(id) {
        const data = this.getData();
        data.exams = data.exams.filter(exam => exam.id !== id);
        this.saveData(data);
        return true;
    }
    
    // Exam result management
    getExamResults() {
        return this.getData().examResults;
    }
    
    getExamResultsByUserId(userId) {
        return this.getExamResults().filter(result => result.userId === userId);
    }
    
    getExamResultsByExamId(examId) {
        return this.getExamResults().filter(result => result.examId === examId);
    }
    
    addExamResult(result) {
        const data = this.getData();
        const newId = Math.max(...data.examResults.map(r => r.id), 0) + 1;
        result.id = newId;
        data.examResults.push(result);
        this.saveData(data);
        return newId;
    }
    
    updateExamResult(id, updatedResult) {
        const data = this.getData();
        const index = data.examResults.findIndex(result => result.id === id);
        if (index !== -1) {
            data.examResults[index] = { ...data.examResults[index], ...updatedResult };
            this.saveData(data);
            return true;
        }
        return false;
    }
    
    deleteExamResult(id) {
        const data = this.getData();
        data.examResults = data.examResults.filter(result => result.id !== id);
        this.saveData(data);
        return true;
    }
}

// Initialize data manager
const dataManager = new DataManager();

// Global variables
let currentUser = null;
let currentExam = null;
let currentQuestions = [];
let currentQuestion = 0;
let userAnswers = {};
let examTimer = null;
let timeRemaining = 0;

// DOM elements
const loginPage = document.getElementById('loginPage');
const mainApp = document.getElementById('mainApp');
const examInterface = document.getElementById('examInterface');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const welcomeText = document.getElementById('welcomeText');
const dashboardTitle = document.getElementById('dashboardTitle');
const dashboardSubtitle = document.getElementById('dashboardSubtitle');
const adminDashboard = document.getElementById('adminDashboard');
const guruDashboard = document.getElementById('guruDashboard');
const siswaDashboard = document.getElementById('siswaDashboard');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const toastContainer = document.getElementById('toastContainer');

// Toast notification function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide and remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toastContainer.contains(toast)) {
                toastContainer.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Login functionality
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    // Find user
    const user = dataManager.getUserByUsername(username);
    
    if (user && user.role === role && user.password === dataManager.hashPassword(password)) {
        currentUser = user;
        showToast('Login berhasil!', 'success');
        showDashboard();
    } else {
        showToast('Username atau password salah!', 'error');
    }
});

// Logout functionality
logoutBtn.addEventListener('click', function() {
    currentUser = null;
    loginPage.classList.remove('hidden');
    mainApp.classList.add('hidden');
    examInterface.classList.add('hidden');
    loginForm.reset();
    showToast('Anda telah logout', 'info');
});

// Show dashboard based on user role
function showDashboard() {
    loginPage.classList.add('hidden');
    mainApp.classList.remove('hidden');
    
    welcomeText.textContent = `Selamat Datang, ${currentUser.name}`;
    
    // Hide all dashboards
    adminDashboard.classList.add('hidden');
    guruDashboard.classList.add('hidden');
    siswaDashboard.classList.add('hidden');
    
    // Show appropriate dashboard
    switch(currentUser.role) {
        case 'admin':
            dashboardTitle.textContent = 'Dashboard Admin';
            dashboardSubtitle.textContent = 'Kelola pengguna, ujian, dan sistem';
            adminDashboard.classList.remove('hidden');
            loadAdminDashboard();
            break;
        case 'guru':
            dashboardTitle.textContent = 'Dashboard Guru';
            dashboardSubtitle.textContent = 'Kelola soal dan ujian';
            guruDashboard.classList.remove('hidden');
            loadGuruDashboard();
            break;
        case 'siswa':
            dashboardTitle.textContent = 'Dashboard Siswa';
            dashboardSubtitle.textContent = 'Kerjakan ujian dan lihat hasil';
            siswaDashboard.classList.remove('hidden');
            loadSiswaDashboard();
            break;
    }
}

// Load Admin Dashboard
function loadAdminDashboard() {
    // Load statistics
    const users = dataManager.getUsers();
    const questions = dataManager.getQuestions();
    const exams = dataManager.getExams();
    const examResults = dataManager.getExamResults();
    
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalQuestions').textContent = questions.length;
    document.getElementById('totalExams').textContent = exams.length;
    
    // Calculate average score
    if (examResults.length > 0) {
        const totalScore = examResults.reduce((sum, result) => sum + result.score, 0);
        const avgScore = Math.round(totalScore / examResults.length);
        document.getElementById('avgScore').textContent = avgScore + '%';
    } else {
        document.getElementById('avgScore').textContent = '0%';
    }
    
    // Load users table
    loadUsersTable();
    
    // Load exams table
    loadExamsTable();
}

// Load Users Table
function loadUsersTable() {
    const users = dataManager.getUsers();
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';
    
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.name}</td>
            <td>${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
            <td>
                <span class="badge ${user.status === 'active' ? 'badge-success' : 'badge-danger'}">
                    ${user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm" onclick="editUser(${user.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </div>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

// Load Exams Table
function loadExamsTable() {
    const exams = dataManager.getExams();
    const examTableBody = document.getElementById('examTableBody');
    examTableBody.innerHTML = '';
    
    exams.forEach((exam, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${exam.name}</td>
            <td>${exam.subject}</td>
            <td>${new Date(exam.date).toLocaleDateString('id-ID')}</td>
            <td>${exam.duration} menit</td>
            <td>
                <span class="badge ${exam.status === 'active' ? 'badge-success' : exam.status === 'draft' ? 'badge-warning' : 'badge-danger'}">
                    ${exam.status === 'active' ? 'Aktif' : exam.status === 'draft' ? 'Draft' : 'Selesai'}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm" onclick="viewExam(${exam.id})">
                        <i class="fas fa-eye"></i> Detail
                    </button>
                    <button class="btn btn-sm" onclick="editExam(${exam.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteExam(${exam.id})">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </div>
            </td>
        `;
        examTableBody.appendChild(row);
    });
}

// Load Guru Dashboard
function loadGuruDashboard() {
    const questions = dataManager.getQuestions().filter(q => q.createdBy === currentUser.id);
    const exams = dataManager.getExams().filter(e => e.createdBy === currentUser.id);
    const examResults = dataManager.getExamResults().filter(r => {
        const exam = dataManager.getExamById(r.examId);
        return exam && exam.createdBy === currentUser.id;
    });
    
    document.getElementById('guruQuestions').textContent = questions.length;
    document.getElementById('guruExams').textContent = exams.length;
    
    // Calculate total participants
    const participants = new Set();
    examResults.forEach(result => participants.add(result.userId));
    document.getElementById('totalParticipants').textContent = participants.size;
    
    // Calculate average score
    if (examResults.length > 0) {
        const totalScore = examResults.reduce((sum, result) => sum + result.score, 0);
        const avgScore = Math.round(totalScore / examResults.length);
        document.getElementById('guruAvgScore').textContent = avgScore;
    } else {
        document.getElementById('guruAvgScore').textContent = '0';
    }
    
    // Load questions table
    loadQuestionsTable();
    
    // Load guru exams table
    loadGuruExamsTable();
}

// Load Questions Table
function loadQuestionsTable() {
    const questions = dataManager.getQuestions().filter(q => q.createdBy === currentUser.id);
    const questionTableBody = document.getElementById('questionTableBody');
    questionTableBody.innerHTML = '';
    
    questions.forEach((question, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${question.question.substring(0, 50)}${question.question.length > 50 ? '...' : ''}</td>
            <td>${question.subject}</td>
            <td>
                <span class="badge ${question.difficulty === 'mudah' ? 'badge-success' : question.difficulty === 'sedang' ? 'badge-warning' : 'badge-danger'}">
                    ${question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm" onclick="viewQuestion(${question.id})">
                        <i class="fas fa-eye"></i> Lihat
                    </button>
                    <button class="btn btn-sm" onclick="editQuestion(${question.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteQuestion(${question.id})">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </div>
            </td>
        `;
        questionTableBody.appendChild(row);
    });
}

// Load Guru Exams Table
function loadGuruExamsTable() {
    const exams = dataManager.getExams().filter(e => e.createdBy === currentUser.id);
    const guruExamTableBody = document.getElementById('guruExamTableBody');
    guruExamTableBody.innerHTML = '';
    
    exams.forEach((exam, index) => {
        const results = dataManager.getExamResultsByExamId(exam.id);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${exam.name}</td>
            <td>${new Date(exam.date).toLocaleDateString('id-ID')}</td>
            <td>${results.length}</td>
            <td>
                <span class="badge ${exam.status === 'active' ? 'badge-success' : exam.status === 'draft' ? 'badge-warning' : 'badge-danger'}">
                    ${exam.status === 'active' ? 'Aktif' : exam.status === 'draft' ? 'Draft' : 'Selesai'}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm" onclick="viewExam(${exam.id})">
                        <i class="fas fa-eye"></i> Detail
                    </button>
                    ${exam.status === 'active' ? `<button class="btn btn-sm btn-info" onclick="monitorExam(${exam.id})">
                        <i class="fas fa-desktop"></i> Monitor
                    </button>` : ''}
                    <button class="btn btn-sm" onclick="editExam(${exam.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteExam(${exam.id})">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </div>
            </td>
        `;
        guruExamTableBody.appendChild(row);
    });
}

// Load Siswa Dashboard
function loadSiswaDashboard() {
    const exams = dataManager.getExams().filter(e => e.status === 'active');
    const results = dataManager.getExamResultsByUserId(currentUser.id);
    
    document.getElementById('availableExams').textContent = exams.length;
    document.getElementById('completedExams').textContent = results.length;
    
    // Calculate highest score
    if (results.length > 0) {
        const highestScore = Math.max(...results.map(r => r.score));
        document.getElementById('highestScore').textContent = highestScore;
        
        // Calculate average score
        const totalScore = results.reduce((sum, result) => sum + result.score, 0);
        const avgScore = Math.round(totalScore / results.length);
        document.getElementById('studentAvgScore').textContent = avgScore;
    } else {
        document.getElementById('highestScore').textContent = '0';
        document.getElementById('studentAvgScore').textContent = '0';
    }
    
    // Load available exams table
    loadAvailableExamsTable();
    
    // Load history table
    loadHistoryTable();
}

// Load Available Exams Table
function loadAvailableExamsTable() {
    const exams = dataManager.getExams().filter(e => e.status === 'active');
    const availableExamTableBody = document.getElementById('availableExamTableBody');
    availableExamTableBody.innerHTML = '';
    
    exams.forEach((exam, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${exam.name}</td>
            <td>${exam.subject}</td>
            <td>${new Date(exam.date).toLocaleDateString('id-ID')}</td>
            <td>${exam.duration} menit</td>
            <td>
                <span class="badge badge-success">Tersedia</span>
            </td>
            <td>
                <button class="btn btn-sm" onclick="startExam(${exam.id})">
                    <i class="fas fa-play"></i> Kerjakan
                </button>
            </td>
        `;
        availableExamTableBody.appendChild(row);
    });
}

// Load History Table
function loadHistoryTable() {
    const results = dataManager.getExamResultsByUserId(currentUser.id);
    const historyTableBody = document.getElementById('historyTableBody');
    historyTableBody.innerHTML = '';
    
    results.forEach((result, index) => {
        const exam = dataManager.getExamById(result.examId);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${exam ? exam.name : 'Ujian tidak ditemukan'}</td>
            <td>${new Date(result.startTime).toLocaleDateString('id-ID')}</td>
            <td>${result.score}</td>
            <td>
                <span class="badge ${result.score >= 70 ? 'badge-success' : 'badge-danger'}">
                    ${result.score >= 70 ? 'Lulus' : 'Tidak Lulus'}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm" onclick="viewResult(${result.id})">
                        <i class="fas fa-eye"></i> Detail
                    </button>
                </div>
            </td>
        `;
        historyTableBody.appendChild(row);
    });
}

// Start exam
function startExam(examId) {
    currentExam = dataManager.getExamById(examId);
    if (!currentExam) {
        showToast('Ujian tidak ditemukan!', 'error');
        return;
    }
    
    // Get questions for this exam
    currentQuestions = currentExam.questionIds.map(id => dataManager.getQuestionById(id));
    
    // Shuffle questions for randomness
    currentQuestions = shuffleArray(currentQuestions);
    
    // Initialize exam
    currentQuestion = 0;
    userAnswers = {};
    timeRemaining = currentExam.duration * 60; // Convert minutes to seconds
    
    // Show exam interface
    mainApp.classList.add('hidden');
    examInterface.classList.remove('hidden');
    
    // Set exam title and subject
    document.getElementById('examTitle').textContent = currentExam.name;
    document.getElementById('examSubject').textContent = currentExam.subject;
    
    // Generate question navigation
    generateQuestionNav();
    
    // Show first question
    showQuestion(0);
    
    // Start timer
    startExamTimer();
    
    showToast('Ujian dimulai!', 'info');
}

// Shuffle array function
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Generate question navigation
function generateQuestionNav() {
    const questionNav = document.getElementById('questionNav');
    questionNav.innerHTML = '';
    
    for (let i = 0; i < currentQuestions.length; i++) {
        const button = document.createElement('button');
        button.className = 'question-btn';
        button.textContent = i + 1;
        button.onclick = () => showQuestion(i);
        questionNav.appendChild(button);
    }
}

// Show question
function showQuestion(index) {
    currentQuestion = index;
    const question = currentQuestions[index];
    
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = `
        <div class="question-number">Pertanyaan ${index + 1}</div>
        <div class="question-text">${question.question}</div>
        <div class="options">
            ${question.options.map((option, i) => `
                <div class="option" onclick="selectOption(${i})">
                    <input type="radio" id="option${i}" name="answer" value="${i}" ${userAnswers[index] === i ? 'checked' : ''}>
                    <label for="option${i}">${option}</label>
                </div>
            `).join('')}
        </div>
    `;
    
    // Add event listeners to options
    const options = questionContainer.querySelectorAll('input[type="radio"]');
    options.forEach(option => {
        option.addEventListener('change', function() {
            userAnswers[index] = parseInt(this.value);
            updateQuestionNav();
        });
    });
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Update question navigation
    updateQuestionNav();
}

// Select option
function selectOption(index) {
    userAnswers[currentQuestion] = index;
    document.getElementById(`option${index}`).checked = true;
    
    // Update option styling
    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => {
        if (i === index) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
    
    updateQuestionNav();
}

// Update question navigation
function updateQuestionNav() {
    const questionNav = document.getElementById('questionNav');
    const buttons = questionNav.querySelectorAll('.question-btn');
    
    buttons.forEach((button, index) => {
        button.classList.remove('active', 'answered');
        
        if (index === currentQuestion) {
            button.classList.add('active');
        }
        
        if (userAnswers[index] !== undefined) {
            button.classList.add('answered');
        }
    });
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const finishBtn = document.getElementById('finishBtn');
    
    prevBtn.disabled = currentQuestion === 0;
    
    if (currentQuestion === currentQuestions.length - 1) {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        finishBtn.style.display = 'none';
    }
}

// Previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
}

// Next question
function nextQuestion() {
    if (currentQuestion < currentQuestions.length - 1) {
        showQuestion(currentQuestion + 1);
    }
}

// Start exam timer
function startExamTimer() {
    examTimer = setInterval(() => {
        timeRemaining--;
        
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        
        const timerElement = document.getElementById('timer');
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Change timer color when time is running out
        const examTimerElement = document.getElementById('examTimer');
        if (timeRemaining <= 60) {
            examTimerElement.classList.add('danger');
        } else if (timeRemaining <= 300) {
            examTimerElement.classList.add('warning');
        }
        
        if (timeRemaining <= 0) {
            finishExam();
        }
    }, 1000);
}

// Finish exam
function finishExam() {
    clearInterval(examTimer);
    
    // Calculate score
    let correctAnswers = 0;
    for (let i = 0; i < currentQuestions.length; i++) {
        const question = currentQuestions[i];
        if (userAnswers[i] === question.correctAnswer) {
            correctAnswers++;
        }
    }
    
    const score = Math.round((correctAnswers / currentQuestions.length) * 100);
    
    // Save exam result
    const result = {
        examId: currentExam.id,
        userId: currentUser.id,
        score: score,
        answers: userAnswers,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        status: "completed"
    };
    
    dataManager.addExamResult(result);
    
    // Show result
    modalTitle.textContent = 'Hasil Ujian';
    modalBody.innerHTML = `
        <div class="text-center">
            <h3>Ujian Selesai!</h3>
            <p>Anda telah menyelesaikan ujian dengan hasil:</p>
            <div style="font-size: 3rem; font-weight: bold; color: var(--primary-color); margin: 1rem 0;">
                ${score}
            </div>
            <p>Jawaban Benar: ${correctAnswers} dari ${currentQuestions.length} soal</p>
            <div class="mt-3">
                <button class="btn" onclick="closeModalAndReturnToDashboard()">
                    <i class="fas fa-arrow-left"></i> Kembali ke Dashboard
                </button>
            </div>
        </div>
    `;
    modal.classList.add('active');
    
    showToast('Ujian selesai!', 'success');
}

// Close modal and return to dashboard
function closeModalAndReturnToDashboard() {
    modal.classList.remove('active');
    examInterface.classList.add('hidden');
    mainApp.classList.remove('hidden');
    
    // Reload dashboard to update statistics
    if (currentUser.role === 'siswa') {
        loadSiswaDashboard();
    }
}

// Modal close event
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Modal close when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Add user button
document.getElementById('addUserBtn')?.addEventListener('click', () => {
    modalTitle.textContent = 'Tambah Pengguna';
    modalBody.innerHTML = `
        <form id="addUserForm">
            <div class="form-group">
                <label>Username</label>
                <input type="text" id="newUsername" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" id="newPassword" required>
            </div>
            <div class="form-group">
                <label>Nama Lengkap</label>
                <input type="text" id="newFullName" required>
            </div>
            <div class="form-group">
                <label>Role</label>
                <select id="newRole" required>
                    <option value="">Pilih Role</option>
                    <option value="admin">Admin</option>
                    <option value="guru">Guru</option>
                    <option value="siswa">Siswa</option>
                </select>
            </div>
            <div class="form-group">
                <label>Status</label>
                <select id="newStatus" required>
                    <option value="active">Aktif</option>
                    <option value="inactive">Nonaktif</option>
                </select>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button type="button" class="btn" onclick="modal.classList.remove('active')">Batal</button>
                <button type="submit" class="btn btn-success">Simpan</button>
            </div>
        </form>
    `;
    modal.classList.add('active');
    
    // Handle form submission
    document.getElementById('addUserForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('newUsername').value;
        const password = document.getElementById('newPassword').value;
        const fullName = document.getElementById('newFullName').value;
        const role = document.getElementById('newRole').value;
        const status = document.getElementById('newStatus').value;
        
        // Check if username already exists
        if (dataManager.getUserByUsername(username)) {
            showToast('Username sudah digunakan!', 'error');
            return;
        }
        
        // Add user
        const newUser = {
            username: username,
            password: password,
            name: fullName,
            role: role,
            status: status
        };
        
        dataManager.addUser(newUser);
        showToast('Pengguna berhasil ditambahkan!', 'success');
        modal.classList.remove('active');
        loadUsersTable();
        loadAdminDashboard();
    });
});

// Edit user function
function editUser(userId) {
    const user = dataManager.getUserById(userId);
    if (!user) {
        showToast('Pengguna tidak ditemukan!', 'error');
        return;
    }
    
    modalTitle.textContent = 'Edit Pengguna';
    modalBody.innerHTML = `
        <form id="editUserForm">
            <div class="form-group">
                <label>Username</label>
                <input type="text" id="editUsername" value="${user.username}" required>
            </div>
            <div class="form-group">
                <label>Password (kosongkan jika tidak diubah)</label>
                <input type="password" id="editPassword">
            </div>
            <div class="form-group">
                <label>Nama Lengkap</label>
                <input type="text" id="editFullName" value="${user.name}" required>
            </div>
            <div class="form-group">
                <label>Role</label>
                <select id="editRole" required>
                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                    <option value="guru" ${user.role === 'guru' ? 'selected' : ''}>Guru</option>
                    <option value="siswa" ${user.role === 'siswa' ? 'selected' : ''}>Siswa</option>
                </select>
            </div>
            <div class="form-group">
                <label>Status</label>
                <select id="editStatus" required>
                    <option value="active" ${user.status === 'active' ? 'selected' : ''}>Aktif</option>
                    <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>Nonaktif</option>
                </select>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button type="button" class="btn" onclick="modal.classList.remove('active')">Batal</button>
                <button type="submit" class="btn btn-success">Simpan</button>
            </div>
        </form>
    `;
    modal.classList.add('active');
    
    // Handle form submission
    document.getElementById('editUserForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('editUsername').value;
        const password = document.getElementById('editPassword').value;
        const fullName = document.getElementById('editFullName').value;
        const role = document.getElementById('editRole').value;
        const status = document.getElementById('editStatus').value;
        
        // Check if username already exists (excluding current user)
        const existingUser = dataManager.getUserByUsername(username);
        if (existingUser && existingUser.id !== userId) {
            showToast('Username sudah digunakan!', 'error');
            return;
        }
        
        // Update user
        const updatedUser = {
            username: username,
            name: fullName,
            role: role,
            status: status
        };
        
        if (password) {
            updatedUser.password = password;
        }
        
        dataManager.updateUser(userId, updatedUser);
        showToast('Pengguna berhasil diperbarui!', 'success');
        modal.classList.remove('active');
        loadUsersTable();
        loadAdminDashboard();
    });
}

// Delete user function
function deleteUser(userId) {
    if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
        dataManager.deleteUser(userId);
        showToast('Pengguna berhasil dihapus!', 'success');
        loadUsersTable();
        loadAdminDashboard();
    }
}

// Add exam button
document.getElementById('addExamBtn')?.addEventListener('click', () => {
    const questions = dataManager.getQuestions();
    
    modalTitle.textContent = 'Buat Ujian Baru';
    modalBody.innerHTML = `
        <form id="addExamForm">
            <div class="form-group">
                <label>Nama Ujian</label>
                <input type="text" id="newExamName" required>
            </div>
            <div class="form-group">
                <label>Mata Pelajaran</label>
                <input type="text" id="newExamSubject" required>
            </div>
            <div class="form-group">
                <label>Tanggal</label>
                <input type="date" id="newExamDate" required>
            </div>
            <div class="form-group">
                <label>Durasi (menit)</label>
                <input type="number" id="newExamDuration" min="1" required>
            </div>
            <div class="form-group">
                <label>Pilih Soal</label>
                <div style="max-height: 200px; overflow-y: auto; border: 1px solid var(--border-color); padding: 0.5rem; border-radius: 5px;">
                    ${questions.map((question, index) => `
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox" name="examQuestions" value="${question.id}"> 
                            ${question.question.substring(0, 50)}${question.question.length > 50 ? '...' : ''}
                        </label>
                    `).join('')}
                </div>
            </div>
            <div class="form-group">
                <label>Status</label>
                <select id="newExamStatus" required>
                    <option value="draft">Draft</option>
                    <option value="active">Aktif</option>
                </select>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button type="button" class="btn" onclick="modal.classList.remove('active')">Batal</button>
                <button type="submit" class="btn btn-success">Simpan</button>
            </div>
        </form>
    `;
    modal.classList.add('active');
    
    // Handle form submission
    document.getElementById('addExamForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('newExamName').value;
        const subject = document.getElementById('newExamSubject').value;
        const date = document.getElementById('newExamDate').value;
        const duration = parseInt(document.getElementById('newExamDuration').value);
        const status = document.getElementById('newExamStatus').value;
        
        // Get selected questions
        const selectedQuestions = [];
        const checkboxes = document.querySelectorAll('input[name="examQuestions"]:checked');
        checkboxes.forEach(checkbox => {
            selectedQuestions.push(parseInt(checkbox.value));
        });
        
        if (selectedQuestions.length === 0) {
            showToast('Pilih minimal satu soal!', 'error');
            return;
        }
        
        // Add exam
        const newExam = {
            name: name,
            subject: subject,
            date: date,
            duration: duration,
            questionIds: selectedQuestions,
            createdBy: currentUser.id,
            status: status
        };
        
        dataManager.addExam(newExam);
        showToast('Ujian berhasil dibuat!', 'success');
        modal.classList.remove('active');
        loadExamsTable();
        loadAdminDashboard();
    });
});

// View exam function
function viewExam(examId) {
    const exam = dataManager.getExamById(examId);
    if (!exam) {
        showToast('Ujian tidak ditemukan!', 'error');
        return;
    }
    
    const questions = exam.questionIds.map(id => dataManager.getQuestionById(id));
    const results = dataManager.getExamResultsByExamId(examId);
    
    modalTitle.textContent = 'Detail Ujian';
    modalBody.innerHTML = `
        <div>
            <h3>${exam.name}</h3>
            <p><strong>Mata Pelajaran:</strong> ${exam.subject}</p>
            <p><strong>Tanggal:</strong> ${new Date(exam.date).toLocaleDateString('id-ID')}</p>
            <p><strong>Durasi:</strong> ${exam.duration} menit</p>
            <p><strong>Status:</strong> 
                <span class="badge ${exam.status === 'active' ? 'badge-success' : exam.status === 'draft' ? 'badge-warning' : 'badge-danger'}">
                    ${exam.status === 'active' ? 'Aktif' : exam.status === 'draft' ? 'Draft' : 'Selesai'}
                </span>
            </p>
            <p><strong>Jumlah Soal:</strong> ${questions.length}</p>
            <p><strong>Jumlah Peserta:</strong> ${results.length}</p>
            
            <h4 class="mt-3 mb-2">Daftar Soal</h4>
            <div style="max-height: 200px; overflow-y: auto; border: 1px solid var(--border-color); padding: 0.5rem; border-radius: 5px;">
                ${questions.map((question, index) => `
                    <div class="mb-2">
                        <strong>${index + 1}.</strong> ${question.question}
                    </div>
                `).join('')}
            </div>
            
            <div class="mt-3 text-center">
                <button class="btn" onclick="modal.classList.remove('active')">Tutup</button>
            </div>
        </div>
    `;
    modal.classList.add('active');
}

// Edit exam function
function editExam(examId) {
    const exam = dataManager.getExamById(examId);
    if (!exam) {
        showToast('Ujian tidak ditemukan!', 'error');
        return;
    }
    
    const questions = dataManager.getQuestions();
    
    modalTitle.textContent = 'Edit Ujian';
    modalBody.innerHTML = `
        <form id="editExamForm">
            <div class="form-group">
                <label>Nama Ujian</label>
                <input type="text" id="editExamName" value="${exam.name}" required>
            </div>
            <div class="form-group">
                <label>Mata Pelajaran</label>
                <input type="text" id="editExamSubject" value="${exam.subject}" required>
            </div>
            <div class="form-group">
                <label>Tanggal</label>
                <input type="date" id="editExamDate" value="${exam.date}" required>
            </div>
            <div class="form-group">
                <label>Durasi (menit)</label>
                <input type="number" id="editExamDuration" value="${exam.duration}" min="1" required>
            </div>
            <div class="form-group">
                <label>Pilih Soal</label>
                <div style="max-height: 200px; overflow-y: auto; border: 1px solid var(--border-color); padding: 0.5rem; border-radius: 5px;">
                    ${questions.map((question, index) => `
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox" name="editExamQuestions" value="${question.id}" ${exam.questionIds.includes(question.id) ? 'checked' : ''}> 
                            ${question.question.substring(0, 50)}${question.question.length > 50 ? '...' : ''}
                        </label>
                    `).join('')}
                </div>
            </div>
            <div class="form-group">
                <label>Status</label>
                <select id="editExamStatus" required>
                    <option value="draft" ${exam.status === 'draft' ? 'selected' : ''}>Draft</option>
                    <option value="active" ${exam.status === 'active' ? 'selected' : ''}>Aktif</option>
                </select>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button type="button" class="btn" onclick="modal.classList.remove('active')">Batal</button>
                <button type="submit" class="btn btn-success">Simpan</button>
            </div>
        </form>
    `;
    modal.classList.add('active');
    
    // Handle form submission
    document.getElementById('editExamForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('editExamName').value;
        const subject = document.getElementById('editExamSubject').value;
        const date = document.getElementById('editExamDate').value;
        const duration = parseInt(document.getElementById('editExamDuration').value);
        const status = document.getElementById('editExamStatus').value;
        
        // Get selected questions
        const selectedQuestions = [];
        const checkboxes = document.querySelectorAll('input[name="editExamQuestions"]:checked');
        checkboxes.forEach(checkbox => {
            selectedQuestions.push(parseInt(checkbox.value));
        });
        
        if (selectedQuestions.length === 0) {
            showToast('Pilih minimal satu soal!', 'error');
            return;
        }
        
        // Update exam
        const updatedExam = {
            name: name,
            subject: subject,
            date: date,
            duration: duration,
            questionIds: selectedQuestions,
            status: status
        };
        
        dataManager.updateExam(examId, updatedExam);
        showToast('Ujian berhasil diperbarui!', 'success');
        modal.classList.remove('active');
        loadExamsTable();
        loadAdminDashboard();
    });
}

// Delete exam function
function deleteExam(examId) {
    if (confirm('Apakah Anda yakin ingin menghapus ujian ini?')) {
        dataManager.deleteExam(examId);
        showToast('Ujian berhasil dihapus!', 'success');
        loadExamsTable();
        loadAdminDashboard();
    }
}

// Add question button
document.getElementById('addQuestionBtn')?.addEventListener('click', () => {
    modalTitle.textContent = 'Tambah Soal Baru';
    modalBody.innerHTML = `
        <form id="addQuestionForm">
            <div class="form-group">
                <label>Pertanyaan</label>
                <textarea id="newQuestion" rows="3" required></textarea>
            </div>
            <div class="form-group">
                <label>Opsi A</label>
                <input type="text" id="newOptionA" required>
            </div>
            <div class="form-group">
                <label>Opsi B</label>
                <input type="text" id="newOptionB" required>
            </div>
            <div class="form-group">
                <label>Opsi C</label>
                <input type="text" id="newOptionC" required>
            </div>
            <div class="form-group">
                <label>Opsi D</label>
                <input type="text" id="newOptionD" required>
            </div>
            <div class="form-group">
                <label>Jawaban Benar</label>
                <select id="newCorrectAnswer" required>
                    <option value="">Pilih Jawaban</option>
                    <option value="0">A</option>
                    <option value="1">B</option>
                    <option value="2">C</option>
                    <option value="3">D</option>
                </select>
            </div>
            <div class="form-group">
                <label>Mata Pelajaran</label>
                <input type="text" id="newQuestionSubject" required>
            </div>
            <div class="form-group">
                <label>Tingkat Kesulitan</label>
                <select id="newQuestionDifficulty" required>
                    <option value="">Pilih Tingkat</option>
                    <option value="mudah">Mudah</option>
                    <option value="sedang">Sedang</option>
                    <option value="sulit">Sulit</option>
                </select>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button type="button" class="btn" onclick="modal.classList.remove('active')">Batal</button>
                <button type="submit" class="btn btn-success">Simpan</button>
            </div>
        </form>
    `;
    modal.classList.add('active');
    
    // Handle form submission
    document.getElementById('addQuestionForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const question = document.getElementById('newQuestion').value;
        const optionA = document.getElementById('newOptionA').value;
        const optionB = document.getElementById('newOptionB').value;
        const optionC = document.getElementById('newOptionC').value;
        const optionD = document.getElementById('newOptionD').value;
        const correctAnswer = parseInt(document.getElementById('newCorrectAnswer').value);
        const subject = document.getElementById('newQuestionSubject').value;
        const difficulty = document.getElementById('newQuestionDifficulty').value;
        
        // Add question
        const newQuestion = {
            question: question,
            options: [optionA, optionB, optionC, optionD],
            correctAnswer: correctAnswer,
            subject: subject,
            difficulty: difficulty,
            createdBy: currentUser.id
        };
        
        dataManager.addQuestion(newQuestion);
        showToast('Soal berhasil ditambahkan!', 'success');
        modal.classList.remove('active');
        loadQuestionsTable();
        loadGuruDashboard();
    });
});

// View question function
function viewQuestion(questionId) {
    const question = dataManager.getQuestionById(questionId);
    if (!question) {
        showToast('Soal tidak ditemukan!', 'error');
        return;
    }
    
    modalTitle.textContent = 'Detail Soal';
    modalBody.innerHTML = `
        <div>
            <h4>${question.question}</h4>
            <div class="mt-2">
                <p><strong>A.</strong> ${question.options[0]}</p>
                <p><strong>B.</strong> ${question.options[1]}</p>
                <p><strong>C.</strong> ${question.options[2]}</p>
                <p><strong>D.</strong> ${question.options[3]}</p>
            </div>
            <p class="mt-2"><strong>Jawaban Benar:</strong> ${String.fromCharCode(65 + question.correctAnswer)}</p>
            <p><strong>Mata Pelajaran:</strong> ${question.subject}</p>
            <p><strong>Tingkat Kesulitan:</strong> 
                <span class="badge ${question.difficulty === 'mudah' ? 'badge-success' : question.difficulty === 'sedang' ? 'badge-warning' : 'badge-danger'}">
                    ${question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                </span>
            </p>
            
            <div class="mt-3 text-center">
                <button class="btn" onclick="modal.classList.remove('active')">Tutup</button>
            </div>
        </div>
    `;
    modal.classList.add('active');
}

// Edit question function
function editQuestion(questionId) {
    const question = dataManager.getQuestionById(questionId);
    if (!question) {
        showToast('Soal tidak ditemukan!', 'error');
        return;
    }
    
    modalTitle.textContent = 'Edit Soal';
    modalBody.innerHTML = `
        <form id="editQuestionForm">
            <div class="form-group">
                <label>Pertanyaan</label>
                <textarea id="editQuestion" rows="3" required>${question.question}</textarea>
            </div>
            <div class="form-group">
                <label>Opsi A</label>
                <input type="text" id="editOptionA" value="${question.options[0]}" required>
            </div>
            <div class="form-group">
                <label>Opsi B</label>
                <input type="text" id="editOptionB" value="${question.options[1]}" required>
            </div>
            <div class="form-group">
                <label>Opsi C</label>
                <input type="text" id="editOptionC" value="${question.options[2]}" required>
            </div>
            <div class="form-group">
                <label>Opsi D</label>
                <input type="text" id="editOptionD" value="${question.options[3]}" required>
            </div>
            <div class="form-group">
                <label>Jawaban Benar</label>
                <select id="editCorrectAnswer" required>
                    <option value="0" ${question.correctAnswer === 0 ? 'selected' : ''}>A</option>
                    <option value="1" ${question.correctAnswer === 1 ? 'selected' : ''}>B</option>
                    <option value="2" ${question.correctAnswer === 2 ? 'selected' : ''}>C</option>
                    <option value="3" ${question.correctAnswer === 3 ? 'selected' : ''}>D</option>
                </select>
            </div>
            <div class="form-group">
                <label>Mata Pelajaran</label>
                <input type="text" id="editQuestionSubject" value="${question.subject}" required>
            </div>
            <div class="form-group">
                <label>Tingkat Kesulitan</label>
                <select id="editQuestionDifficulty" required>
                    <option value="mudah" ${question.difficulty === 'mudah' ? 'selected' : ''}>Mudah</option>
                    <option value="sedang" ${question.difficulty === 'sedang' ? 'selected' : ''}>Sedang</option>
                    <option value="sulit" ${question.difficulty === 'sulit' ? 'selected' : ''}>Sulit</option>
                </select>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button type="button" class="btn" onclick="modal.classList.remove('active')">Batal</button>
                <button type="submit" class="btn btn-success">Simpan</button>
            </div>
        </form>
    `;
    modal.classList.add('active');
    
    // Handle form submission
    document.getElementById('editQuestionForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const questionText = document.getElementById('editQuestion').value;
        const optionA = document.getElementById('editOptionA').value;
        const optionB = document.getElementById('editOptionB').value;
        const optionC = document.getElementById('editOptionC').value;
        const optionD = document.getElementById('editOptionD').value;
        const correctAnswer = parseInt(document.getElementById('editCorrectAnswer').value);
        const subject = document.getElementById('editQuestionSubject').value;
        const difficulty = document.getElementById('editQuestionDifficulty').value;
        
        // Update question
        const updatedQuestion = {
            question: questionText,
            options: [optionA, optionB, optionC, optionD],
            correctAnswer: correctAnswer,
            subject: subject,
            difficulty: difficulty
        };
        
        dataManager.updateQuestion(questionId, updatedQuestion);
        showToast('Soal berhasil diperbarui!', 'success');
        modal.classList.remove('active');
        loadQuestionsTable();
        loadGuruDashboard();
    });
}

// Delete question function
function deleteQuestion(questionId) {
    if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
        dataManager.deleteQuestion(questionId);
        showToast('Soal berhasil dihapus!', 'success');
        loadQuestionsTable();
        loadGuruDashboard();
    }
}

// Create exam button for guru
document.getElementById('createExamBtn')?.addEventListener('click', () => {
    const questions = dataManager.getQuestions().filter(q => q.createdBy === currentUser.id);
    
    modalTitle.textContent = 'Buat Ujian Baru';
    modalBody.innerHTML = `
        <form id="createExamForm">
            <div class="form-group">
                <label>Nama Ujian</label>
                <input type="text" id="createExamName" required>
            </div>
            <div class="form-group">
                <label>Mata Pelajaran</label>
                <input type="text" id="createExamSubject" required>
            </div>
            <div class="form-group">
                <label>Tanggal</label>
                <input type="date" id="createExamDate" required>
            </div>
            <div class="form-group">
                <label>Durasi (menit)</label>
                <input type="number" id="createExamDuration" min="1" required>
            </div>
            <div class="form-group">
                <label>Pilih Soal dari Bank Soal</label>
                <div style="max-height: 200px; overflow-y: auto; border: 1px solid var(--border-color); padding: 0.5rem; border-radius: 5px;">
                    ${questions.map((question, index) => `
                        <label style="display: block; margin-bottom: 0.5rem;">
                            <input type="checkbox" name="createExamQuestions" value="${question.id}"> 
                            ${question.question.substring(0, 50)}${question.question.length > 50 ? '...' : ''}
                        </label>
                    `).join('')}
                </div>
            </div>
            <div class="form-group">
                <label>Status</label>
                <select id="createExamStatus" required>
                    <option value="draft">Draft</option>
                    <option value="active">Aktif</option>
                </select>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button type="button" class="btn" onclick="modal.classList.remove('active')">Batal</button>
                <button type="submit" class="btn btn-success">Simpan</button>
            </div>
        </form>
    `;
    modal.classList.add('active');
    
    // Handle form submission
    document.getElementById('createExamForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('createExamName').value;
        const subject = document.getElementById('createExamSubject').value;
        const date = document.getElementById('createExamDate').value;
        const duration = parseInt(document.getElementById('createExamDuration').value);
        const status = document.getElementById('createExamStatus').value;
        
        // Get selected questions
        const selectedQuestions = [];
        const checkboxes = document.querySelectorAll('input[name="createExamQuestions"]:checked');
        checkboxes.forEach(checkbox => {
            selectedQuestions.push(parseInt(checkbox.value));
        });
        
        if (selectedQuestions.length === 0) {
            showToast('Pilih minimal satu soal!', 'error');
            return;
        }
        
        // Add exam
        const newExam = {
            name: name,
            subject: subject,
            date: date,
            duration: duration,
            questionIds: selectedQuestions,
            createdBy: currentUser.id,
            status: status
        };
        
        dataManager.addExam(newExam);
        showToast('Ujian berhasil dibuat!', 'success');
        modal.classList.remove('active');
        loadGuruExamsTable();
        loadGuruDashboard();
    });
});

// Monitor exam function
function monitorExam(examId) {
    const exam = dataManager.getExamById(examId);
    if (!exam) {
        showToast('Ujian tidak ditemukan!', 'error');
        return;
    }
    
    const results = dataManager.getExamResultsByExamId(examId);
    
    modalTitle.textContent = 'Monitor Ujian';
    modalBody.innerHTML = `
        <div>
            <h3>${exam.name}</h3>
            <p><strong>Mata Pelajaran:</strong> ${exam.subject}</p>
            <p><strong>Jumlah Peserta:</strong> ${results.length}</p>
            
            <h4 class="mt-3 mb-2">Hasil Ujian</h4>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Siswa</th>
                            <th>Nilai</th>
                            <th>Status</th>
                            <th>Waktu</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.map((result, index) => {
                            const user = dataManager.getUserById(result.userId);
                            return `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${user ? user.name : 'Pengguna tidak ditemukan'}</td>
                                    <td>${result.score}</td>
                                    <td>
                                        <span class="badge ${result.score >= 70 ? 'badge-success' : 'badge-danger'}">
                                            ${result.score >= 70 ? 'Lulus' : 'Tidak Lulus'}
                                        </span>
                                    </td>
                                    <td>${new Date(result.endTime).toLocaleString('id-ID')}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="mt-3 text-center">
                <button class="btn" onclick="modal.classList.remove('active')">Tutup</button>
            </div>
        </div>
    `;
    modal.classList.add('active');
}

// View result function
function viewResult(resultId) {
    const result = dataManager.getExamResults().find(r => r.id === resultId);
    if (!result) {
        showToast('Hasil tidak ditemukan!', 'error');
        return;
    }
    
    const exam = dataManager.getExamById(result.examId);
    if (!exam) {
        showToast('Ujian tidak ditemukan!', 'error');
        return;
    }
    
    const questions = exam.questionIds.map(id => dataManager.getQuestionById(id));
    
    modalTitle.textContent = 'Detail Hasil Ujian';
    modalBody.innerHTML = `
        <div>
            <h3>${exam.name}</h3>
            <p><strong>Mata Pelajaran:</strong> ${exam.subject}</p>
            <p><strong>Nilai:</strong> ${result.score}</p>
            <p><strong>Status:</strong> 
                <span class="badge ${result.score >= 70 ? 'badge-success' : 'badge-danger'}">
                    ${result.score >= 70 ? 'Lulus' : 'Tidak Lulus'}
                </span>
            </p>
            <p><strong>Waktu Mulai:</strong> ${new Date(result.startTime).toLocaleString('id-ID')}</p>
            <p><strong>Waktu Selesai:</strong> ${new Date(result.endTime).toLocaleString('id-ID')}</p>
            
            <h4 class="mt-3 mb-2">Jawaban</h4>
            <div style="max-height: 300px; overflow-y: auto; border: 1px solid var(--border-color); padding: 0.5rem; border-radius: 5px;">
                ${questions.map((question, index) => {
                    const userAnswer = result.answers[index];
                    const isCorrect = userAnswer === question.correctAnswer;
                    return `
                        <div class="mb-3">
                            <p><strong>${index + 1}.</strong> ${question.question}</p>
                            <div style="margin-left: 20px;">
                                <p>A. ${question.options[0]} ${userAnswer === 0 ? (isCorrect ? '<span class="badge badge-success">Benar</span>' : '<span class="badge badge-danger">Salah</span>') : ''}</p>
                                <p>B. ${question.options[1]} ${userAnswer === 1 ? (isCorrect ? '<span class="badge badge-success">Benar</span>' : '<span class="badge badge-danger">Salah</span>') : ''}</p>
                                <p>C. ${question.options[2]} ${userAnswer === 2 ? (isCorrect ? '<span class="badge badge-success">Benar</span>' : '<span class="badge badge-danger">Salah</span>') : ''}</p>
                                <p>D. ${question.options[3]} ${userAnswer === 3 ? (isCorrect ? '<span class="badge badge-success">Benar</span>' : '<span class="badge badge-danger">Salah</span>') : ''}</p>
                                <p><small>Jawaban Benar: ${String.fromCharCode(65 + question.correctAnswer)}</small></p>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div class="mt-3 text-center">
                <button class="btn" onclick="modal.classList.remove('active')">Tutup</button>
            </div>
        </div>
    `;
    modal.classList.add('active');
}

// Search functionality
document.getElementById('userSearch')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#userTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

document.getElementById('examSearch')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#examTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

document.getElementById('questionSearch')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#questionTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

document.getElementById('guruExamSearch')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#guruExamTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

document.getElementById('availableExamSearch')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#availableExamTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

document.getElementById('historySearch')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#historyTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});
