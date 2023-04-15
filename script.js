/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const UNCHECKED_IMG = 'images/unchecked.png';
const CHECKED_IMG = 'images/checked.png' ;

function check_choice(choice){
    const box = choice.querySelector('.checkbox');
    choice.classList.add('checked');
    choice.classList.remove('unchecked'); 
    box.src = CHECKED_IMG;

}

function uncheck_choice(choice){
    const box = choice.querySelector('.checkbox');
    box.src = UNCHECKED_IMG;
    choice.classList.add('unchecked');
    choice.classList.remove('checked');
    
}

function checkImage(event){
    const scelta = event.currentTarget;
    let all = scelta.parentElement.querySelectorAll('.choice-grid div');
    answers[scelta.dataset.questionId] = scelta.dataset.choiceId;
    check_choice(scelta);
    for(let blk of all){
        if (blk.dataset.choiceId !== scelta.dataset.choiceId){
            uncheck_choice(blk);
        }
    }

    if(answers["three"] !== undefined){
        displayResults();
    }

}

function noChange(){
    for(box of boxes){
        box.removeEventListener('click', checkImage);
    }
}

function risultatoFinale(){
    let max =-1;
    let risultato="";
    for(const dom in answers){
        let choice = answers[dom];
        let conta = 0;
        for(dm in answers){
            if(answers[dm] === choice){
                conta++;
            }
        }
        if(max < conta){
            risultato = choice;
            max=conta;
        }
    }
    if (max === 1) return answers["one"];
    return risultato;
}


function displayResults(){
noChange();
let ans=risultatoFinale();
let blockAns = document.querySelector('#risposta');



const titAns = blockAns.querySelector('h1');
titAns.textContent = RESULTS_MAP[ans].title;
const parAns = blockAns.querySelector('p');
parAns.textContent = RESULTS_MAP[ans].contents;
blockAns.classList.remove('hidden');

window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });


}

function onListen(div){
    for(let box of div){
        box.addEventListener('click',checkImage);
    }
}


function restartQuiz(event){
    resBlk = event.currentTarget.parentElement;
    answers = {};
    onListen(boxes);
    resBlk.classList.add('hidden');

    const divs = document.querySelectorAll(".choice-grid div");
    for(let box of divs){
        box.classList.remove("checked","unchecked");
        let checkbox = box.querySelector(".checkbox");
        checkbox.src= UNCHECKED_IMG;
        box.addEventListener('click', checkImage);
    }
    window.scroll({top:0});
}



let answers = {} ;

let boxes = document.querySelectorAll('.choice-grid div');
onListen(boxes);

let restartButton = document.querySelector('button');
restartButton.addEventListener('click',restartQuiz);