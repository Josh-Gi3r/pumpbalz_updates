import React, { useState, useEffect } from 'react';

// Custom CSS for Inter font
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  
  * {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  }
  
  .animate-glow {
    animation: glow 2s ease-in-out infinite alternate;
  }
  
  @keyframes glow {
    from {
      box-shadow: 0 0 5px rgba(198, 248, 6, 0.5), 0 0 10px rgba(198, 248, 6, 0.3), 0 0 15px rgba(198, 248, 6, 0.2);
    }
    to {
      box-shadow: 0 0 10px rgba(198, 248, 6, 0.7), 0 0 20px rgba(198, 248, 6, 0.5), 0 0 30px rgba(198, 248, 6, 0.3);
    }
  }
  
  .hover-lift {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .hover-lift:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

export default function Page() {
  // State for interactive components
  const [activeTab, setActiveTab] = useState({
    curves: 'basics',
    wallet: 'why',
    security: 'smart',
    creator: 'dashboard',
    blockchain: 'reality'
  });
  
  const [walletScores, setWalletScores] = useState({
    age: 3,
    tokens: 5,
    holdTime: 6,
    protocols: 1,
    socials: 0
  });

  const [sweepResult, setSweepResult] = useState("See what random event could trigger...");

  // Update wallet score calculation - logical gate + activity system
  const calculateScore = () => {
    const { age, tokens, holdTime, protocols, socials } = walletScores;
    
    // Gate check first
    if (age < 1) {
      return 20; // New/Restricted regardless of other factors
    }
    
    // Calculate activity score for older wallets
    let activityScore = 0;
    activityScore += (tokens >= 3) ? 20 : 0;  // Basic trading
    activityScore += (holdTime >= 2) ? 15 : 0; // Not dumping
    activityScore += (protocols >= 1 || socials >= 1) ? 10 : 0; // Verification
    
    // Bonus points for exceptional behavior
    if (tokens >= 5) activityScore += 5; // Active trader
    if (holdTime >= 24) activityScore += 10; // Diamond hands
    if (protocols >= 2) activityScore += 5; // DeFi user
    if (socials >= 2) activityScore += 5; // Well verified
    
    // Age contributes to base score
    const ageScore = Math.min(40, age * 5); // Max 40 points from age
    
    return Math.min(100, ageScore + activityScore);
  };

  const getWalletClassification = (score) => {
    const { age, tokens, holdTime, protocols, socials } = walletScores;
    
    // Calculate activity score for classification
    let activityScore = 0;
    activityScore += (tokens >= 3) ? 20 : 0;  // Basic trading
    activityScore += (holdTime >= 2) ? 15 : 0; // Not dumping
    activityScore += (protocols >= 1 || socials >= 1) ? 10 : 0; // Verification
    
    // Detect bot patterns
    const hasInstantDumps = holdTime < 0.5; // Less than 30 minutes
    const hasNoActivity = tokens === 0 && protocols === 0;
    const isVeryNew = age < 0.1; // Less than 2.4 hours
    
    // Advanced classification system
    if (isVeryNew && hasNoActivity) {
      return { 
        level: '🔴 Likely Bot', 
        maxBuy: '0.01 ETH', 
        cooldown: '5 minutes',
        color: 'text-red-600',
        description: 'Fresh wallet with no history - high bot probability'
      };
    }
    
    if (age < 1 && hasInstantDumps && tokens > 0) {
      return { 
        level: '🟠 Suspicious Activity', 
        maxBuy: '0.03 ETH', 
        cooldown: '3 minutes',
        color: 'text-orange-600',
        description: 'New wallet with dump patterns detected'
      };
    }
    
    if (age < 1) {
      return { 
        level: '🟡 New User', 
        maxBuy: '0.05 ETH', 
        cooldown: '2 minutes',
        color: 'text-yellow-600',
        description: 'New wallet, needs time to build reputation'
      };
    }
    
    if (age >= 7 && activityScore >= 45 && holdTime >= 24 && tokens >= 10 && socials >= 1) {
      return { 
        level: '💎 VIP Trader', 
        maxBuy: '2.0 ETH', 
        cooldown: 'None',
        color: 'text-lime-500',
        description: 'Exceptional reputation with diamond hands + social verification'
      };
    }
    
    if (age >= 7 && activityScore >= 45) {
      return { 
        level: '✅ Trusted User', 
        maxBuy: '1.0 ETH', 
        cooldown: 'None',
        color: 'text-green-600',
        description: 'Proven legitimate trading patterns'
      };
    }
    
    if (age >= 3 && activityScore >= 25) {
      return { 
        level: '🔵 Developing Trust', 
        maxBuy: '0.3 ETH', 
        cooldown: '30 seconds',
        color: 'text-blue-600',
        description: 'Building reputation with good signals'
      };
    }
    
    return { 
      level: '🟡 Building Reputation', 
      maxBuy: '0.1 ETH', 
      cooldown: '1 minute',
      color: 'text-yellow-600',
      description: 'Early stage, continue trading to improve status'
    };
  };

  const triggerSweep = () => {
    const sweeps = [
      "🎲 GOLDEN HOUR ACTIVATED! All trades get 2x wallet points for the next hour!",
      "🚀 ROCKET LAUNCH DETECTED! This token just hit 25% in 30 minutes - no limits!",
      "💰 FEE VACATION! Platform hit daily goal - 0% fees for everyone for 2 hours!",
      "🎯 SNIPER SEASON! Bot swarm detected - hunt them down for bonus rewards!",
      "🌊 WHALE WATCH! Someone just bought 0.05 ETH - next 20 buyers share the fees!",
      "💎 DIAMOND RUSH! No sells for 1 hour - all holders earning diamond points!"
    ];
    
    const randomSweep = sweeps[Math.floor(Math.random() * sweeps.length)];
    setSweepResult(randomSweep);
    
    setTimeout(() => {
      setSweepResult("See what random event could trigger...");
    }, 3000);
  };

  const switchTab = (section, tabName) => {
    setActiveTab(prev => ({ ...prev, [section]: tabName }));
  };

  const updateWalletScore = (field, value) => {
    setWalletScores(prev => ({ ...prev, [field]: parseFloat(value) }));
  };

  const score = calculateScore();
  const classification = getWalletClassification(score);
  const socialBonus = walletScores.socials * 3; // 3 points per social connection

  return (
    <>
      <style>{fontStyles}</style>
      <div className="min-h-screen" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-8 sm:py-16 text-white rounded-3xl mb-8 px-4" style={{ background: 'linear-gradient(135deg, #2D2D2D 0%, #1A1A1A 100%)', border: '2px solid #C6F806' }}>
          <h1 className="text-3xl sm:text-5xl font-black mb-4" style={{ color: '#C6F806' }}>🚀 Pump Balz</h1>
          <p className="text-lg sm:text-xl mb-4 text-white font-medium">Fair Token Launches on BASE Through Mathematical Innovation</p>
          <p className="text-gray-300 text-sm sm:text-base font-medium">Solving the bonding curve problem with science, not hype</p>
        </section>

        {/* Understanding Bonding Curves Section */}
        <section className="rounded-3xl p-4 sm:p-8 mb-8 shadow-2xl hover-lift" style={{ backgroundColor: '#2D2D2D', border: '1px solid #404040' }}>
          <h2 className="text-3xl font-black mb-6" style={{ color: '#C6F806' }}>
            📚 Understanding Bonding Curves: The Complete Guide
          </h2>
          
          <p className="text-lg mb-6 text-gray-300 font-medium">
            Bonding curves revolutionized token launches by providing mathematical certainty instead of order book chaos. Here's everything you need to know.
          </p>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
              {[
                { key: 'basics', label: 'Basics for Everyone' },
                { key: 'technical', label: 'Technical Deep Dive' },
                { key: 'comparison', label: 'Platform Analysis' },
                { key: 'problems', label: 'Current Challenges' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => switchTab('curves', tab.key)}
                  className={`px-4 sm:px-6 py-3 rounded-full font-bold transition-all text-sm sm:text-base hover:scale-105 ${
                    activeTab.curves === tab.key
                      ? 'text-black animate-glow'
                      : 'text-white border-2 border-gray-600 hover:border-opacity-80'
                  }`}
                  style={{
                    backgroundColor: activeTab.curves === tab.key ? '#C6F806' : 'transparent',
                    borderColor: activeTab.curves === tab.key ? '#C6F806' : '#666666'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab.curves === 'basics' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">🎯 Bonding Curves Explained Simply</h3>
                
                <p className="text-lg text-gray-300 font-medium"><strong style={{ color: '#C6F806' }}>Think of it like surge pricing for tokens:</strong></p>
                
                <div className="border-2 border-dashed p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                  <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>The Uber Analogy:</h4>
                  <div className="space-y-1 mb-4 text-gray-300">
                    <p>🚗 Normal time: $10 ride</p>
                    <p>🚗 Busy hour: $15 ride</p>
                    <p>🚗 Concert night: $30 ride</p>
                    <p>🚗 New Year's Eve: $75 ride</p>
                  </div>
                  <p className="font-bold text-white">That's a bonding curve! Price increases with demand, following a mathematical formula.</p>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-3">Why Bonding Curves Revolutionized Token Launches:</h4>
                  <div className="space-y-2">
                    <p><span className="text-green-600 font-bold">✅ Always liquid</span> - No need to find buyers/sellers, the curve IS the market</p>
                    <p><span className="text-green-600 font-bold">✅ No order books</span> - Price set by math, not market makers</p>
                    <p><span className="text-green-600 font-bold">✅ Deterministic pricing</span> - Next price follows the formula exactly</p>
                    <p><span className="text-green-600 font-bold">✅ Permissionless</span> - Anyone can launch without gatekeepers</p>
                    <p><span className="text-green-600 font-bold">✅ Instant settlement</span> - Buy and sell immediately</p>
                  </div>
                </div>

                <div className="border-l-4 p-4 rounded-r-xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                  <p className="font-bold text-white">The Key Innovation:</p>
                  <p className="mt-2 text-gray-300">Before bonding curves, launching a token required creating liquidity pools, finding market makers, and hoping for organic trading. Now, the smart contract itself provides guaranteed liquidity at mathematically determined prices. It's DeFi's answer to the chicken-and-egg liquidity problem.</p>
                </div>
              </div>
            )}

            {activeTab.curves === 'technical' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">🔬 Technical Deep Dive</h3>
                
                <div className="p-6 rounded-2xl font-mono border" style={{ backgroundColor: '#0A0A0A', color: '#C6F806', borderColor: '#404040' }}>
                  <h4 className="text-white text-lg mb-4 font-bold">1. Linear Bonding Curve</h4>
                  <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: '#1A1A1A' }}>
                    <div>Price = m × Supply + b</div>
                    <div>Total Cost = ∫ P ds = (m × Supply²)/2 + b × Supply</div>
                    <div className="mt-2">Where: m = slope, b = initial price</div>
                  </div>
                  <p className="text-white"><strong>Pros:</strong> Simple, predictable, easy to calculate</p>
                  <p className="text-white"><strong>Cons:</strong> Too predictable (bots can game it), no excitement</p>
                </div>

                <div className="p-6 rounded-2xl font-mono border" style={{ backgroundColor: '#0A0A0A', color: '#C6F806', borderColor: '#404040' }}>
                  <h4 className="text-white text-lg mb-4 font-bold">2. Constant Product (AMM Standard)</h4>
                  <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: '#1A1A1A' }}>
                    <div>x × y = k</div>
                    <div>Price = ETH_reserves / Token_reserves</div>
                    <div className="mt-2">Creates hyperbolic curve (1/x behavior)</div>
                  </div>
                  <p className="text-white"><strong>Used by:</strong> Pump.fun, Uniswap, most successful platforms</p>
                </div>
              </div>
            )}

            {activeTab.curves === 'comparison' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">📊 Platform Analysis</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full rounded-2xl overflow-hidden shadow-md" style={{ backgroundColor: '#1A1A1A' }}>
                    <thead className="text-black font-bold" style={{ backgroundColor: '#C6F806' }}>
                      <tr>
                        <th className="p-4 text-left">Platform</th>
                        <th className="p-4 text-left">Curve Type</th>
                        <th className="p-4 text-left">Graduation</th>
                        <th className="p-4 text-left">Success Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">Pump.fun</td>
                        <td className="p-4 text-gray-300">Constant Product w/ Virtual Reserves</td>
                        <td className="p-4 text-gray-300">85 SOL</td>
                        <td className="p-4 text-gray-300">0.78%</td>
                      </tr>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">Meteora</td>
                        <td className="p-4 text-gray-300">16-segment custom</td>
                        <td className="p-4 text-gray-300">Configurable</td>
                        <td className="p-4 text-gray-300">~2%</td>
                      </tr>
                      <tr className="border-b" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                        <td className="p-4 font-bold" style={{ color: '#C6F806' }}>Pump Balz (Proposed)</td>
                        <td className="p-4 text-white">Constant Product AMM</td>
                        <td className="p-4 text-white">12 ETH</td>
                        <td className="p-4 text-white">Target: 2-3%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab.curves === 'problems' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">✨ The Innovation & The Challenge</h3>
                
                <div className="border-l-4 p-4 rounded-r-xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                  <p className="font-bold text-white">Bonding curves are a breakthrough innovation:</p>
                  <ul className="mt-2 space-y-1 text-gray-300">
                    <li>• Permissionless token launches - no gatekeepers</li>
                    <li>• Instant liquidity - no chicken-and-egg problem</li>
                    <li>• Mathematical fairness - price set by code, not manipulation</li>
                    <li>• Democratized access - anyone can participate</li>
                  </ul>
                </div>

                <div className="border-2 border-dashed p-6 rounded-2xl" style={{ backgroundColor: '#0A0A0A', borderColor: '#666666' }}>
                  <p className="mb-4 text-white font-medium">But this same openness created new problems:</p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• <strong style={{ color: '#C6F806' }}>Sniper bots</strong> grab 50%+ of supply in first seconds</li>
                    <li>• <strong style={{ color: '#C6F806' }}>Insider groups</strong> coordinate pumps and dumps</li>
                    <li>• <strong style={{ color: '#C6F806' }}>Fake social signals</strong> manipulate FOMO</li>
                    <li>• <strong style={{ color: '#C6F806' }}>Information asymmetry</strong> lets insiders win consistently</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Wallet Reputation Section */}
        <section className="rounded-3xl p-4 sm:p-8 mb-8 shadow-2xl hover-lift" style={{ backgroundColor: '#2D2D2D', border: '1px solid #404040' }}>
          <h2 className="text-3xl font-black mb-6" style={{ color: '#C6F806' }}>
            🔍 Why Wallet Reputation Is Everything
          </h2>

          <p className="text-lg mb-6 text-gray-300 font-medium">
            In crypto, your wallet IS your identity. Here's why tracking wallet behavior is the most powerful anti-bot and anti-rug mechanism possible.
          </p>

          {/* Wallet Tab Navigation */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
              {[
                { key: 'why', label: 'Why It Matters' },
                { key: 'age', label: 'Wallet Age' },
                { key: 'history', label: 'Trading History' },
                { key: 'scoring', label: 'Live Scoring Demo' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => switchTab('wallet', tab.key)}
                  className={`px-4 sm:px-6 py-3 rounded-full font-bold transition-all text-sm sm:text-base hover:scale-105 ${
                    activeTab.wallet === tab.key
                      ? 'text-black animate-glow'
                      : 'text-white border-2 border-gray-600 hover:border-opacity-80'
                  }`}
                  style={{
                    backgroundColor: activeTab.wallet === tab.key ? '#C6F806' : 'transparent',
                    borderColor: activeTab.wallet === tab.key ? '#C6F806' : '#666666'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab.wallet === 'why' && (
              <div className="space-y-6">
                <div className="border rounded-2xl p-6" style={{ backgroundColor: '#1A1A1A', borderColor: '#ff4444' }}>
                  <h4 className="text-lg font-bold mb-3" style={{ color: '#ff4444' }}>🤖 How Bots Operate:</h4>
                  <div className="space-y-1 text-gray-300">
                    <p>Create 100+ fresh wallets minutes before launch</p>
                    <p>Each wallet buys maximum allowed amount</p>
                    <p>Coordinate to own 50%+ of supply</p>
                    <p>Dump simultaneously for guaranteed profit</p>
                  </div>
                </div>

                <div className="border rounded-2xl p-6" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                  <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>👤 How Real Humans Trade:</h4>
                  <div className="space-y-1 text-gray-300">
                    <p>Continue using established wallets</p>
                    <p>Buy different amounts at different times</p>
                    <p>Hold some tokens, sell others</p>
                    <p>Connect social accounts for verification</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab.wallet === 'age' && (
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full rounded-2xl overflow-hidden shadow-md" style={{ backgroundColor: '#1A1A1A' }}>
                    <thead className="text-black font-bold" style={{ backgroundColor: '#C6F806' }}>
                      <tr>
                        <th className="p-4 text-left">Wallet Age</th>
                        <th className="p-4 text-left">Trust Level</th>
                        <th className="p-4 text-left">Restrictions</th>
                        <th className="p-4 text-left">Why</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 text-gray-300">&lt;1 hour</td>
                        <td className="p-4 text-gray-300">🔴 None</td>
                        <td className="p-4 text-gray-300">0.01 ETH max</td>
                        <td className="p-4 text-gray-300">99% bot probability</td>
                      </tr>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 text-gray-300">1-24 hours</td>
                        <td className="p-4 text-gray-300">🟡 Minimal</td>
                        <td className="p-4 text-gray-300">0.05 ETH max</td>
                        <td className="p-4 text-gray-300">Likely bot swarm</td>
                      </tr>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 text-white">7+ days</td>
                        <td className="p-4 text-white">✅ High</td>
                        <td className="p-4 text-white">No limits</td>
                        <td className="p-4 text-white">Established user</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab.wallet === 'history' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="border rounded-2xl p-6 hover-lift" style={{ backgroundColor: '#1A1A1A', borderColor: '#4A90E2' }}>
                    <h4 className="text-lg font-bold mb-3" style={{ color: '#4A90E2' }}>Token Diversity</h4>
                    <p className="text-sm mb-3 text-gray-300">How many different tokens have they traded?</p>
                    <div className="space-y-1 text-sm text-gray-400">
                      <p>1-5 tokens: 0 points</p>
                      <p>5-20 tokens: 50 points</p>
                      <p>20-50 tokens: 100 points</p>
                      <p>50+ tokens: 150 points</p>
                    </div>
                  </div>

                  <div className="border rounded-2xl p-6 hover-lift" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                    <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>Hold vs Dump Ratio</h4>
                    <p className="text-sm mb-3 text-gray-300">Do they diamond hand or paper hand?</p>
                    <div className="space-y-1 text-sm text-gray-400">
                      <p>Dumps &lt;1 hour: -50 points</p>
                      <p>Holds 1-24 hours: 25 points</p>
                      <p>Holds 1-7 days: 75 points</p>
                      <p>Holds 30+ days: 150 points</p>
                    </div>
                  </div>

                  <div className="border rounded-2xl p-6 hover-lift" style={{ backgroundColor: '#1A1A1A', borderColor: '#9B59B6' }}>
                    <h4 className="text-lg font-bold mb-3" style={{ color: '#9B59B6' }}>Average Hold Time</h4>
                    <p className="text-sm mb-3 text-gray-300">Better metric than graduation rate</p>
                    <div className="space-y-1 text-sm text-gray-400">
                      <p>&lt;10 minutes: Bot behavior</p>
                      <p>10 min - 1 hour: Scalper</p>
                      <p>1-24 hours: Day trader</p>
                      <p>24+ hours: Investor</p>
                    </div>
                  </div>

                  <div className="border rounded-2xl p-6 hover-lift" style={{ backgroundColor: '#1A1A1A', borderColor: '#FF9500' }}>
                    <h4 className="text-lg font-bold mb-3" style={{ color: '#FF9500' }}>Protocol Variety</h4>
                    <p className="text-sm mb-3 text-gray-300">Have they used other DeFi protocols?</p>
                    <div className="space-y-1 text-sm text-gray-400">
                      <p>Only memecoins: 0 points</p>
                      <p>Used Uniswap: +25 points</p>
                      <p>Used lending: +25 points</p>
                      <p>Bridged chains: +50 points</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab.wallet === 'scoring' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">🎮 Interactive Wallet Scoring Demo</h3>
                
                <div className="p-6 rounded-2xl border" style={{ backgroundColor: '#2D2D2D', borderColor: '#404040' }}>
                  <h4 className="text-lg font-bold mb-6 text-white">Build Your Wallet Score:</h4>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Wallet Age (days): <span className="font-bold" style={{ color: '#C6F806' }}>{walletScores.age}</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="14"
                        step="0.1"
                        value={walletScores.age}
                        onChange={(e) => updateWalletScore('age', e.target.value)}
                        className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #C6F806 0%, #C6F806 ${(walletScores.age / 14) * 100}%, #444444 ${(walletScores.age / 14) * 100}%, #444444 100%)`
                        }}
                      />
                      <div className="relative mt-1">
                        <span className="absolute text-xs text-gray-500" style={{left: '0%', transform: 'translateX(-50%)'}}>0h</span>
                        <span className="absolute text-xs text-gray-500" style={{left: '7.14%', transform: 'translateX(-50%)'}}>1d</span>
                        <span className="absolute text-xs text-gray-500" style={{left: '50%', transform: 'translateX(-50%)'}}>7d</span>
                        <span className="absolute text-xs text-gray-500" style={{left: '100%', transform: 'translateX(-50%)'}}>14d</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Tokens Traded: <span className="font-bold" style={{ color: '#C6F806' }}>{walletScores.tokens}</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={walletScores.tokens}
                        onChange={(e) => updateWalletScore('tokens', e.target.value)}
                        className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #C6F806 0%, #C6F806 ${(walletScores.tokens / 20) * 100}%, #444444 ${(walletScores.tokens / 20) * 100}%, #444444 100%)`
                        }}
                      />
                      <div className="relative mt-1">
                        <span className="absolute text-xs text-gray-500" style={{left: '0%', transform: 'translateX(-50%)'}}>0</span>
                        <span className="absolute text-xs text-gray-500" style={{left: '25%', transform: 'translateX(-50%)'}}>5</span>
                        <span className="absolute text-xs text-gray-500" style={{left: '50%', transform: 'translateX(-50%)'}}>10</span>
                        <span className="absolute text-xs text-gray-500" style={{left: '100%', transform: 'translateX(-50%)'}}>20</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Average Hold Time (hours): <span className="font-bold" style={{ color: '#C6F806' }}>{walletScores.holdTime}</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="48"
                        step="0.5"
                        value={walletScores.holdTime}
                        onChange={(e) => updateWalletScore('holdTime', e.target.value)}
                        className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #C6F806 0%, #C6F806 ${(walletScores.holdTime / 48) * 100}%, #444444 ${(walletScores.holdTime / 48) * 100}%, #444444 100%)`
                        }}
                      />
                      <div className="relative mt-1">
                        <span className="absolute text-xs text-gray-500" style={{left: '0%', transform: 'translateX(-50%)'}}>0h</span>
                        <span className="absolute text-xs text-gray-500" style={{left: '8.33%', transform: 'translateX(-50%)'}}>4h</span>
                        <span className="absolute text-xs text-gray-500" style={{left: '50%', transform: 'translateX(-50%)'}}>24h</span>
                        <span className="absolute text-xs text-gray-500" style={{left: '100%', transform: 'translateX(-50%)'}}>48h</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        DeFi Protocols Used: <span className="font-bold" style={{ color: '#C6F806' }}>{walletScores.protocols}</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        value={walletScores.protocols}
                        onChange={(e) => updateWalletScore('protocols', e.target.value)}
                        className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #C6F806 0%, #C6F806 ${(walletScores.protocols / 5) * 100}%, #444444 ${(walletScores.protocols / 5) * 100}%, #444444 100%)`
                        }}
                      />
                      <div className="relative mt-1">
                        <span className="absolute text-xs text-gray-500" style={{left: '0%', transform: 'translateX(-50%)'}}>0</span>
                        <span className="absolute text-xs text-gray-500" style={{left: '20%', transform: 'translateX(-50%)'}}>1</span>
                        <span className="absolute text-xs text-gray-500" style={{left: '60%', transform: 'translateX(-50%)'}}>3</span>
                        <span className="absolute text-xs text-gray-500" style={{left: '100%', transform: 'translateX(-50%)'}}>5+</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Verified Socials: <span className="font-bold" style={{ color: '#C6F806' }}>{walletScores.socials}</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="4"
                        value={walletScores.socials}
                        onChange={(e) => updateWalletScore('socials', e.target.value)}
                        className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #C6F806 0%, #C6F806 ${(walletScores.socials / 4) * 100}%, #444444 ${(walletScores.socials / 4) * 100}%, #444444 100%)`
                        }}
                      />
                      <div className="relative mt-1">
                        <span className="absolute text-xs text-gray-500" style={{left: '0%', transform: 'translateX(-50%)'}}>None</span>
                        <span className="absolute text-xs text-gray-500" style={{left: '25%', transform: 'translateX(-50%)'}}>Twitter</span>
                        <span className="absolute text-xs text-gray-500" style={{left: '50%', transform: 'translateX(-50%)'}}>Discord</span>
                        <span className="absolute text-xs text-gray-500" style={{left: '100%', transform: 'translateX(-50%)'}}>All</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 rounded-2xl border shadow-lg" style={{ backgroundColor: '#1A1A1A', borderColor: '#404040' }}>
                    <h4 className="text-lg font-bold mb-4 text-white">Your Wallet Classification:</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Classification:</span>
                        <span className={`font-bold text-lg ${classification.color}`}>{classification.level}</span>
                      </div>
                      <div className="p-3 rounded-xl text-sm border" style={{ backgroundColor: '#2D2D2D', borderColor: '#404040', color: '#C6F806' }}>
                        {classification.description}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Max Buy Per Trade:</span>
                        <span className="font-bold text-white">{classification.maxBuy}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Trade Cooldown:</span>
                        <span className="font-bold text-white">{classification.cooldown}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Social Verification Bonus:</span>
                        <span className="font-bold" style={{ color: '#C6F806' }}>{socialBonus > 0 ? `+${socialBonus} pts` : 'None'}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t" style={{ borderColor: '#404040' }}>
                        <span className="text-gray-300">Total Reputation Score:</span>
                        <span className="font-bold text-xl" style={{ color: '#C6F806' }}>{score}/100</span>
                      </div>
                      
                      {classification.level.includes('Likely Bot') && (
                        <div className="border rounded-xl p-3 mt-4" style={{ backgroundColor: '#1A1A1A', borderColor: '#ff4444' }}>
                          <p className="text-sm" style={{ color: '#ff4444' }}>
                            <strong>⚠️ Bot Detection:</strong> This wallet exhibits patterns consistent with automated trading. Severe restrictions apply.
                          </p>
                        </div>
                      )}
                      
                      {classification.level.includes('Suspicious') && (
                        <div className="border rounded-xl p-3 mt-4" style={{ backgroundColor: '#1A1A1A', borderColor: '#FF9500' }}>
                          <p className="text-sm" style={{ color: '#FF9500' }}>
                            <strong>🔍 Under Review:</strong> Some concerning patterns detected. Build positive trading history to improve status.
                          </p>
                        </div>
                      )}
                      
                      {classification.level.includes('New User') && (
                        <div className="border rounded-xl p-3 mt-4" style={{ backgroundColor: '#1A1A1A', borderColor: '#FFC107' }}>
                          <p className="text-sm" style={{ color: '#FFC107' }}>
                            <strong>👋 Welcome:</strong> New wallets start with restrictions. Trade legitimately to build reputation over time.
                          </p>
                        </div>
                      )}
                      
                      {classification.level.includes('Building') && (
                        <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
                          <p className="text-sm text-blue-800">
                            <strong>📈 Keep Going:</strong> You're building reputation! Trade more tokens, hold longer, and verify social accounts for better access.
                          </p>
                        </div>
                      )}
                      
                      {classification.level.includes('Developing Trust') && (
                        <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
                          <p className="text-sm text-blue-800">
                            <strong>🔄 Almost There:</strong> Good progress! Continue trading and holding to reach trusted status.
                          </p>
                        </div>
                      )}
                      
                      {classification.level.includes('Trusted User') && (
                        <div className="bg-green-50 border border-green-200 rounded p-3 mt-4">
                          <p className="text-sm text-green-800">
                            <strong>🎉 Trusted!</strong> Your wallet shows genuine trading activity and has full platform access.
                          </p>
                        </div>
                      )}
                      
                      {classification.level.includes('VIP Trader') && (
                        <div className="border rounded-xl p-3 mt-4" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                          <p className="text-sm text-gray-300">
                            <strong>💎 VIP Status!</strong> Exceptional reputation with diamond hand behavior. You get premium benefits and highest trading limits.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Pump Balz Bonding Curve Model Section */}
        <section className="rounded-3xl p-4 sm:p-8 mb-8 shadow-2xl hover-lift" style={{ backgroundColor: '#2D2D2D', border: '1px solid #404040' }}>
          <h2 className="text-3xl font-black mb-6" style={{ color: '#C6F806' }}>
            🎯 The Pump Balz Bonding Curve Model
          </h2>
          
          <p className="text-xl mb-6 text-gray-300 font-medium">
            Our revolutionary approach combines mathematical elegance with real-world practicality:
          </p>
          
          <div className="rounded-3xl p-6 mb-8" style={{ background: 'linear-gradient(135deg, #2D2D2D 0%, #1A1A1A 100%)', border: '2px solid #C6F806' }}>
            <h3 className="text-2xl font-bold text-center mb-8" style={{ color: '#C6F806' }}>The Three-Stage Journey</h3>
            
            {/* Mobile: Vertical Stack */}
            <div className="block lg:hidden space-y-4">
              <div className="bg-white bg-opacity-10 text-white text-center p-6 rounded-xl">
                <h4 className="text-lg font-bold">🌱 Stage 1: Discovery</h4>
                <p><strong>0-25% of curve</strong></p>
                <p>Fair distribution phase</p>
                <p>Bot protection active</p>
              </div>
              <div className="bg-white bg-opacity-20 text-white text-center p-6 rounded-xl">
                <h4 className="text-lg font-bold">🚀 Stage 2: Growth</h4>
                <p><strong>25-75% of curve</strong></p>
                <p>Momentum building</p>
                <p>Community forming</p>
              </div>
              <div className="text-center p-6 rounded-2xl border-2" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                <h4 className="text-lg font-bold">💎 Stage 3: Graduation</h4>
                <p><strong>75-100% of curve</strong></p>
                <p>Final push to DEX</p>
                <p>Maximum excitement</p>
              </div>
            </div>

            {/* Desktop: Horizontal Layout */}
            <div className="hidden lg:flex lg:items-center lg:justify-between my-10">
              <div className="bg-white bg-opacity-10 text-white flex-1 text-center p-6 rounded-xl mx-2">
                <h4 className="text-lg font-bold">🌱 Stage 1: Discovery</h4>
                <p><strong>0-25% of curve</strong></p>
                <p>Fair distribution phase</p>
                <p>Bot protection active</p>
              </div>
              <span className="text-white text-3xl mx-2">→</span>
              <div className="bg-white bg-opacity-20 text-white flex-1 text-center p-6 rounded-xl mx-2">
                <h4 className="text-lg font-bold">🚀 Stage 2: Growth</h4>
                <p><strong>25-75% of curve</strong></p>
                <p>Momentum building</p>
                <p>Community forming</p>
              </div>
              <span className="text-white text-3xl mx-2">→</span>
              <div className="flex-1 text-center p-6 rounded-2xl mx-2 border-2" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                <h4 className="text-lg font-bold">💎 Stage 3: Graduation</h4>
                <p><strong>75-100% of curve</strong></p>
                <p>Final push to DEX</p>
                <p>Maximum excitement</p>
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-black text-white mb-4">Key Innovation: WALLET REPUTATION GATING</h3>
          <div className="border-l-4 p-6 rounded-r-xl mb-6" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
            <ul className="space-y-2 text-gray-300">
              <li>• First buyer doesn't get "ground floor" if they're a bot</li>
              <li>• New wallets (&lt;7 days): 0.05 ETH max</li>
              <li>• Medium wallets (7-30 days): 0.2 ETH max</li>
              <li>• Established wallets (30+ days): 1 ETH max</li>
            </ul>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Each Stage Matters:</h3>
          
          {/* Mobile: Vertical Stack */}
          <div className="block lg:hidden space-y-6 mb-8">
            <div className="border-l-4 pl-6" style={{ borderColor: '#C6F806' }}>
              <h4 className="text-xl font-bold mb-3 text-gray-800">Stage 1: Discovery Phase</h4>
              <p className="font-semibold mb-3 text-gray-700">Goal: Fair distribution, bot prevention</p>
              <ul className="space-y-1 text-sm text-gray-600 mb-4">
                <li>• Wallet restrictions prevent bot swarms</li>
                <li>• Low prices reward real early believers</li>
                <li>• Gentle curve allows community formation</li>
                <li>• Virtual reserves prevent manipulation</li>
              </ul>
              <p className="font-semibold" style={{ color: '#C6F806' }}>Exit at: 3 ETH raised</p>
            </div>
            
            <div className="border-l-4 pl-6" style={{ borderColor: '#C6F806' }}>
              <h4 className="text-xl font-bold mb-3 text-gray-800">Stage 2: Growth Phase</h4>
              <p className="font-semibold mb-3 text-gray-700">Goal: Build momentum, establish value</p>
              <ul className="space-y-1 text-sm text-gray-600 mb-4">
                <li>• Constant product creates stability</li>
                <li>• Predictable appreciation builds confidence</li>
                <li>• Social momentum accelerates</li>
                <li>• Volume attracts attention</li>
              </ul>
              <p className="font-semibold" style={{ color: '#C6F806' }}>Exit at: 9 ETH raised</p>
            </div>
            
            <div className="border-l-4 pl-6" style={{ borderColor: '#C6F806' }}>
              <h4 className="text-xl font-bold mb-3 text-gray-800">Stage 3: Graduation Phase</h4>
              <p className="font-semibold mb-3 text-gray-700">Goal: Create urgency, reach threshold</p>
              <ul className="space-y-1 text-sm text-gray-600 mb-4">
                <li>• Natural exponential feel creates FOMO</li>
                <li>• Each buy significantly moves price</li>
                <li>• Race to graduation threshold</li>
                <li>• Maximum excitement and volume</li>
              </ul>
              <p className="font-semibold" style={{ color: '#C6F806' }}>Graduates at: 12 ETH raised</p>
            </div>
          </div>

          {/* Desktop: Horizontal Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-8">
            <div className="p-6 border-l-4" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
              <h4 className="text-xl font-bold mb-3 text-gray-800">Stage 1: Discovery Phase</h4>
              <p className="font-semibold mb-3 text-gray-700">Goal: Fair distribution, bot prevention</p>
              <ul className="space-y-1 text-sm text-gray-600 mb-4">
                <li>• Wallet restrictions prevent bot swarms</li>
                <li>• Low prices reward real early believers</li>
                <li>• Gentle curve allows community formation</li>
                <li>• Virtual reserves prevent manipulation</li>
              </ul>
              <p className="font-semibold" style={{ color: '#C6F806' }}>Exit at: 3 ETH raised</p>
            </div>
            
            <div className="p-6 border-l-4" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
              <h4 className="text-xl font-bold mb-3 text-gray-800">Stage 2: Growth Phase</h4>
              <p className="font-semibold mb-3 text-gray-700">Goal: Build momentum, establish value</p>
              <ul className="space-y-1 text-sm text-gray-600 mb-4">
                <li>• Constant product creates stability</li>
                <li>• Predictable appreciation builds confidence</li>
                <li>• Social momentum accelerates</li>
                <li>• Volume attracts attention</li>
              </ul>
              <p className="font-semibold" style={{ color: '#C6F806' }}>Exit at: 9 ETH raised</p>
            </div>
            
            <div className="p-6 border-l-4" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
              <h4 className="text-xl font-bold mb-3 text-gray-800">Stage 3: Graduation Phase</h4>
              <p className="font-semibold mb-3 text-gray-700">Goal: Create urgency, reach threshold</p>
              <ul className="space-y-1 text-sm text-gray-600 mb-4">
                <li>• Natural exponential feel creates FOMO</li>
                <li>• Each buy significantly moves price</li>
                <li>• Race to graduation threshold</li>
                <li>• Maximum excitement and volume</li>
              </ul>
              <p className="font-semibold" style={{ color: '#C6F806' }}>Graduates at: 12 ETH raised</p>
            </div>
          </div>
          
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded mb-6">
            <p><strong>The 12 ETH Sweet Spot:</strong> High enough to create real liquidity (creates ~$100k pool), low enough for BASE retail to achieve. We want tokens that graduate to SURVIVE, not pump and die in 24 hours like pump.fun's graduations.</p>
          </div>
          
          <div className="bg-green-100 border-l-4 border-green-500 p-6 rounded mb-6">
            <p className="font-semibold mb-2">Post-Graduation Distribution:</p>
            <ul className="space-y-1">
              <li>• 10 ETH + 200M tokens → Uniswap V3</li>
              <li>• 1 ETH → Platform operations</li>
              <li>• 0.5 ETH → Creator (30-day vest)</li>
              <li>• 0.5 ETH → Platform fee</li>
            </ul>
          </div>
          
          <p className="text-lg text-gray-700 italic">
            The curve naturally evolves through these "stages" without artificial transitions or complex math. One formula, natural progression, sustainable outcomes.
          </p>
        </section>

        {/* Sweep States Section */}
        <section className="rounded-3xl p-4 sm:p-8 mb-8 shadow-2xl hover-lift" style={{ backgroundColor: '#2D2D2D', border: '1px solid #404040' }}>
          <h2 className="text-3xl font-black mb-6" style={{ color: '#C6F806' }}>
            ⚡ Sweep States: Gamification That Works
          </h2>

          <p className="text-lg mb-6 text-gray-300 font-medium">
            Random events that create genuine excitement without breaking fairness:
          </p>

          <div 
            onClick={triggerSweep}
            className="border-2 rounded-3xl p-8 text-center cursor-pointer hover:shadow-2xl transition-all mb-8 hover:scale-105 animate-glow"
            style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">🎲 Click to Simulate a Sweep State!</h3>
            <p className={`text-lg font-medium ${sweepResult.includes('ACTIVATED') || sweepResult.includes('DETECTED') ? 'font-bold' : ''}`}
               style={{ color: sweepResult.includes('ACTIVATED') || sweepResult.includes('DETECTED') ? '#C6F806' : '#999999' }}
            >
              {sweepResult}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-3">⏰ Golden Hour (Daily)</h4>
              <p className="text-sm mb-2"><strong>Duration:</strong> 1 hour</p>
              <div className="bg-yellow-100 p-3 rounded text-sm">
                <p className="font-semibold">Effects:</p>
                <ul className="mt-1 space-y-1">
                  <li>• 2x wallet score points</li>
                  <li>• 50% off trading fees</li>
                  <li>• Golden Hour NFT badge</li>
                  <li>• Top buyer gets 100 BALZ tokens</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-3">🚀 Rocket Launch</h4>
              <p className="text-sm mb-2"><strong>Trigger:</strong> Token hits 25% in 30 minutes</p>
              <div className="bg-red-100 p-3 rounded text-sm">
                <p className="font-semibold">Effects:</p>
                <ul className="mt-1 space-y-1">
                  <li>• Homepage feature</li>
                  <li>• Push notifications</li>
                  <li>• No buy limits for high-score wallets</li>
                  <li>• Creator bonus rewards</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-3">💰 Fee Vacation</h4>
              <p className="text-sm mb-2"><strong>Duration:</strong> 2 hours</p>
              <div className="bg-green-100 p-3 rounded text-sm">
                <p className="font-semibold">Effects:</p>
                <ul className="mt-1 space-y-1">
                  <li>• 0% platform fees</li>
                  <li>• All fees go to liquidity</li>
                  <li>• Double referral rewards</li>
                  <li>• Free token creation</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 rounded-r-xl p-6" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
              <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>🎯 Sniper Season</h4>
              <p className="text-sm mb-2 text-gray-300"><strong className="text-white">Trigger:</strong> Bot swarm detected</p>
              <div className="p-3 rounded-xl text-sm" style={{ backgroundColor: '#0A0A0A' }}>
                <p className="font-semibold text-white">Effects:</p>
                <ul className="mt-1 space-y-1 text-gray-300">
                  <li>• Confiscated bot fees distributed</li>
                  <li>• "Bot Slayer" NFT</li>
                  <li>• +200 wallet score bonus</li>
                  <li>• Permanent fee discount</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 rounded-r-xl p-6" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
              <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>🌊 Whale Watch</h4>
              <p className="text-sm mb-2 text-gray-300"><strong className="text-white">Trigger:</strong> Buy &gt;0.05 ETH</p>
              <div className="p-3 rounded-xl text-sm" style={{ backgroundColor: '#0A0A0A' }}>
                <p className="font-semibold text-white">Effects:</p>
                <ul className="mt-1 space-y-1 text-gray-300">
                  <li>• Share 50% of whale's fees</li>
                  <li>• "Whale Rider" achievement</li>
                  <li>• Exclusive Discord access</li>
                  <li>• Priority in next launch</li>
                </ul>
              </div>
            </div>

            <div className="bg-pink-50 border-l-4 border-pink-400 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-3">💎 Diamond Rush</h4>
              <p className="text-sm mb-2"><strong>Trigger:</strong> No sells for 1 hour</p>
              <div className="bg-pink-100 p-3 rounded text-sm">
                <p className="font-semibold">Effects:</p>
                <ul className="mt-1 space-y-1">
                  <li>• 10 points/minute accumulation</li>
                  <li>• Points convert to platform tokens</li>
                  <li>• Diamond hand NFT tiers</li>
                  <li>• Governance voting power</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Anti-Rug Measures Section */}
        <section className="rounded-3xl p-4 sm:p-8 mb-8 shadow-2xl hover-lift" style={{ backgroundColor: '#2D2D2D', border: '1px solid #404040' }}>
          <h2 className="text-3xl font-black mb-6" style={{ color: '#C6F806' }}>
            🛡️ Security & Anti-Rug Measures
          </h2>
          
          <p className="text-lg mb-6 text-gray-300 font-medium">Real Protection, Not Security Theater</p>

          {/* Security Tab Navigation */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
              {[
                { key: 'smart', label: 'Smart Contract' },
                { key: 'mev', label: 'MEV Protection' },
                { key: 'rug', label: 'Rug Prevention' },
                { key: 'emergency', label: 'Emergency Systems' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => switchTab('security', tab.key)}
                  className={`px-4 sm:px-6 py-3 rounded-full font-bold transition-all text-sm sm:text-base hover:scale-105 ${
                    activeTab.security === tab.key
                      ? 'text-black animate-glow'
                      : 'text-white border-2 border-gray-600 hover:border-opacity-80'
                  }`}
                  style={{
                    backgroundColor: activeTab.security === tab.key ? '#C6F806' : 'transparent',
                    borderColor: activeTab.security === tab.key ? '#C6F806' : '#666666'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Security Tab Content */}
            {activeTab.security === 'smart' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">Smart Contract Security</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                    <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>What We Do:</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>✅ Immutable contracts (no upgrades)</p>
                      <p>✅ No admin keys or backdoors</p>
                      <p>✅ Open source on GitHub</p>
                      <p>✅ Verified on Basescan</p>
                      <p>✅ No mint functions</p>
                      <p>✅ Fixed supply only</p>
                    </div>
                  </div>
                  
                  <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#666666' }}>
                    <h4 className="text-lg font-bold mb-3 text-red-500">What We DON'T Do:</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>❌ No fake "audits" from unknown firms</p>
                      <p>❌ No "insurance fund" that never pays</p>
                      <p>❌ No proxy contracts that can change</p>
                      <p>❌ No team allocation or vesting</p>
                      <p>❌ No hidden fees or taxes</p>
                      <p>❌ No blacklist functions</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 p-6 rounded-r-xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                  <p className="text-gray-300"><strong className="text-white">The Truth:</strong> Most "audited" platforms aren't really audited. They pay $500 to some random firm for a PDF. We're open source - anyone can audit our code for free. That's real security.</p>
                </div>
              </div>
            )}

            {activeTab.security === 'mev' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">MEV (Bot) Protection</h3>
                
                <h4 className="text-xl font-bold mb-3" style={{ color: '#C6F806' }}>The MEV Problem Explained:</h4>
                
                <div className="p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A' }}>
                  <h5 className="font-bold mb-3 text-white">Sandwich Attack Example:</h5>
                  <ol className="space-y-1 list-decimal list-inside text-gray-300">
                    <li>You submit buy for 0.1 ETH</li>
                    <li>Bot sees your transaction in mempool</li>
                    <li>Bot buys 0.5 ETH before you (front-run)</li>
                    <li>Your buy executes at higher price</li>
                    <li>Bot sells immediately after (back-run)</li>
                    <li>Bot profits from your slippage</li>
                  </ol>
                </div>

                <h4 className="text-xl font-bold mb-3" style={{ color: '#C6F806' }}>Our Protection Layers:</h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full rounded-2xl overflow-hidden shadow-md" style={{ backgroundColor: '#1A1A1A' }}>
                    <thead className="text-black font-bold" style={{ backgroundColor: '#C6F806' }}>
                      <tr>
                        <th className="p-4 text-left">Protection</th>
                        <th className="p-4 text-left">How It Works</th>
                        <th className="p-4 text-left">Effectiveness</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">Base Private Mempool</td>
                        <td className="p-4 text-gray-300">Transactions invisible until included</td>
                        <td className="p-4 text-gray-300">90% reduction in MEV</td>
                      </tr>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">Max slippage 2%</td>
                        <td className="p-4 text-gray-300">Transactions revert if price moves >2%</td>
                        <td className="p-4 text-gray-300">Limits bot profits</td>
                      </tr>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">Wallet limits</td>
                        <td className="p-4 text-gray-300">Based on wallet age and history</td>
                        <td className="p-4 text-gray-300">Prevents domination</td>
                      </tr>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">Time delays</td>
                        <td className="p-4 text-gray-300">6 seconds between trades per wallet</td>
                        <td className="p-4 text-gray-300">Breaks bot coordination</td>
                      </tr>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">Wallet reputation</td>
                        <td className="p-4 text-gray-300">New wallets heavily restricted</td>
                        <td className="p-4 text-gray-300">Makes bot farms expensive</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab.security === 'rug' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">Rug Pull Prevention</h3>
                
                <h4 className="text-xl font-bold mb-3" style={{ color: '#C6F806' }}>How Rugs Usually Happen:</h4>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#666666' }}>
                    <h4 className="text-lg font-bold mb-3 text-red-500">Common Rug Methods:</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Remove liquidity (classic rug)</li>
                      <li>• Mint infinite tokens</li>
                      <li>• Blacklist buyers from selling</li>
                      <li>• Change tax to 100%</li>
                      <li>• Pause trading forever</li>
                      <li>• Hidden team allocation dump</li>
                    </ul>
                  </div>
                  
                  <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                    <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>How We Prevent Them:</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• LP burned forever on graduation</li>
                      <li>• No mint function exists</li>
                      <li>• No blacklist capability</li>
                      <li>• Fees hardcoded at 1%</li>
                      <li>• No pause function</li>
                      <li>• 100% fair launch, no team tokens</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-100 border-l-4 border-green-500 p-6 rounded">
                  <p><strong>The Graduation Lock:</strong> When a token graduates at 12 ETH, the liquidity is automatically sent to Uniswap V3 and the LP tokens are burned. Not locked for a year. Not sent to a multisig. BURNED. Forever. Impossible to rug.</p>
                </div>
              </div>
            )}

            {activeTab.security === 'emergency' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">Rate Limiting & Protection Systems</h3>
                
                <h4 className="text-xl font-bold mb-3" style={{ color: '#C6F806' }}>Automated Protection Mechanisms:</h4>
                
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#404040' }}>
                    <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>Bot Swarm Detection</h4>
                    <p className="text-sm mb-2 text-gray-300">Trigger: Multiple new wallets detected</p>
                    <p className="font-semibold mb-2 text-white">Action:</p>
                    <ul className="text-sm space-y-1 text-gray-300">
                      <li>• Increase cooldown to 30 seconds</li>
                      <li>• Limit new wallets to 0.01 ETH</li>
                      <li>• Alert community in Discord</li>
                      <li>• Flag token for review</li>
                    </ul>
                  </div>
                  
                  <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#404040' }}>
                    <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>Unusual Activity</h4>
                    <p className="text-sm mb-2 text-gray-300">Trigger: 10+ trades from same wallet</p>
                    <p className="font-semibold mb-2 text-white">Action:</p>
                    <ul className="text-sm space-y-1 text-gray-300">
                      <li>• Progressive cooldown increases</li>
                      <li>• Transaction size limits</li>
                      <li>• Wallet flagged in UI</li>
                      <li>• Community notification</li>
                    </ul>
                  </div>
                  
                  <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#404040' }}>
                    <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>Whale Protection</h4>
                    <p className="text-sm mb-2 text-gray-300">Trigger: Single wallet >5% of supply</p>
                    <p className="font-semibold mb-2 text-white">Action:</p>
                    <ul className="text-sm space-y-1 text-gray-300">
                      <li>• Cannot buy more</li>
                      <li>• Sell limits activated</li>
                      <li>• Must wait 24h between sells</li>
                      <li>• Visible whale badge</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 p-6 rounded-r-xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                  <p className="font-bold mb-2 text-white">What We Can't Protect Against:</p>
                  <p className="mb-4 text-gray-300">Token creator making false promises<br/>Community losing interest<br/>Market conditions changing<br/>Your own bad trading decisions</p>
                  <p className="text-white">We provide a fair platform, not financial advice!</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Real Talk Section */}
        <section className="rounded-3xl p-4 sm:p-8 mb-8 shadow-2xl hover-lift" style={{ backgroundColor: '#2D2D2D', border: '1px solid #404040' }}>
          <h2 className="text-3xl font-black mb-6" style={{ color: '#C6F806' }}>
            💡 Real Talk: Why This Works
          </h2>
          
          <h3 className="text-2xl font-black text-white mb-4">The Psychology of Token Trading</h3>
          
          <div className="border-2 p-6 rounded-2xl mb-8" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
            <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>Why People Really Buy Meme Tokens:</h4>
            <ul className="space-y-2 mb-6 text-gray-300">
              <li><strong className="text-white">FOMO:</strong> "What if this is the next 1000x?"</li>
              <li><strong className="text-white">Community:</strong> "I want to be part of something"</li>
              <li><strong className="text-white">Gambling:</strong> "It's fun and I might win big"</li>
              <li><strong className="text-white">Revenge Trading:</strong> "I'll make back my losses"</li>
              <li><strong className="text-white">Social Proof:</strong> "Everyone else is buying"</li>
            </ul>
            
            <p className="font-bold mb-2 text-white">Our Platform Leverages All of These:</p>
            <div className="space-y-1 text-sm text-gray-300">
              <p>✅ Natural curve progression creates FOMO</p>
              <p>✅ Wallet scoring builds community identity</p>
              <p>✅ Low entry ($0.00003) accessible to everyone</p>
              <p>✅ Success badges reward winners visibly</p>
              <p>✅ Social connections add peer pressure</p>
            </div>
          </div>

          <h3 className="text-2xl font-black text-white mb-4">Why Wallet Scoring Is The Secret Sauce</h3>
          
          <div className="p-6 rounded-2xl mb-8" style={{ backgroundColor: '#1A1A1A' }}>
            <h4 className="text-lg font-bold mb-4" style={{ color: '#C6F806' }}>A Day in the Life of Two Traders:</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-bold mb-3 text-white">🤖 Bot Farm (Score: 0)</p>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Creates 100 wallets at token launch</li>
                  <li>• Each limited to 0.05 ETH max buy</li>
                  <li>• 6-second cooldowns compound across trades</li>
                  <li>• Can't reach meaningful position</li>
                  <li>• Marked publicly as "New Wallet Army"</li>
                  <li>• Result: Gives up, not profitable</li>
                </ul>
              </div>
              
              <div>
                <p className="font-bold mb-3 text-white">💎 Real Trader (Score: 750)</p>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Uses established wallet with history</li>
                  <li>• Can buy up to 1 ETH per transaction</li>
                  <li>• Minimal cooldowns</li>
                  <li>• Recognized as trusted trader</li>
                  <li>• Has "OG" badge that builds trust</li>
                  <li>• Result: Makes money, stays loyal</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-100 border-l-4 border-green-500 p-6 rounded">
            <p><strong>The Network Effect:</strong> As more real traders join and build scores, bots become less profitable. As bots leave, tokens perform better. As tokens perform better, more real traders join. It's a virtuous cycle that NO other platform has achieved.</p>
          </div>
        </section>

        {/* Creator Tools Section */}
        <section className="rounded-3xl p-4 sm:p-8 mb-8 shadow-2xl hover-lift" style={{ backgroundColor: '#2D2D2D', border: '1px solid #404040' }}>
          <h2 className="text-3xl font-black mb-6" style={{ color: '#C6F806' }}>
            🎮 Creator Tools & Analytics
          </h2>
          
          <h3 className="text-2xl font-black text-white mb-6">What Token Creators Get:</h3>

          {/* Creator Tab Navigation */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
              {[
                { key: 'dashboard', label: 'Creator Dashboard' },
                { key: 'marketing', label: 'Marketing Tools' },
                { key: 'rewards', label: 'Reward Structure' },
                { key: 'tips', label: 'Success Tips' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => switchTab('creator', tab.key)}
                  className={`px-4 sm:px-6 py-3 rounded-full font-bold transition-all text-sm sm:text-base hover:scale-105 ${
                    activeTab.creator === tab.key
                      ? 'text-black animate-glow'
                      : 'text-white border-2 border-gray-600 hover:border-opacity-80'
                  }`}
                  style={{
                    backgroundColor: activeTab.creator === tab.key ? '#C6F806' : 'transparent',
                    borderColor: activeTab.creator === tab.key ? '#C6F806' : '#666666'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Creator Tab Content */}
            {activeTab.creator === 'dashboard' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">Real-Time Analytics Dashboard</h3>
                
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#404040' }}>
                    <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>Buyer Analytics</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Wallet score distribution</li>
                      <li>• New vs returning buyers</li>
                      <li>• Average hold time</li>
                      <li>• Bot detection alerts</li>
                      <li>• Holder concentration</li>
                    </ul>
                  </div>
                  
                  <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#404040' }}>
                    <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>Price Metrics</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Current position on curve</li>
                      <li>• Distance to graduation</li>
                      <li>• Price impact calculator</li>
                      <li>• Volume trends</li>
                      <li>• Liquidity depth</li>
                    </ul>
                  </div>
                  
                  <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#404040' }}>
                    <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>Social Metrics</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Twitter mentions</li>
                      <li>• Discord activity</li>
                      <li>• Telegram growth</li>
                      <li>• Community engagement</li>
                      <li>• Sentiment analysis</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 p-6 rounded-r-xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                  <p className="text-gray-300"><strong className="text-white">Exclusive Data:</strong> Creators see wallet scores of their buyers (anonymized). This lets them identify if bots are attacking or if real users are buying. No other platform provides this intelligence.</p>
                </div>
              </div>
            )}

            {activeTab.creator === 'marketing' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800">Built-In Marketing Tools</h3>
                
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold mb-3">One-Click Campaigns</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Twitter thread generator</li>
                      <li>• Discord announcement templates</li>
                      <li>• Telegram bot integration</li>
                      <li>• Reddit post formatter</li>
                      <li>• Social media graphics</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold mb-3">Referral System</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Custom referral links</li>
                      <li>• Track conversions</li>
                      <li>• Automatic rewards distribution</li>
                      <li>• Leaderboard for top referrers</li>
                      <li>• Special badges for referrers</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold mb-3">Media Kit</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Logo variations</li>
                      <li>• Banner templates</li>
                      <li>• Chart screenshots</li>
                      <li>• Promotional materials</li>
                      <li>• Brand guidelines</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab.creator === 'rewards' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800">Creator Reward Structure</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full rounded-2xl overflow-hidden shadow-md" style={{ backgroundColor: '#1A1A1A' }}>
                    <thead className="text-black font-bold" style={{ backgroundColor: '#C6F806' }}>
                      <tr>
                        <th className="p-4 text-left">Milestone</th>
                        <th className="p-4 text-left">Reward</th>
                        <th className="p-4 text-left">Requirements</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">Token Launch</td>
                        <td className="p-4">Dashboard access</td>
                        <td className="p-4">Pay 0.01 ETH fee</td>
                      </tr>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">First 10 Buyers</td>
                        <td className="p-4">Featured placement</td>
                        <td className="p-4">Real wallets (score >250)</td>
                      </tr>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">25% Completion</td>
                        <td className="p-4">Homepage feature for 1 hour</td>
                        <td className="p-4">3 ETH raised</td>
                      </tr>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">50% Completion</td>
                        <td className="p-4">Special badge + promotion</td>
                        <td className="p-4">6 ETH raised</td>
                      </tr>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">Graduation</td>
                        <td className="p-4">0.5 ETH reward</td>
                        <td className="p-4">Reach 12 ETH raised</td>
                      </tr>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">Post-Graduation</td>
                        <td className="p-4">Creator NFT + recognition</td>
                        <td className="p-4">Maintain active community</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-green-100 border-l-4 border-green-500 p-6 rounded">
                  <p><strong>Sustainable Rewards:</strong> Creators receive 0.5 ETH from the 12 ETH graduation pool. This aligns incentives - creators only win when their token succeeds.</p>
                </div>
              </div>
            )}

            {activeTab.creator === 'tips' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800">Tips for Successful Launches</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold mb-3 text-green-800">✅ DO's for Success:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Build community BEFORE launch</strong> - Have 50+ people ready</li>
                      <li><strong>Verify your identity</strong> - Even just Twitter adds trust</li>
                      <li><strong>Launch at optimal times</strong> - Check activity metrics</li>
                      <li><strong>Create a narrative</strong> - Why should people care?</li>
                      <li><strong>Engage constantly</strong> - Reply to every comment</li>
                      <li><strong>Track your metrics</strong> - Use the dashboard</li>
                      <li><strong>Reward holders</strong> - Build loyalty</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold mb-3 text-red-800">❌ DON'Ts (Instant Death):</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Don't use bot buyers</strong> - We detect and punish</li>
                      <li><strong>Don't make false promises</strong> - Community remembers</li>
                      <li><strong>Don't disappear after launch</strong> - Stay engaged</li>
                      <li><strong>Don't dump on your holders</strong> - Reputation system remembers</li>
                      <li><strong>Don't copy other tokens exactly</strong> - Be original</li>
                      <li><strong>Don't launch without a plan</strong> - Know your next steps</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Financial Projections */}
        <section className="rounded-3xl p-4 sm:p-8 mb-8 shadow-2xl hover-lift" style={{ backgroundColor: '#2D2D2D', border: '1px solid #404040' }}>
          <h2 className="text-3xl font-black mb-6" style={{ color: '#C6F806' }}>
            📈 The Numbers That Matter
          </h2>

          <h3 className="text-xl font-bold mb-4 text-white">Financial Projections (Realistic)</h3>

          <div className="overflow-x-auto">
            <table className="w-full rounded-2xl overflow-hidden shadow-md" style={{ backgroundColor: '#1A1A1A' }}>
              <thead className="text-black font-bold" style={{ backgroundColor: '#C6F806' }}>
                <tr>
                  <th className="p-4 text-left">Metric</th>
                  <th className="p-4 text-left">Month 1</th>
                  <th className="p-4 text-left">Month 2</th>
                  <th className="p-4 text-left">Month 3</th>
                  <th className="p-4 text-left">Month 6</th>
                  <th className="p-4 text-left">Year 1</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                  <td className="p-4 font-bold text-white">Daily Active Users</td>
                  <td className="p-4 text-gray-300">50</td>
                  <td className="p-4 text-gray-300">150</td>
                  <td className="p-4 text-gray-300">500</td>
                  <td className="p-4 text-gray-300">2,000</td>
                  <td className="p-4 text-gray-300">5,000</td>
                </tr>
                <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                  <td className="p-4 font-bold text-white">Tokens Launched Daily</td>
                  <td className="p-4 text-gray-300">5</td>
                  <td className="p-4 text-gray-300">12</td>
                  <td className="p-4 text-gray-300">25</td>
                  <td className="p-4 text-gray-300">50</td>
                  <td className="p-4 text-gray-300">100</td>
                </tr>
                <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                  <td className="p-4 font-bold text-white">Graduation Rate</td>
                  <td className="p-4 text-gray-300">0.5%</td>
                  <td className="p-4 text-gray-300">0.8%</td>
                  <td className="p-4 text-gray-300">1%</td>
                  <td className="p-4 text-gray-300">1.5%</td>
                  <td className="p-4 text-gray-300">2%</td>
                </tr>
                <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                  <td className="p-4 font-bold text-white">Daily Volume</td>
                  <td className="p-4 text-gray-300">2 ETH</td>
                  <td className="p-4 text-gray-300">8 ETH</td>
                  <td className="p-4 text-gray-300">25 ETH</td>
                  <td className="p-4 text-gray-300">100 ETH</td>
                  <td className="p-4 text-gray-300">250 ETH</td>
                </tr>
                <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                  <td className="p-4 font-bold text-white">Platform Fees</td>
                  <td className="p-4 text-gray-300">0.1 ETH</td>
                  <td className="p-4 text-gray-300">0.4 ETH</td>
                  <td className="p-4 text-gray-300">1.25 ETH</td>
                  <td className="p-4 text-gray-300">5 ETH</td>
                  <td className="p-4 text-gray-300">12.5 ETH</td>
                </tr>
                <tr style={{ backgroundColor: '#1A1A1A' }}>
                  <td className="p-4 font-bold" style={{ color: '#C6F806' }}>Monthly Revenue (@$4250/ETH)</td>
                  <td className="p-4 font-bold" style={{ color: '#C6F806' }}>$12,750</td>
                  <td className="p-4 font-bold" style={{ color: '#C6F806' }}>$51,000</td>
                  <td className="p-4 font-bold" style={{ color: '#C6F806' }}>$159,375</td>
                  <td className="p-4 font-bold" style={{ color: '#C6F806' }}>$637,500</td>
                  <td className="p-4 font-bold" style={{ color: '#C6F806' }}>$1,593,750</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-l-4 p-4 rounded-r-xl mt-6" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
            <p className="font-semibold text-white">Why These Numbers Are Realistic:</p>
            <ul className="mt-2 space-y-1 text-gray-300">
              <li>• BASE has 25M+ monthly active users (we need 0.2% of their monthly users)</li>
              <li>• Average pump.fun clone hits 1,000 DAU in month 2</li>
              <li>• Conservative compared to pump.fun's $100M+ revenue</li>
              <li>• Accounts for bear market conditions and competition</li>
            </ul>
          </div>
        </section>

        {/* NEW SECTION: Why BASE Is Superior to Solana */}
        <section className="rounded-3xl p-4 sm:p-8 mb-8 shadow-2xl hover-lift" style={{ backgroundColor: '#2D2D2D', border: '1px solid #404040' }}>
          <h2 className="text-3xl font-black mb-6" style={{ color: '#C6F806' }}>
            ⚡ Why BASE Is Superior for Fair Token Launches
          </h2>

          <p className="text-lg mb-6 text-gray-300 font-medium">
            The data reveals how Solana's architecture systematically extracts value from users through MEV, while BASE's design provides actual protection.
          </p>

          {/* Blockchain Comparison Tab Navigation */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
              {[
                { key: 'reality', label: 'The Jito Cartel' },
                { key: 'mev', label: 'MEV Extraction Reality' },
                { key: 'architecture', label: 'Architecture Truth' },
                { key: 'fairness', label: 'Transaction Ordering' },
                { key: 'security', label: 'Security Analysis' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => switchTab('blockchain', tab.key)}
                  className={`px-4 sm:px-6 py-3 rounded-full font-bold transition-all text-sm sm:text-base hover:scale-105 ${
                    activeTab.blockchain === tab.key
                      ? 'text-black animate-glow'
                      : 'text-white border-2 border-gray-600 hover:border-opacity-80'
                  }`}
                  style={{
                    backgroundColor: activeTab.blockchain === tab.key ? '#C6F806' : 'transparent',
                    borderColor: activeTab.blockchain === tab.key ? '#C6F806' : '#666666'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Blockchain Tab Content */}
            {activeTab.blockchain === 'reality' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">🔴 The Jito Bundle Cartel: How Solana Became Pay-to-Win</h3>
                
                <div className="border-l-4 p-6 rounded-r-xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                  <h4 className="text-lg font-bold mb-3 text-white">The Problem in Simple Terms</h4>
                  <p className="mb-3 text-gray-300"><strong className="text-white">When you try to buy a token on Solana, you're not getting a fair shot.</strong></p>
                  <p className="mb-3 text-gray-300">92% of Solana's validators (the computers that process transactions) are running special software called Jito that lets bots pay to cut in line ahead of you. These bots can see your transaction before it happens, buy the token first to pump the price, then sell after you buy at the inflated price. They profit, you lose, and the validators get paid for helping them do it.</p>
                  <p className="text-gray-300"><strong className="text-white">This happens on almost every single trade. Let's break down exactly how this scam works.</strong></p>
                </div>

                <div className="p-8 rounded-2xl text-center border-2" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                  <div className="text-lg text-gray-300">Validators Using Jito</div>
                  <div className="text-4xl sm:text-5xl font-bold my-4" style={{ color: '#C6F806' }}>92%</div>
                  <div className="text-lg text-gray-300">Creating systematic extraction</div>
                </div>

                <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#666666' }}>
                  <h4 className="text-lg font-bold mb-3 text-red-500">What is Jito and Why It's Destroying Fairness</h4>
                  <p className="mb-3 text-gray-300">Jito is modified Solana software that turns the blockchain into a pay-to-win system:</p>
                  <p className="mb-3 text-gray-300"><strong className="text-white">92% of Solana validators use this software</strong> (that's 373.8 million SOL worth of voting power). Here's what it does:</p>
                  <ul className="space-y-2 mb-3 text-gray-300">
                    <li><strong className="text-white">Bundle Auctions:</strong> Instead of processing transactions fairly, validators auction off the right to go first. Bots pay big tips to cut in line.</li>
                    <li><strong className="text-white">Pay-to-Win:</strong> If you pay $0.001 in fees but a bot pays $5, the bot ALWAYS goes first, even if you submitted your transaction earlier</li>
                    <li><strong className="text-white">Leader Schedule Exploitation:</strong> Solana publishes who will process transactions and when, so bots know exactly which validators to bribe</li>
                    <li><strong className="text-white">Guaranteed Extraction:</strong> Bots can see your trade coming and sandwich it every time: buying before you (price goes up) and selling after (they profit, you lose)</li>
                  </ul>
                  <p className="font-bold text-red-500">This isn't a bug, it's the system working as designed. Validators earn extra from these bribes, so they're incentivized to use Jito and screw over regular users.</p>
                </div>

                <h4 className="text-xl font-bold text-gray-800 mt-8">The Leader Schedule Problem (Why This Gets Even Worse)</h4>
                
                <div className="bg-red-100 border-l-4 border-red-500 p-6 rounded">
                  <h4 className="text-lg font-bold mb-3">Solana's Fatal Flaw: They Tell Everyone Who's in Charge When</h4>
                  <p className="mb-3">Here's the killer problem: Solana publishes its "leader schedule" in advance. In simple terms:</p>
                  <p className="mb-3"><strong>It's like a casino announcing which dealer will be at which table at what time, and those dealers can accept bribes to help certain players win.</strong></p>
                  <ul className="space-y-1 mb-3">
                    <li>Everyone knows which validator (processor) will handle transactions and when</li>
                    <li>Bots can prepare their attacks in advance, they know exactly who to bribe</li>
                    <li>Validators can coordinate with bot operators: "I'm up at 3pm, get ready"</li>
                    <li>Your transaction is visible to the upcoming validator before they process it</li>
                  </ul>
                  <p className="font-bold">Result: Every trade you make is like showing your poker hand before betting. You're guaranteed to lose.</p>
                </div>

                <div className="p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A' }}>
                  <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>Real MEV Extraction Example (December 2024)</h4>
                  <p className="mb-3 text-gray-300"><strong className="text-white">This isn't theory, here's what actually happened:</strong></p>
                  <p className="text-gray-300">The "arsc" validator (also called DeezNode), just ONE validator:</p>
                  <ul className="space-y-1 mb-3 text-gray-300">
                    <li>Generated <strong className="text-white">65,880 SOL ($13.43 MILLION)</strong> in just 30 days</li>
                    <li>How? By sandwich attacking regular users' trades</li>
                    <li>They knew exactly when they'd be processing transactions (leader schedule)</li>
                    <li>They used Jito to guarantee their bot orders went first</li>
                  </ul>
                  <p className="font-bold text-red-600">Remember: This is just ONE validator out of hundreds doing this. The total extraction is massive.</p>
                </div>

                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded">
                  <h4 className="text-lg font-bold mb-3">What This Means in Plain English</h4>
                  <p>When you try to buy a token on Solana:</p>
                  <ol className="space-y-1 mb-3 list-decimal list-inside">
                    <li>Your transaction goes to a validator who's using Jito (92% chance)</li>
                    <li>That validator shows your transaction to bots before processing it</li>
                    <li>Bots pay the validator a bribe to go before and after you</li>
                    <li>Bot buys first → price goes up → you buy at higher price → bot sells → bot profits</li>
                    <li>You lose money, bot makes money, validator gets a cut</li>
                  </ol>
                  <p className="font-bold">You're not competing with other traders, you're competing with a cartel that has already rigged the game against you.</p>
                </div>
              </div>
            )}

            {activeTab.blockchain === 'mev' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">💸 MEV Extraction: The Real Numbers</h3>
                
                <div className="p-8 rounded-2xl text-center border-2" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                  <div className="text-lg text-gray-300">Daily MEV Extraction on Solana</div>
                  <div className="text-4xl sm:text-5xl font-bold my-4" style={{ color: '#C6F806' }}>$4.7-10M</div>
                  <div className="text-lg text-gray-300">Taken directly from users like you</div>
                </div>

                <h4 className="text-xl font-bold text-white">How MEV Works on Each Chain</h4>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#666666' }}>
                    <h4 className="text-lg font-bold mb-3 text-red-500">Solana's MEV Paradise</h4>
                    <p className="mb-3 text-gray-300"><strong className="text-white">The "No Mempool" Lie</strong></p>
                    <p className="mb-2 text-gray-300">Solana claims "no mempool" protects you, but actually:</p>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Transactions go directly to known leaders</li>
                      <li>• Leaders can reorder at will for profit</li>
                      <li>• Jito bundles create a shadow auction</li>
                      <li>• Gulf Stream makes extraction WORSE</li>
                    </ul>
                  </div>
                  <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                    <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>BASE's Real Protection</h4>
                    <p className="mb-3 text-gray-300"><strong className="text-white">Private Mempool That Works</strong></p>
                    <p className="mb-2 text-gray-300">BASE actually protects users with:</p>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Transactions hidden until confirmed</li>
                      <li>• No visibility for sandwich attacks</li>
                      <li>• Sequencer prevents reordering</li>
                      <li>• Ethereum security inheritance</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A' }}>
                  <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>What is a Sandwich Attack?</h4>
                  <p className="mb-3 text-gray-300">The most common MEV attack happening thousands of times daily on Solana:</p>
                  <ol className="space-y-1 mb-3 list-decimal list-inside text-gray-300">
                    <li>You submit a buy order for a token</li>
                    <li>MEV bot sees your transaction (via Jito or leader visibility)</li>
                    <li>Bot places a buy order BEFORE yours (front-run)</li>
                    <li>Your order executes at a higher price</li>
                    <li>Bot immediately sells AFTER your order (back-run)</li>
                    <li>Bot profits, you lose money</li>
                  </ol>
                  <p className="text-gray-300"><strong className="text-white">On Solana:</strong> Guaranteed to happen via Jito bundles</p>
                  <p className="text-gray-300"><strong className="text-white">On BASE:</strong> Private mempool makes this nearly impossible</p>
                </div>
              </div>
            )}

            {activeTab.blockchain === 'architecture' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">🏗️ Architectural Truth: Why Solana Enables Extraction</h3>
                
                <h4 className="text-xl font-bold text-white">The Gulf Stream Lie</h4>

                <div className="border-l-4 p-6 rounded-r-xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                  <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>Solana's "No Mempool" Doesn't Eliminate MEV</h4>
                  <p className="mb-3 text-gray-300">Solana markets Gulf Stream as eliminating MEV, but it actually makes things WORSE:</p>
                  <ul className="space-y-1 text-gray-300">
                    <li><strong className="text-white">Direct to Leader:</strong> Transactions go straight to block producers</li>
                    <li><strong className="text-white">Leader Discretion:</strong> Leaders order transactions however they want</li>
                    <li><strong className="text-white">No Transparency:</strong> You can't see other pending transactions</li>
                    <li><strong className="text-white">But Leaders Can:</strong> They see everything and reorder for profit</li>
                  </ul>
                </div>

                <h4 className="text-xl font-bold text-white mt-6">Transaction Success Reality</h4>

                <div className="overflow-x-auto">
                  <table className="w-full rounded-2xl overflow-hidden shadow-md" style={{ backgroundColor: '#1A1A1A' }}>
                    <thead className="text-black font-bold" style={{ backgroundColor: '#C6F806' }}>
                      <tr>
                        <th className="p-4 text-left">Metric</th>
                        <th className="p-4 text-left">Solana Reality</th>
                        <th className="p-4 text-left">BASE Reality</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">Normal Success Rate</td>
                        <td className="p-4 bg-red-50">75-80%</td>
                        <td className="p-4 bg-green-50">77-80%</td>
                      </tr>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">During Token Launches</td>
                        <td className="p-4 bg-red-50">33-54%</td>
                        <td className="p-4 bg-green-50">~75%</td>
                      </tr>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">Network Stability</td>
                        <td className="p-4 bg-red-50">Major outage Feb 2024 (5 hours)</td>
                        <td className="p-4 bg-green-50">Minor issues only</td>
                      </tr>
                      <tr className="border-b hover:opacity-80" style={{ borderColor: '#404040' }}>
                        <td className="p-4 font-bold text-white">Actual Uptime</td>
                        <td className="p-4 bg-red-50">99.94%</td>
                        <td className="p-4 bg-green-50">99.9%+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border-l-4 p-6 rounded-r-xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                  <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>The Capacity Waste Problem</h4>
                  <p className="mb-2 text-gray-300"><strong className="text-white">43% of Solana's capacity is wasted on failed transactions</strong></p>
                  <p className="text-gray-300">This isn't just inconvenient, it's expensive. Users pay for failed transactions, and during congestion, you might need 2-3 attempts to get through, each costing fees.</p>
                </div>
              </div>
            )}

            {activeTab.blockchain === 'fairness' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">⚖️ Transaction Ordering: The Core of Unfairness</h3>

                <h4 className="text-xl font-bold text-white">How Transactions Are Actually Ordered</h4>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#666666' }}>
                    <h4 className="text-lg font-bold mb-3 text-red-500">Solana: Highest Bidder Wins</h4>
                    <p className="mb-3 text-gray-300"><strong className="text-white">Via Jito Bundle Auctions:</strong></p>
                    <ul className="space-y-1 mb-3 text-gray-300">
                      <li>• Bots submit bundles with tips</li>
                      <li>• Highest tip gets first execution</li>
                      <li>• Your transaction waits behind</li>
                      <li>• Price moves against you</li>
                    </ul>
                    <p className="font-bold text-red-500">This is literally pay-to-win.</p>
                  </div>
                  <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                    <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>BASE: Fair Transaction Ordering</h4>
                    <p className="mb-3 text-gray-300"><strong className="text-white">Via Private Sequencer:</strong></p>
                    <ul className="space-y-1 mb-3 text-gray-300">
                      <li>• Centralized but transparent ordering</li>
                      <li>• No visibility means no front-running</li>
                      <li>• Transactions processed fairly</li>
                      <li>• Limited priority fees, no auction system</li>
                    </ul>
                    <p className="font-bold" style={{ color: '#C6F806' }}>Simple, transparent, and fair.</p>
                  </div>
                </div>

                <div className="p-8 rounded-2xl text-center my-8 border-2" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                  <div className="text-lg text-gray-300">Reality Check</div>
                  <div className="text-4xl sm:text-5xl font-bold my-4" style={{ color: '#C6F806' }}>99.6%</div>
                  <div className="text-lg text-gray-300">of Pump.fun traders lose money or make less than $10k</div>
                </div>

                <div className="p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A' }}>
                  <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>Real World Impact: Token Launch Scenario</h4>
                  <p className="mb-3 text-gray-300"><strong className="text-white">You want to buy a new token at launch:</strong></p>
                  
                  <p className="mb-2 font-semibold text-white">On Solana:</p>
                  <ol className="space-y-1 mb-4 list-decimal list-inside ml-4 text-gray-300">
                    <li>You submit transaction with $0.001 fee</li>
                    <li>Bot submits Jito bundle with $5 tip</li>
                    <li>Bot buys massive amount first</li>
                    <li>Price pumps 50%</li>
                    <li>Your transaction executes at inflated price</li>
                    <li>Bot dumps immediately after</li>
                    <li>You're down 30% instantly</li>
                  </ol>
                  
                  <p className="mb-2 font-semibold text-white">On BASE:</p>
                  <ol className="space-y-1 list-decimal list-inside ml-4 text-gray-300">
                    <li>You submit transaction</li>
                    <li>Nobody can see it (private mempool)</li>
                    <li>Executes at fair market price</li>
                    <li>Natural price discovery occurs</li>
                  </ol>
                </div>
              </div>
            )}

            {activeTab.blockchain === 'security' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white">🛡️ Security & Reliability Analysis</h3>

                <h4 className="text-xl font-bold text-white">Economic Security Comparison</h4>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                    <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>BASE Security Model</h4>
                    <p className="mb-3 text-gray-300"><strong className="text-white">Inherited from Ethereum:</strong></p>
                    <ul className="space-y-1 text-gray-300">
                      <li>• ~$84.8 billion in staked ETH protection</li>
                      <li>• 7-day fraud proof window</li>
                      <li>• Optimistic rollup security</li>
                      <li>• Cannot be attacked independently</li>
                    </ul>
                  </div>
                  
                  <div className="border-2 p-6 rounded-2xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#666666' }}>
                    <h4 className="text-lg font-bold mb-3 text-red-500">Solana Security Model</h4>
                    <p className="mb-3 text-gray-300"><strong className="text-white">Independent Consensus:</strong></p>
                    <ul className="space-y-1 text-gray-300">
                      <li>• ~$60.8 billion staked (67% of supply)</li>
                      <li>• Can be attacked directly</li>
                      <li>• Proof of History + Tower BFT</li>
                      <li>• No fraud proof period</li>
                    </ul>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mt-8">The Centralization Problem</h4>

                <div className="border-l-4 p-6 rounded-r-xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#666666' }}>
                  <h4 className="text-lg font-bold mb-3 text-red-500">Solana's Validator Concentration</h4>
                  <p className="mb-3 text-gray-300">The top validators control massive stake percentages:</p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• 92% use Jito (MEV extraction software)</li>
                    <li>• Geographic concentration in specific data centers</li>
                    <li>• High hardware requirements limit participation</li>
                    <li>• Leader schedule makes attacks predictable</li>
                  </ul>
                  <p className="font-bold mt-3 text-white">This concentration enables coordinated extraction.</p>
                </div>

                <div className="border-l-4 p-6 rounded-r-xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                  <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>BASE's Advantage: Transparent Simplicity</h4>
                  <p className="mb-3 text-gray-300">While BASE has a centralized sequencer (operated by Coinbase), this actually provides:</p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• <strong className="text-white">Predictable behavior:</strong> No hidden MEV extraction</li>
                    <li>• <strong className="text-white">Fair ordering:</strong> No pay-to-win bundles</li>
                    <li>• <strong className="text-white">Escape hatch:</strong> Can always exit via Ethereum L1</li>
                    <li>• <strong className="text-white">Corporate accountability:</strong> Coinbase is a public company</li>
                  </ul>
                  <p className="mt-3 text-white">Sometimes transparent centralization beats hidden cartelization.</p>
                </div>

                <div className="border-l-4 p-6 rounded-r-xl" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                  <h4 className="text-lg font-bold mb-3" style={{ color: '#C6F806' }}>The Bottom Line on Security</h4>
                  <p className="mb-3 text-gray-300"><strong className="text-white">For token launches and DeFi:</strong></p>
                  <ul className="space-y-1 mb-3 text-gray-300">
                    <li>• BASE provides better protection against MEV</li>
                    <li>• Transaction ordering is fairer (though not perfect)</li>
                    <li>• Private mempool eliminates most sandwich attacks</li>
                    <li>• Ethereum security inheritance provides strong guarantees</li>
                  </ul>
                  <p className="font-bold text-white">Solana may be faster, but speed is worthless if bots extract all the value.</p>
                </div>

                <div className="border-2 p-8 rounded-2xl mt-8" style={{ backgroundColor: '#1A1A1A', borderColor: '#C6F806' }}>
                  <h4 className="text-2xl font-bold mb-4" style={{ color: '#C6F806' }}>🎯 Final Verdict</h4>
                  <p className="text-xl mb-4 font-bold text-white">BASE provides demonstrably better protection for token launches.</p>
                  
                  <p className="mb-3 text-gray-300"><strong className="text-white">Verified Advantages:</strong></p>
                  <ul className="space-y-2 mb-6 text-gray-300">
                    <li>✅ <strong className="text-white">Private mempool</strong> prevents most MEV attacks</li>
                    <li>✅ <strong className="text-white">No Jito cartel</strong> extracting value via bundles</li>
                    <li>✅ <strong className="text-white">No public leader schedule</strong> for coordinated attacks</li>
                    <li>✅ <strong className="text-white">Higher success rates</strong> during congestion</li>
                    <li>✅ <strong className="text-white">Ethereum's security</strong> inheritance ($84.8B)</li>
                    <li>✅ <strong className="text-white">Fair transaction ordering</strong> (no pay-to-win)</li>
                  </ul>
                  
                  <p className="text-lg font-bold" style={{ color: '#C6F806' }}>
                    For projects prioritizing fairness and user protection, BASE is the clear choice.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
        </div>
      </div>
    </>
  );
};

