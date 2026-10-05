/* ==========================================================================
   5학년 1반 학급관리 & 학급경제 게이미피케이션 Application Core JavaScript
   ========================================================================== */

const STORAGE_KEY = 'class_management_app_v1';

// Initial Roles Array (25개 1인 1역)
const INITIAL_ROLES = [
  { id: 1, name: '칠판 도우미', icon: '🧹', desc: '쉬는 시간마다 칠판과 지우개를 깨끗이 정돈하기' },
  { id: 2, name: '우유 도우미', icon: '🥛', desc: '급식실에서 학급 우유 바구니 수령 및 정돈하기' },
  { id: 3, name: '환기 도우미', icon: '🪟', desc: '중간 쉬는 시간과 점심시간에 창문 열어 환기하기' },
  { id: 4, name: '신발장 정돈', icon: '👟', desc: '실내화 및 신발장이 깔끔하도록 정돈 도와주기' },
  { id: 5, name: '게시판 관리', icon: '📌', desc: '학급 뒤편 게시판 안내문 깔끔히 붙이기' },
  { id: 6, name: '급식 줄도우미', icon: '🍱', desc: '점심시간 급식 줄이 질서정연하도록 안내하기' },
  { id: 7, name: '학습지 배부', icon: '📄', desc: '수업 시간 선생님 학습지와 유인물 나누어주기' },
  { id: 8, name: '정보 도우미', icon: '💻', desc: '수업용 컴퓨터, TV 켜기 및 프로젝터 리모컨 관리' },
  { id: 9, name: '도서 도우미', icon: '📚', desc: '학급 문고 책장 책 정돈 및 대출 기록 도와주기' },
  { id: 10, name: '분리수거 반장', icon: '♻️', desc: '종이, 플라스틱 분리수거함 깨끗하게 관리하기' },
  { id: 11, name: '에너지 절약', icon: '💡', desc: '이동 수업 시 학급 형광등과 소음기 끄기' },
  { id: 12, name: '체육 도우미', icon: '⚽', desc: '체육 시간 공과 체육 용구 챙기고 정리하기' },
  { id: 13, name: '음악 도우미', icon: '🎵', desc: '음악 시간 악기 준비 및 차임벨 관리하기' },
  { id: 14, name: '미술 정리', icon: '🎨', desc: '미술 수업 후 세면대 및 미술 재료 정돈하기' },
  { id: 15, name: '인사 반장', icon: '🙋', desc: '수업 시작과 끝에 바른 자세로 인사 구호 외치기' },
  { id: 16, name: '생일 축하 도우미', icon: '🎂', desc: '이번 달 생일인 친구 축하 카드 준비하기' },
  { id: 17, name: '화분 도우미', icon: '🪴', desc: '학급 화분에 주기적으로 사랑의 물주기' },
  { id: 18, name: '방역 도우미', icon: '🧴', desc: '손 소독제 및 책상 소독 물티슈 채워두기' },
  { id: 19, name: '안전 반장', icon: '🦺', desc: '복도에서 뛰지 않도록 안전 수칙 안내하기' },
  { id: 20, name: '시간 관리 도우미', icon: '⏱️', desc: '수업 시작 시간 1분 전 알림 외치기' },
  { id: 21, name: '우산 도우미', icon: '☂️', desc: '비 오는 날 학급 우산꽂이 정돈하기' },
  { id: 22, name: '칭찬 도우미', icon: '💖', desc: '친구들의 좋은 행동을 관찰하고 학급에 알리기' },
  { id: 23, name: '마스크&휴지 정돈', icon: '🧻', desc: '학급 화장지 및 청결 물품 잔여량 확인' },
  { id: 24, name: '모듬 활동 도우미', icon: '🧩', desc: '모둠 바구니 교구 정리 상태 점검하기' },
  { id: 25, name: '오늘의 DJ', icon: '📻', desc: '아침 자율 시간 및 아침독서 음악 재생하기' }
];

// Initial Student Names (25명)
const INITIAL_STUDENT_NAMES = [
  '강다온', '고은유', '김민준', '김서연', '김하늘',
  '박도현', '박서준', '박지민', '배수아', '백시우',
  '송유진', '신현우', '안지안', '윤서아', '이준우',
  '이하은', '장우주', '정다은', '조은우', '최지우',
  '한소율', '한지호', '허예나', '홍길동', '황민서'
];

// Initial Shop Items
const INITIAL_SHOP_ITEMS = [
  { id: 'item-1', icon: '🎟️', title: '짝 바꾸기권', desc: '하루 동안 내가 원하는 친구와 짝궁이 되는 쿠폰', price: 60 },
  { id: 'item-2', icon: '🪑', title: '자율 자리 선택권', desc: '원하는 자리를 하루 동안 선택하여 앉을 수 있는 쿠폰', price: 80 },
  { id: 'item-3', icon: '🍱', title: '급식 우선 섭취권', desc: '점심시간에 가장 먼저 급식을 받을 수 있는 티켓', price: 40 },
  { id: 'item-4', icon: '🧹', title: '1인 1역 1일 면제권', desc: '하루 동안 나의 1인 1역 임무를 휴식하는 쿠폰', price: 50 },
  { id: 'item-5', icon: '✏️', title: '캐릭터 젤펜 선물', desc: '선생님이 준비한 귀여운 캐릭터 연필/젤펜 1자루', price: 30 },
  { id: 'item-6', icon: '🍿', title: '맛있는 간식 교환권', desc: '오후 쉬는시간에 오가닉 과자/음료수 교환', price: 45 },
  { id: 'item-7', icon: '🎮', title: '보드게임 우선선택권', desc: '비오는 날 쉬는시간 보드게임 1순위 선택권', price: 35 }
];

// App State
let state = {
  students: [],
  roles: [],
  shopItems: [],
  classNotes: ''
};

let currentMode = 'teacher'; // 'teacher' | 'student'
let currentStudentId = 1;
let currentPayModalStudentId = null;

// Classroom Helper Tools Timers
let timerInterval = null;
let timerSeconds = 180;
let timerRunning = false;

let swInterval = null;
let swTimeMs = 0;
let swRunning = false;

/* ==========================================================================
   Initialization & Persistence
   ========================================================================== */
function init() {
  loadData();
  populateStudentSelect();
  renderApp();
  initToolsState();
}

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      state = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse state', e);
      createDefaultState();
    }
  } else {
    createDefaultState();
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createDefaultState() {
  state.roles = [...INITIAL_ROLES];
  state.shopItems = [...INITIAL_SHOP_ITEMS];
  state.classNotes = '📌 [오늘의 학급 알림장]\n1. 수학 익힘책 42~45쪽 풀어오기\n2. 내일 체육시간 운동화 착용하기\n3. 감사일기 매일 작성하고 10미소 획득하기!';

  state.students = INITIAL_STUDENT_NAMES.map((name, index) => {
    const studentId = index + 1;
    return {
      id: studentId,
      number: studentId,
      name: name,
      balance: 50 + (studentId % 5) * 10, // Default 50~90 balance
      exp: (studentId * 15) % 100,
      level: 1 + Math.floor((studentId * 15) / 100),
      roleId: studentId, // 1 to 1 mapping initially
      purchasedCoupons: [
        { id: `c-init-${studentId}`, itemId: 'item-3', title: '급식 우선 섭취권', icon: '🍱', date: getTodayString(), used: false }
      ],
      diaries: [
        { id: `d-init-${studentId}`, date: getYesterdayString(), content: '친구와 점심시간에 피구를 하고 서로 양보해서 기분이 좋았다.', rewardExp: 50, rewardBalance: 10 }
      ],
      lastDiaryDate: getYesterdayString() // yesterday so today can be written
    };
  });

  saveData();
}

function resetClassData() {
  if (confirm('학급 데이터를 초기 상태로 리셋하시겠습니까? (모든 잔액 및 감사일기가 초기화됩니다)')) {
    localStorage.removeItem(STORAGE_KEY);
    createDefaultState();
    showToast('🔄 학급 데이터가 성공적으로 초기화되었습니다.', 'info');
    renderApp();
  }
}

function getTodayString() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

function getYesterdayString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

/* ==========================================================================
   Navigation & Mode Switcher
   ========================================================================== */
function switchMode(mode) {
  currentMode = mode;
  document.getElementById('btnModeTeacher').classList.toggle('active', mode === 'teacher');
  document.getElementById('btnModeStudent').classList.toggle('active', mode === 'student');
  document.getElementById('studentSelectorWrap').style.display = mode === 'student' ? 'flex' : 'none';

  renderApp();
}

function populateStudentSelect() {
  const select = document.getElementById('studentSelect');
  select.innerHTML = '';
  state.students.forEach(st => {
    const opt = document.createElement('option');
    opt.value = st.id;
    opt.textContent = `${st.number}번 ${st.name}`;
    select.appendChild(opt);
  });
  select.value = currentStudentId;
}

function onStudentSelectChange(val) {
  currentStudentId = parseInt(val, 10);
  renderApp();
}

function renderApp() {
  if (currentMode === 'teacher') {
    document.getElementById('teacherView').style.display = 'flex';
    document.getElementById('studentView').style.display = 'none';
    renderTeacherView();
  } else {
    document.getElementById('teacherView').style.display = 'none';
    document.getElementById('studentView').style.display = 'flex';
    renderStudentView();
  }
}

/* ==========================================================================
   STUDENT VIEW RENDER LOGIC
   ========================================================================== */
function renderStudentView() {
  const student = state.students.find(s => s.id === currentStudentId) || state.students[0];
  const role = state.roles.find(r => r.id === student.roleId) || state.roles[0];

  // Hero Card
  document.getElementById('stName').textContent = student.name;
  document.getElementById('stNumberTag').textContent = `${student.number}번 학생`;
  document.getElementById('stRoleIcon').textContent = role.icon;
  document.getElementById('stRoleTitle').textContent = role.name;

  // Level Calc: 100 EXP per Level
  const levelTitle = getLevelTitle(student.level);
  document.getElementById('stLevelText').textContent = `⭐ Level ${student.level} (${levelTitle})`;
  document.getElementById('stExpText').textContent = `EXP ${student.exp} / 100`;
  const expPercent = Math.min(100, Math.max(0, student.exp));
  document.getElementById('stExpFill').style.width = `${expPercent}%`;
  document.getElementById('stBalance').textContent = student.balance.toLocaleString();

  // Today's Duty Task
  document.getElementById('stRoleIconBig').textContent = role.icon;
  document.getElementById('stRoleNameTask').textContent = role.name;
  document.getElementById('stRoleDescTask').textContent = role.desc;

  // Gratitude Diary Status
  const isDiaryWrittenToday = (student.lastDiaryDate === getTodayString());
  const diaryStatusWrap = document.getElementById('diaryStatusContainer');
  if (isDiaryWrittenToday) {
    diaryStatusWrap.innerHTML = `<span class="status-tag completed">✅ 오늘 작성 완료</span>`;
  } else {
    diaryStatusWrap.innerHTML = `<button class="status-tag pending" style="cursor:pointer;" onclick="switchStudentTab('diary')">✏️ 오늘 일기 쓰기</button>`;
  }

  // Render Tabs
  renderStudentShop(student);
  renderStudentDiary(student);
}

function getLevelTitle(level) {
  if (level <= 1) return '씨앗';
  if (level === 2) return '새싹';
  if (level === 3) return '꽃봉오리';
  if (level === 4) return '만개한 꽃';
  if (level >= 5) return '빛나는 나무';
  return '성장자';
}

function switchStudentTab(tabName) {
  const tabs = ['shop', 'diary', 'values'];
  tabs.forEach(t => {
    const btn = document.querySelector(`.student-tab-btn[onclick="switchStudentTab('${t}')"]`);
    const panel = document.getElementById(`tab${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (btn) btn.classList.toggle('active', t === tabName);
    if (panel) panel.classList.toggle('active', t === tabName);
  });
}

function renderStudentShop(student) {
  const shopGrid = document.getElementById('shopGrid');
  shopGrid.innerHTML = '';

  state.shopItems.forEach(item => {
    const canAfford = student.balance >= item.price;
    const card = document.createElement('div');
    card.className = 'shop-card';
    card.innerHTML = `
      <div>
        <div class="shop-item-icon">${item.icon}</div>
        <div style="margin-top:12px;">
          <div class="shop-item-title">${item.title}</div>
          <div class="shop-item-desc">${item.desc}</div>
        </div>
      </div>
      <div class="shop-card-footer">
        <div class="item-price">💰 ${item.price} 미소</div>
        <button class="btn-buy" ${canAfford ? '' : 'disabled'} onclick="buyShopItem('${item.id}')">
          ${canAfford ? '구매하기' : '잔액 부족'}
        </button>
      </div>
    `;
    shopGrid.appendChild(card);
  });

  // Render Purchased Coupons
  const couponsGrid = document.getElementById('purchasedCouponsGrid');
  couponsGrid.innerHTML = '';

  if (!student.purchasedCoupons || student.purchasedCoupons.length === 0) {
    couponsGrid.innerHTML = `<div style="font-size:13px; color:var(--text-muted);">보유 중인 쿠폰이 없습니다.</div>`;
    return;
  }

  student.purchasedCoupons.forEach(coupon => {
    const ticket = document.createElement('div');
    ticket.className = 'coupon-ticket';
    if (coupon.used) {
      ticket.style.opacity = '0.5';
      ticket.style.filter = 'grayscale(1)';
    }

    ticket.innerHTML = `
      <div class="coupon-ticket-title">${coupon.icon} ${coupon.title}</div>
      <div class="coupon-ticket-date">구매일: ${coupon.date}</div>
      ${coupon.used ? 
        '<div style="font-size:12px; font-weight:800; color:#6b7280; margin-top:8px;">[사용 완료]</div>' : 
        `<button class="btn-use-coupon" onclick="useCoupon('${coupon.id}')">사용하기</button>`
      }
    `;
    couponsGrid.appendChild(ticket);
  });
}

function buyShopItem(itemId) {
  const student = state.students.find(s => s.id === currentStudentId);
  const item = state.shopItems.find(i => i.id === itemId);

  if (!student || !item) return;
  if (student.balance < item.price) {
    showToast('❌ 잔액이 부족하여 상품을 구매할 수 없습니다.', 'error');
    return;
  }

  student.balance -= item.price;
  const newCoupon = {
    id: `coupon-${Date.now()}`,
    itemId: item.id,
    title: item.title,
    icon: item.icon,
    date: getTodayString(),
    used: false
  };

  if (!student.purchasedCoupons) student.purchasedCoupons = [];
  student.purchasedCoupons.unshift(newCoupon);

  saveData();
  showToast(`🎉 [${item.title}] 구매가 완료되었습니다! 잔액 -${item.price} 미소`, 'success');
  renderStudentView();
}

function useCoupon(couponId) {
  const student = state.students.find(s => s.id === currentStudentId);
  if (!student) return;

  const coupon = student.purchasedCoupons.find(c => c.id === couponId);
  if (coupon) {
    if (confirm(`'${coupon.title}' 쿠폰을 정말로 사용하시겠습니까?`)) {
      coupon.used = true;
      saveData();
      showToast(`🎟️ '${coupon.title}' 쿠폰을 사용하였습니다.`, 'info');
      renderStudentView();
    }
  }
}

function renderStudentDiary(student) {
  const historyList = document.getElementById('diaryHistoryList');
  historyList.innerHTML = '';

  if (!student.diaries || student.diaries.length === 0) {
    historyList.innerHTML = `<div style="font-size:13px; color:var(--text-muted); text-align:center; padding:20px;">작성된 감사일기가 없습니다.</div>`;
    return;
  }

  student.diaries.forEach(d => {
    const card = document.createElement('div');
    card.className = 'diary-card';
    card.innerHTML = `
      <div class="diary-card-date">📅 ${d.date} (보상 획득: +${d.rewardBalance}미소 / +${d.rewardExp}EXP)</div>
      <div class="diary-card-text">${escapeHtml(d.content)}</div>
    `;
    historyList.appendChild(card);
  });
}

function submitGratitudeDiary() {
  const student = state.students.find(s => s.id === currentStudentId);
  const input = document.getElementById('diaryInputText');
  const text = input.value.trim();

  if (!text) {
    showToast('✏️ 감사일기 내용을 작성해 주세요.', 'error');
    return;
  }

  if (student.lastDiaryDate === getTodayString()) {
    showToast('⚠️ 오늘은 이미 감사일기를 작성하고 보상을 획득하셨습니다.', 'info');
    return;
  }

  const rewardBalance = 10;
  const rewardExp = 50;

  student.balance += rewardBalance;
  student.exp += rewardExp;

  // Level Up Check
  let leveledUp = false;
  while (student.exp >= 100) {
    student.exp -= 100;
    student.level += 1;
    leveledUp = true;
  }

  student.lastDiaryDate = getTodayString();
  if (!student.diaries) student.diaries = [];
  student.diaries.unshift({
    id: `diary-${Date.now()}`,
    date: getTodayString(),
    content: text,
    rewardExp: rewardExp,
    rewardBalance: rewardBalance
  });

  input.value = '';
  saveData();

  if (leveledUp) {
    showToast(`🎊 축하합니다! Level ${student.level}로 레벨업 하셨습니다! 💰+${rewardBalance}미소, ⭐+${rewardExp}EXP`, 'success');
  } else {
    showToast(`🎉 감사일기 작성 완료! 💰+${rewardBalance}미소, ⭐+${rewardExp}EXP 지급 완료!`, 'success');
  }

  renderStudentView();
}

/* ==========================================================================
   TEACHER VIEW RENDER LOGIC
   ========================================================================== */
function renderTeacherView() {
  const grid = document.getElementById('studentsGrid');
  grid.innerHTML = '';

  state.students.forEach(st => {
    const role = state.roles.find(r => r.id === st.roleId) || { name: '미배정', icon: '❓' };
    const isDiaryDone = (st.lastDiaryDate === getTodayString());

    const card = document.createElement('div');
    card.className = 'student-card-teacher';
    card.onclick = (e) => {
      // Prevent button click propagation
      if (e.target.tagName === 'BUTTON') return;
      openPayModal(st.id);
    };

    card.innerHTML = `
      <div class="card-top-info">
        <div>
          <span class="student-num">${st.number}번</span>
          <div class="student-name-lg">${st.name}</div>
          <span class="student-role-tag">${role.icon} ${role.name}</span>
        </div>
        <div style="font-size:12px; font-weight:700; color:var(--text-muted);">
          <span class="diary-status-dot ${isDiaryDone ? 'done' : 'none'}"></span>
          ${isDiaryDone ? '일기완료' : '일기미작성'}
        </div>
      </div>

      <div class="student-stats-row">
        <span>⭐ Lv.${st.level} (EXP ${st.exp})</span>
        <span class="stat-currency">💰 ${st.balance.toLocaleString()} 미소</span>
      </div>

      <div class="card-quick-actions">
        <button class="btn-quick-pay plus" onclick="quickPay('${st.id}', 10, 20)">+10 미소</button>
        <button class="btn-quick-pay minus" onclick="quickPay('${st.id}', -10, 0)">-10 미소</button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Render Management Sub Tables
  renderTeacherShopTable();
  renderTeacherRoleTable();
}

function quickPay(studentId, balanceDiff, expDiff) {
  const st = state.students.find(s => s.id == studentId);
  if (!st) return;

  st.balance = Math.max(0, st.balance + balanceDiff);
  st.exp = Math.max(0, st.exp + expDiff);

  while (st.exp >= 100) {
    st.exp -= 100;
    st.level += 1;
  }

  saveData();
  showToast(`💰 ${st.name} 학생에게 ${balanceDiff > 0 ? '+' + balanceDiff : balanceDiff} 미소가 적용되었습니다.`, 'info');
  renderTeacherView();
}

function renderTeacherShopTable() {
  const tbody = document.getElementById('teacherShopTable');
  tbody.innerHTML = '';

  state.shopItems.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.icon} ${item.title}</strong><div style="font-size:11px; color:var(--text-muted);">${item.desc}</div></td>
      <td>💰 ${item.price} 미소</td>
      <td>
        <button onclick="deleteShopItem('${item.id}')" style="color:var(--accent-red); font-weight:800; font-size:12px;">삭제</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderTeacherRoleTable() {
  const tbody = document.getElementById('teacherRoleTable');
  tbody.innerHTML = '';

  state.roles.forEach(role => {
    const assignedStudents = state.students.filter(s => s.roleId === role.id).map(s => s.name).join(', ');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${role.icon} ${role.name}</strong></td>
      <td>${assignedStudents || '<span style="color:var(--text-light)">미배정</span>'}</td>
    `;
    tbody.appendChild(tr);
  });
}

function randomizeRoles() {
  if (confirm('모든 학생의 1인 1역을 무작위로 재배정하시겠습니까?')) {
    // Shuffle roles
    const shuffledRoles = [...state.roles].sort(() => 0.5 - Math.random());
    state.students.forEach((st, idx) => {
      st.roleId = shuffledRoles[idx % shuffledRoles.length].id;
    });

    saveData();
    showToast('🎲 25명 학생의 1인 1역 배정이 무작위로 완료되었습니다!', 'success');
    renderApp();
  }
}

/* ==========================================================================
   MODALS LOGIC
   ========================================================================== */
function openPayModal(studentId) {
  currentPayModalStudentId = studentId;
  const st = state.students.find(s => s.id == studentId);
  if (!st) return;

  document.getElementById('payStudentName').textContent = `${st.number}번 ${st.name}`;
  document.getElementById('payAmountInput').value = 10;
  document.getElementById('payExpInput').value = 20;
  document.getElementById('payReasonInput').value = '';
  document.getElementById('payModal').classList.add('open');
}

function closePayModal() {
  document.getElementById('payModal').classList.remove('open');
}

function confirmStudentPay() {
  const st = state.students.find(s => s.id == currentPayModalStudentId);
  if (!st) return;

  const amount = parseInt(document.getElementById('payAmountInput').value, 10) || 0;
  const exp = parseInt(document.getElementById('payExpInput').value, 10) || 0;
  const reason = document.getElementById('payReasonInput').value.trim();

  st.balance = Math.max(0, st.balance + amount);
  st.exp = Math.max(0, st.exp + exp);

  while (st.exp >= 100) {
    st.exp -= 100;
    st.level += 1;
  }

  saveData();
  closePayModal();
  showToast(`💰 ${st.name} 학생 화폐 (${amount > 0 ? '+' + amount : amount}), EXP(+${exp}) 지급 완료! ${reason ? '[' + reason + ']' : ''}`, 'success');
  renderTeacherView();
}

// Bulk Pay
function openBulkPayModal() {
  document.getElementById('bulkPayModal').classList.add('open');
}

function closeBulkPayModal() {
  document.getElementById('bulkPayModal').classList.remove('open');
}

function confirmBulkPay() {
  const amount = parseInt(document.getElementById('bulkAmountInput').value, 10) || 0;
  const exp = parseInt(document.getElementById('bulkExpInput').value, 10) || 0;
  const reason = document.getElementById('bulkReasonInput').value.trim();

  state.students.forEach(st => {
    st.balance = Math.max(0, st.balance + amount);
    st.exp = Math.max(0, st.exp + exp);
    while (st.exp >= 100) {
      st.exp -= 100;
      st.level += 1;
    }
  });

  saveData();
  closeBulkPayModal();
  showToast(`🎁 전체 25명 학생에게 일괄 💰 ${amount} 미소 & ⭐ ${exp} EXP 지급 완료!`, 'success');
  renderTeacherView();
}

// Add Item
function openAddItemModal() {
  document.getElementById('addItemModal').classList.add('open');
}

function closeAddItemModal() {
  document.getElementById('addItemModal').classList.remove('open');
}

function confirmAddItem() {
  const icon = document.getElementById('itemIconInput').value.trim() || '🎁';
  const title = document.getElementById('itemTitleInput').value.trim();
  const desc = document.getElementById('itemDescInput').value.trim();
  const price = parseInt(document.getElementById('itemPriceInput').value, 10) || 10;

  if (!title) {
    showToast('⚠️ 상품명을 입력해 주세요.', 'error');
    return;
  }

  const newItem = {
    id: `item-${Date.now()}`,
    icon,
    title,
    desc,
    price
  };

  state.shopItems.push(newItem);
  saveData();
  closeAddItemModal();
  showToast(`🛍️ 신규 상품 [${title}] 등록이 완료되었습니다.`, 'success');
  renderTeacherView();
}

function deleteShopItem(itemId) {
  if (confirm('이 상점 상품을 삭제하시겠습니까?')) {
    state.shopItems = state.shopItems.filter(i => i.id !== itemId);
    saveData();
    showToast('🗑️ 상품이 삭제되었습니다.', 'info');
    renderTeacherView();
  }
}

/* ==========================================================================
   CLASSROOM HELPER FLOATING TOOLS (TIMER, STOPWATCH, NOTEPAD)
   ========================================================================== */
function toggleToolsDrawer() {
  document.getElementById('toolsDrawer').classList.toggle('open');
}

function switchDrawerTab(tabName) {
  const tabs = ['timer', 'stopwatch', 'notes'];
  tabs.forEach(t => {
    const btn = document.querySelector(`.drawer-tab-btn[onclick="switchDrawerTab('${t}')"]`);
    const panel = document.getElementById(`drawer${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (btn) btn.classList.toggle('active', t === tabName);
    if (panel) panel.style.display = (t === tabName) ? 'block' : 'none';
  });
}

function initToolsState() {
  const notesArea = document.getElementById('classNotesArea');
  if (notesArea) notesArea.value = state.classNotes || '';
  updateTimerDisplay();
}

function saveClassNotes(val) {
  state.classNotes = val;
  saveData();
}

// Timer Logic
function setTimerPreset(mins) {
  pauseTimer();
  timerSeconds = mins * 60;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const m = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
  const s = String(timerSeconds % 60).padStart(2, '0');
  document.getElementById('timerDisplay').textContent = `${m}:${s}`;
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  document.getElementById('btnTimerStart').textContent = '진행중';

  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      updateTimerDisplay();
    } else {
      pauseTimer();
      showToast('⏰ 타이머 시간이 완료되었습니다!', 'success');
      playBeepSound();
    }
  }, 1000);
}

function pauseTimer() {
  timerRunning = false;
  clearInterval(timerInterval);
  document.getElementById('btnTimerStart').textContent = '시작';
}

function resetTimer() {
  pauseTimer();
  timerSeconds = 180;
  updateTimerDisplay();
}

// Stopwatch Logic
function updateSwDisplay() {
  const totalMs = swTimeMs;
  const mins = String(Math.floor(totalMs / 60000)).padStart(2, '0');
  const secs = String(Math.floor((totalMs % 60000) / 1000)).padStart(2, '0');
  const ms = String(Math.floor((totalMs % 1000) / 100));
  document.getElementById('swDisplay').textContent = `${mins}:${secs}.${ms}`;
}

function startStopwatch() {
  if (swRunning) return;
  swRunning = true;
  const startTime = Date.now() - swTimeMs;

  swInterval = setInterval(() => {
    swTimeMs = Date.now() - startTime;
    updateSwDisplay();
  }, 100);
}

function pauseStopwatch() {
  swRunning = false;
  clearInterval(swInterval);
}

function resetStopwatch() {
  pauseStopwatch();
  swTimeMs = 0;
  updateSwDisplay();
}

function playBeepSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch (e) {}
}

/* ==========================================================================
   UTILITIES
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  
  if (type === 'error') toast.style.borderLeft = '4px solid var(--accent-red)';
  else if (type === 'success') toast.style.borderLeft = '4px solid var(--accent-green)';
  else toast.style.borderLeft = '4px solid var(--primary)';

  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// Start app on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);
