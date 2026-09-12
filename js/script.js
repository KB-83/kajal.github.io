function setTheme(theme){

    document.body.className = theme;

    localStorage.setItem(
        "website-theme",
        theme
    );

}



/*
================================
Load saved theme
================================
*/

document.addEventListener(
"DOMContentLoaded",
function(){

    let saved =
    localStorage.getItem(
        "website-theme"
    );


    if(saved){

        document.body.className = saved;

    }
    else{

        // Default theme
        document.body.className = "dark";

        localStorage.setItem(
            "website-theme",
            "dark"
        );

    }

});



/*
================================
Language menu
================================
*/


function toggleLanguageMenu(){

    let menu =
    document.getElementById(
        "language-dropdown"
    );


    if(menu){

        menu.classList.toggle(
            "show"
        );

    }

}



/*
================================
Google Translate
================================
*/


function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {
            pageLanguage: "en",
            includedLanguages: "fr,de,es",
            autoDisplay: false
        },
        "google_translate_element"
    );
}




function changeLanguage(lang) {
    // Close the dropdown after selection
    let menu = document.getElementById("language-dropdown");
    if (menu) menu.classList.remove("show");

    if (lang === "en") {
        // Clear Google Translate state cookie
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + window.location.hostname + "; path=/;";

        let select = document.querySelector(".goog-te-combo");
        if (select) {
            select.value = "";
            select.dispatchEvent(new Event("change"));
        }
        window.location.reload();
        return;
    }

    let select = document.querySelector(".goog-te-combo");
    if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
    }
}
function initGraphCanvas() {
  const canvas = document.getElementById("graph-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const numPoints = 28;
  const points = Array.from({ length: numPoints }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
  }));

  let mouse = { x: -1000, y: -1000 };
  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const nodes = [...points, { x: mouse.x, y: mouse.y, vx: 0, vy: 0 }];

    for (let i = 0; i < points.length; i++) {
      points[i].x += points[i].vx;
      points[i].y += points[i].vy;

      if (points[i].x < 0 || points[i].x > width) points[i].vx *= -1;
      if (points[i].y < 0 || points[i].y > height) points[i].vy *= -1;

      ctx.fillStyle = "rgba(167, 139, 250, 0.5)";
      ctx.beginPath();
      ctx.arc(points[i].x, points[i].y, 2.5, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j++) {
        const dx = points[i].x - nodes[j].x;
        const dy = points[i].y - nodes[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 115) {
          ctx.strokeStyle = `rgba(167, 139, 250, ${0.32 * (1 - dist / 115)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

window.addEventListener("load", initGraphCanvas);
function initCardTilt() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
}

window.addEventListener("load", initCardTilt);

document.addEventListener("mousemove", (e) => {
  const btn = e.target.closest(".theme-buttons button");
  if (btn) {
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    btn.style.transform = `translate(${dx * 0.35}px, ${dy * 0.35}px) scale(1.15)`;
    btn.style.transition = "transform 0.08s ease-out";
  }
});

document.addEventListener("mouseout", (e) => {
  const btn = e.target.closest(".theme-buttons button");
  if (btn) {
    btn.style.transform = "translate(0px, 0px) scale(1)";
    btn.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
  }
});
/*
/*
===================================================================
Celestial Orrery Header (Fully Configurable at the Top)
===================================================================
*/
function initHeaderKBAnimation() {
  // ================= CONFIGURATION (EDIT ANY TIME) =================
  const CONSTELLATION_TEXT   = "KB";      // 1. Text to form (e.g. "KB", "Kajal")
  const CONSTELLATION_SIZE   = 36;        // 2. Font size in pixels (e.g. 28, 36, 42)
  const TOTAL_BALLS          = 700;       // 3. Number of balls (e.g. 150 = airy, 300 = dense, 500 = ultra dense)
  const CONSTELLATION_COLORS = [
    "#c084fc", // Radiant Lavender Purple
    "#7e22ce"  // Deep Velvet Amethyst
  ];
  const CONVERGE_SPEED       = 0.02;     // 5. Fast magnetic assembly (0.05 = soft, 0.12 = very fast)
  const DIVERGE_SPEED        = 1.8;     // 6. Slow gentle release (0.04 = ultra slow, 0.12 = faster)
  // =================================================================

  const header = document.querySelector("header");
  const canvas = document.getElementById("header-canvas");
  if (!header || !canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let isHovered = false;
  let particles = [];
  let offsets = [];
  let letterBones = [];
  let textHalfWidth = 60;
  let textHalfHeight = 18;

  let mouse = { x: 0, y: 0 };

  // Color shading helpers (automatically shades any hex color into 3D sphere depth)
  function shadeHex(hex, factor = 0.5) {
    let c = hex.replace("#", "");
    if (c.length === 3) c = c.split("").map(x => x + x).join("");
    const num = parseInt(c, 16);
    const r = Math.floor(((num >> 16) & 255) * factor);
    const g = Math.floor(((num >> 8) & 255) * factor);
    const b = Math.floor((num & 255) * factor);
    return `rgb(${r},${g},${b})`;
  }

  function lightenHex(hex, factor = 0.4) {
    let c = hex.replace("#", "");
    if (c.length === 3) c = c.split("").map(x => x + x).join("");
    const num = parseInt(c, 16);
    const r = Math.min(255, Math.floor(((num >> 16) & 255) + (255 - ((num >> 16) & 255)) * factor));
    const g = Math.min(255, Math.floor(((num >> 8) & 255) + (255 - ((num >> 8) & 255)) * factor));
    const b = Math.min(255, Math.floor((num & 255) + (255 - (num & 255)) * factor));
    return `rgb(${r},${g},${b})`;
  }

  // 1. Calculate relative offsets matching exactly TOTAL_BALLS count
  function computeOffsets(text, fontSize, targetCount) {
    const offCanvas = document.createElement("canvas");
    const octx = offCanvas.getContext("2d");
    const fontStr = `900 ${fontSize}px Inter, -apple-system, BlinkMacSystemFont, Arial, sans-serif`;
    octx.font = fontStr;

    const metrics = octx.measureText(text);
    const boxWidth = Math.ceil(metrics.width + 80);
    const boxHeight = Math.ceil(fontSize * 2 + 40);

    offCanvas.width = boxWidth;
    offCanvas.height = boxHeight;

    octx.font = fontStr;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillStyle = "#ffffff";
    octx.fillText(text, boxWidth / 2, boxHeight / 2);

    const imgData = octx.getImageData(0, 0, boxWidth, boxHeight).data;
    const candidates = [];

    let minX = boxWidth, maxX = 0;
    let minY = boxHeight, maxY = 0;

    for (let y = 0; y < boxHeight; y += 1) {
      for (let x = 0; x < boxWidth; x += 1) {
        const alpha = imgData[(y * boxWidth + x) * 4 + 3];
        if (alpha > 120) {
          candidates.push({
            dx: x - boxWidth / 2,
            dy: y - boxHeight / 2
          });
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    // Evenly sample exactly targetCount points across the letter shape
    const sampled = [];
    if (candidates.length > 0) {
      for (let i = 0; i < targetCount; i++) {
        const idx = Math.floor((i * candidates.length) / targetCount);
        sampled.push(candidates[idx]);
      }
    }

    // Connect close neighbors to create star-chart constellation lines
    const bones = [];
    for (let i = 0; i < sampled.length; i++) {
      for (let j = i + 1; j < sampled.length; j++) {
        const d = Math.hypot(sampled[i].dx - sampled[j].dx, sampled[i].dy - sampled[j].dy);
        if (d <= 3.8) {
          bones.push([i, j]);
        }
      }
    }

    return {
      points: sampled,
      bones: bones,
      halfW: (maxX - minX) / 2 + 18,
      halfH: (maxY - minY) / 2 + 10
    };
  }

  // 2. Adjust canvas & spawn particles with the chosen palette
  function resize() {
    width = canvas.width = header.offsetWidth;
    height = canvas.height = header.offsetHeight;

    const data = computeOffsets(CONSTELLATION_TEXT, CONSTELLATION_SIZE, TOTAL_BALLS);
    offsets = data.points;
    letterBones = data.bones;
    textHalfWidth = data.halfW;
    textHalfHeight = data.halfH;

    mouse.x = width / 2;
    mouse.y = height / 2;

    particles = [];
    for (let i = 0; i < TOTAL_BALLS; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.04 + Math.random() * DIVERGE_SPEED;

      // Pick a color from the user's CONSTELLATION_COLORS array
      const hex = CONSTELLATION_COLORS[i % CONSTELLATION_COLORS.length];

      // Assign celestial types (10% Saturn, 30% Diamond Star, 60% Planet)
      const roll = Math.random();
      let kind = "planet";
      let radius = 0.75 + Math.random() * 0.55;

      if (roll < 0.10) {
        kind = "saturn";
        radius = 1.9;
      } else if (roll < 0.40) {
        kind = "star";
        radius = 2.0;
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        baseVx: Math.cos(angle) * speed,
        baseVy: Math.sin(angle) * speed,
        radius: radius,
        kind: kind,
        color: hex,
        shadow: shadeHex(hex, 0.45),
        ring: lightenHex(hex, 0.4),
        phase: Math.random() * Math.PI * 2,
        history: []
      });
    }
  }

  resize();
  window.addEventListener("resize", resize);

  // 3. Mouse tracking
  header.addEventListener("mouseenter", (e) => {
    isHovered = true;
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  header.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  header.addEventListener("mouseleave", () => {
    isHovered = false;
    particles.forEach((p) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.03 + Math.random() * DIVERGE_SPEED;
      p.baseVx = Math.cos(angle) * speed;
      p.baseVy = Math.sin(angle) * speed;
      p.history = [];
    });
  });

  // --- Drawing Helpers ---

  function drawMiniSaturn(ctx, x, y, r, p, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.35);
    ctx.globalAlpha = alpha;

    // Back ring
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 2.2, r * 0.65, 0, Math.PI, Math.PI * 2);
    ctx.strokeStyle = p.ring;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Planet sphere
    const grad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.1, 0, 0, r);
    grad.addColorStop(0, p.color);
    grad.addColorStop(1, p.shadow);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Front ring
    ctx.beginPath();
    ctx.ellipse(0, 0, r * 2.2, r * 0.65, 0, 0, Math.PI);
    ctx.strokeStyle = p.ring;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.restore();
  }

  function drawMiniDiamondStar(ctx, x, y, r, p, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = alpha;

    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.quadraticCurveTo(0, 0, 0, r);
    ctx.quadraticCurveTo(0, 0, -r, 0);
    ctx.quadraticCurveTo(0, 0, 0, -r);
    ctx.fillStyle = p.color;
    ctx.fill();

    ctx.restore();
  }

  function drawMiniPlanet(ctx, x, y, r, p, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;

    const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
    grad.addColorStop(0, p.color);
    grad.addColorStop(1, p.shadow);

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.restore();
  }

  // 4. Render loop
  let time = 0;
  function render() {
    ctx.clearRect(0, 0, width, height);
    time += 0.025;

    const centerX = Math.max(textHalfWidth, Math.min(width - textHalfWidth, mouse.x));
    const centerY = Math.max(textHalfHeight, Math.min(height - textHalfHeight, mouse.y));

    // A. Update Physics
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const offset = offsets[i];

      if (isHovered && offset) {
        const microX = Math.cos(time + p.phase) * 0.2;
        const microY = Math.sin(time + p.phase) * 0.2;

        const targetX = centerX + offset.dx + microX;
        const targetY = centerY + offset.dy + microY;

        const dx = targetX - p.x;
        const dy = targetY - p.y;

        p.vx = p.vx * 0.82 + dx * CONVERGE_SPEED;
        p.vy = p.vy * 0.82 + dy * CONVERGE_SPEED;
      } else {
        p.vx = p.vx * 0.985 + p.baseVx * 0.015;
        p.vy = p.vy * 0.985 + p.baseVy * 0.015;
      }

      const currentSpeed = Math.hypot(p.vx, p.vy);
      if (currentSpeed > 0.8) {
        p.history.unshift({ x: p.x, y: p.y });
        if (p.history.length > 3) p.history.pop();
      } else {
        p.history = [];
      }

      p.x += p.vx;
      p.y += p.vy;

      if (!isHovered) {
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }
    }

    // B. Draw Fine Skeleton Constellation Lines
    if (isHovered) {
      ctx.lineWidth = 0.65;
      for (let k = 0; k < letterBones.length; k++) {
        const pA = particles[letterBones[k][0]];
        const pB = particles[letterBones[k][1]];
        if (!pA || !pB) continue;

        const dist = Math.hypot(pA.x - pB.x, pA.y - pB.y);
        if (dist < 14) {
          const alpha = (1 - dist / 14) * 0.4;
          ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          ctx.stroke();
        }
      }
    }

    // C. Draw Comet Tails
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.history.length > 1) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        for (let h = 0; h < p.history.length; h++) {
          ctx.lineTo(p.history[h].x, p.history[h].y);
        }
        ctx.strokeStyle = `rgba(192, 132, 252, ${isHovered ? 0.25 : 0.1})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }
    }

    // D. Draw Celestial Bodies
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const alpha = isHovered ? 0.95 : 0.42;

      if (p.kind === "saturn") {
        drawMiniSaturn(ctx, p.x, p.y, p.radius, p, alpha);
      } else if (p.kind === "star") {
        drawMiniDiamondStar(ctx, p.x, p.y, p.radius, p, alpha);
      } else {
        drawMiniPlanet(ctx, p.x, p.y, p.radius, p, alpha);
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

window.addEventListener("load", () => {
  setTimeout(initHeaderKBAnimation, 50);
});