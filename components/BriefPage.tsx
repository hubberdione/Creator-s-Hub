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
      { time: '9 – 10 AM',      label: 'Creator Crew Brainstorm', note: 'Around Venue',       highlight: false },
      { time: '10 AM – 12 PM',  label: 'Shoot',                   note: 'Around Venue',       highlight: false },
      { time: '12 – 2 PM',      label: 'Lunch Break 🍽️',         note: '',                   highlight: true  },
      { time: '2 – 3:30 PM',    label: 'Shoot',                   note: 'Around Venue',       highlight: false },
      { time: '3:30 – 4:30 PM', label: 'Shoot',                   note: 'Around Venue',       highlight: false },
      { time: '4:30 – 6 PM',    label: 'Shoot',                   note: 'Around Venue',       highlight: false },
    ],
  },
  {
    label: 'Day 2',
    date: 'May 29 · Thu',
    aim: 'Cabana Content + Scripts Focus · 🎯 18 pieces by tomorrow morning!',
    color: '#ff2d78',
    slots: [
      { time: '9 – 10 AM',      label: 'Shoot',           note: 'Meet at the Cabana', highlight: false },
      { time: '10 AM – 12 PM',  label: 'Shoot',           note: 'Meet at the Cabana', highlight: false },
      { time: '12 – 2 PM',      label: 'Lunch Break 🍽️', note: '',                   highlight: true  },
      { time: '2 – 3:30 PM',    label: 'Shoot',           note: 'Around Venue',       highlight: false },
      { time: '3:30 – 4:30 PM', label: 'Shoot',           note: 'At the Cabana',      highlight: false },
      { time: '4:30 – 6 PM',    label: 'Shoot',           note: 'Around Venue',       highlight: false },
      { time: '6 – 8 PM',       label: 'Evening VIP ✨',  note: 'Creator Crew',       highlight: true  },
      { time: '8 – 10 PM',      label: 'Fashion Show 👗', note: 'Creator Crew',       highlight: true  },
    ],
  },
  {
    label: 'Day 3',
    date: 'May 30 · Fri',
    aim: 'Miami Beach Content + Final Content Push',
    color: '#b8ff3a',
    slots: [
      { time: '9 – 10 AM',      label: 'Shoot',           note: 'Beach & Hotel',  highlight: false },
      { time: '10 AM – 12 PM',  label: 'Shoot',           note: 'Beach & Hotel',  highlight: false },
      { time: '12 – 2 PM',      label: 'Lunch Break 🍽️', note: '',               highlight: true  },
      { time: '2 – 3:30 PM',    label: 'Shoot',           note: 'Around Venue',   highlight: false },
      { time: '3:30 – 4:30 PM', label: 'Shoot',           note: 'At the Cabana',  highlight: false },
      { time: '4:30 – 6 PM',    label: 'Shoot',           note: 'Around Venue',   highlight: false },
      { time: '6 – 8 PM',       label: 'Evening VIP ✨',  note: 'Creator Crew',   highlight: true  },
      { time: '8 – 10 PM',      label: 'Fashion Show 👗', note: 'Creator Crew',   highlight: true  },
    ],
  },
]

const Q_GROUPS = [
  {
    label: 'The Toy-Specific Debates',
    sublabel: 'Best for direct brand transitions',
    color: '#ff2d78',
    questions: [
      'Be honest: who satisfies you better — your partner, or your favorite toy?',
      'If your bedroom toys could talk, what is the biggest secret they would expose about you?',
      'If you had to choose between giving up your favorite toy or giving up coffee for a year, which stays?',
      'Where is the most creative or ridiculous place you have ever hidden a sex toy from guests?',
      'What funny name would you give to a sex toy that has 10 different speed settings?',
    ],
    startNum: 1,
  },
  {
    label: 'The Funny Bedroom Confessions',
    sublabel: 'Great for relatable, shareable reactions',
    color: '#b8ff3a',
    questions: [
      'What is the absolute weirdest noise you or a partner has ever made in the bedroom?',
      'If your sex life was a movie title, what would it be?',
      'What is the funniest or most embarrassing "ick" that made you immediately lose the mood?',
      'Have you ever accidentally sent a spicy text message to the completely wrong person?',
      'What is the worst piece of sex advice you have ever received or actually tried?',
    ],
    startNum: 6,
  },
  {
    label: 'The Juicy Relationship Debates',
    sublabel: 'Drives comments & debate in replies',
    color: '#ffb830',
    questions: [
      'Is falling asleep immediately after seggs a compliment to your skills, or is it a crime?',
      'What is the ultimate song that completely ruins the mood if it plays on shuffle?',
      'Have you ever faked it just because a sports game was about to start?',
      'What is a total bedroom dealbreaker that has absolutely nothing to do with size?',
      'If you could hand your partner a remote control for your body, what button would they press first?',
    ],
    startNum: 11,
  },
]

export default function BriefPage({ onEnter }: Props) {
  const [showSchedule,  setShowSchedule]  = useState(false)
  const [showQuestions, setShowQuestions] = useState(false)
  const [activeDay,     setActiveDay]     = useState(0)

  return (
    <>
      {/* ── Full-page split layout ───────────────────────────── */}
      <div className="min-h-screen bg-[#0d0d0d] text-[#f0ebe3] flex flex-col-reverse md:flex-row">

        {/* LEFT — Brief content */}
        <div className="flex-1 overflow-y-auto px-5 pt-6 pb-12 md:px-8 md:py-12 md:max-w-[55%]">
          <p className="text-xs font-bold text-[#b8ff3a] tracking-widest uppercase mb-8">
            Hello Nancy x Miami Swim Week
          </p>

          <p className="text-xs font-bold text-[#555] tracking-widest uppercase mb-4">Your Mission</p>
          <div className="space-y-3">

            <div className="bg-[#161616] border border-[#222] rounded-2xl px-4 py-5">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5 flex-shrink-0">✨</span>
                <div>
                  <p className="text-base font-bold text-[#f0ebe3] mb-2">Soak Up the Whole Venue!</p>
                  <p className="text-sm text-[#777] leading-relaxed">
                    You're here as a guest — so explore everything and enjoy every second of it! Wander freely, discover hidden gems, and make sure to swing by the <span className="text-[#f0ebe3] font-bold">Hello Nancy Booth</span> for a fun reaction. Your real energy is what people love to watch! 💫
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#161616] border border-[#222] rounded-2xl px-4 py-5">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5 flex-shrink-0">🤝</span>
                <div>
                  <p className="text-base font-bold text-[#f0ebe3] mb-2">Create Together, Shine Together</p>
                  <p className="text-sm text-[#777] leading-relaxed">
                    You're part of one of <span className="text-[#f0ebe3] font-bold">2 creator teams</span> — how fun is that! 🎉 Kick off the morning with a brainstorm, share ideas, divide and conquer, and cheer each other on all day long.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#161616] border border-[#222] rounded-2xl px-4 py-5">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5 flex-shrink-0">🎬</span>
                <div>
                  <p className="text-base font-bold text-[#f0ebe3] mb-2">Show It Off!</p>
                  <p className="text-sm text-[#777] leading-relaxed">
                    Think about how exciting it is when you discover something cool at an event — capture that! Demo the LEM product naturally with real people around you. Reference videos inside will inspire you!
                  </p>
                </div>
              </div>
            </div>

            {/* Get People Talking — with questions button */}
            <div className="bg-[#161616] border border-[#222] rounded-2xl px-4 py-5">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5 flex-shrink-0">🎤</span>
                <div className="flex-1">
                  <p className="text-base font-bold text-[#f0ebe3] mb-2">Get People Talking!</p>
                  <p className="text-sm text-[#777] leading-relaxed mb-4">
                    Start fun conversations on camera! Ask attendees what they're wearing, what they're loving, what brought them here. The best interviews feel like chatting with a new friend 💬
                  </p>
                  <button
                    onClick={() => setShowQuestions(true)}
                    className="inline-flex items-center gap-2 bg-[#ff2d78]/10 hover:bg-[#ff2d78]/20 active:scale-[.97] border border-[#ff2d78]/40 text-[#ff2d78] text-sm font-bold px-4 py-2 rounded-xl transition-all"
                  >
                    🎬 View Viral Video Blueprint
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#161616] border border-[#222] rounded-2xl px-4 py-5">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5 flex-shrink-0">🌟</span>
                <div>
                  <p className="text-base font-bold text-[#f0ebe3] mb-2">Find Your People</p>
                  <p className="text-sm text-[#777] leading-relaxed">
                    You know that feeling when you spot someone at an event and you just <em>know</em> they'd be amazing on camera? Trust that instinct! Look for guests who are lit up and having the absolute best time. 🔥
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#161616] border border-[#ff2d78]/20 rounded-2xl px-4 py-5">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-0.5 flex-shrink-0">🛍️</span>
                <div>
                  <p className="text-base font-bold text-[#f0ebe3] mb-2">"Guess What This Is?" 👀</p>
                  <p className="text-sm text-[#777] leading-relaxed">
                    We've got the <span className="text-[#f0ebe3] font-bold">LEM Soda Backpack</span> and cute <span className="text-[#f0ebe3] font-bold">blind bag plushies</span> to give to visitors! Film their reaction as they guess what's inside. Such a good hook 🎀
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT — Welcome + CTAs */}
        <div className="md:w-[45%] md:sticky md:top-0 md:h-screen flex flex-col justify-center px-5 pb-8 pt-10 md:px-10 md:py-12 border-b border-[#1e1e1e] md:border-b-0 md:border-l md:border-[#1e1e1e]">
          <div className="mb-10">
            <p className="text-sm font-bold text-[#555] tracking-widest uppercase mb-4">Day 1 · May 28</p>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-4">
              Welcome To<br />The Cabana!
            </h1>
            <p className="text-base text-[#666] leading-relaxed">
              You're the most genuine attendee here — and that's your superpower. 💛
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowSchedule(true)}
              className="w-full bg-[#1a0a2e] hover:bg-[#2a1042] active:scale-[.97] text-white font-bold text-lg py-5 rounded-2xl transition-all border border-[#3d1a5e]"
            >
              📅 See Schedule
            </button>
            <button
              onClick={onEnter}
              className="w-full bg-[#ff2d78] hover:bg-[#e0265e] active:scale-[.97] text-white font-bold text-lg py-5 rounded-2xl transition-all"
            >
              🎬 Explore Scripts
            </button>
          </div>
        </div>

      </div>

      {/* ── Schedule modal ──────────────────────────────────── */}
      {showSchedule && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end"
          onClick={e => { if (e.target === e.currentTarget) setShowSchedule(false) }}
        >
          <div className="bg-[#161616] border-t border-[#2a2a2a] rounded-t-3xl w-full max-h-[85vh] flex flex-col">

            <div className="flex items-center justify-between px-5 pt-6 pb-3 flex-shrink-0">
              <div>
                <h2 className="text-xl font-bold text-[#f0ebe3]">Schedule</h2>
                <p className="text-sm text-[#555] mt-0.5">Hello Nancy x Miami Swim Week</p>
              </div>
              <button onClick={() => setShowSchedule(false)} className="p-1.5 rounded-xl text-[#555] hover:text-[#888] hover:bg-[#222] transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex gap-2 px-5 pb-4 flex-shrink-0">
              {DAYS.map((day, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                    activeDay === i ? 'text-[#0d0d0d] border-transparent' : 'bg-[#1a1a1a] text-[#555] border-[#2a2a2a] hover:text-[#888]'
                  }`}
                  style={activeDay === i ? { backgroundColor: DAYS[i].color } : {}}
                >
                  {day.label}
                  <span className="block text-[10px] font-bold opacity-70 mt-0.5">{day.date}</span>
                </button>
              ))}
            </div>

            <div className="px-5 pb-4 flex-shrink-0">
              <p className="text-xs font-bold text-[#555] tracking-widest uppercase mb-1.5">Aim for today</p>
              <p className="text-sm font-bold" style={{ color: DAYS[activeDay].color }}>{DAYS[activeDay].aim}</p>
            </div>

            <div className="overflow-y-auto flex-1 px-5 pb-8">
              <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
                {DAYS[activeDay].slots.map((slot, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 px-4 py-4 ${i < DAYS[activeDay].slots.length - 1 ? 'border-b border-[#1e1e1e]' : ''} ${slot.highlight ? 'bg-[#ffffff05]' : ''}`}
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

      {/* ── Viral Video Blueprint modal ─────────────────────── */}
      {showQuestions && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end"
          onClick={e => { if (e.target === e.currentTarget) setShowQuestions(false) }}
        >
          <div className="bg-[#161616] border-t border-[#2a2a2a] rounded-t-3xl w-full max-h-[90vh] flex flex-col">

            {/* Modal header */}
            <div className="flex items-start justify-between px-5 pt-6 pb-4 flex-shrink-0 border-b border-[#1e1e1e]">
              <div className="flex-1 pr-4">
                <p className="text-xs font-bold text-[#ff2d78] tracking-widest uppercase mb-1">Script Guide</p>
                <h2 className="text-xl font-bold text-[#f0ebe3] leading-tight">The Ultimate Viral<br />Video Blueprint 🎬</h2>
                <p className="text-sm text-[#666] mt-2 leading-relaxed">
                  Shoot the Hook, Plug &amp; CTA <span className="text-[#f0ebe3] font-semibold">once</span> — swap in any of 15 questions to create 15 unique videos.
                </p>
              </div>
              <button onClick={() => setShowQuestions(false)} className="p-1.5 rounded-xl text-[#555] hover:text-[#888] hover:bg-[#222] transition-colors flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 px-5 pt-5 pb-10 space-y-5">

              {/* Section 1 — Hook */}
              <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1e1e1e]">
                  <div className="w-7 h-7 rounded-full bg-[#ff2d78] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-[#f0ebe3]">The Hook</p>
                  </div>
                  <span className="text-xs font-bold text-[#b8ff3a] bg-[#b8ff3a]/10 border border-[#b8ff3a]/20 px-2.5 py-1 rounded-lg">0:00 – 0:05</span>
                </div>
                <div className="px-4 py-4 space-y-3">
                  <p className="text-xs font-bold text-[#555] tracking-widest uppercase">Visual Direction</p>
                  <p className="text-sm text-[#666] italic leading-relaxed">Fast-paced text on screen. Interviewer holds a microphone in one hand and your toy or a censored box in the other. High energy.</p>
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3.5 mt-2">
                    <p className="text-xs font-bold text-[#ff2d78] mb-2">INTERVIEWER (TO CAMERA)</p>
                    <p className="text-sm text-[#f0ebe3] leading-relaxed">"We asked strangers on the street some dangerously honest questions about their bedroom habits. The answers got chaotic."</p>
                  </div>
                </div>
              </div>

              {/* Section 2 — Comedy Gold + Questions */}
              <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1e1e1e]">
                  <div className="w-7 h-7 rounded-full bg-[#ff2d78] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">2</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-[#f0ebe3]">The Comedy Gold</p>
                    <p className="text-sm text-[#555]">Pick 1 question per video from below</p>
                  </div>
                  <span className="text-xs font-bold text-[#b8ff3a] bg-[#b8ff3a]/10 border border-[#b8ff3a]/20 px-2.5 py-1 rounded-lg">0:05 – 0:30</span>
                </div>

                <div className="px-4 py-3 space-y-1">
                  <p className="text-xs font-bold text-[#555] tracking-widest uppercase mb-3">Visual Direction</p>
                  <p className="text-sm text-[#666] italic leading-relaxed mb-4">Fast, punchy cuts of 3 different strangers reacting to your chosen question.</p>
                </div>

                {Q_GROUPS.map((group, gi) => (
                  <div key={gi} className="border-t border-[#1e1e1e]">
                    <div className="px-4 py-3" style={{ backgroundColor: group.color + '0d' }}>
                      <p className="text-sm font-bold" style={{ color: group.color }}>{group.label}</p>
                      <p className="text-xs text-[#555] mt-0.5">{group.sublabel}</p>
                    </div>
                    <div className="divide-y divide-[#1a1a1a]">
                      {group.questions.map((q, qi) => (
                        <div key={qi} className="flex items-start gap-3 px-4 py-3.5">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: group.color + '1a', border: `1px solid ${group.color}33` }}
                          >
                            <span className="text-[10px] font-bold" style={{ color: group.color }}>Q{group.startNum + qi}</span>
                          </div>
                          <p className="text-sm text-[#c0bab3] leading-relaxed">{q}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Section 3 — Product Plug */}
              <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1e1e1e]">
                  <div className="w-7 h-7 rounded-full bg-[#ff2d78] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">3</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-[#f0ebe3]">The Seamless Product Plug</p>
                  </div>
                  <span className="text-xs font-bold text-[#b8ff3a] bg-[#b8ff3a]/10 border border-[#b8ff3a]/20 px-2.5 py-1 rounded-lg">0:30 – 0:45</span>
                </div>
                <div className="px-4 py-4 space-y-4">
                  <p className="text-xs font-bold text-[#555] tracking-widest uppercase">Visual Direction</p>
                  <p className="text-sm text-[#666] italic leading-relaxed">Zoom in on the interviewer holding up your brand's toy. Transition to a quick aesthetic close-up B-roll shot of the product.</p>

                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3.5">
                    <p className="text-xs font-bold text-[#ff2d78] mb-2">INTERVIEWER (TO CAMERA)</p>
                    <p className="text-sm text-[#f0ebe3] leading-relaxed">"See, that's exactly why we created [Your Brand Name]. Strangers are out here choosing tech over teamwork because of this little guy right here."</p>
                  </div>

                  <p className="text-xs font-bold text-[#555] tracking-widest uppercase pt-1">Match Your Transition to Your Question</p>

                  <div className="space-y-2">
                    <div className="border border-[#ff2d78]/20 rounded-xl px-4 py-3">
                      <p className="text-xs font-bold text-[#ff2d78] mb-1.5">IF YOU USED Q1 – Q5 (Toy Questions)</p>
                      <p className="text-sm text-[#888] leading-relaxed">"Instead of hiding your toys, you'll want to display this one. It packs [Feature, e.g., 10 whisper-quiet speeds] that do all the heavy lifting."</p>
                    </div>
                    <div className="border border-[#b8ff3a]/20 rounded-xl px-4 py-3">
                      <p className="text-xs font-bold text-[#b8ff3a] mb-1.5">IF YOU USED Q6 – Q10 (Funny Confessions)</p>
                      <p className="text-sm text-[#888] leading-relaxed">"If you want to make noises that confuse your neighbors for all the right reasons, this is your secret weapon. It features [Feature, e.g., air-pulse suction technology]."</p>
                    </div>
                    <div className="border border-[#ffb830]/20 rounded-xl px-4 py-3">
                      <p className="text-xs font-bold text-[#ffb830] mb-1.5">IF YOU USED Q11 – Q15 (Juicy Debates)</p>
                      <p className="text-sm text-[#888] leading-relaxed">"Stop faking it or waiting for them to press the right buttons. This toy gets straight to the point in under two minutes."</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4 — CTA */}
              <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1e1e1e]">
                  <div className="w-7 h-7 rounded-full bg-[#ff2d78] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">4</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-[#f0ebe3]">The Call-To-Action</p>
                  </div>
                  <span className="text-xs font-bold text-[#b8ff3a] bg-[#b8ff3a]/10 border border-[#b8ff3a]/20 px-2.5 py-1 rounded-lg">0:45 – 1:00</span>
                </div>
                <div className="px-4 py-4 space-y-3">
                  <p className="text-xs font-bold text-[#555] tracking-widest uppercase">Visual Direction</p>
                  <p className="text-sm text-[#666] italic leading-relaxed">Interviewer hands a free brand gift bag to the best stranger. Pop-up text on screen: "Link in Bio to upgrade your bedroom".</p>
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3.5 space-y-3">
                    <div>
                      <p className="text-xs font-bold text-[#ff2d78] mb-1.5">TO THE WINNER</p>
                      <p className="text-sm text-[#f0ebe3] leading-relaxed">"Since you gave the best answer, you win our bestseller. Go give your partner a night off!"</p>
                    </div>
                    <div className="border-t border-[#2a2a2a] pt-3">
                      <p className="text-xs font-bold text-[#ff2d78] mb-1.5">TO CAMERA</p>
                      <p className="text-sm text-[#f0ebe3] leading-relaxed">"Stop settling for mediocre. Hit the link in our bio to grab yours before we sell out again. Your bedroom will thank you."</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Production Checklist */}
              <div className="bg-[#0f0f1a] border border-[#3d1a5e]/50 rounded-2xl overflow-hidden">
                <div className="px-4 py-4 border-b border-[#3d1a5e]/30">
                  <p className="text-base font-bold text-[#f0ebe3]">🚀 Production Checklist</p>
                  <p className="text-sm text-[#666] mt-1">Set yourself up before the shoot</p>
                </div>
                <div className="divide-y divide-[#1e1e2e]">
                  {[
                    {
                      icon: '🍑',
                      title: 'The "Censored" Prop',
                      body: 'Paste a giant funny sticker (peach 🍑 or banana 🍌 emoji) over the actual toy on camera. Creates curiosity and keeps TikTok/Reels from flagging the video.',
                    },
                    {
                      icon: '🎁',
                      title: 'Giveaway Bags',
                      body: 'Have 5–10 branded gift bags ready to reward the funniest participants. People will answer anything for free high-quality merch!',
                    },
                    {
                      icon: '💬',
                      title: 'Captions',
                      body: 'Use auto-captions with color changes on words like "seggs," "toy," and "bedroom" to maximize retention.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-4">
                      <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <p className="text-sm font-bold text-[#f0ebe3] mb-1">{item.title}</p>
                        <p className="text-sm text-[#666] leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
