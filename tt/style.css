let input = document.getElementById('taskInput')
let addbtn = document.getElementById('add')
let tasklist = document.getElementById('list')

function add(){
    let txt = input.value
    .trim()
    if(txt == "") return
    let li = document.createElement('li')
    li.innerHTML= `
        <div>
            <span class="markbtn">[ ]</span>
            <span class="taskname">${txt}</span>
        </div>
        <span class="delbtn">x</span>
    `
    li.querySelector('.taskname')
    .addEventListener('click',()=>{
        if(!li.querySelector('.taskname').classList.contains('ed')){
            console.log(li.querySelector('.taskname').textContent)
            let inpp = document.createElement('input')
            li.querySelector('.taskname').classList.add('ed')
            inpp.type='text'
            li.querySelector('.taskname').innerHTML=''
            inpp.value = txt
            li.querySelector('.taskname').appendChild(inpp)
            console.log(li.querySelector('.taskname'))
            inpp.addEventListener('keypress',(e)=>{
                if(e.key==='Enter'){
                    li.querySelector('.taskname').innerHTML = inpp.value
                    txt = li.querySelector('.taskname').textContent
                    li.querySelector('.taskname').classList.remove('ed')
                }
            })
        }
    })

    li.querySelector('.markbtn')
    .addEventListener('click',()=>{
        li.classList.toggle('scsed')
    })

    li.querySelector('.delbtn')
    .addEventListener('click',()=>{
        li.remove()
    })
    
    tasklist.appendChild(li)
    input.value = ""
}

addbtn.addEventListener('click',add)

input.addEventListener('keypress',
    (e)=>{ if(e.key==='Enter') add }
)
