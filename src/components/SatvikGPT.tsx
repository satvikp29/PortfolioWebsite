'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'What projects have you built?',
  'What\'s your tech stack?',
  'Are you open to new roles?',
  'Tell me about CareerCompass',
]

export default function SatvikGPT() {
  const [open, setOpen]           = useState(false)
  const [messages, setMessages]   = useState<Message[]>([])
  const [input, setInput]         = useState('')
  const [streaming, setStreaming] = useState(false)
  const [unread, setUnread]       = useState(false)
  const bottomRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLInputElement>(null)
  const abortRef   = useRef<AbortController | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  useEffect(() => {
    if (open) {
      setUnread(false)
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [open])

  const send = useCallback(async (text: string) => {
    if (!text.trim() || streaming) return
    const userMsg: Message = { role: 'user', content: text.trim() }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setStreaming(true)

    const assistantPlaceholder: Message = { role: 'assistant', content: '' }
    setMessages(m => [...m, assistantPlaceholder])

    abortRef.current = new AbortController()
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
        signal: abortRef.current.signal,
      })
      if (!res.body) throw new Error('No stream')
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let full = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value, { stream: true })
        const snapshot = full
        setMessages(m => {
          const copy = [...m]
          copy[copy.length - 1] = { role: 'assistant', content: snapshot }
          return copy
        })
      }
    } catch (e: unknown) {
      if ((e as Error).name !== 'AbortError') {
        setMessages(m => {
          const copy = [...m]
          copy[copy.length - 1] = { role: 'assistant', content: 'Sorry, something went wrong. Try again.' }
          return copy
        })
      }
    } finally {
      setStreaming(false)
      if (!open) setUnread(true)
    }
  }, [messages, streaming, open])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) }
  }

  return (
    <>
      {/* Chat window */}
      <div
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '24px',
          width: '360px',
          height: open ? '520px' : '0px',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'height 0.38s cubic-bezier(0.65,0.05,0,1), opacity 0.3s ease',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          background: '#0D0D0B',
          border: '1px solid rgba(201,168,76,0.2)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.06)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 18px',
            borderBottom: '1px solid rgba(201,168,76,0.1)',
            background: '#111110',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              border: '1px solid #C9A84C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', color: '#C9A84C', fontWeight: 700 }}>
              S
            </span>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, color: '#EEE9E1', letterSpacing: '0.02em' }}>
              SatvikGPT
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#5E5A54', letterSpacing: '0.1em' }}>
              {streaming ? 'typing...' : 'ask me anything'}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              color: '#3A3835',
              cursor: 'pointer',
              padding: '4px',
              lineHeight: 1,
              fontSize: '16px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#EEE9E1')}
            onMouseLeave={e => (e.currentTarget.style.color = '#3A3835')}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            scrollbarWidth: 'none',
          }}
        >
          {messages.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#5E5A54', lineHeight: 1.6 }}>
                Hey — I&apos;m SatvikGPT. Ask me about Satvik&apos;s projects, skills, or background.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{
                      background: 'transparent',
                      border: '1px solid #1F1E1B',
                      padding: '8px 12px',
                      textAlign: 'left',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      color: '#5E5A54',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s ease, color 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)'
                      ;(e.currentTarget as HTMLElement).style.color = '#BBB5AD'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#1F1E1B'
                      ;(e.currentTarget as HTMLElement).style.color = '#5E5A54'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '85%',
                  padding: '9px 13px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  lineHeight: 1.65,
                  ...(m.role === 'user'
                    ? {
                        background: 'rgba(201,168,76,0.1)',
                        border: '1px solid rgba(201,168,76,0.2)',
                        color: '#EEE9E1',
                      }
                    : {
                        background: '#161613',
                        border: '1px solid #1F1E1B',
                        color: '#BBB5AD',
                      }),
                }}
              >
                {m.content || (
                  <span style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '2px 0' }}>
                    {[0, 1, 2].map(d => (
                      <span
                        key={d}
                        style={{
                          width: '4px', height: '4px', borderRadius: '50%',
                          background: '#C9A84C',
                          animation: `goldPulse 1.2s ease-in-out ${d * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div
          style={{
            padding: '12px 14px',
            borderTop: '1px solid rgba(201,168,76,0.1)',
            background: '#111110',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything..."
            disabled={streaming}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              color: '#EEE9E1',
              caretColor: '#C9A84C',
            }}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || streaming}
            style={{
              background: input.trim() && !streaming ? '#C9A84C' : '#1F1E1B',
              border: 'none',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: input.trim() && !streaming ? 'pointer' : 'default',
              flexShrink: 0,
              transition: 'background 0.25s ease',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke={input.trim() && !streaming ? '#090907' : '#3A3835'} strokeWidth="2">
              <path d="M1 11L11 1M11 1H4M11 1v7" />
            </svg>
          </button>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 10001,
          background: open ? '#1A1916' : '#C9A84C',
          border: open ? '1px solid rgba(201,168,76,0.3)' : 'none',
          width: '52px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: open ? 'none' : '0 8px 32px rgba(201,168,76,0.3), 0 2px 8px rgba(0,0,0,0.4)',
          transition: 'background 0.3s ease, box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          transform: 'scale(1)',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="Open SatvikGPT"
      >
        {unread && !open && (
          <span style={{
            position: 'absolute',
            top: '-3px',
            right: '-3px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#E8C46A',
            border: '2px solid #090907',
          }} />
        )}
        {open ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#C9A84C" strokeWidth="2">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        ) : (
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700, color: '#090907', letterSpacing: '-0.02em' }}>
            SG
          </span>
        )}
      </button>
    </>
  )
}
