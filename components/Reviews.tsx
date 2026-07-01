const GoogleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function Reviews() {
  return (
    <>
      <section id="reviews" style={{ background: '#000', color: '#fff', fontFamily: "'Inter','Helvetica Neue',sans-serif", padding: '120px 40px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,34,0,0.8)', margin: '0 0 14px' }}>Client Results</p>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1 }}>What happens when the<br />system runs itself.</h2>
          </div>

          <div style={{ columns: 3, columnGap: '20px' }}>

            {/* Review 1 */}
            <div className="rv-card">
              <div className="rv-top">
                <img src="https://i.pravatar.cc/80?img=47" className="rv-avatar" alt="Ayşe Kaya" />
                <div>
                  <div className="rv-name">Ay&#351;e Kaya</div>
                  <div className="rv-role">Medikal Estetik &middot; &#304;stanbul</div>
                  <div className="rv-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                </div>
                <div className="rv-g">
                  <GoogleIcon />
                </div>
              </div>
              <p className="rv-quote">&ldquo;Haftada 3-4 randevu kaybediyordum. &#350;imdi sistem kendili&#287;inden &#231;al&#305;&#351;&#305;yor. 2 ayd&#305;r tek bir randevuyu kendim onaylamad&#305;m.&rdquo;</p>
              {/* add your screenshot below */}
              <div className="rv-img-slot"></div>
              <div className="rv-footer"><span className="rv-time">3 weeks ago</span><span className="rv-helpful">&#128077; 14</span></div>
            </div>

            {/* Review 2 */}
            <div className="rv-card">
              <div className="rv-top">
                <img src="https://i.pravatar.cc/80?img=12" className="rv-avatar" alt="Omar Al-Rashidi" />
                <div>
                  <div className="rv-name">Omar Al-Rashidi</div>
                  <div className="rv-role">Premium Dental &middot; Dubai</div>
                  <div className="rv-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                </div>
                <div className="rv-g">
                  <GoogleIcon />
                </div>
              </div>
              <p className="rv-quote">&ldquo;My team was spending 40 hours a week on admin. Now the AI handles everything. We&apos;re at 11 hours. I genuinely did not think this was possible.&rdquo;</p>
              {/* add your screenshot below */}
              <div className="rv-img-slot"></div>
              <div className="rv-footer"><span className="rv-time">1 month ago</span><span className="rv-helpful">&#128077; 22</span></div>
            </div>

            {/* Review 3 */}
            <div className="rv-card">
              <div className="rv-top">
                <img src="https://i.pravatar.cc/80?img=44" className="rv-avatar" alt="Fatma Demir" />
                <div>
                  <div className="rv-name">Fatma Demir</div>
                  <div className="rv-role">G&#252;zellik &amp; Spa &middot; Ankara</div>
                  <div className="rv-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                </div>
                <div className="rv-g">
                  <GoogleIcon />
                </div>
              </div>
              <p className="rv-quote">&ldquo;Da&#287;&#305;n&#305;k tablolardan tam otomatik bir CRM&apos;e iki haftada ge&#231;tik. Her m&#252;&#351;teriyi, her takibi tek ekranda g&#246;r&#252;yorum. &#199;ok daha rahat.&rdquo;</p>
              {/* add your screenshot below */}
              <div className="rv-img-slot"></div>
              <div className="rv-footer"><span className="rv-time">2 months ago</span><span className="rv-helpful">&#128077; 9</span></div>
            </div>

            {/* Review 4 */}
            <div className="rv-card">
              <div className="rv-top">
                <img src="https://i.pravatar.cc/80?img=15" className="rv-avatar" alt="Ahmed Al-Mansoori" />
                <div>
                  <div className="rv-name">Ahmed Al-Mansoori</div>
                  <div className="rv-role">Al-Mansoori Medical &middot; Dubai</div>
                  <div className="rv-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                </div>
                <div className="rv-g">
                  <GoogleIcon />
                </div>
              </div>
              <p className="rv-quote">&ldquo;The re-engagement campaigns paid for everything in month one. Patients I hadn&apos;t seen in a year started booking again on their own. 312% ROI in 60 days, not kidding.&rdquo;</p>
              {/* add your screenshot below */}
              <div className="rv-img-slot"></div>
              <div className="rv-footer"><span className="rv-time">5 weeks ago</span><span className="rv-helpful">&#128077; 31</span></div>
            </div>

            {/* Review 5 */}
            <div className="rv-card">
              <div className="rv-top">
                <img src="https://i.pravatar.cc/80?img=49" className="rv-avatar" alt="Zeynep Yılmaz" />
                <div>
                  <div className="rv-name">Zeynep Y&#305;lmaz</div>
                  <div className="rv-role">Wellness &amp; Estetik &middot; &#304;stanbul</div>
                  <div className="rv-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                </div>
                <div className="rv-g">
                  <GoogleIcon />
                </div>
              </div>
              <p className="rv-quote">&ldquo;Teknolojiye &#231;ok &#351;&#252;pheyle yakla&#351;&#305;yordum. Bu y&#246;netece&#287;iniz bir yaz&#305;l&#305;m de&#287;il — &#231;al&#305;&#351;&#305;yor ve siz sadece sonu&#231;lar&#305; g&#246;r&#252;yorsunuz.&rdquo;</p>
              {/* add your screenshot below */}
              <div className="rv-img-slot"></div>
              <div className="rv-footer"><span className="rv-time">6 weeks ago</span><span className="rv-helpful">&#128077; 17</span></div>
            </div>

            {/* Review 6 */}
            <div className="rv-card">
              <div className="rv-top">
                <img src="https://i.pravatar.cc/80?img=68" className="rv-avatar" alt="Khalid Al-Farsi" />
                <div>
                  <div className="rv-name">Khalid Al-Farsi</div>
                  <div className="rv-role">HealthHub Group &middot; Abu Dhabi</div>
                  <div className="rv-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                </div>
                <div className="rv-g">
                  <GoogleIcon />
                </div>
              </div>
              <p className="rv-quote">&ldquo;We went from one to three locations without a single extra admin hire. The system runs intake, reminders and records across all three. Still can&apos;t believe it.&rdquo;</p>
              {/* add your screenshot below */}
              <div className="rv-img-slot"></div>
              <div className="rv-footer"><span className="rv-time">2 months ago</span><span className="rv-helpful">&#128077; 28</span></div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .rv-card {
          break-inside: avoid;
          background: #0c0c0c;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 18px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .rv-top { display: flex; align-items: center; gap: 12px; }
        .rv-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
        .rv-name { font-size: 13px; font-weight: 700; color: #fff; }
        .rv-role { font-size: 10px; color: #555; margin-top: 1px; }
        .rv-stars { font-size: 11px; color: #fbbc04; margin-top: 3px; }
        .rv-g { margin-left: auto; align-self: flex-start; opacity: 0.7; }
        .rv-quote { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.7; margin: 0; }
        .rv-img-slot {
          width: 100%;
          aspect-ratio: 16/9;
          background: rgba(255,255,255,0.03);
          border: 1.5px dashed rgba(255,255,255,0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: #333;
          letter-spacing: 0.05em;
        }
        .rv-footer { display: flex; justify-content: space-between; }
        .rv-time { font-size: 10px; color: #3a3a3a; }
        .rv-helpful { font-size: 10px; color: #3a3a3a; }
        @media (max-width: 900px) {
          #reviews [style*="columns"] { columns: 2 !important; }
        }
        @media (max-width: 600px) {
          #reviews [style*="columns"] { columns: 1 !important; }
        }
      `}</style>
    </>
  );
}
