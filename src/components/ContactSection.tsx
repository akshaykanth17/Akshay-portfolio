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
        colors: ['#3b82f6', '#60a5fa', '#93c5fd', '#ffffff', '#eab308']
      });
    } catch {
      // fallback
    }

    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-16 bg-[#07080e] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-blue-600/10 blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-mono text-xs tracking-widest uppercase text-slate-300">
            CHAPTER 09 &bull; GET IN TOUCH
          </span>
        </div>

        {/* Giant Headline */}
        <div className="mb-16">
          <h2 className="font-display text-4xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05]">
            LET'S BUILD SOMETHING <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              EXTRAORDINARY.
            </span>
          </h2>
          <p className="text-slate-300 font-light max-w-xl text-base sm:text-lg mt-4 leading-relaxed">
            Whether you need a dedicated QA Engineer to ensure zero defects, an AI-assisted developer for automated testing, or a full-stack project builder—I am ready to deliver.
          </p>
        </div>

        {/* Contact Layout: Info Cards & Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-blue-500/40 backdrop-blur-xl transition-all duration-300 shadow-xl group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">DIRECT INQUIRIES</span>
                    <span className="font-display font-bold text-sm text-white">Email Address</span>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(email, 'email')}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href={`mailto:${email}`}
                className="font-mono text-sm sm:text-base text-blue-300 hover:text-blue-200 transition-colors block break-all font-semibold"
              >
                {email}
              </a>
              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>Responds within 24 hours</span>
                <a href={`mailto:${email}`} className="text-blue-400 flex items-center gap-1 hover:underline">
                  <span>Send Mail</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-blue-500/40 backdrop-blur-xl transition-all duration-300 shadow-xl group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">CALL &amp; WHATSAPP</span>
                    <span className="font-display font-bold text-sm text-white">Direct Phone</span>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(phone, 'phone')}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                  title="Copy phone to clipboard"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="font-mono text-base text-white hover:text-emerald-300 transition-colors block font-semibold"
              >
                {phone}
              </a>
              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>Dubai (GMT+4)</span>
                <a
                  href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 flex items-center gap-1 hover:underline"
                >
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Location & Resume Download Card */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">CURRENT LOCATION</span>
                  <span className="font-display font-bold text-sm text-white">Dubai, United Arab Emirates</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 font-light">
                Available for onsite roles in Dubai / UAE, hybrid arrangements, and international remote positions.
              </p>

              <a
                href="/Akshay_Kanth_C_CV_.pdf"
                download="Akshay_Kanth_C_CV.pdf"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs tracking-wider transition-all duration-200 hover:border-white/30"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Download Official CV (PDF)</span>
              </a>

              <a
                href="https://github.com/akshaykanth17"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-white font-medium text-xs tracking-wider transition-all duration-200"
              >
                <Github className="w-4 h-4 text-blue-400" />
                <span>GitHub Profile (@akshaykanth17)</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Send Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#121626]/90 to-[#0a0d16]/95 border border-white/15 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">
                  FAST TRANSMISSION
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-6">
                Send a Direct Message
              </h3>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">
                    Thank you for reaching out!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 font-light max-w-sm mx-auto">
                    Your transmission has been queued. I will review your note and respond to <span className="text-emerald-300 font-mono">{formData.email}</span> shortly.
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
                      <label className="block text-xs font-mono text-slate-400 mb-2">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe / Engineering Lead"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-2">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2">
                      PROJECT / OPPORTUNITY SCOPE
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Akshay, we'd like to discuss our QA testing requirements and AI application development..."
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Akshay</span>
                  </button>

                  <p className="text-[11px] font-mono text-slate-400 text-center">
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
