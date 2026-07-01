'use client';

import { useState, useEffect, useRef } from 'react';

export default function Calculator() {
  const [teamSize, setTeamSize] = useState(10);
  const [salary, setSalary] = useState(60000);
  const [hours, setHours] = useState(15);
  const [saleValue, setSaleValue] = useState(2000);
  const [isIntegrated, setIsIntegrated] = useState(false);

  // Animated display values
  const [displayLabor, setDisplayLabor] = useState(0);
  const [displayErrors, setDisplayErrors] = useState(0);
  const [displayRevenue, setDisplayRevenue] = useState(0);
  const [displayTotal, setDisplayTotal] = useState(0);

  const prevValues = useRef({ labor: 0, errors: 0, revenue: 0, total: 0 });
  const animFrames = useRef<{ [key: string]: number }>({});

  function animateValue(
    key: string,
    start: number,
    end: number,
    duration: number,
    setter: (v: number) => void
  ) {
    if (animFrames.current[key]) {
      cancelAnimationFrame(animFrames.current[key]);
    }
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      setter(current);
      if (progress < 1) {
        animFrames.current[key] = requestAnimationFrame(step);
      }
    };
    animFrames.current[key] = requestAnimationFrame(step);
  }

  useEffect(() => {
    const hourlyRate = salary / 52 / 40;
    let labor = teamSize * hours * 52 * hourlyRate;
    let errors = teamSize * salary * 0.05;
    let revenue = teamSize * 50 * 0.20 * saleValue;

    if (isIntegrated) {
      labor = labor * 0.10;
      errors = 0;
      revenue = 0;
    }

    const total = labor + errors + revenue;

    const prev = prevValues.current;
    animateValue('labor', prev.labor, labor, 600, setDisplayLabor);
    animateValue('errors', prev.errors, errors, 600, setDisplayErrors);
    animateValue('revenue', prev.revenue, revenue, 600, setDisplayRevenue);
    animateValue('total', prev.total, total, 600, setDisplayTotal);

    prevValues.current = { labor, errors, revenue, total };

    return () => {
      Object.values(animFrames.current).forEach(id => cancelAnimationFrame(id));
    };
  }, [teamSize, salary, hours, saleValue, isIntegrated]);

  const handleToggle = () => {
    setIsIntegrated(prev => !prev);
  };

  return (
    <>
      {/* ═══ MANUAL TAX CALCULATOR SECTION ═══ */}
      <section id="manual-tax" style={{ background: '#000', color: '#fff', fontFamily: "'Inter', sans-serif", padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#eb4326', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>THE CALCULATOR</p>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 950, marginBottom: '16px', color: '#fff', letterSpacing: '-0.04em' }}>What is manual work costing you?</h2>
          <p style={{ color: '#aaa', fontSize: 'clamp(16px, 2vw, 18px)', marginBottom: '80px', fontWeight: 400, opacity: 0.8 }}>Fill in your numbers. See the real cost of legacy operations.</p>

          <div className="mt-calc-grid">
            {/* Left Column: Inputs */}
            <div className="mt-inputs">
              <div className="mt-input-group">
                <label htmlFor="team-size">Team Size</label>
                <p className="mt-label-desc">How many people handle admin, sales, or operations?</p>
                <div className="mt-control" style={{'--value': ((teamSize - 1) / 499 * 100).toFixed(2)} as React.CSSProperties}>
                  <input type="range" id="team-size" min="1" max="500" value={teamSize} step="1" className="mt-slider" onChange={e => setTeamSize(parseInt(e.target.value))} />
                  <div className="mt-control__track"><div className="mt-control__indicator"><div className="mt-control__thumb"></div></div></div>
                  <div className="mt-control__beams"><div className="mt-control__beam-track"></div><div className="mt-control__beam-track"></div></div>
                </div>
                <div className="mt-slider-val"><span>{teamSize}</span> employees</div>
              </div>

              <div className="mt-input-group">
                <label htmlFor="salary">Annual Salary</label>
                <p className="mt-label-desc">Average annual salary per person</p>
                <div className="mt-control" style={{'--value': ((salary - 20000) / 180000 * 100).toFixed(2)} as React.CSSProperties}>
                  <input type="range" id="salary" min="20000" max="200000" value={salary} step="1000" className="mt-slider" onChange={e => setSalary(parseInt(e.target.value))} />
                  <div className="mt-control__track"><div className="mt-control__indicator"><div className="mt-control__thumb"></div></div></div>
                  <div className="mt-control__beams"><div className="mt-control__beam-track"></div><div className="mt-control__beam-track"></div></div>
                </div>
                <div className="mt-slider-val">$<span>{salary.toLocaleString()}</span></div>
              </div>

              <div className="mt-input-group" style={{ marginBottom: '48px' }}>
                <label htmlFor="hours">Manual Grind</label>
                <p className="mt-label-desc">Hours per week each person spends on manual tasks</p>
                <div className="mt-control" style={{'--value': ((hours - 1) / 39 * 100).toFixed(2)} as React.CSSProperties}>
                  <input type="range" id="hours" min="1" max="40" value={hours} step="1" className="mt-slider" onChange={e => setHours(parseInt(e.target.value))} />
                  <div className="mt-control__track"><div className="mt-control__indicator"><div className="mt-control__thumb"></div></div></div>
                  <div className="mt-control__beams"><div className="mt-control__beam-track"></div><div className="mt-control__beam-track"></div></div>
                </div>
                <div className="mt-slider-val"><span>{hours}</span> hours/week</div>
              </div>

              <div style={{ textAlign: 'left' }}>
                <button
                  id="mt-toggle"
                  className={`mt-toggle-btn${isIntegrated ? ' toggled' : ''}`}
                  onClick={handleToggle}
                >
                  {isIntegrated ? '← Switch Back to Manual' : 'Switch to Integrated System →'}
                </button>
              </div>
            </div>

            {/* Right Column: Results */}
            <div className="mt-results">
              <div className={`mt-card${isIntegrated ? ' integrated' : ''}`} id="card-labor">
                <div className="mt-card-content">
                  <div className="mt-card-info">
                    <div className="mt-card-label">Wasted Labor</div>
                    <div className="mt-card-desc">Time spent on redundant tasks</div>
                  </div>
                  <div className="mt-card-val">$<span id="res-labor">{displayLabor.toLocaleString()}</span></div>
                </div>
              </div>

              <div className={`mt-card${isIntegrated ? ' integrated' : ''}`} id="card-errors">
                <div className="mt-card-content">
                  <div className="mt-card-info">
                    <div className="mt-card-label">Error Costs</div>
                    <div className="mt-card-desc">Fixing manual mistakes</div>
                  </div>
                  <div className="mt-card-val">$<span id="res-errors">{displayErrors.toLocaleString()}</span></div>
                </div>
              </div>

              <div className={`mt-card${isIntegrated ? ' integrated' : ''}`} id="card-revenue">
                <div className="mt-card-content">
                  <div className="mt-card-info">
                    <div className="mt-card-label">Missed Revenue</div>
                    <div className="mt-card-desc">Leads lost to slow response</div>
                  </div>
                  <div className="mt-card-val">$<span id="res-revenue">{displayRevenue.toLocaleString()}</span></div>
                </div>
                <div className="mt-card-extra">
                  <label>Avg sale value:</label>
                  <div className="mt-inline-wrap">
                    <span className="calc-symbol">$</span>
                    <input
                      type="number"
                      id="sale-value"
                      value={saleValue}
                      className="mt-inline-input"
                      onChange={e => setSaleValue(parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>

              <details className="mt-calc-methodology">
                <summary>How we calculate this <span className="arrow">→</span></summary>
                <ul>
                  <li><strong>Wasted Labor:</strong> Based on the average knowledge worker spending 41% of their workweek on repetitive, low-value tasks, sourced from McKinsey Global Institute research on workplace automation potential.</li>
                  <li><strong>Error Costs:</strong> Manual data entry carries an average error rate of 1–5% per transaction. We use a conservative 5% of team payroll to estimate the cost of fixing mistakes, lost records, and missed follow-ups, consistent with IBM and Gartner operational cost benchmarks.</li>
                  <li><strong>Missed Revenue:</strong> Research from Harvard Business Review found that companies responding to leads within 1 hour are 7x more likely to convert. We estimate a 20% conversion loss attributable to slow manual response times, multiplied by your average sale value.</li>
                </ul>
              </details>

              <div id="mt-total-bar" className="mt-total-bar">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span id="total-label" className="mt-total-label">
                    {isIntegrated ? 'Estimated Annual Savings:' : 'Total Annual Loss:'}
                  </span>
                  <span className={`mt-total-sum${isIntegrated ? ' integrated' : ''}`} id="mt-total-sum-display">
                    $<span id="res-total">{displayTotal.toLocaleString()}</span>
                  </span>
                </div>
              </div>

              <p style={{ color: '#666', fontSize: '14px', fontStyle: 'italic', marginTop: '20px', lineHeight: 1.6, maxWidth: '440px', marginLeft: 'auto' }}>
                &quot;This is not a tech problem. It&apos;s a profit problem. An integrated system recovers these costs on Day 1.&quot;
              </p>
            </div>
          </div>

          <div style={{ marginTop: '64px' }}>
            <a href="#contact" className="mt-cta-btn">Build My System &amp; Stop the Leak →</a>
          </div>
        </div>
      </section>

      <style>{`
        .mt-calc-grid {
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            gap: 80px;
            text-align: left;
            max-width: 1100px;
            margin: 0 auto;
        }
        .mt-inputs { isolation: isolate; }
        .mt-results { isolation: isolate; }
        .mt-input-group { margin-bottom: 40px; }
        .mt-input-group label {
            display: block;
            font-size: 11px;
            color: #eb4326;
            margin-bottom: 4px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        .mt-label-desc {
            font-size: 15px;
            color: #fff;
            margin: 0 0 16px;
            font-weight: 500;
            opacity: 0.9;
        }
        .mt-control {
            position: relative;
            isolation: isolate;
            display: grid;
            place-items: center;
            border-radius: 100px;
            width: 100%;
            height: 40px;
            margin-bottom: 16px;
        }
        .mt-control::before {
            content: "";
            inset: -5px;
            border: 3px solid #000;
            border-radius: 100px;
            position: absolute;
            pointer-events: none;
        }
        .mt-slider {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 40px;
            opacity: 0;
            position: relative;
            z-index: 3;
            cursor: grab;
            margin: 0;
            padding: 0;
            border: 0;
        }
        .mt-slider:active { cursor: grabbing; }
        .mt-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 40px;
            width: 40px;
        }
        .mt-slider::-webkit-slider-runnable-track {
            -webkit-appearance: none;
            height: 40px;
        }
        .mt-control__track {
            height: 100%;
            width: 100%;
            border-radius: 100px;
            position: absolute;
            pointer-events: none;
            background: hsl(0 0% 8%);
            box-shadow:
                0 -2px 10px 0 hsl(0 0% 0% / 0.5) inset,
                0 2px 10px 0 hsl(0 0% 0% / 0.65) inset,
                0 -1px inset hsl(0 0% 100% / 0.15),
                0 0 10px inset black;
        }
        .mt-control__indicator {
            height: 100%;
            aspect-ratio: 1;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: calc(var(--value, 0) * 1%);
            z-index: 2;
            translate: calc(var(--value, 0) * -1%) -50%;
            display: grid;
            place-items: center;
        }
        .mt-control__thumb {
            width: calc(100% - 10px);
            aspect-ratio: 1;
            border-radius: 50%;
            position: relative;
        }
        .mt-control__thumb::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: hsl(0 0% 16%);
            box-shadow:
                0 2px 4px 0px inset hsl(0 0% 100% / 0.4),
                2px 0 6px -2px inset hsl(14 84% 54% / calc(var(--value, 0) / 100)),
                2px 0 6px -2px inset hsl(14 84% 54% / calc(var(--value, 0) / 100));
        }
        .mt-control__thumb::after {
            content: "";
            position: absolute;
            height: 20%;
            aspect-ratio: 1;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            translate: -50% -50%;
            background: hsl(14 84% 54% / calc(0.4 + (var(--value, 0) / 100) * 0.6));
            box-shadow: 0 0 calc((var(--value, 0) / 100) * 12px) calc((var(--value, 0) / 100) * 5px) hsl(14 84% 54% / calc(0.4 + (var(--value, 0) / 100) * 0.6));
        }
        .mt-control__beams {
            position: absolute;
            inset: -5px;
            pointer-events: none;
            container-type: size;
        }
        .mt-control__beam-track {
            position: absolute;
            border-radius: 100px;
            inset: 0;
        }
        .mt-control__beam-track:last-of-type {
            filter: brightness(1.5) blur(8px);
        }
        .mt-control__beam-track::after {
            content: "";
            border: 3px solid hsl(14 84% 54% / calc(0.4 + (var(--value, 0) / 100) * 0.6));
            position: absolute;
            border-radius: 100px;
            inset: 0;
            z-index: 2;
            clip-path: inset(
                0
                calc(
                    100% -
                    (50cqh * clamp(0, var(--value, 0), 1)) -
                    ((100% - 100cqh) * (var(--value, 0) / 100)) -
                    ((50cqh) * clamp(0, var(--value, 0) - 99, 1))
                )
                0
                0
            );
        }
        .mt-slider-val {
            font-size: 15px;
            color: #eb4326;
            font-weight: 800;
            letter-spacing: 0.04em;
            text-transform: uppercase;
        }
        .mt-toggle-btn {
            background: #eb4326;
            color: #fff;
            font-size: 13px;
            font-weight: 700;
            border: none;
            border-radius: 4px;
            padding: 14px 24px;
            cursor: pointer;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mt-toggle-btn.toggled {
            background: #222;
            color: #888;
        }
        .mt-card {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 24px 28px;
            margin-bottom: 16px;
            transition: all 0.4s ease;
        }
        .mt-card.integrated { border-left: 2px solid #22c55e; background: rgba(34, 197, 94, 0.05); }
        .mt-card-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .mt-card-label {
            font-size: 16px;
            font-weight: 700;
            color: #fff;
            margin-bottom: 4px;
        }
        .mt-card-desc {
            color: #666;
            font-size: 12px;
            font-weight: 400;
        }
        .mt-card-val {
            font-size: 32px;
            font-weight: 950;
            color: #fff;
            letter-spacing: -0.02em;
            text-shadow: 0 0 20px rgba(235, 67, 38, 0.3);
        }
        .mt-card.integrated .mt-card-val {
            text-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
        }
        .mt-card-extra {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid rgba(255,255,255,0.05);
        }
        .mt-card-extra label {
            font-size: 10px;
            font-weight: 800;
            color: #444;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        .mt-inline-wrap { position: relative; }
        .calc-symbol { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #666; font-size: 12px; }
        .mt-inline-input {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 4px;
            color: #fff;
            padding: 6px 10px 6px 20px;
            font-size: 13px;
            width: 120px;
            outline: none;
            font-weight: 600;
        }
        .mt-total-bar {
            background: rgba(255, 255, 255, 0.01);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 32px;
            margin-top: 24px;
        }
        .mt-total-label {
            color: #888;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .mt-total-sum {
            font-size: clamp(40px, 6vw, 48px);
            font-weight: 950;
            color: #eb4326;
            letter-spacing: -0.04em;
            text-shadow: 0 0 30px rgba(235, 67, 38, 0.5);
            transition: color 0.4s ease, text-shadow 0.4s ease;
        }
        .mt-total-sum.integrated {
            color: #22c55e;
            text-shadow: 0 0 30px rgba(34, 197, 94, 0.5);
        }
        .mt-cta-btn {
            display: inline-block;
            background: #eb4326;
            color: #fff;
            font-size: 16px;
            font-weight: 800;
            border-radius: 4px;
            padding: 18px 48px;
            text-decoration: none;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 0 #9e2a16;
        }
        .mt-cta-btn:hover {
            background: #c93820;
            transform: translateY(-2px);
            box-shadow: 0 6px 0 #9e2a16;
        }
        .mt-cta-btn:active {
            transform: translateY(2px);
            box-shadow: 0 0 0 #9e2a16;
        }
        .mt-calc-methodology {
            margin: 12px 0 24px;
            text-align: left;
        }
        .mt-calc-methodology summary {
            font-size: 12px;
            color: #666;
            font-style: italic;
            cursor: pointer;
            list-style: none;
            display: flex;
            align-items: center;
            gap: 6px;
            user-select: none;
        }
        .mt-calc-methodology summary::-webkit-details-marker { display: none; }
        .mt-calc-methodology summary .arrow {
            display: inline-block;
            transition: transform 0.3s ease;
            font-style: normal;
        }
        .mt-calc-methodology[open] summary .arrow {
            transform: rotate(90deg);
        }
        .mt-calc-methodology ul {
            margin: 12px 0 0;
            padding: 0 0 0 16px;
            list-style-type: disc;
        }
        .mt-calc-methodology li {
            font-size: 11px;
            color: #666;
            font-style: italic;
            line-height: 1.6;
            margin-bottom: 8px;
        }
        .mt-calc-methodology strong {
            color: #888;
            font-style: normal;
        }
        @media (max-width: 900px) {
            .mt-calc-grid { grid-template-columns: 1fr; gap: 60px; }
            #manual-tax { padding: 80px 24px; }
            .mt-card-val { font-size: 24px; }
            .mt-total-sum { font-size: 32px; }
        }
      `}</style>
    </>
  );
}
