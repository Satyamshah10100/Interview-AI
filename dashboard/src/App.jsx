import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  CheckCircle, 
  Target, 
  FileText, 
  Settings, 
  Upload, 
  User,
  MessageSquare,
  Megaphone,
  ClipboardList,
  Video,
  Mic,
  MicOff,
  PhoneOff,
  AlertTriangle,
  Check,
  PlayCircle,
  BarChart2,
  ShieldAlert,
  Award,
  Loader2
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const performanceData = [
  { subject: 'Technical Skills', A: 85, B: 65, fullMark: 100 },
  { subject: 'Communication', A: 70, B: 85, fullMark: 100 },
  { subject: 'Content Quality', A: 90, B: 75, fullMark: 100 },
  { subject: 'Confidence', A: 80, B: 90, fullMark: 100 },
  { subject: 'Problem Solving', A: 85, B: 70, fullMark: 100 },
];

const aptitudeData = [
  { name: 'Logical', score: 88 },
  { name: 'Core Tech', score: 92 },
  { name: 'System Design', score: 75 },
  { name: 'Behavioral', score: 85 },
];

export default function App() {
  const [currentView, setCurrentView] = useState('overview');

  const navItems = [
    { id: 'overview', icon: Home, label: 'Overview' },
    { id: 'ats', icon: CheckCircle, label: 'ATS Pre-Check' },
    { id: 'arena', icon: Target, label: 'The Arena' },
    { id: 'dossier', icon: FileText, label: 'Performance Dossier' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex z-10">
        <div>
          <div className="p-6 flex items-center gap-3 border-b border-slate-100">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600 shadow-inner">
              <MessageSquare size={24} />
            </div>
            <h1 className="font-bold text-lg leading-tight text-slate-900">AI Interview<br/>Assistant</h1>
          </div>

          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              const Icon = item.icon;
              return (
                <button 
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-blue-600' : 'text-slate-500'} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center justify-between px-4 py-2 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 overflow-hidden">
                <User size={20} />
              </div>
              <span className="font-medium text-sm text-slate-700">Candidate Profile</span>
            </div>
            <Settings size={18} className="text-slate-400" />
          </div>
        </div>
      </aside>

      {/* Dynamic Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        {currentView === 'overview' && <OverviewView onViewChange={setCurrentView} />}
        {currentView === 'ats' && <ATSView />}
        {currentView === 'arena' && <ArenaView />}
        {currentView === 'dossier' && <DossierView />}
      </main>
    </div>
  );
}

function OverviewView({ onViewChange }) {
  return (
    <div className="p-8 animate-in fade-in duration-500">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Overview (Home)</h2>
        <p className="text-slate-500 mt-1">Welcome back. Here is a summary of your interview readiness.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Past Performance */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-lg mb-4 text-slate-800">Past Interview Performance</h3>
          <div className="h-64 w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={performanceData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                <Radar name="Current" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name="Target benchmark" dataKey="B" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.1} strokeDasharray="3 3" />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px', color: '#475569' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-semibold text-lg mb-4 text-slate-800">Upcoming Sessions</h3>
          <div className="bg-slate-50 rounded-xl overflow-hidden flex-1 border border-slate-100">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Mock Interview</th>
                  <th className="px-4 py-3 font-medium">Date/ Time</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr>
                  <td className="px-4 py-4 text-slate-800 font-medium">Google - Frontend</td>
                  <td className="px-4 py-4 text-slate-600">Today, 6:30 PM</td>
                  <td className="px-4 py-4 text-right">
                    <button onClick={() => onViewChange('arena')} className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium shadow-sm">
                      Enter Arena
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-slate-800 font-medium">Meta - System Design</td>
                  <td className="px-4 py-4 text-slate-600">Tomorrow, 7:30 PM</td>
                  <td className="px-4 py-4 text-right">
                    <button className="px-4 py-1.5 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-xs font-medium">
                      Prepare
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Overview ATS */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg text-slate-800">ATS Gap Analysis</h3>
            <button onClick={() => onViewChange('ats')} className="text-blue-600 text-sm font-medium hover:underline">View Full Analysis</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Identified Gaps</h4>
              <div className="space-y-2">
                <div className="px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">Cloud Infrastructure (AWS)</div>
                <div className="px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">NoSQL (MongoDB)</div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Recommended</h4>
              <div className="space-y-2">
                <div className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100 flex justify-between items-center cursor-pointer hover:bg-blue-100">
                  <span>Build AWS API</span>
                  <ExternalLinkIcon className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Improvement Plan */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList size={20} className="text-slate-800" />
            <h3 className="font-semibold text-lg text-slate-800">Improvement Plan</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-emerald-600 bg-emerald-100 p-2 rounded-lg"><Megaphone size={16} /></div>
              <span className="text-sm text-slate-700 font-medium">Work on Communication Pacing</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-emerald-600 bg-emerald-100 p-2 rounded-lg"><FileText size={16} /></div>
              <span className="text-sm text-slate-700 font-medium">Practice STAR format answers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ATSView() {
  const [file, setFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const runAnalysis = async () => {
    if (!file) {
      setError("Please upload a PDF resume first.");
      return;
    }
    if (!jdText.trim()) {
      setError("Please provide a Job Description (paste text or a URL).");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jdText);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/ats/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to connect to the ATS API.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate dynamic stroke offset for the score ring (circumference is ~377)
  const score = result?.match_score || 0;
  const strokeDashoffset = 377 - (377 * score) / 100;

  return (
    <div className="p-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8 border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle className="text-blue-600" />
          ATS Engine Pre-Check
        </h2>
        <p className="text-slate-500 mt-2">Upload your resume and paste the target job description text to run a real-time semantic analysis against your custom FastAPI backend.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-medium text-slate-800 mb-3">1. Upload Resume</h3>
            
            <input 
              type="file" 
              accept=".pdf" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
            />

            <div 
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group"
            >
              <div className="bg-blue-100 p-3 rounded-full text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                <Upload size={24} />
              </div>
              <p className="font-medium text-sm text-slate-700 mb-1">Click to upload your resume</p>
              <p className="text-xs text-slate-500">PDF Format Only</p>
            </div>
            
            {file && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-blue-800 truncate pr-2">
                  <FileText size={16} className="shrink-0" /> 
                  <span className="font-medium truncate">{file.name}</span>
                </div>
                <Check size={16} className="text-blue-600 shrink-0" />
              </div>
            )}
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-medium text-slate-800 mb-3">2. Target Job Description</h3>
            <label className="block text-xs font-medium text-slate-500 mb-1">Paste the full job description text</label>
            <textarea 
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="e.g. We are looking for a Software Engineer with experience in React and Node.js..."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 text-slate-700 h-32 resize-none"
            />
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm flex items-start gap-2">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button 
              onClick={runAnalysis}
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <BarChart2 size={16} />}
              {loading ? "Analyzing Alignment..." : "Run ATS Analysis"}
            </button>
          </div>
        </div>

        {/* Right Column: Results Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
             <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                <Target size={48} className="mb-4 opacity-50" />
                <p className="font-medium">Run an analysis to see your results here.</p>
             </div>
          )}

          {loading && (
             <div className="h-full min-h-[400px] border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-500 bg-white shadow-sm">
                <Loader2 size={40} className="animate-spin text-blue-500 mb-4" />
                <p className="font-medium text-slate-700 animate-pulse">AI is parsing semantics & extracting gaps...</p>
             </div>
          )}

          {}
          {result && !loading && (
            <>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center animate-in fade-in zoom-in-95">
                {/* Dynamic Score Ring */}
                <div className="relative flex flex-col items-center justify-center shrink-0">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="60" 
                      stroke="currentColor" 
                      strokeWidth="8" 
                      fill="transparent" 
                      strokeDasharray="377" 
                      strokeDashoffset={strokeDashoffset}
                      className={`${score >= 75 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-red-500'} transition-all duration-1000 ease-out`} 
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-bold text-slate-800">{score}%</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Match Score</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Analysis Complete</h3>
                  <p className="text-sm text-slate-600 mb-4">{result.overall_summary}</p>
                  <div className="flex gap-4">
                    <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                      <div className="text-xs text-slate-500 mb-1">Required Skills Found</div>
                      <div className="font-semibold text-slate-800">{result.matched_skills?.length || 0} Matches</div>
                    </div>
                    <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                      <div className="text-xs text-slate-500 mb-1">Critical Gaps</div>
                      <div className="font-semibold text-slate-800">{result.missing_skills?.length || 0} Missing</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 delay-150">
                {/* Found Skills */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-h-80 overflow-y-auto">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <CheckCircle size={18} className="text-emerald-500" /> Matched Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.matched_skills?.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-100">
                        {skill}
                      </span>
                    ))}
                    {(!result.matched_skills || result.matched_skills.length === 0) && <span className="text-sm text-slate-500">No matching skills found.</span>}
                  </div>
                </div>

                {/* Missing Skills (Gaps) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-h-80 overflow-y-auto">
                  <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertTriangle size={18} className="text-amber-500" /> Semantic Gaps
                  </h3>
                  <div className="space-y-4">
                    {result.missing_skills?.map((gap, idx) => (
                      <div key={idx} className="flex items-start justify-between pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                        <div>
                          <div className="text-sm font-medium text-slate-800">{gap.skill}</div>
                          <div className="text-xs text-slate-500 mt-1 pr-4">{gap.context}</div>
                        </div>
                        <span className="text-[10px] uppercase font-bold px-2 py-1 bg-amber-100 text-amber-800 rounded shrink-0">Missing</span>
                      </div>
                    ))}
                    {(!result.missing_skills || result.missing_skills.length === 0) && <span className="text-sm text-slate-500">No major gaps identified!</span>}
                  </div>
                </div>
              </div>

              {/* Recommended Projects */}
              {result.recommended_projects?.length > 0 && (
                <div className="bg-slate-900 p-6 rounded-2xl shadow-sm text-white animate-in fade-in slide-in-from-bottom-4 delay-300">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Award size={18} className="text-blue-400" /> Suggested Projects to Bridge Gaps
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.recommended_projects.map((project, idx) => (
                      <div key={idx} className="bg-slate-800 border border-slate-700 p-4 rounded-xl">
                         <div className="text-sm font-semibold text-blue-300 mb-2">{project.title}</div>
                         <div className="text-xs text-slate-400 leading-relaxed">{project.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}

function ArenaView() {
  const [isMuted, setIsMuted] = useState(false);
  const [proctoringAlert, setProctoringAlert] = useState(false);

  // Simulate a proctoring alert after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => setProctoringAlert(true), 5000);
    const clearTimer = setTimeout(() => setProctoringAlert(false), 8000);
    return () => { clearTimeout(timer); clearTimeout(clearTimer); };
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-200 animate-in zoom-in-95 duration-500">
      {/* Top Header */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-slate-800 bg-slate-900/50 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </div>
          <span className="font-semibold text-sm tracking-wide">Live Mock Interview</span>
          <span className="text-slate-500 text-xs ml-2 px-2 py-1 bg-slate-800 rounded">Phase 2: One-to-One</span>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border ${proctoringAlert ? 'bg-red-500/10 text-red-400 border-red-500/50' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50'} transition-colors`}>
            {proctoringAlert ? <ShieldAlert size={14} /> : <CheckCircle size={14} />}
            {proctoringAlert ? 'Proctoring: Look at Screen' : 'Proctoring Active'}
          </div>
          <span className="text-sm font-mono bg-slate-800 px-3 py-1 rounded-md">12:45</span>
        </div>
      </header>

      {/* Main Video Area */}
      <div className="flex-1 flex p-6 gap-6 relative">
        
        {/* Candidate Video (Self) */}
        <div className="flex-1 bg-slate-900 rounded-2xl overflow-hidden relative border border-slate-800 shadow-2xl flex flex-col justify-end">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 z-0"></div>
          <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-medium z-0">
            [ Webcam Feed ]
            <div className="absolute w-48 h-64 border border-emerald-500/30 rounded-[40%] border-dashed opacity-50"></div>
          </div>
          
          <div className="relative z-10 p-6 w-full max-w-2xl mx-auto">
            <div className="bg-slate-950/80 backdrop-blur-md rounded-xl p-4 border border-slate-800 shadow-lg text-center">
               <p className="text-slate-300 text-lg leading-relaxed">
                 "So for the state management in that project, I initially considered Redux, but realized..."
               </p>
            </div>
          </div>
        </div>

        {/* Side Panel: AI Interviewer & Question */}
        <div className="w-80 flex flex-col gap-6">
          <div className="h-64 bg-slate-900 rounded-2xl overflow-hidden relative border border-slate-800">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 mb-3">
                <PlayCircle size={32} className="text-white" />
              </div>
              <span className="text-sm font-medium text-slate-300">AI Interviewer</span>
              <div className="flex gap-1 mt-3 items-end h-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-1 bg-blue-400 rounded-full animate-pulse" style={{height: `${Math.random() * 100}%`, animationDelay: `${i*0.1}s`}}></div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 p-5 flex flex-col">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">Current Question</div>
            <p className="text-slate-200 font-medium text-sm leading-relaxed mb-4">
              "Can you explain a scenario where you had to optimize the performance of a React application? What specific metrics did you focus on?"
            </p>
            <div className="mt-auto space-y-2">
               <div className="text-xs text-slate-500">Framework Focus:</div>
               <div className="flex gap-2">
                 <span className="text-[10px] px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-400">STAR Method</span>
                 <span className="text-[10px] px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-400">Technical Depth</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-4 px-6 z-10">
        <button 
          onClick={() => setIsMuted(!isMuted)} 
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-slate-700 hover:bg-slate-600'}`}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        <button className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors">
          <Video size={20} />
        </button>
        <div className="w-px h-8 bg-slate-700 mx-2"></div>
        <button className="px-6 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium flex items-center gap-2 transition-colors shadow-lg shadow-red-900/20">
          <PhoneOff size={18} /> End Interview
        </button>
      </div>
    </div>
  );
}

function DossierView() {
  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in duration-700">
      
      {/* Dossier Header */}
      <header className="mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-slate-900">Google Mock Interview</h2>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full border border-slate-200">Feb 21, 2023</span>
          </div>
          <p className="text-slate-500 text-sm">Role: Frontend Engineer (Technical Round)</p>
        </div>
        
        <div className="flex items-center gap-6 bg-slate-50 px-6 py-3 rounded-xl border border-slate-100">
          <div className="text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Overall Suitability</div>
            <div className="text-2xl font-bold text-emerald-600">82 / 100</div>
          </div>
          <div className="w-px h-10 bg-slate-200"></div>
          <div className="text-center">
             <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Proctoring Integrity</div>
             <div className="text-lg font-bold text-slate-800 flex items-center justify-center gap-1">
               98% <Award size={16} className="text-blue-500"/>
             </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Phase 1: Aptitude Breakdown */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">Phase 1: MCQ Breakdown</h3>
          <div className="h-48 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aptitudeData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={90} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Phase 2: Qualitative Feedback */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">Phase 2: Conversation Analysis</h3>
          <div className="grid grid-cols-2 gap-6 mt-4">
            
            {/* Delivery Metrics */}
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2"><Mic size={16} className="text-blue-500" /> Delivery & Tone</h4>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Speech Pacing</span>
                  <span className="font-medium text-slate-800">145 WPM (Optimal)</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Filler Words</span>
                  <span className="font-medium text-amber-600">12 (Slightly High)</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Confidence Score</span>
                  <span className="font-medium text-emerald-600">85%</span>
                </li>
              </ul>
            </div>

            {/* Content Metrics */}
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2"><FileText size={16} className="text-blue-500" /> Content Quality</h4>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">STAR Method Adherence</span>
                  <span className="font-medium text-slate-800">Strong</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Technical Accuracy</span>
                  <span className="font-medium text-slate-800">92%</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Relevance to JD</span>
                  <span className="font-medium text-emerald-600">High</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Excerpt & AI Feedback */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <MessageSquare size={18} className="text-slate-400"/> AI Evaluator Notes
        </h3>
        <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 leading-relaxed border border-slate-100">
          <p className="mb-3">
            <strong className="text-slate-900">Strengths:</strong> The candidate demonstrated an excellent grasp of React rendering cycles and effectively communicated a complex state management problem. Body language was positive, and eye contact with the camera was maintained for 92% of the session.
          </p>
          <p>
            <strong className="text-slate-900">Areas to Improve:</strong> During the system design question regarding WebSocket implementation, the answer lacked structural depth. The candidate used filler words ("um", "like") noticeably more when pressed on scalability questions. Recommend reviewing backend scaling patterns and practicing the pause-think-speak technique.
          </p>
        </div>
      </div>

    </div>
  );
}

function ExternalLinkIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
}