// 🦔 guardaí polish.js v1.0
// Polimentos visuais e táteis: haptic feedback + pull-to-refresh + splash

(function(){
  'use strict';
  
  // ====================================
  // HAPTIC FEEDBACK (vibração no toque)
  // ====================================
  function haptic(tipo){
    if(!navigator.vibrate)return;
    const padroes={
      light:[8],
      medium:[15],
      heavy:[25],
      success:[10,40,10],
      error:[30,60,30],
      warning:[20,40,20]
    };
    try{navigator.vibrate(padroes[tipo]||padroes.light)}catch(e){}
  }
  
  // Expõe globalmente
  window.haptic=haptic;
  
  // Auto-aplica em botões importantes
  document.addEventListener('click',(e)=>{
    const t=e.target.closest('button,.btn,.btn-primary,.btn-ia,.fab-audio,.input-send,.input-mic,.mic-btn,.tutorial-balao-btn');
    if(!t)return;
    
    // Define intensidade pelo tipo
    if(t.classList.contains('btn-primary')||t.classList.contains('btn-ia')||t.classList.contains('input-send')){
      haptic('medium');
    }else if(t.classList.contains('fab-audio')||t.classList.contains('mic-btn')||t.classList.contains('input-mic')){
      haptic('medium');
    }else if(t.classList.contains('danger')){
      haptic('warning');
    }else{
      haptic('light');
    }
  },{passive:true});
  
  // Haptic em toasts de sucesso (quando aparece)
  const obs=new MutationObserver((muts)=>{
    muts.forEach(m=>{
      if(m.type==='attributes'&&m.target.id==='xp-toast'){
        if(m.target.style.display==='block'){
          haptic('success');
        }
      }
    });
  });
  
  // Observa quando toasts aparecem
  setTimeout(()=>{
    const toast=document.getElementById('xp-toast');
    if(toast)obs.observe(toast,{attributes:true,attributeFilter:['style']});
  },500);
  
  // ====================================
  // PULL TO REFRESH
  // ====================================
  let touchStartY=0,touchY=0,refreshing=false;
  const PULL_THRESHOLD=80;
  
  // Cria o indicador
  const refresher=document.createElement('div');
  refresher.id='pull-refresher';
  refresher.style.cssText='position:fixed;top:-60px;left:50%;transform:translateX(-50%);width:48px;height:48px;background:#141414;border:1px solid #252525;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:9999;transition:top 0.3s cubic-bezier(0.34,1.2,0.64,1);font-size:24px;box-shadow:0 4px 16px rgba(0,0,0,0.4)';
  refresher.innerHTML='🦔';
  document.body.appendChild(refresher);
  
  document.addEventListener('touchstart',(e)=>{
    if(window.scrollY>0)return;
    touchStartY=e.touches[0].clientY;
  },{passive:true});
  
  document.addEventListener('touchmove',(e)=>{
    if(window.scrollY>0||refreshing)return;
    touchY=e.touches[0].clientY;
    const diff=touchY-touchStartY;
    if(diff>0&&diff<150){
      refresher.style.top=(Math.min(diff-60,30))+'px';
      refresher.style.transform=`translateX(-50%) rotate(${diff*3}deg)`;
      if(diff>=PULL_THRESHOLD){
        refresher.style.borderColor='#00d97e';
        refresher.innerHTML='✅';
      }else{
        refresher.style.borderColor='#252525';
        refresher.innerHTML='🦔';
      }
    }
  },{passive:true});
  
  document.addEventListener('touchend',()=>{
    if(refreshing)return;
    const diff=touchY-touchStartY;
    if(diff>=PULL_THRESHOLD&&window.scrollY===0){
      refreshing=true;
      refresher.style.top='30px';
      refresher.innerHTML='🦔';
      refresher.style.animation='spin360 0.8s linear infinite';
      haptic('medium');
      
      // Adiciona CSS da animação se não existe
      if(!document.getElementById('polish-spin-css')){
        const s=document.createElement('style');
        s.id='polish-spin-css';
        s.textContent='@keyframes spin360{from{transform:translateX(-50%) rotate(0deg)}to{transform:translateX(-50%) rotate(360deg)}}';
        document.head.appendChild(s);
      }
      
      // Reload da página após pequeno delay
      setTimeout(()=>{
        haptic('success');
        window.location.reload();
      },800);
    }else{
      refresher.style.top='-60px';
      refresher.style.transform='translateX(-50%) rotate(0deg)';
    }
    touchStartY=0;
    touchY=0;
  },{passive:true});
  
  // ====================================
  // SPLASH SCREEN
  // ====================================
  // Se PWA standalone, mostra splash bonito
  const ehStandalone=window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
  
  if(ehStandalone&&!sessionStorage.getItem('splash_visto')){
    const splash=document.createElement('div');
    splash.id='splash-screen';
    splash.style.cssText='position:fixed;inset:0;background:#0a0a0a;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;animation:splashOut 0.5s ease-out 1.2s forwards;opacity:1';
    splash.innerHTML=`
      <div style="width:96px;height:96px;background:#00d97e;border-radius:24px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;box-shadow:0 8px 32px rgba(0,217,126,0.4);animation:splashLogo 0.8s cubic-bezier(0.34,1.4,0.64,1)">
        <div style="width:40px;height:40px;border:5px solid #001a0e;border-radius:10px;border-top:none;border-right:none"></div>
      </div>
      <div style="font-family:'Space Grotesk',sans-serif;font-size:32px;font-weight:700;color:#fff;letter-spacing:-0.03em;text-transform:lowercase;margin-bottom:6px;animation:splashFade 0.6s ease 0.3s both">guardaí</div>
      <div style="font-size:12px;color:#a3a3a3;animation:splashFade 0.6s ease 0.5s both">assistente financeiro com IA</div>
    `;
    
    const splashCSS=document.createElement('style');
    splashCSS.textContent=`
      @keyframes splashLogo{0%{transform:scale(0.5);opacity:0}60%{transform:scale(1.1);opacity:1}100%{transform:scale(1);opacity:1}}
      @keyframes splashFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      @keyframes splashOut{to{opacity:0;visibility:hidden;pointer-events:none}}
    `;
    document.head.appendChild(splashCSS);
    document.body.appendChild(splash);
    sessionStorage.setItem('splash_visto','1');
    
    setTimeout(()=>{splash.remove()},2000);
  }
  
  console.log('🦔 guardaí polish.js carregado');
})();
