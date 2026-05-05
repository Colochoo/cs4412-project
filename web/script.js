/* ═══════════════════════════════════════════════════════════════
   Student Performance Survey — JavaScript
   ═══════════════════════════════════════════════════════════════ */

// ── CONFIGURATION ────────────────────────────────────────────────────────────
// Paste your Google Apps Script web app URL here after completing Step 4
// of the Setup Guide.
const APPS_SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';
// ─────────────────────────────────────────────────────────────────────────────

// Field groups used for validation
const RADIO_GROUPS  = ['school', 'sex', 'address', 'famsize', 'Pstatus', 'course',
                       'schoolsup', 'famsup', 'paid', 'activities', 'nursery',
                       'higher', 'internet', 'romantic'];

const SELECT_FIELDS = ['reason', 'guardian', 'Medu', 'Fedu', 'Mjob', 'Fjob', 'failures'];

const SCALE_FIELDS  = ['traveltime', 'studytime', 'famrel', 'freetime',
                       'goout', 'Dalc', 'Walc', 'health'];

const NUMBER_FIELDS = [
  { name: 'age',      min: 15, max: 22, label: 'Age' },
  { name: 'absences', min: 0,  max: 93, label: 'Number of absences' },
  { name: 'G1',       min: 0,  max: 20, label: 'First period grade (G1)' },
  { name: 'G2',       min: 0,  max: 20, label: 'Second period grade (G2)' },
  { name: 'G3',       min: 0,  max: 20, label: 'Final grade (G3)' }
];

// Friendly display names for validation messages
const FIELD_LABELS = {
  school: 'School', sex: 'Biological sex', address: 'Home address type',
  famsize: 'Family size', Pstatus: "Parents' cohabitation status", course: 'Course',
  schoolsup: 'Extra school support', famsup: 'Family educational support',
  paid: 'Paid extra classes', activities: 'Extracurricular activities',
  nursery: 'Nursery school attendance', higher: 'Aspiration for higher education',
  internet: 'Internet access at home', romantic: 'Romantic relationship',
  reason: 'Reason for choosing the school', guardian: 'Primary guardian',
  Medu: "Mother's education level", Fedu: "Father's education level",
  Mjob: "Mother's occupation", Fjob: "Father's occupation", failures: 'Past class failures',
  traveltime: 'Travel time', studytime: 'Weekly study time', famrel: 'Family relationship quality',
  freetime: 'Free time after school', goout: 'Going out with friends',
  Dalc: 'Workday alcohol consumption', Walc: 'Weekend alcohol consumption',
  health: 'Current health status'
};

/* ═══════════════════════════════════════════════════════════════
   TAB SWITCHING
   ═══════════════════════════════════════════════════════════════ */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(`tab-${target}`).classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* ═══════════════════════════════════════════════════════════════
   SCALE BUTTONS
   ═══════════════════════════════════════════════════════════════ */
document.querySelectorAll('.scale-buttons').forEach(group => {
  const field = group.dataset.field;

  group.addEventListener('click', e => {
    const btn = e.target.closest('.scale-btn');
    if (!btn) return;

    group.querySelectorAll('.scale-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const hidden = document.getElementById(`${field}-hidden`);
    if (hidden) hidden.value = btn.dataset.value;

    group.classList.remove('error-group');
  });
});

/* ═══════════════════════════════════════════════════════════════
   RADIO CARD — clear error highlight on selection
   ═══════════════════════════════════════════════════════════════ */
document.querySelectorAll('.radio-card input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const group = radio.closest('.radio-card-group');
    if (group) group.classList.remove('error-group');
  });
});

/* ═══════════════════════════════════════════════════════════════
   YES / NO — clear error highlight on selection
   ═══════════════════════════════════════════════════════════════ */
document.querySelectorAll('.yn-item input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const item = radio.closest('.yn-item');
    if (item) item.classList.remove('error-group');
  });
});

/* ═══════════════════════════════════════════════════════════════
   FORM RESET
   ═══════════════════════════════════════════════════════════════ */
document.getElementById('reset-btn').addEventListener('click', () => {
  const form = document.getElementById('survey-form');
  form.reset();

  // Clear scale button selections
  document.querySelectorAll('.scale-btn').forEach(b => b.classList.remove('active'));
  SCALE_FIELDS.forEach(field => {
    const hidden = document.getElementById(`${field}-hidden`);
    if (hidden) hidden.value = '';
  });

  // Clear all error highlights
  document.querySelectorAll('.error-group').forEach(el => el.classList.remove('error-group'));
  document.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));

  const feedback = document.getElementById('form-feedback');
  feedback.hidden = true;
  feedback.className = 'form-feedback';
  feedback.textContent = '';

  const summary = document.getElementById('error-summary');
  if (summary) summary.remove();
});

/* ═══════════════════════════════════════════════════════════════
   FORM VALIDATION
   ═══════════════════════════════════════════════════════════════ */
function validateForm(form) {
  const errors = [];

  // Clear previous error states
  document.querySelectorAll('.error-group').forEach(el => el.classList.remove('error-group'));
  document.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));

  // Radio groups (including yes/no)
  for (const name of RADIO_GROUPS) {
    const checked = form.querySelector(`[name="${name}"]:checked`);
    if (!checked) {
      errors.push(FIELD_LABELS[name] || name);

      // Highlight the correct container
      const ynItem = form.querySelector(`.yn-item:has([name="${name}"])`);
      if (ynItem) {
        ynItem.classList.add('error-group');
      } else {
        const rcGroup = form.querySelector(`.radio-card-group:has([name="${name}"])`);
        if (rcGroup) rcGroup.classList.add('error-group');
      }
    }
  }

  // Select dropdowns
  for (const name of SELECT_FIELDS) {
    const el = form.querySelector(`[name="${name}"]`);
    if (!el || !el.value) {
      errors.push(FIELD_LABELS[name] || name);
      if (el) el.classList.add('field-error');
    }
  }

  // Scale button hidden inputs
  for (const name of SCALE_FIELDS) {
    const hidden = document.getElementById(`${name}-hidden`);
    if (!hidden || !hidden.value) {
      errors.push(FIELD_LABELS[name] || name);
      const group = form.querySelector(`.scale-buttons[data-field="${name}"]`);
      if (group) group.classList.add('error-group');
    }
  }

  // Number fields
  for (const { name, min, max, label } of NUMBER_FIELDS) {
    const el = form.querySelector(`[name="${name}"]`);
    const val = el ? Number(el.value) : NaN;
    if (!el || el.value === '' || isNaN(val) || val < min || val > max) {
      errors.push(`${label} (${min}–${max})`);
      if (el) el.classList.add('field-error');
    }
  }

  return errors;
}

/* ═══════════════════════════════════════════════════════════════
   COLLECT FORM DATA
   ═══════════════════════════════════════════════════════════════ */
function collectFormData(form) {
  const data = {};

  // Radio groups
  RADIO_GROUPS.forEach(name => {
    const el = form.querySelector(`[name="${name}"]:checked`);
    data[name] = el ? el.value : '';
  });

  // Selects
  SELECT_FIELDS.forEach(name => {
    const el = form.querySelector(`[name="${name}"]`);
    data[name] = el ? el.value : '';
  });

  // Scale fields (from hidden inputs)
  SCALE_FIELDS.forEach(name => {
    const el = document.getElementById(`${name}-hidden`);
    data[name] = el ? el.value : '';
  });

  // Number fields
  NUMBER_FIELDS.forEach(({ name }) => {
    const el = form.querySelector(`[name="${name}"]`);
    data[name] = el ? el.value : '';
  });

  return data;
}

/* ═══════════════════════════════════════════════════════════════
   SHOW FEEDBACK
   ═══════════════════════════════════════════════════════════════ */
function showFeedback(type, message) {
  const feedback = document.getElementById('form-feedback');
  feedback.className = `form-feedback ${type}`;
  feedback.textContent = message;
  feedback.hidden = false;
  feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showErrorSummary(errors) {
  const existing = document.getElementById('error-summary');
  if (existing) existing.remove();

  const summary = document.createElement('div');
  summary.id = 'error-summary';
  summary.className = 'error-summary';
  summary.innerHTML = `<p>Please complete the following fields before submitting:</p>
    <ul>${errors.map(e => `<li>${e}</li>`).join('')}</ul>`;

  const form = document.getElementById('survey-form');
  form.prepend(summary);
  summary.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ═══════════════════════════════════════════════════════════════
   FORM SUBMISSION
   ═══════════════════════════════════════════════════════════════ */
document.getElementById('survey-form').addEventListener('submit', async e => {
  e.preventDefault();

  const form     = e.target;
  const submitBtn = document.getElementById('submit-btn');

  // Validate
  const errors = validateForm(form);
  if (errors.length > 0) {
    showErrorSummary(errors);
    return;
  }

  // Remove any existing error summary
  const existing = document.getElementById('error-summary');
  if (existing) existing.remove();

  // Check configuration
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === 'YOUR_WEB_APP_URL_HERE') {
    showFeedback('error',
      'Google Sheets is not configured yet. Please follow the Setup Guide tab to connect your spreadsheet.');
    return;
  }

  // Collect data
  const data = collectFormData(form);

  // Update button state
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').hidden = true;
  submitBtn.querySelector('.btn-loading').hidden = false;

  try {
    // POST to Google Apps Script
    // Uses Content-Type: text/plain to avoid CORS preflight.
    // The response is opaque (no-cors) — success is assumed on no network error.
    await fetch(APPS_SCRIPT_URL, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body:    JSON.stringify(data)
    });

    showFeedback('success',
      '✅ Response submitted successfully! The entry has been recorded in the Google Spreadsheet. You may submit another response or clear the form.');

    // Scroll to top of form on success
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (err) {
    showFeedback('error',
      '❌ Submission failed — please check your internet connection and try again. If the problem persists, verify that the Apps Script URL in script.js is correct.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').hidden = false;
    submitBtn.querySelector('.btn-loading').hidden = true;
  }
});

/* ═══════════════════════════════════════════════════════════════
   COPY BUTTON (Setup Guide)
   ═══════════════════════════════════════════════════════════════ */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const pre = document.getElementById(targetId);
    if (!pre) return;

    navigator.clipboard.writeText(pre.textContent.trim()).then(() => {
      const original = btn.textContent;
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      btn.textContent = 'Failed';
      setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
    });
  });
});
