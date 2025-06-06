// Funções de extração utilizadas nos testes
function normalizeText(raw) {
  return raw
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function ultimoNumeroAposRotulo(texto, rotulo) {
  const re = new RegExp(escapeRegExp(rotulo), 'i');
  const match = re.exec(texto);
  if (!match) return null;
  const apos = texto.slice(match.index + match[0].length).trim();
  const tokens = apos.split(/\s+/);
  const reNum = /^-?\d+(?:[.,]\d+)?$/;
  let ultimo = null;
  for (const tok of tokens) {
    if (reNum.test(tok)) {
      ultimo = parseFloat(tok.replace(',', '.'));
    } else {
      break;
    }
  }
  return ultimo !== null ? ultimo : null;
}

function minMaxAposRotulo(texto, rotulo) {
  const re = new RegExp(escapeRegExp(rotulo), 'i');
  const match = re.exec(texto);
  if (!match) return null;
  const apos = texto.slice(match.index + match[0].length).trim();
  const tokens = apos.split(/\s+/);
  const reNum = /^-?\d+(?:[.,]\d+)?$/;
  const numeros = [];
  for (const tok of tokens) {
    if (reNum.test(tok)) {
      numeros.push(parseFloat(tok.replace(',', '.')));
    } else {
      break;
    }
  }
  if (!numeros.length) return null;
  return {
    min: Math.min(...numeros),
    max: Math.max(...numeros)
  };
}

function extrairGanhos(texto) {
  const val = ultimoNumeroAposRotulo(texto, 'Total de Ganhos (mL)');
  return val !== null ? val : '-';
}

function extrairPerdas(texto) {
  let val = ultimoNumeroAposRotulo(texto, 'Total de Perdas (mL)');
  if (val !== null && val > 0) {
    val = -val;
  }
  return val !== null ? val : '-';
}

function extrairDiurese(texto) {
  let val = ultimoNumeroAposRotulo(texto, 'Diurese (Volume/ml)');
  if (val === null) {
    const m = texto.match(/Diurese\s+(-?\d+([.,]\d+)?)/i);
    if (m) {
      val = parseFloat(m[1].replace(',', '.'));
    }
  }
  if (val !== null && typeof val === 'number' && val > 0) {
    val = -val;
  }
  return val !== null ? val : '-';
}

function extrairHemodialise(texto) {
  const idx = texto.search(/Hemodialise/i);
  if (idx === -1) return '-';
  const apos = texto.slice(idx + 'Hemodialise'.length);
  const tokens = apos.trim().split(/\s+/);
  const reNum = /^-?\d+(?:[.,]\d+)?$/;
  let ultimo = null;
  for (const tok of tokens) {
    if (reNum.test(tok)) {
      ultimo = parseFloat(tok.replace(',', '.'));
    } else {
      break;
    }
  }
  return ultimo !== null ? ultimo : '-';
}

function extrairBalanco(texto) {
  const val = ultimoNumeroAposRotulo(texto, 'Evolução (Ganhos-Perdas)');
  return val !== null ? val : '-';
}

function extrairHGT(texto) {
  const mm = minMaxAposRotulo(texto, 'Glicemia - MG/DL');
  if (!mm) return '-';
  return `${mm.min}/${mm.max}`;
}

function extrairTemperatura(texto) {
  const mm = minMaxAposRotulo(texto, 'Temperatura - °C');
  if (!mm) return '-';
  return `${mm.min}/${mm.max}`;
}

module.exports = {
  normalizeText,
  ultimoNumeroAposRotulo,
  minMaxAposRotulo,
  extrairGanhos,
  extrairPerdas,
  extrairDiurese,
  extrairHemodialise,
  extrairBalanco,
  extrairHGT,
  extrairTemperatura,
};
