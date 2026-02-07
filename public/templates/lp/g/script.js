document.addEventListener('DOMContentLoaded',()=>{initElegantConfetti();initCountdown();initFormHandler();initSmoothScroll();initFadeAnimations()});

// Elegant Confetti - Subtle and Sophisticated
function initElegantConfetti(){
    // Page load - subtle confetti
    setTimeout(()=>{fireElegantConfetti(0.5)},800);
}

function fireElegantConfetti(intensity=1){
    const count=100*intensity;
    const defaults={
        origin:{y:0.7},
        colors:['#D97706','#B45309','#F59E0B','#FEF3C7','#9F1239'],
        shapes:['circle'],
        scalar:0.6,
        ticks:150,
        gravity:0.8,
        drift:0,
        startVelocity:15
    };
    
    function fire(particleRatio,opts){
        confetti(Object.assign({},defaults,opts,{
            particleCount:Math.floor(count*particleRatio)
        }));
    }
    
    fire(0.25,{spread:26,startVelocity:25});
    fire(0.2,{spread:60});
    fire(0.35,{spread:100,decay:0.91,scalar:0.8});
    fire(0.1,{spread:120,startVelocity:35,decay:0.92,scalar:1.2});
    fire(0.1,{spread:120,startVelocity:45});
}

// Countdown Timer
function initCountdown(){
    const daysEl=document.getElementById('days');
    const hoursEl=document.getElementById('hours');
    const minutesEl=document.getElementById('minutes');
    const secondsEl=document.getElementById('seconds');
    
    if(!daysEl)return;
    
    let d=3,h=14,m=52,s=18;
    
    setInterval(()=>{
        s--;
        if(s<0){s=59;m--}
        if(m<0){m=59;h--}
        if(h<0){h=23;d--}
        if(d<0){d=3;h=14;m=52;s=18}
        
        daysEl.textContent=String(d).padStart(2,'0');
        hoursEl.textContent=String(h).padStart(2,'0');
        minutesEl.textContent=String(m).padStart(2,'0');
        secondsEl.textContent=String(s).padStart(2,'0');
    },1000);
}

// Form Handler
function initFormHandler(){
    const form=document.getElementById('entryForm');
    const modal=document.getElementById('successModal');
    
    if(!form)return;
    
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        
        // Validate
        const required=form.querySelectorAll('[required]');
        let valid=true;
        
        required.forEach(field=>{
            if(!field.value.trim()||(field.type==='checkbox'&&!field.checked)){
                valid=false;
                field.style.borderBottomColor='#9F1239';
                setTimeout(()=>{field.style.borderBottomColor=''},2000);
            }
        });
        
        if(valid){
            // Fire elegant confetti
            fireElegantConfetti(1.2);
            
            // Show modal after brief delay
            setTimeout(()=>{
                modal.classList.add('is-open');
                document.body.style.overflow='hidden';
            },600);
            
            // Reset form
            form.reset();
        }
    });
}

// Close Modal
function closeModal(){
    const modal=document.getElementById('successModal');
    modal.classList.remove('is-open');
    document.body.style.overflow='';
}

// Smooth Scroll
function initSmoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
        anchor.addEventListener('click',function(e){
            const href=this.getAttribute('href');
            if(href==='#')return;
            
            const target=document.querySelector(href);
            if(target){
                e.preventDefault();
                const headerOffset=80;
                const elementPosition=target.getBoundingClientRect().top;
                const offsetPosition=elementPosition+window.pageYOffset-headerOffset;
                
                window.scrollTo({
                    top:offsetPosition,
                    behavior:'smooth'
                });
            }
        });
    });
}

// Fade In Animations
function initFadeAnimations(){
    const observerOptions={
        root:null,
        rootMargin:'0px 0px -50px 0px',
        threshold:0.1
    };
    
    const observer=new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.style.opacity='1';
                entry.target.style.transform='translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    },observerOptions);
    
    // Observe elements
    const animateElements=document.querySelectorAll('.prize-card,.testimonial-card,.flow-step');
    
    animateElements.forEach((el,index)=>{
        el.style.opacity='0';
        el.style.transform='translateY(20px)';
        el.style.transition=`opacity 0.6s ease ${index*0.1}s, transform 0.6s ease ${index*0.1}s`;
        observer.observe(el);
    });
}

// Close modal on overlay click
document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('modal__overlay')){
        closeModal();
    }
});

// Escape key to close modal
document.addEventListener('keydown',(e)=>{
    if(e.key==='Escape'){
        closeModal();
    }
});
