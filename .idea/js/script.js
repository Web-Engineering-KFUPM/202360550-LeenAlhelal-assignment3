/* ==========================================================================
   script.js - Leen Alhelal's portfolio

   1. Dark / light mode toggle (the main interactive feature)
   2. Contact form confirmation message (no backend yet)
   3. Current year in the footer
   Assignment 2: project filter, accessibility customization
   Assignment 3: project detail pop-ups, live weather (Open-Meteo API)
   ========================================================================== */


/* --------------------------------------------------------------------------
   1. DARK / LIGHT MODE TOGGLE

   How it works:
   - The <html> element gets a data-theme attribute: "light" or "dark".
   - styles.css has different colour variables for each value.
   - Clicking the button flips the attribute, and the colours change.
   - The choice is saved in localStorage so it is remembered on the next visit.
   -------------------------------------------------------------------------- */

// Grab the elements we need from the page
const themeToggleButton = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;   // the <html> element

// The name we use to save the choice in the browser
const THEME_STORAGE_KEY = "portfolio-theme";

// Apply a theme ("light" or "dark") to the page
function applyTheme(theme) {
  htmlElement.setAttribute("data-theme", theme);

  // The button text describes what will happen when it is clicked
  if (theme === "dark") {
    themeToggleButton.textContent = "Switch to light mode";
  } else {
    themeToggleButton.textContent = "Switch to dark mode";
  }
}

// Work out which theme to start with
function getInitialTheme() {
  let savedTheme = null;

  // try/catch: some browsers block localStorage, and we don't want the page to break
  try {
    savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    savedTheme = null;
  }

  // 1st choice: the theme the visitor picked last time
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  // 2nd choice: the theme their device prefers (e.g. dark mode turned on in their system)
  const devicePrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return devicePrefersDark ? "dark" : "light";
}

// When the button is clicked: switch theme and remember the choice
themeToggleButton.addEventListener("click", function () {
  const currentTheme = htmlElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(newTheme);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  } catch (error) {
    // If saving fails, the theme still changes for this visit. Nothing else to do.
  }
});

// Set the starting theme as soon as the page loads
applyTheme(getInitialTheme());


/* --------------------------------------------------------------------------
   2. CONTACT FORM (validation updated in Assignment 3)

   There is no backend, so nothing is really sent.
   Steps when the visitor clicks "Send message":
   1. Check every field with its own rules.
   2. If any field fails: show the errors and move focus to the first wrong field.
   3. Only if ALL fields pass: show the thank-you message and clear the form.
   -------------------------------------------------------------------------- */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

const nameInput = document.getElementById("contact-name");
const emailInput = document.getElementById("contact-email");
const messageInput = document.getElementById("contact-message");

const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 1000;

// Each check function returns an error message, or "" (empty) if the value is fine.

function checkName(value) {
  const name = value.trim();   // trim() removes spaces at the start and end

  if (name === "") {
    return "Please enter your name.";
  }

  if (name.length < 2) {
    return "Your name must be at least 2 characters.";
  }

  // \p{L} means "any letter in any language", so Arabic names work too.
  if (!/^[\p{L}\s'-]+$/u.test(name)) {
    return "Your name can only contain letters, spaces, hyphens (-) and apostrophes (').";
  }

  return "";
}

function checkEmail(value) {
  const email = value.trim();

  if (email === "") {
    return "Please enter your email address.";
  }

  // Something @ something . at least 2 letters, with no spaces (e.g. name@example.com)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return "This email doesn't look right. Use a format like name@example.com.";
  }

  return "";
}

function checkMessage(value) {
  const message = value.trim();

  if (message === "") {
    return "Please write a message.";
  }

  if (message.length < MESSAGE_MIN_LENGTH) {
    return `Your message must be at least ${MESSAGE_MIN_LENGTH} characters (currently ${message.length}).`;
  }

  if (message.length > MESSAGE_MAX_LENGTH) {
    return `Your message must be ${MESSAGE_MAX_LENGTH} characters or fewer (currently ${message.length}).`;
  }

  return "";
}

// Connects each input to its check function.
const formFields = [
  { input: nameInput, check: checkName },
  { input: emailInput, check: checkEmail },
  { input: messageInput, check: checkMessage }
];

// Checks one field and shows or clears its error. Returns true if the field is valid.
function validateField(field) {
  const errorMessage = field.check(field.input.value);
  const errorElement = document.getElementById(`${field.input.id}-error`);

  errorElement.textContent = errorMessage;

  // aria-invalid tells screen readers the field has a problem (and our CSS colours it red).
  if (errorMessage) {
    field.input.setAttribute("aria-invalid", "true");
  } else {
    field.input.removeAttribute("aria-invalid");
  }

  return errorMessage === "";
}

formFields.forEach((field) => {
  // When the visitor leaves a field, check it (so they don't wait until submit).
  field.input.addEventListener("blur", () => {
    if (field.input.value.trim() !== "") {
      validateField(field);
    }
  });

  // While they type in a field that already has an error, re-check it
  // so the error disappears as soon as it is fixed.
  field.input.addEventListener("input", () => {
    if (field.input.getAttribute("aria-invalid") === "true") {
      validateField(field);
    }
  });
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();   // stops the normal form behaviour (page reload)

  // Step 1: check every field (map runs validateField on all of them, even after one fails)
  const results = formFields.map((field) => validateField(field));
  const errorCount = results.filter((isValid) => !isValid).length;

  // Step 2: if anything failed, explain and move focus to the first wrong field
  if (errorCount > 0) {
    formStatus.textContent =
      `Please fix ${errorCount} ${errorCount === 1 ? "field" : "fields"} before sending.`;

    const firstInvalid = formFields.find((field, index) => !results[index]);
    firstInvalid.input.focus();
    return;
  }

  // Step 3: everything passed
  formStatus.textContent = "Thank you! This is a demo form, so your message was not sent anywhere.";
  contactForm.reset();      // clears the fields
});


/* --------------------------------------------------------------------------
   3. FOOTER YEAR
   Fills in the current year so you never have to update it by hand.
   -------------------------------------------------------------------------- */

document.getElementById("current-year").textContent = new Date().getFullYear();


/* ==========================================================================
   ASSIGNMENT 2: PROJECT FILTER
   ========================================================================== */

const projectFilter = document.getElementById("project-filter");
const projectCards = document.querySelectorAll(".project-card");
const projectCount = document.getElementById("project-count");
const projectEmpty = document.getElementById("project-empty");

function filterProjects() {
    const selectedStatus = projectFilter.value;
    let visibleCount = 0;

    projectCards.forEach((card) => {
        const cardStatus = card.dataset.status;

        const shouldShow =
            selectedStatus === "all" ||
            cardStatus === selectedStatus;

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleCount++;
        }
    });

    if (projectCount) {
        projectCount.textContent =
            `${visibleCount} project${visibleCount === 1 ? "" : "s"} shown`;
    }

    if (projectEmpty) {
        projectEmpty.hidden = visibleCount !== 0;
    }
}

if (projectFilter) {
    projectFilter.addEventListener("change", filterProjects);
    filterProjects();
}

/* ==========================================================================
   ASSIGNMENT 2: ACCESSIBILITY CUSTOMIZATION
   ========================================================================== */

// Find the controls in the accessibility settings panel.
const textScale = document.getElementById("text-scale");
const textScaleValue = document.getElementById("text-scale-value");

const lineSpacing = document.getElementById("line-spacing");
const lineSpacingValue = document.getElementById("line-spacing-value");

const contrastSetting = document.getElementById("contrast-setting");
const widthSetting = document.getElementById("width-setting");

const resetAccessibility =
    document.getElementById("reset-accessibility");

const accessibilityStatus =
    document.getElementById("accessibility-status");

// The default preferences used when the page first loads.
const defaultAccessibilitySettings = {
    textScale: 100,
    lineSpacing: 1.6,
    contrast: "standard",
    width: "comfortable"
};

// A key used to save and retrieve preferences in this browser.
const accessibilityStorageKey = "leen-portfolio-accessibility";

function loadAccessibilitySettings() {
    try {
        const savedSettings =
            localStorage.getItem(accessibilityStorageKey);

        if (savedSettings) {
            return {
                ...defaultAccessibilitySettings,
                ...JSON.parse(savedSettings)
            };
        }
    } catch (error) {
        // Storage may be unavailable or the saved data may be invalid.
        console.warn("Could not load accessibility preferences.");
    }

    return { ...defaultAccessibilitySettings };
}

function saveAccessibilitySettings(settings) {
    try {
        localStorage.setItem(
            accessibilityStorageKey,
            JSON.stringify(settings)
        );

        return true;
    } catch (error) {
        // The page still works even if preferences cannot be saved.
        console.warn("Could not save accessibility preferences.");

        return false;
    }
}

function applyAccessibilitySettings(settings, announce = false) {
    // Keep values within the ranges offered by the controls.
    const scale = Math.min(150, Math.max(100,
        Number(settings.textScale) || 100));

    const spacing = Math.min(2.2, Math.max(1.4,
        Number(settings.lineSpacing) || 1.6));

    const contrast =
        settings.contrast === "high" ? "high" : "standard";

    const width =
        settings.width === "narrow" ? "narrow" : "comfortable";

    // Apply the settings through CSS custom properties and attributes.
    document.documentElement.style.setProperty(
        "--text-scale",
        scale / 100
    );

    document.documentElement.style.setProperty(
        "--reading-line-height",
        spacing
    );

    document.documentElement.dataset.contrast = contrast;

    document.documentElement.style.setProperty(
        "--max-width",
        width === "narrow" ? "850px" : "1100px"
    );

    // Update the controls so they reflect the current settings.
    textScale.value = scale;
    textScaleValue.textContent = `${scale}%`;

    lineSpacing.value = spacing;
    lineSpacingValue.textContent = spacing.toFixed(1);

    contrastSetting.value = contrast;
    widthSetting.value = width;

    // Save the preferences for the visitor's next visit.
    const saved = saveAccessibilitySettings({
        textScale: scale,
        lineSpacing: spacing,
        contrast: contrast,
        width: width
    });

    // Announce feedback when the visitor finishes changing a setting.
    if (announce) {
        accessibilityStatus.textContent = saved
            ? "Your preferences have been applied and saved on this device."
            : "Your preferences have been applied, but could not be saved.";
    }
}

// Load saved settings when the page opens.
if (
    textScale &&
    lineSpacing &&
    contrastSetting &&
    widthSetting &&
    resetAccessibility &&
    accessibilityStatus
) {
    const initialSettings = loadAccessibilitySettings();

    applyAccessibilitySettings(initialSettings);

    // Apply changes immediately as the visitor moves a slider.
    textScale.addEventListener("input", function () {
        const settings = loadAccessibilitySettings();

        settings.textScale = Number(textScale.value);

        applyAccessibilitySettings(settings);
    });

    lineSpacing.addEventListener("input", function () {
        const settings = loadAccessibilitySettings();

        settings.lineSpacing = Number(lineSpacing.value);

        applyAccessibilitySettings(settings);
    });

    // Apply and announce changes when a selection is made.
    contrastSetting.addEventListener("change", function () {
        const settings = loadAccessibilitySettings();

        settings.contrast = contrastSetting.value;

        applyAccessibilitySettings(settings, true);
    });

    widthSetting.addEventListener("change", function () {
        const settings = loadAccessibilitySettings();

        settings.width = widthSetting.value;

        applyAccessibilitySettings(settings, true);
    });

    // Announce the final slider value when the visitor finishes adjusting it.
    textScale.addEventListener("change", function () {
        accessibilityStatus.textContent =
            "Text size updated. Your preferences are saved on this device.";
    });

    lineSpacing.addEventListener("change", function () {
        accessibilityStatus.textContent =
            "Line spacing updated. Your preferences are saved on this device.";
    });

    // Restore all default settings.
    resetAccessibility.addEventListener("click", function () {
        applyAccessibilitySettings(
            defaultAccessibilitySettings,
            true
        );
    });
}


/* ==========================================================================
   ASSIGNMENT 3: PROJECT DETAIL POP-UPS
   ========================================================================== */

// Each "Learn more" button stores the id of its pop-up in data-dialog.
const moreButtons = document.querySelectorAll("[data-dialog]");

moreButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const dialog = document.getElementById(button.dataset.dialog);

        // showModal() opens the pop-up, darkens the page behind it,
        // and keeps keyboard focus inside it. Esc closes it automatically.
        dialog.showModal();

        // Only the Route Planner pop-up shows the weather.
        if (dialog.id === "route-planner-dialog") {
            loadWeather();
        }
    });
});

document.querySelectorAll(".project-dialog").forEach((dialog) => {
    // Close with the ✕ button.
    dialog.querySelector(".dialog-close").addEventListener("click", () => {
        dialog.close();
    });

    // Close when the visitor clicks the dark area outside the box.
    // The content is inside .dialog-inner, so a click whose target is the
    // <dialog> itself can only be a click on the backdrop.
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});


/* ==========================================================================
   ASSIGNMENT 3: LIVE WEATHER (Open-Meteo API)
   Shows current Boston conditions and what they mean for blind pedestrians.
   ========================================================================== */

// URL built with the Open-Meteo docs URL builder (open-meteo.com/en/docs)
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast?latitude=42.3584&longitude=-71.0598&current=temperature_2m,precipitation,weather_code,wind_speed_10m&timezone=America%2FNew_York";

// Set to true once a request starts, so reopening the pop-up does not call the API again.
let weatherRequested = false;

async function loadWeather() {
    if (weatherRequested) {
        return;
    }

    weatherRequested = true;

    const content = document.getElementById("weather-content");

    try {
        const response = await fetch(WEATHER_URL);

        // fetch() does NOT fail on HTTP errors like 404 or 500, so we check ourselves.
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        const current = data.current;
        const assessment = assessWalkingConditions(current);

        content.innerHTML = `
            <div class="weather-status weather-${assessment.level}">
                <p class="weather-status-title">
                    <span aria-hidden="true">${assessment.icon}</span> ${assessment.title}
                </p>
                <p>${assessment.message}</p>
            </div>

            <ul class="weather-stats">
                <li>
                    <span class="stat-value">${current.temperature_2m}°C</span>
                    <span class="stat-label">Temperature</span>
                </li>
                <li>
                    <span class="stat-value">${current.wind_speed_10m} km/h</span>
                    <span class="stat-label">Wind</span>
                </li>
                <li>
                    <span class="stat-value">${current.precipitation} mm</span>
                    <span class="stat-label">Precipitation (last 15 min)</span>
                </li>
            </ul>

            <p class="weather-note">
                My route planner would consider conditions like these when choosing the safest route.
            </p>
        `;
    } catch (error) {
        console.error("Weather request failed:", error);

        // Allow another try the next time the pop-up is opened.
        weatherRequested = false;

        content.innerHTML = `
            <p class="weather-error">
                Sorry, live weather isn't available right now. Please try again later.
            </p>
        `;
    }
}

// Decides how difficult walking is for a blind pedestrian.
// Rules are checked from most serious to least serious; the first match wins.
// Weather codes come from the WMO table in the Open-Meteo docs.
function assessWalkingConditions(current) {
    const code = current.weather_code;
    const temp = current.temperature_2m;
    const wind = current.wind_speed_10m;
    const precipitation = current.precipitation;

    const freezingCodes = [56, 57, 66, 67];
    const snowCodes = [71, 73, 75, 77, 85, 86];
    const rainCodes = [51, 53, 55, 61, 63, 65, 80, 81, 82];
    const fogCodes = [45, 48];

    if (freezingCodes.includes(code) || (temp <= 0 && precipitation > 0)) {
        return {
            level: "difficult",
            icon: "🔴",
            title: "Difficult conditions",
            message: "Freezing rain can make sidewalks icy and slippery for cane and guide dog users."
        };
    }

    if (snowCodes.includes(code)) {
        return {
            level: "difficult",
            icon: "🔴",
            title: "Difficult conditions",
            message: "Snow can cover tactile paving and curb edges that blind pedestrians rely on."
        };
    }

    // Codes 95 and above are thunderstorms.
    if (code >= 95) {
        return {
            level: "difficult",
            icon: "🔴",
            title: "Difficult conditions",
            message: "Thunderstorms make it hard to hear traffic at crossings."
        };
    }

    if (rainCodes.includes(code)) {
        return {
            level: "caution",
            icon: "🟡",
            title: "Use caution",
            message: "Rain noise can mask traffic sounds that many blind pedestrians use to judge crossings."
        };
    }

    if (wind >= 40) {
        return {
            level: "caution",
            icon: "🟡",
            title: "Use caution",
            message: "Strong wind can make it harder to hear traffic and keep balance."
        };
    }

    if (fogCodes.includes(code)) {
        return {
            level: "caution",
            icon: "🟡",
            title: "Use caution",
            message: "Fog reduces visibility for low-vision pedestrians."
        };
    }

    return {
        level: "good",
        icon: "🟢",
        title: "Good conditions",
        message: "Dry and calm. Sidewalks are easier to navigate and traffic sounds are easier to hear."
    };
}