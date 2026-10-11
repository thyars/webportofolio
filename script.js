/**
 * BACKEND & EMBEDDED PORTFOLIO JAVASCRIPT
 * Handles mobile drawer, interactive ESP32 simulator, code diff toggle, scroll spy, & toast notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Mobile Menu Drawer Toggle ---
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileToggleBtn && mobileNav) {
    mobileToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggleBtn.classList.toggle('active', isOpen);
      mobileToggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking any nav link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggleBtn.classList.remove('active');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !mobileToggleBtn.contains(e.target)) {
        mobileNav.classList.remove('open');
        mobileToggleBtn.classList.remove('active');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- 2. Scroll Spy & Navbar Blur on Scroll ---
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');

  const handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Navbar shadow & backdrop styling on scroll
    if (scrollY > 50) {
      navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.7)';
      navbar.style.background = 'rgba(8, 12, 20, 0.95)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.background = 'rgba(8, 12, 20, 0.85)';
    }

    // Scroll spy active class
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    desktopNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // --- 3. Interactive IoT Sensor & Dot Matrix Simulator ---
  const sensorSlider = document.getElementById('sensor-slider');
  const distVal = document.getElementById('dist-val');
  const matrixText = document.getElementById('matrix-display-text');

  if (sensorSlider && distVal && matrixText) {
    const lyricsList = [
      "♪ MEMUTAR: KAU ADALAH DARAHKU... ♪",
      "♪ MEMUTAR: BILA HABIS SUDAH WAKTU INI... ♪",
      "♪ RUNNING TEXT LAGU AKTIF... ♪"
    ];
    let lyricIndex = 0;
    let lyricInterval = null;

    const startLyricCycle = () => {
      if (lyricInterval) clearInterval(lyricInterval);
      lyricInterval = setInterval(() => {
        if (parseInt(sensorSlider.value, 10) >= 15) {
          lyricIndex = (lyricIndex + 1) % lyricsList.length;
          matrixText.textContent = lyricsList[lyricIndex];
        }
      }, 3500);
    };

    sensorSlider.addEventListener('input', (e) => {
      const distance = parseInt(e.target.value, 10);
      distVal.textContent = `${distance} cm`;

      // Trigger behavior sesuai deskripsi proyek:
      // Teks "oke bos" saat sensor ultrasonik mendeteksi objek mendekat (< 15cm)
      if (distance < 15) {
        matrixText.textContent = "OKE BOS!";
        matrixText.classList.add('active-bos');
        distVal.classList.add('text-success');
      } else {
        matrixText.classList.remove('active-bos');
        distVal.classList.remove('text-success');
        matrixText.textContent = lyricsList[lyricIndex];
      }
    });

    startLyricCycle();
  }

  // --- 4. Expandable Code Refactor Diff Toggle ---
  const codeToggleBtns = document.querySelectorAll('.code-toggle-btn');
  codeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetElem = document.getElementById(targetId);
      if (targetElem) {
        const isHidden = targetElem.classList.toggle('hidden');
        btn.querySelector('span').textContent = isHidden 
          ? 'Lihat Contoh Refactor Kode' 
          : 'Tutup Perbandingan Kode';
      }
    });
  });

  // --- 5. Copy Email Action with Toast Notification ---
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailAddressText = document.getElementById('email-address-text');

  const showToast = (message, type = 'info') => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  };

  if (copyEmailBtn && emailAddressText) {
    copyEmailBtn.addEventListener('click', () => {
      const emailToCopy = emailAddressText.textContent.replace('[Belum diisi: ', '').replace(']', '').trim();
      navigator.clipboard.writeText(emailToCopy).then(() => {
        showToast('Alamat email berhasil disalin ke clipboard!');
      }).catch(() => {
        showToast('Silakan salin email secara manual.');
      });
    });
  }

  // --- 6. Quick Contact Form Handler ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;

      const mailtoUrl = `mailto:email@anda.com?subject=${encodeURIComponent(`[Portofolio] ${subject} - ${name}`)}&body=${encodeURIComponent(message)}`;
      
      showToast('Membuka aplikasi email Anda...');
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);
    });
  }

  // --- 7. Interactive CLI Terminal Controller ---
  const cliInput = document.getElementById('cli-input');
  const cliOutput = document.getElementById('cli-output');
  const cliScreen = document.getElementById('cli-screen');
  const chipButtons = document.querySelectorAll('.chip-btn');

  if (cliInput && cliOutput && cliScreen) {
    const commandHistory = [];
    let historyIndex = -1;

    // Focus input when clicking anywhere inside the terminal screen
    cliScreen.addEventListener('click', () => {
      cliInput.focus();
    });

    const commands = {
      help: () => `
        <div class="cli-res-title">Daftar Perintah Tersedia:</div>
        <div class="cli-res-item"><span class="cli-text-cyan">whoami</span> - Profil, pendidikan, &amp; target role</div>
        <div class="cli-res-item"><span class="cli-text-cyan">skills</span> - Rangkuman keahlian Backend, Database &amp; IoT</div>
        <div class="cli-res-item"><span class="cli-text-cyan">projects</span> - Daftar proyek utama (E-Voting &amp; ESP32)</div>
        <div class="cli-res-item"><span class="cli-text-cyan">cat evoting</span> - Bedah teknis &amp; arsitektur proyek E-Voting</div>
        <div class="cli-res-item"><span class="cli-text-cyan">cat esp32</span> - Detail sistem embedded web server ESP32</div>
        <div class="cli-res-item"><span class="cli-text-cyan">ping esp32</span> - Simulasi koneksi jaringan ke modul ESP32</div>
        <div class="cli-res-item"><span class="cli-text-cyan">security</span> - Praktik hardening keamanan yang diterapkan</div>
        <div class="cli-res-item"><span class="cli-text-cyan">contact</span> - Saluran komunikasi &amp; kontak</div>
        <div class="cli-res-item"><span class="cli-text-cyan">date</span> - Menampilkan waktu server saat ini</div>
        <div class="cli-res-item"><span class="cli-text-cyan">clear</span> - Membersihkan layar terminal</div>
      `,

      whoami: () => `
        <div class="cli-res-title">Identitas Sistem:</div>
        <div class="cli-res-item"><strong>Nama:</strong> Mahasiswa Teknik Rekayasa Internet</div>
        <div class="cli-res-item"><strong>Kampus:</strong> Politeknik Elektronika Negeri Surabaya (PENS)</div>
        <div class="cli-res-item"><strong>Target Role:</strong> <span class="cli-text-green">Backend Developer &amp; Embedded Web Server</span></div>
        <div class="cli-res-item"><strong>Fokus:</strong> Membangun alur data andal, arsitektur MVC mandiri, &amp; query aman.</div>
      `,

      skills: () => `
        <div class="cli-res-title">Spesifikasi Keahlian:</div>
        <div class="cli-res-item"><span class="cli-text-cyan">[Backend]</span> Custom PHP MVC (No Framework), Custom Router, Auth Session</div>
        <div class="cli-res-item"><span class="cli-text-green">[Database]</span> MySQL (mysqli), Prepared Statements, schema.sql</div>
        <div class="cli-res-item"><span class="cli-text-yellow">[Bahasa]</span> PHP, C/C++ (Arduino IDE), SQL</div>
        <div class="cli-res-item"><span class="cli-text-cyan">[Pustaka/Tools]</span> Laragon, PhpSpreadsheet, FPDF, .env, Arduino IDE</div>
        <div class="cli-res-item"><span class="cli-text-red">[IoT &amp; Hardware]</span> ESP32, Embedded Web Server, Dot Matrix 8x8, Sensor Jarak, RFID</div>
      `,

      projects: () => `
        <div class="cli-res-title">Daftar Proyek Unggulan:</div>
        <div class="cli-res-item">1. <strong class="cli-text-cyan">e-voting</strong> : Sistem Pemilihan Suara Kampus (Custom PHP MVC + Security Hardening)</div>
        <div class="cli-res-item">2. <strong class="cli-text-green">esp32-server</strong> : Embedded Web Server Pemutar Lagu &amp; Running Text Dot Matrix</div>
        <div class="cli-res-item cli-text-muted">Ketik <span class="cli-text-yellow">cat evoting</span> atau <span class="cli-text-yellow">cat esp32</span> untuk detail teknis.</div>
      `,

      'cat evoting': () => `
        <div class="cli-res-title">PROYEK 1: SISTEM E-VOTING KAMPUS (PHP MVC)</div>
        <div class="cli-res-item"><strong>Arsitektur:</strong> MVC &amp; Router buatan sendiri tanpa framework pihak ketiga.</div>
        <div class="cli-res-item"><strong>Fitur:</strong> Login admin "dua kunci", impor pemilih Excel (PhpSpreadsheet), cetak PDF bukti suara (FPDF).</div>
        <div class="cli-res-item"><strong>Perbaikan Keamanan:</strong></div>
        <div class="cli-res-item"> - SQL Injection fix via <span class="cli-text-green">prepared statements</span>.</div>
        <div class="cli-res-item"> - Mitigasi celah <span class="cli-text-green">IDOR</span> pada unduh bukti suara.</div>
        <div class="cli-res-item"> - Isolasi kredensial ke file <span class="cli-text-green">.env</span> &amp; proteksi session timeout.</div>
      `,

      'cat esp32': () => `
        <div class="cli-res-title">PROYEK 2: EMBEDDED WEB SERVER &amp; DOT MATRIX ESP32</div>
        <div class="cli-res-item"><strong>Mikrokontroler:</strong> ESP32 diprogram via Arduino IDE (C/C++).</div>
        <div class="cli-res-item"><strong>Web Server:</strong> Halaman pemutar lagu di-*serve* mandiri langsung dari memori ESP32.</div>
        <div class="cli-res-item"><strong>Interaksi:</strong> Menampilkan potongan lirik lagu pada LED Dot Matrix 8x8 secara sinkron.</div>
        <div class="cli-res-item"><strong>Sensor Ultrasonik:</strong> Otomatis menampilkan teks <span class="cli-text-green">"OKE BOS!"</span> saat objek terdeteksi mendekat.</div>
      `,

      'ping esp32': () => `
        <div class="cli-text-cyan">PING 192.168.4.1 (esp32-embedded-webserver): 56 data bytes</div>
        <div>64 bytes from 192.168.4.1: icmp_seq=1 ttl=64 time=2.14 ms</div>
        <div>64 bytes from 192.168.4.1: icmp_seq=2 ttl=64 time=1.89 ms</div>
        <div>64 bytes from 192.168.4.1: icmp_seq=3 ttl=64 time=2.01 ms</div>
        <div class="cli-text-green">--- esp32 ping statistics ---</div>
        <div>3 packets transmitted, 3 received, 0% packet loss, time 2004ms</div>
        <div class="cli-text-green">Status: HTTP Embedded Web Server Online | Dot Matrix Active</div>
      `,

      security: () => `
        <div class="cli-res-title">Daftar Praktik Keamanan Terapan:</div>
        <div class="cli-res-item"><span class="cli-text-green">[✓]</span> Prepared Statements (mysqli) - Mencegah SQL Injection</div>
        <div class="cli-res-item"><span class="cli-text-green">[✓]</span> Route Guard - Proteksi akses rute tanpa otentikasi</div>
        <div class="cli-res-item"><span class="cli-text-green">[✓]</span> IDOR Protection - Validasi hak unduh PDF bukti suara</div>
        <div class="cli-res-item"><span class="cli-text-green">[✓]</span> Session Timeout - Pengamanan sesi aktif otomatis</div>
        <div class="cli-res-item"><span class="cli-text-green">[✓]</span> .env Secrets - Kredensial DB terisolasi dari source code</div>
      `,

      contact: () => `
        <div class="cli-res-title">Saluran Komunikasi:</div>
        <div class="cli-res-item"><strong>Email:</strong> [email@anda.com]</div>
        <div class="cli-res-item"><strong>Kampus:</strong> PENS Surabaya, Indonesia</div>
        <div class="cli-res-item"><strong>Status:</strong> Terbuka untuk kesempatan kerja &amp; magang Backend Developer</div>
        <div class="cli-res-item cli-text-muted">Gunakan section Kontak di bawah untuk form langsung.</div>
      `,

      date: () => `<div>Server Time: <span class="cli-text-cyan">${new Date().toLocaleString('id-ID')}</span></div>`,

      sudo: () => `<div class="cli-text-yellow">Permission denied: 'guest' is not in the sudoers file. However, recruiter access is granted! :)</div>`,

      clear: () => null
    };

    const executeCommand = (rawCmd) => {
      const trimmedCmd = rawCmd.trim();
      if (!trimmedCmd) return;

      const lowerCmd = trimmedCmd.toLowerCase();
      commandHistory.push(trimmedCmd);
      historyIndex = commandHistory.length;

      if (lowerCmd === 'clear' || lowerCmd === 'cls') {
        cliOutput.innerHTML = `
          <div class="cli-banner">
            <div class="cli-brand">Backend &amp; Embedded System OS v2.4</div>
            <div class="cli-subtext">Layar dibersihkan. Ketik <span class="cmd-highlight">help</span> untuk daftar perintah.</div>
          </div>
        `;
        cliInput.value = '';
        return;
      }

      // Format response
      let responseHtml = '';
      if (commands[lowerCmd]) {
        responseHtml = commands[lowerCmd]();
      } else {
        responseHtml = `<div class="cli-text-red">Perintah tidak dikenali: '${trimmedCmd}'. Ketik <span class="cli-text-cyan">help</span> untuk melihat daftar perintah.</div>`;
      }

      // Append entry to terminal output
      const entry = document.createElement('div');
      entry.className = 'cli-log-entry';
      entry.innerHTML = `
        <div class="cli-command-echo">
          <span class="cli-prompt"><span class="user-host">guest@pens</span>:<span class="path">~</span>$</span>
          <span class="cli-echo-text">${trimmedCmd}</span>
        </div>
        <div class="cli-response">${responseHtml}</div>
      `;
      cliOutput.appendChild(entry);

      cliInput.value = '';
      // Smooth scroll down
      setTimeout(() => {
        cliScreen.scrollTop = cliScreen.scrollHeight;
      }, 20);
    };

    // Enter key listener
    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeCommand(cliInput.value);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          cliInput.value = commandHistory[historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          cliInput.value = commandHistory[historyIndex] || '';
        } else {
          historyIndex = commandHistory.length;
          cliInput.value = '';
        }
      }
    });

    // Touch quick command chips handler
    chipButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        if (cmd) {
          executeCommand(cmd);
          cliInput.focus();
        }
      });
    });
  }
});

