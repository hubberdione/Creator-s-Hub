'use client'

import { useState } from 'react'

type Props = { onEnter: () => void }

const DAYS = [
  {
    label: 'Day 1',
    date: 'May 28 · Wed',
    aim: 'Creator Crew Brainstorm + Venue Exploration',
    color: '#b8ff3a',
    slots: [
      { time: '9 – 10 AM',     label: 'Creator Crew Brainstorm',          note: 'Around Venue',         highlight: false },
      { time: '10 AM – 12 PM', label: 'Shoot',                            note: 'Around Venue',         highlight: false },
      { time: '12 – 2 PM',     label: 'Lunch Break 🍽️',                  note: '',                     highlight: true  },
      { time: '2 – 3:30 PM',   label: 'Shoot',                            note: 'Around Venue',         highlight: false },
      { time: '3:30 – 4:30 PM',label: 'Shoot',                            note: 'Around Venue',         highlight: false },
      { time: '4:30 – 6 PM',   label: 'Shoot',                            note: 'Around Venue',         highlight: false },
    ],
  },
  {
    label: 'Day 2',
    date: 'May 29 · Thu',
    aim: 'Cabana Content + Scripts Focus · 🎯 18 pieces by tomorrow morning!',
    color: '#ff2d78',
    slots: [
      { time: '9 – 10 AM',     label: 'Shoot',                            note: 'Meet at the Cabana',   highlight: false },
      { time: '10 AM – 12 PM', label: 'Shoot',                            note: 'Meet at the Cabana',   highlight: false },
      { time: '12 – 2 PM',     label: 'Lunch Break 🍽️',                  note: '',                     highlight: true  },
      { time: '2 – 3:30 PM',   label: 'Shoot',                            note: 'Around Venue',         highlight: false },
      { time: '3:30 – 4:30 PM',label: 'Shoot',                            note: 'At the Cabana',        highlight: false },
      { time: '4:30 – 6 PM',   label: 'Shoot',                            note: 'Around Venue',         highlight: false },
      { time: '6 – 8 PM',      label: 'Evening VIP ✨',                   note: 'Creator Crew',         highlight: true  },
      { time: '8 – 10 PM',     label: 'Fashion Show 👗',                  note: 'Creator Crew',         highlight: true  },
    ],
  },
  {
    label: 'Day 3',
    date: 'May 30 · Fri',
    aim: 'Miami Beach Content + Final Content Push',
    color: '#b8ff3a',
    slots: [
      { time: '9 – 10 AM',     label: 'Shoot',                            note: 'Beach & Hotel',        highlight: false },
      { time: '10 AM – 12 PM', label: 'Shoot',                            note: 'Beach & Hotel',        highlight: false },
      { time: '12 – 2 PM',     label: 'Lunch Break 🍽️',                  note: '',                     highlight: true  },
      { time: '2 – 3:30 PM',   label: 'Shoot',                            note: 'Around Venue',         highlight: false },
      { time: '3:30 – 4:30 PM',label: 'Shoot',                            note: 'At the Cabana',        highlight: false },
      { time: '4:30 – 6 PM',   label: 'Shoot',                            note: 'Around Venue',         highlight: false },
      { time: '6 – 8 PM',      label: 'Evening VIP ✨',                   note: 'Creator Crew',         highlight: true  },
      { time: '8 – 10 PM',     label: 'Fashion Show 👗',                  note: 'Creator Crew',         highlight: true  },
    ],
  },
]

export default function BriefPage({ onEnter }: Props) {
  const [showSchedule, setShowSchedule] = useState(false)
  const [activeDay, setActiveDay] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-[#0d0d0d] text-[#f0ebe3] pb-24">

        {/* Hero */}
        <div className="px-5 pt-12 pb-6 max-w-xl mx-auto">
          <p className="text-[10px] font-bold text-[#b8ff3a] tracking-widest uppercase mb-3">
            LEM Miami Swim Week 2026
          </p>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight mb-4">
            Creator<br />Hit List 💛
          </h1>
          <p className="text-sm text-[#888] leading-relaxed">
            You're the most genuine attendee here — and honestly? That's your superpower. Show up, be yourself, and let the content come naturally. 🌊
          </p>
        </div>

        {/* Two big CTA buttons */}
        <div className="px-5 max-w-xl mx-auto mb-8 grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowSchedule(true)}
            className="bg-[#161616] border border-[#2a2a2a] hover:border-[#b8ff3a]/40 active:scale-[.97] text-[#f0ebe3] font-bold text-sm py-4 rounded-2xl transition-all flex flex-col items-center gap-1.5"
          >
            <span className="text-2xl">📅</span>
            See Schedule
          </button>
          <button
            onClick={onEnter}
            className="bg-[#ff2d78] hover:bg-[#e0265e] active:scale-[.97] text-white font-bold text-sm py-4 rounded-2xl transition-all flex flex-col items-center gap-1.5"
          >
            <span className="text-2xl">🎬</span>
            Explore Scripts
          </button>
        </div>

        {/* Brief mission cards */}
        <div className="px-5 max-w-xl mx-auto mb-8">
          <p className="text-[10px] font-bold text-[#555] tracking-widest uppercase mb-3">Your Mission</p>
          <div className="space-y-2.5">

            <div className="bg-[#161616] border border-[#222] rounded-2xl px-4 py-4">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">✨</span>
                <div>
                  <p className="text-sm font-bold text-[#f0ebe3] mb-1">Soak Up the Whole Venue!</p>
                  <p className="text-xs text-[#666] leading-relaxed">
                    You're here as a guest — so explore everything and enjoy every second of it! Wander freely, discover hidden gems, and make sure to swing by the <span className="text-[#f0ebe3] font-bold">Hello Nancy Booth</span> for a fun reaction. Your real energy is what people love to watch! 💫
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#161616] border border-[#222] rounded-2xl px-4 py-4">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">🤝</span>
                <div>
                  <p className="text-sm font-bold text-[#f0ebe3] mb-1">Create Together, Shine Together</p>
                  <p className="text-xs text-[#666] leading-relaxed">
                    You're part of one of <span className="text-[#f0ebe3] font-bold">2 creator teams</span> — how fun is that! 🎉 Kick off the morning with a brainstorm, share ideas, divide and conquer, and cheer each other on all day long.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#161616] border border-[#222] rounded-2xl px-4 py-4">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">🎬</span>
                <div>
                  <p className="text-sm font-bold text-[#f0ebe3] mb-1">Show It Off!</p>
                  <p className="text-xs text-[#666] leading-relaxed">
                    Think about how exciting it is when you discover something cool at an event — capture that! Demo the LEM product naturally with real people around you. No script needed, just your personality. Reference videos inside will inspire you!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#161616] border border-[#222] rounded-2xl px-4 py-4">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">🎤</span>
                <div>
                  <p className="text-sm font-bold text-[#f0ebe3] mb-1">Get People Talking!</p>
                  <p className="text-xs text-[#666] leading-relaxed">
                    Start fun conversations on camera! Ask attendees what they're wearing, what they're loving, what brought them here. The best interviews feel like chatting with a new friend 💬 Check the scripts for great question ideas!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#161616] border border-[#222] rounded-2xl px-4 py-4">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">🌟</span>
                <div>
                  <p className="text-sm font-bold text-[#f0ebe3] mb-1">Find Your People</p>
                  <p className="text-xs text-[#666] leading-relaxed">
                    You know that feeling when you spot someone at an event and you just <em>know</em> they'd be amazing on camera? Trust that instinct! Look for guests who are lit up, expressive, and having the absolute best time — their energy will make yours shine even more. 🔥
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Surprise drop */}
        <div className="px-5 max-w-xl mx-auto mb-10">
          <p className="text-[10px] font-bold text-[#555] tracking-widest uppercase mb-3">Surprise Drop 🎁</p>
          <div className="bg-[#ff2d78]/8 border border-[#ff2d78]/20 rounded-2xl px-4 py-4">
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">🛍️</span>
              <div>
                <p className="text-sm font-bold text-[#f0ebe3] mb-1">"Guess What This Is?" 👀</p>
                <p className="text-xs text-[#888] leading-relaxed">
                  We've got the <span className="text-[#f0ebe3] font-bold">LEM Soda Backpack</span> and super cute <span className="text-[#f0ebe3] font-bold">blind bag plushies</span> to give to visitors! Hand one to someone, film their reaction as they guess what's inside before they open it. Such a good hook — people love a mystery reveal! 🎀
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="px-5 max-w-xl mx-auto">
          <button
            onClick={onEnter}
            className="w-full bg-[#ff2d78] hover:bg-[#e0265e] active:scale-[.98] text-white font-bold text-base py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            Explore References
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
          <p className="text-center text-[10px] text-[#444] mt-3 font-bold tracking-wide">
            VIDEO REFERENCES & SCRIPTS INSIDE
          </p>
        </div>

      </div>

      {/* Schedule modal */}
      {showSchedule && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end" onClick={e => { if (e.target === e.currentTarget) setShowSchedule(false) }}>
          <div className="bg-[#161616] border-t border-[#2a2a2a] rounded-t-3xl w-full max-h-[85vh] flex flex-col">

            {/* Modal header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
              <h2 className="text-base font-bold text-[#f0ebe3]">Schedule</h2>
              <button onClick={() => setShowSchedule(false)} className="p-1.5 rounded-xl text-[#555] hover:text-[#888] hover:bg-[#222] transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Day tabs */}
            <div className="flex gap-2 px-5 pb-3 flex-shrink-0">
              {DAYS.map((day, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                    activeDay === i
                      ? 'text-[#0d0d0d] border-transparent'
                      : 'bg-[#1a1a1a] text-[#555] border-[#2a2a2a] hover:text-[#888]'
                  }`}
                  style={activeDay === i ? { backgroundColor: day.color } : {}}
                >
                  {day.label}
                  <span className="block text-[9px] font-bold opacity-70 mt-0.5">{day.date}</span>
                </button>
              ))}
            </div>

            {/* Day aim */}
            <div className="px-5 pb-3 flex-shrink-0">
              <p className="text-[10px] font-bold text-[#555] tracking-widest uppercase mb-1">Aim for today</p>
              <p className="text-xs font-bold" style={{ color: DAYS[activeDay].color }}>{DAYS[activeDay].aim}</p>
            </div>

            {/* Schedule slots */}
            <div className="overflow-y-auto flex-1 px-5 pb-8">
              <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
                {DAYS[activeDay].slots.map((slot, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 px-4 py-3.5 ${i < DAYS[activeDay].slots.length - 1 ? 'border-b border-[#1e1e1e]' : ''} ${slot.highlight ? 'bg-[#b8ff3a]/5' : ''}`}
                  >
                    <span className="text-xs font-bold text-[#555] w-[88px] flex-shrink-0 leading-tight">{slot.time}</span>
                    <div className="flex-1 min-w-0">
                      <span className={`text-sm font-bold ${slot.highlight ? 'text-[#b8ff3a]' : 'text-[#f0ebe3]'}`}>{slot.label}</span>
                      {slot.note && <span className="text-xs text-[#555] ml-2">· {slot.note}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
