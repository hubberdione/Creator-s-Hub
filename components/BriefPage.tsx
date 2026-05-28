'use client'

type Props = { onEnter: () => void }

export default function BriefPage({ onEnter }: Props) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ebe3] pb-24">

      {/* Hero */}
      <div className="px-5 pt-12 pb-8 max-w-xl mx-auto">
        <p className="text-[10px] font-bold text-[#b8ff3a] tracking-widest uppercase mb-3">
          LEM Miami Swim Week 2026
        </p>
        <h1 className="text-4xl font-bold leading-[1.05] tracking-tight mb-4">
          Creator<br />Hit List
        </h1>
        <p className="text-sm text-[#888] leading-relaxed">
          Everything you need to know for today. Read through, then dive into your reference scripts.
        </p>
      </div>

      {/* Schedule */}
      <div className="px-5 max-w-xl mx-auto mb-8">
        <p className="text-[10px] font-bold text-[#555] tracking-widest uppercase mb-3">Your Day</p>
        <div className="bg-[#161616] border border-[#222] rounded-2xl overflow-hidden">

          <div className="flex items-center gap-4 px-4 py-3.5 border-b border-[#1e1e1e]">
            <span className="text-xs font-bold text-[#555] w-24 flex-shrink-0">9 – 10 AM</span>
            <span className="text-sm font-bold text-[#f0ebe3]">Creator Crew Brainstorm</span>
          </div>

          <div className="flex items-center gap-4 px-4 py-3.5 border-b border-[#1e1e1e]">
            <span className="text-xs font-bold text-[#555] w-24 flex-shrink-0">10 AM – 12 PM</span>
            <span className="text-sm font-bold text-[#f0ebe3]">Shoot — Around Venue</span>
          </div>

          <div className="flex items-center gap-4 px-4 py-3.5 border-b border-[#1e1e1e] bg-[#b8ff3a]/5">
            <span className="text-xs font-bold text-[#b8ff3a] w-24 flex-shrink-0">12 – 2 PM</span>
            <span className="text-sm font-bold text-[#b8ff3a]">Lunch Break</span>
          </div>

          <div className="flex items-center gap-4 px-4 py-3.5 border-b border-[#1e1e1e]">
            <span className="text-xs font-bold text-[#555] w-24 flex-shrink-0">2 – 3:30 PM</span>
            <span className="text-sm font-bold text-[#f0ebe3]">Shoot — Around Venue</span>
          </div>

          <div className="flex items-center gap-4 px-4 py-3.5 border-b border-[#1e1e1e]">
            <span className="text-xs font-bold text-[#555] w-24 flex-shrink-0">3:30 – 4:30 PM</span>
            <span className="text-sm font-bold text-[#f0ebe3]">Shoot — Around Venue</span>
          </div>

          <div className="flex items-center gap-4 px-4 py-3.5">
            <span className="text-xs font-bold text-[#555] w-24 flex-shrink-0">4:30 – 6 PM</span>
            <span className="text-sm font-bold text-[#f0ebe3]">Shoot — Around Venue</span>
          </div>

        </div>
      </div>

      {/* Mission cards */}
      <div className="px-5 max-w-xl mx-auto mb-8">
        <p className="text-[10px] font-bold text-[#555] tracking-widest uppercase mb-3">Your Mission</p>
        <div className="space-y-2.5">

          <div className="bg-[#161616] border border-[#222] rounded-2xl px-4 py-4">
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">✨</span>
              <div>
                <p className="text-sm font-bold text-[#f0ebe3] mb-1">Soak Up the Whole Venue</p>
                <p className="text-xs text-[#666] leading-relaxed">
                  You're here as a guest — so explore freely and enjoy it! Wander, discover, and make sure to swing by the <span className="text-[#f0ebe3] font-bold">Hello Nancy Booth</span>. Your genuine excitement and reactions are what make great content.
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
                  You're part of one of <span className="text-[#f0ebe3] font-bold">2 creator teams</span>! Kick off the day brainstorming together — share ideas, plan your angles, and find ways to hype each other's content throughout the day.
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
                  Bring the LEM product to life with real people around you — think CES-style energy but at a swim week! Keep it natural and fun. The reference scripts on the next page have great starting points to inspire you.
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
                  Strike up fun conversations on camera — ask attendees about their style, their faves, what they're loving about the event. The best interviews feel like chats between friends. Scripts with question ideas are waiting inside!
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
                  The best content comes from guests who are lit up about being here — expressive, stylish, and having the best time. When you spot that energy, go for it! Those are your people.
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
              <p className="text-sm font-bold text-[#f0ebe3] mb-1">"Guess What This Is?"</p>
              <p className="text-xs text-[#888] leading-relaxed">
                We have the <span className="text-[#f0ebe3] font-bold">LEM Soda Backpack</span> and <span className="text-[#f0ebe3] font-bold">blind bag plushies</span> to give away to visitors. Hand one to someone, film their unboxing — let them guess what's inside before they open it. Great hook for short-form content.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
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
  )
}
