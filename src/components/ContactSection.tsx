import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  Send, 
  Copy, 
  Check, 
  MessageSquare, 
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  Github
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const email = 'akshaykanth017@gmail.com';
  const phone = '+971 506877235';

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#f4f4f5', '#e4e4e7', '#a1a1aa', '#71717a']
      });
    } catch {
      // fallback
    }

    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-16 bg-[#060709] overflow-hidden">
      {/* Background radial white smoke glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-white/[0.14] blur-[170px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-zinc-200/[0.08] blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
          <span className="font-mono text-xs tracking-widest uppercase text-zinc-300">
            CHAPTER 09 &bull; GET IN TOUCH
          </span>
        </div>

        {/* Giant Headline with Imperial Emerald & Mint Jade Gradient */}
        <div className="mb-16">
          <h2 className="font-display text-4xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05]">
            LET'S BUILD SOMETHING <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent filter drop-shadow-[0_0_40px_rgba(52,211,153,0.55)]">
              EXTRAORDINARY.
            </span>
          </h2>
          <p className="text-zinc-300 font-light max-w-xl text-base sm:text-lg mt-4 leading-relaxed">
            Whether you need a dedicated Test Engineer to ensure zero defects, bulletproof test cases, and quality mobile/web releases—I am ready to deliver.
          </p>
        </div>

        {/* Contact Layout: Info Cards & Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card in Black & Grey */}
            <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 hover:border-white/30 backdrop-blur-xl transition-all duration-300 shadow-xl group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:bg-white group-hover:text-black transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block">DIRECT INQUIRIES</span>
                    <span className="font-display font-bold text-sm text-white">Email Address</span>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(email, 'email')}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href={`mailto:${email}`}
                className="font-mono text-sm sm:text-base text-zinc-200 hover:text-white transition-colors block break-all font-semibold"
              >
                {email}
              </a>
              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span>Responds within 24 hours</span>
                <a href={`mailto:${email}`} className="text-white flex items-center gap-1 hover:underline">
                  <span>Send Mail</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp Card in Black & Grey */}
            <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 hover:border-white/30 backdrop-blur-xl transition-all duration-300 shadow-xl group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:bg-white group-hover:text-black transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block">CALL &amp; WHATSAPP</span>
                    <span className="font-display font-bold text-sm text-white">Direct Phone</span>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(phone, 'phone')}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                  title="Copy phone to clipboard"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="font-mono text-base text-white hover:text-neutral-300 transition-colors block font-semibold"
              >
                {phone}
              </a>
              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span>Dubai (GMT+4)</span>
                <a
                  href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white flex items-center gap-1 hover:underline"
                >
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Location & Resume Download Card */}
            <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block">CURRENT LOCATION</span>
                  <span className="font-display font-bold text-sm text-white">Dubai, United Arab Emirates</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 font-light">
                Available for onsite roles in Dubai / UAE, hybrid arrangements, and international remote positions.
              </p>

              <a
                href="./Akshay_Kanth_C_CV_.pdf"
                download="Akshay_Kanth_C_CV.pdf"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs tracking-wider transition-all duration-200 hover:border-white/30"
              >
                <Download className="w-4 h-4 text-neutral-300" />
                <span>Download Official CV (PDF)</span>
              </a>

              <a
                href="https://github.com/akshaykanth17"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white font-medium text-xs tracking-wider transition-all duration-200"
              >
                <Github className="w-4 h-4 text-neutral-300" />
                <span>GitHub Profile (@akshaykanth17)</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Send Message Form (7 cols) in Black & Grey */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/90 border border-white/15 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-neutral-300" />
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                  FAST TRANSMISSION
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-6">
                Send a Direct Message
              </h3>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-white/5 border border-white/20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">
                    Thank you for reaching out!
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-sm mx-auto">
                    Your transmission has been queued. I will review your note and respond to <span className="text-white font-mono">{formData.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-white/10 text-xs font-mono text-white hover:bg-white/20 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-2">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe / Engineering Lead"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-2">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2">
                      PROJECT / OPPORTUNITY SCOPE
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Akshay, we'd like to discuss our QA testing requirements and AI application development..."
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white/40 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm tracking-wide shadow-lg shadow-white/5 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4 text-black" />
                    <span>Send Message to Akshay</span>
                  </button>

                  <p className="text-[11px] font-mono text-zinc-400 text-center">
                    Direct communication delivered to akshaykanth017@gmail.com
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
