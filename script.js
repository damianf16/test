
// --- Entrance animation: reveal vinyl and enable spin after a short delay ---
window.addEventListener('load', () => {
    const vinyl = document.getElementById('vinyl');
    setTimeout(()=>{
    vinyl.style.transform = 'scale(1) rotate(0deg)';
    vinyl.style.opacity = '1';
    // add spin class after it's visible
    setTimeout(()=> vinyl.classList.add('spin'), 900);
    }, 220);

    // sample button behaviour (demo)
    document.getElementById('listenBtn').addEventListener('click', ()=>{
    // brief pulse
    vinyl.animate([{transform:'scale(1) rotate(0deg)'},{transform:'scale(1.06) rotate(0deg)'},{transform:'scale(1) rotate(0deg)'}],{duration:600});
    alert('Tu możesz podpiąć odtwarzacz audio lub link do próbki.');
    });

    document.getElementById('bookBtn').addEventListener('click', ()=>{
    const mail = 'mailto:jan.kowalski@email.pl?subject=Rezerwacja%20DJ%20Jan%20Kowalski';
    location.href = mail;
    });

    // rider PDF demo — create small downloadable blob (placeholder)
    document.getElementById('riderPdf').addEventListener('click', (e)=>{
    e.preventDefault();
    const content = 'Rider - DJ Jan Kowalski\n\nRider techniczny\n- CDJ x2\n- Mixer\n- Monitor\n- Zasilanie 2x 230V\n\nKontakt: jan.kowalski@email.pl';
    const blob = new Blob([content], {type:'application/pdf'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'rider-dj-jan-kowalski.pdf'; document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    });
});

// --- Simple particle system for the background canvas ---
(function(){
    const canvas = document.querySelector('canvas.particles');
    const ctx = canvas.getContext('2d');
    let w, h, particles=[];
    const DPR = Math.max(1, window.devicePixelRatio || 1);

    function resize(){
    w = canvas.width = Math.floor(window.innerWidth * DPR);
    h = canvas.height = Math.floor(window.innerHeight * DPR);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(DPR, DPR);
    }

    function random(min,max){return Math.random()*(max-min)+min}

    function createParticles(){
    particles = [];
    const count = Math.round((window.innerWidth*window.innerHeight)/70000);
    for(let i=0;i<count;i++){
        particles.push({
        x: Math.random()*w/DPR,
        y: Math.random()*h/DPR,
        vx: (Math.random()-0.5)*0.3,
        vy: (Math.random()-0.5)*0.3,
        r: random(0.6,2.2),
        hue: random(170,290),
        life: random(120, 320)
        });
    }
    }

    function step(){
    ctx.clearRect(0,0,w/DPR,h/DPR);
    for(let p of particles){
        p.x += p.vx; p.y += p.vy;
        p.life -= 1;
        if(p.life<=0 || p.x< -10 || p.x> w/DPR +10 || p.y< -10 || p.y> h/DPR +10){
        p.x = Math.random()*w/DPR; p.y = Math.random()*h/DPR; p.life = random(120, 320);
        }
        ctx.beginPath();
        const g = ctx.createRadialGradient(p.x,p.y,p.r*0.1,p.x,p.y,p.r*6);
        g.addColorStop(0, `hsla(${p.hue},100%,60%,0.18)`);
        g.addColorStop(0.6, `hsla(${p.hue},90%,50%,0.06)`);
        g.addColorStop(1, `rgba(10,10,12,0)`);
        ctx.fillStyle = g;
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
    }

    requestAnimationFrame(step);
    }

    window.addEventListener('resize', ()=>{ resize(); createParticles(); });
    resize(); createParticles(); step();
})();