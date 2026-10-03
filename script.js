/* =========================================
   ANKII — SORRY EXPERIENCE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     VARIABLES
  ===================================== */

  let currentStage = 1;
  let heartsFound = 0;
  let musicOn = false;

  const stages = document.querySelectorAll(".stage");

  const progressFill =
    document.getElementById("progressFill");

  const stageLabel =
    document.getElementById("stageLabel");

  const progressPercent =
    document.getElementById("progressPercent");

  const particles =
    document.getElementById("particles");

  const toast =
    document.getElementById("toast");


  /* =====================================
     STAGE SYSTEM
  ===================================== */

  function goToStage(number) {

    if (number < 1 || number > 4) return;

    currentStage = number;

    stages.forEach(stage => {
      stage.classList.remove("active");
    });

    const nextStage =
      document.getElementById(`stage${number}`);

    if (nextStage) {
      nextStage.classList.add("active");
    }

    const percent = number * 25;

    progressFill.style.width = `${percent}%`;

    stageLabel.textContent =
      `Stage ${number} of 4`;

    progressPercent.textContent =
      `${percent}%`;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    createParticles(8);
  }


  /* =====================================
     TOAST
  ===================================== */

  let toastTimer;

  function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  }


  /* =====================================
     PARTICLES
  ===================================== */

  function createParticles(amount = 12) {

    const icons = [
      "❤️",
      "💗",
      "✨",
      "💫",
      "♡"
    ];

    for (let i = 0; i < amount; i++) {

      const particle =
        document.createElement("div");

      particle.className = "particle";

      particle.textContent =
        icons[Math.floor(Math.random() * icons.length)];

      particle.style.left =
        Math.random() * 100 + "%";

      particle.style.bottom =
        "-30px";

      particle.style.animationDuration =
        (3 + Math.random() * 3) + "s";

      particle.style.animationDelay =
        Math.random() * .7 + "s";

      particle.style.fontSize =
        (12 + Math.random() * 18) + "px";

      particles.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 7000);
    }
  }


  /* =====================================
     STAGE 1
  ===================================== */

  const heartButton =
    document.getElementById("heartButton");

  const secretMessage =
    document.getElementById("secretMessage");

  const stage1Next =
    document.getElementById("stage1Next");

  heartButton.addEventListener("click", () => {

    heartButton.style.animation = "none";

    secretMessage.classList.add("show");

    showToast("Okay... you found the first secret ❤️");

    createParticles(20);

    playTone(520, .12);
    playTone(660, .12);
  });


  stage1Next.addEventListener("click", () => {

    playTone(620, .1);

    goToStage(2);

  });


  /* =====================================
     STAGE 2 — HEART GAME
  ===================================== */

  const gameBoxes =
    document.querySelectorAll(".game-box");

  const heartScore =
    document.getElementById("heartScore");

  const gameMessage =
    document.getElementById("gameMessage");

  const stage2Next =
    document.getElementById("stage2Next");


  gameBoxes.forEach(box => {

    box.addEventListener("click", () => {

      if (
        box.classList.contains("found") ||
        box.classList.contains("missed")
      ) {
        return;
      }

      const hasHeart =
        box.dataset.heart === "true";

      if (hasHeart) {

        box.classList.add("found");

        box.textContent = "❤️";

        heartsFound++;

        heartScore.textContent =
          `${heartsFound} / 3`;

        playTone(700 + heartsFound * 80, .12);

        createParticles(7);

        if (heartsFound === 1) {

          gameMessage.textContent =
            "One found... 👀";

        } else if (heartsFound === 2) {

          gameMessage.textContent =
            "Two! You're getting closer...";

        } else {

          gameMessage.textContent =
            "You found them all. ❤️";

          stage2Next.classList.remove("disabled");

          stage2Next.textContent =
            "Continue →";

          showToast(
            "Challenge complete! ✨"
          );
        }

      } else {

        box.classList.add("missed");

        box.textContent = "×";

        showToast(
          "Nope 😭 Try another one!"
        );

        playTone(180, .08);

        setTimeout(() => {

          box.classList.remove("missed");

          box.textContent = "?";

        }, 500);
      }

    });

  });


  stage2Next.addEventListener("click", () => {

    if (heartsFound < 3) {

      showToast(
        "Find all 3 hearts first ❤️"
      );

      return;
    }

    goToStage(3);

  });


  /* =====================================
     STAGE 3
  ===================================== */

  const stage3Next =
    document.getElementById("stage3Next");

  stage3Next.addEventListener("click", () => {

    playTone(650, .1);

    goToStage(4);

  });


  /* =====================================
     ENVELOPE
  ===================================== */

  const envelopeWrapper =
    document.getElementById("envelopeWrapper");

  const finalLetter =
    document.getElementById("finalLetter");

  const envelopeHint =
    document.querySelector(".envelope-hint");


  envelopeWrapper.addEventListener("click", () => {

    if (
      envelopeWrapper.classList.contains("open")
    ) {
      return;
    }

    envelopeWrapper.classList.add("open");

    envelopeHint.textContent =
      "A little something from my heart...";

    playTone(440, .1);
    setTimeout(() => playTone(554, .1), 120);
    setTimeout(() => playTone(659, .15), 240);

    createParticles(25);

    setTimeout(() => {

      finalLetter.classList.add("show");

      setTimeout(() => {

        finalLetter.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }, 200);

    }, 900);

  });


  /* =====================================
     RESTART
  ===================================== */

  const restartBtn =
    document.getElementById("restartBtn");

  restartBtn.addEventListener("click", () => {

    heartsFound = 0;

    heartScore.textContent = "0 / 3";

    gameMessage.textContent = "";

    gameBoxes.forEach(box => {

      box.classList.remove(
        "found",
        "missed"
      );

      box.textContent = "?";

    });

    stage2Next.classList.add("disabled");

    stage2Next.textContent =
      "Unlock next stage 🔒";

    envelopeWrapper.classList.remove("open");

    finalLetter.classList.remove("show");

    envelopeHint.textContent =
      "Tap the envelope";

    secretMessage.classList.remove("show");

    heartButton.style.animation = "";

    goToStage(1);

  });


  /* =====================================
     CONFETTI
  ===================================== */

  const confettiBtn =
    document.getElementById("confettiBtn");

  confettiBtn.addEventListener("click", () => {

    createParticles(70);

    showToast(
      "Okay, now smile properly 😭❤️"
    );

    playHappySound();

  });


  /* =====================================
     SIMPLE WEB AUDIO
     No external audio required
  ===================================== */

  let audioContext = null;

  function getAudioContext() {

    if (!audioContext) {

      audioContext =
        new (
          window.AudioContext ||
          window.webkitAudioContext
        )();

    }

    return audioContext;
  }


  function playTone(
    frequency = 440,
    duration = .1
  ) {

    try {

      const ctx = getAudioContext();

      const oscillator =
        ctx.createOscillator();

      const gain =
        ctx.createGain();

      oscillator.type = "sine";

      oscillator.frequency.value =
        frequency;

      gain.gain.setValueAtTime(
        0.0001,
        ctx.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.08,
        ctx.currentTime + .02
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + duration
      );

      oscillator.connect(gain);

      gain.connect(ctx.destination);

      oscillator.start();

      oscillator.stop(
        ctx.currentTime + duration
      );

    } catch (error) {

      console.log(
        "Audio unavailable"
      );

    }

  }


  function playHappySound() {

    playTone(523, .12);

    setTimeout(() => {
      playTone(659, .12);
    }, 120);

    setTimeout(() => {
      playTone(784, .2);
    }, 240);

  }


  /* =====================================
     MUSIC BUTTON
  ===================================== */

  const musicBtn =
    document.getElementById("musicBtn");

  musicBtn.addEventListener("click", () => {

    musicOn = !musicOn;

    if (musicOn) {

      musicBtn.textContent = "♫";

      musicBtn.style.background =
        "rgba(255,90,150,.2)";

      showToast(
        "Sound effects enabled ♫"
      );

      playHappySound();

    } else {

      musicBtn.textContent = "×";

      musicBtn.style.background =
        "rgba(255,255,255,.07)";

      showToast(
        "Sound effects muted"
      );

    }

  });


  /* =====================================
     BACKGROUND PARTICLES
  ===================================== */

  setInterval(() => {

    if (Math.random() > .45) {
      createParticles(1);
    }

  }, 1800);


  /* =====================================
     PREVENT ACCIDENTAL BUTTON DOUBLE TAP
  ===================================== */

  document.querySelectorAll("button")
    .forEach(button => {

      button.addEventListener(
        "touchstart",
        () => {},
        { passive: true }
      );

    });


  /* =====================================
     START
  ===================================== */

  goToStage(1);

});
