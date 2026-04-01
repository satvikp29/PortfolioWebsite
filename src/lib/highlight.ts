function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function highlight(code: string, lang: 'python' | 'typescript'): string {
  const pyKw = [
    'async', 'def', 'return', 'await', 'for', 'in', 'if', 'else',
    'import', 'from', 'class', 'True', 'False', 'None',
  ]
  const tsKw = [
    'async', 'const', 'let', 'export', 'return', 'await', 'interface',
    'type', 'import', 'from', 'default', 'function', 'Promise',
  ]
  const keywords = lang === 'python' ? pyKw : tsKw

  return code
    .split('\n')
    .map((line) => {
      const trimmed = line.trim()
      if (trimmed.startsWith('#') || trimmed.startsWith('//')) {
        return `<span style="color:#3A3030;font-style:italic">${escapeHtml(line)}</span>`
      }
      let r = escapeHtml(line)
      // strings
      r = r.replace(/(&quot;[^&]*&quot;)/g, '<span style="color:#7A6060">$1</span>')
      r = r.replace(/(&#39;[^&]*&#39;)/g, '<span style="color:#7A6060">$1</span>')
      // decorators
      r = r.replace(/(@\w+)/g, '<span style="color:#C8102E">$1</span>')
      // keywords
      keywords.forEach((kw) => {
        r = r.replace(
          new RegExp(`\\b(${kw})\\b`, 'g'),
          '<span style="color:#C8102E">$1</span>'
        )
      })
      return `<span style="color:#888080">${r}</span>`
    })
    .join('\n')
}
