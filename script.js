document.getElementById("smartsum").addEventListener('click',()=>{
    let inp = prompt('10 20 abc 5 -3 2.5')
    let nums = inp.split(' ').map(Number).filter(num=>!isNaN(num))
    let sum = nums.reduce((a,c)=>a+c, 0)
    let count = nums.length
    let avgnum = count >0 ? sum / count : 0
    alert(`sum: ${sum}\ncount: ${count}\naverage number: ${avgnum}`)
})

document.getElementById("palindrom").addEventListener('click',()=>{
    let inp = prompt('А роза упала на лапу Азора')
    let cleaned = inp.toLowerCase().replace(/[^a-z0-9а-я]/g,'')
    let reversed = cleaned.split('').reverse().join('')
    alert(`${cleaned == reversed}`)
})

document.getElementById("rle").addEventListener('click',()=>{
    let inp = prompt('aaabbbccc')
    let rle = ''
    let count = 1
    for(let i =0; i < inp.length; i++){
        if(inp[i] === inp[i+1])
            count++
        else {
            rle+=inp[i]+count
            count=1
        }
    }
    alert(`${rle}`)
})

document.getElementById("umnozhenie").addEventListener('click',()=>{
    let inp = prompt('N')
    let div = document.querySelector('.table')
    let table = document.createElement('table')
    for(let i = 1; i <= inp; i++) {
        let tr = document.createElement('tr')
        for(let j = 1; j<=inp;j++){
            let td = document.createElement('td')
            td.textContent=i * j
            if(i==j){
                td.style.backgroundColor = 'green'
                td.style.color = 'white'
            }
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    div.appendChild(table)
})


document.getElementById("randpswrd").addEventListener('click',()=>{
    let inp = prompt('length')
    let chars = '1234567890qwertyuiopasdfghjkl;[]zxcvbnm,./QWERTYUIOPASDFGHJKLZXCVBNM'
    let password = ''
    for(let i = 0;i<inp; i++){
        let rand = Math.floor(Math.random()*chars.length)
        password += chars[rand]
    }
    alert(password)
})

buble = (arr)=>{
    let n = arr.length;
    let rech;
    do{
        rech = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                let tem = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tem;
                rech = true;
            }
        }
        n--;
    }while(rech)
    return arr;
}
document.getElementById("buble").addEventListener('click',()=>{
    let inp = prompt('array: 1 2 3 4 5 5 5 5 4 4')
    let arr = inp.split(' ')
    alert(buble(arr))
})
let timer = document.querySelector('.timer');
let timeend = 60 * 60
let timer_id = null
function updateTimer() {
    let minutes = Math.floor(timeend / 60)
    let seconds = timeend % 60
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}
document.getElementById("examtimer_start").addEventListener('click',()=>{
    if (timer_id !== null) return;

    timer_id = setInterval(() => {
        if (timeend > 0) {
            timeend--;
            updateTimer();
        } else {
            clearInterval(timer_id);
        }
    }, 1000);
})
function pauseTimer(){
    clearInterval(timer_id);
    timer_id = null;
}
document.getElementById("examtimer_pause").addEventListener('click',()=>{
    pauseTimer()
})
document.getElementById("examtimer_reset").addEventListener('click',()=>{
    pauseTimer();
    timeend = 60 * 60;
    updateTimer();
})