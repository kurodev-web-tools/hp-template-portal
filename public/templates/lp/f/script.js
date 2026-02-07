document.addEventListener('DOMContentLoaded',()=>{initQuiz();initFAQ();initCountdown();initFormHandler()});

function initQuiz(){
    const startBtn=document.getElementById('startQuiz');
    const hero=document.getElementById('hero');
    const quiz=document.getElementById('quiz');
    const loading=document.getElementById('loading');
    const result=document.getElementById('result');
    
    let currentStep=1;
    const answers={};
    
    if(startBtn){
        startBtn.addEventListener('click',()=>{
            hero.style.display='none';
            quiz.style.display='block';
            updateProgress();
        });
    }
    
    document.querySelectorAll('.option-btn').forEach(btn=>{
        btn.addEventListener('click',function(){
            const card=this.closest('.quiz-card');
            const step=parseInt(card.dataset.step);
            const value=this.dataset.value;
            answers['q'+step]=value;
            this.style.background='var(--color-pink)';
            this.style.borderColor='var(--color-pink-dark)';
            setTimeout(()=>{
                if(step<3){showNextQuestion(step)}else{showLoading()}
            },300);
        });
    });
    
    function showNextQuestion(current){
        const currentCard=document.querySelector('.quiz-card[data-step="'+current+'"]');
        const nextCard=document.querySelector('.quiz-card[data-step="'+(current+1)+'"]');
        currentCard.classList.remove('quiz-card--active');
        nextCard.classList.add('quiz-card--active');
        currentStep=current+1;
        updateProgress();
    }
    
    function showLoading(){
        quiz.style.display='none';
        loading.style.display='block';
        setTimeout(()=>{showResult()},2500);
    }
    
    function showResult(){
        loading.style.display='none';
        result.style.display='block';
        result.scrollIntoView({behavior:'smooth'});
        generateResult();
    }
    
    function updateProgress(){
        const progressFill=document.getElementById('progressFill');
        const currentStepEl=document.getElementById('currentStep');
        if(progressFill&&currentStepEl){
            progressFill.style.width=(currentStep/3*100)+'%';
            currentStepEl.textContent=currentStep;
        }
    }
    
    function generateResult(){
        const resultType=document.getElementById('resultType');
        const resultFeatures=document.getElementById('resultFeatures');
        const resultAdvice=document.getElementById('resultAdvice');
        
        let type='【潤い不足タイプ】';
        let features=['メイクノリが悪くなりがち','小じわが気になる','季節の変わり目に肌が敏感になりやすい'];
        let advice='バリア機能をサポートする成分が配合された保湿ケアが効果的です。特にヒアルロン酸やセラミドを配合したアイテムを選びましょう。';
        
        if(answers.q2==='oil'){
            type='【テカリ・皮脂バランスタイプ】';
            features=['午後になると化粧崩れが気になる','毛穴が目立つ','べたつきが気になる'];
            advice='皮脂バランスを整える成分が配合されたケアが効果的です。さっぱりとした使用感で、毛穴ケアもできるアイテムを選びましょう。';
        }else if(answers.q2==='aging'){
            type='【エイジングケアタイプ】';
            features=['シワやたるみが気になる','肌のハリが失われてきた','くすみがち'];
            advice='コラーゲンやエラスチンをサポートする成分が配合されたエイジングケアが効果的です。浸透力の高い美容液で肌の奥からケアしましょう。';
        }else if(answers.q2==='sensitive'){
            type='【敏感肌ケアタイプ】';
            features=['刺激に弱く赤みが出やすい','化粧品でかぶれやすい','乾燥とテカリの両方がある'];
            advice='低刺激設計で、肌バリアをサポートする成分が配合されたケアが効果的です。無添加のアイテムを選び、ゆっくりと肌を整えましょう。';
        }
        
        if(resultType)resultType.textContent=type;
        if(resultFeatures){
            resultFeatures.innerHTML=features.map(f=>'<li>'+f+'</li>').join('');
        }
        if(resultAdvice)resultAdvice.textContent=advice;
    }
}

function initFAQ(){
    document.querySelectorAll('.faq-item__question').forEach(q=>{
        q.addEventListener('click',()=>{
            const item=q.closest('.faq-item');
            const isOpen=item.classList.contains('is-open');
            document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('is-open'));
            if(!isOpen)item.classList.add('is-open');
        });
    });
}

function initCountdown(){
    const countdownEl=document.getElementById('countdown');
    if(!countdownEl)return;
    
    let h=23,m=59,s=45;
    setInterval(()=>{
        s--;
        if(s<0){s=59;m--}
        if(m<0){m=59;h--}
        if(h<0){h=23;m=59;s=45}
        countdownEl.innerHTML='<span>'+String(h).padStart(2,'0')+'</span>:<span>'+String(m).padStart(2,'0')+'</span>:<span>'+String(s).padStart(2,'0')+'</span>';
    },1000);
}

function initFormHandler(){
    document.querySelectorAll('form').forEach(form=>{
        form.addEventListener('submit',e=>{
            e.preventDefault();
            const btn=form.querySelector('button[type="submit"]');
            if(!btn)return;
            const original=btn.textContent;
            btn.textContent='送信完了！';
            btn.style.background='#10B981';
            setTimeout(()=>{
                btn.textContent=original;
                btn.style.background='';
                form.reset();
            },2000);
        });
    });
}
