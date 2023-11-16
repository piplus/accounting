// อ้างอิงelement บนhtml
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// dict
let dataTransaction=[
]

let tracnsaction = dataTransaction;

function init(){
    list.innerHTML="";
    tracnsaction.forEach(addDataToList);
    calculateMoney();
}
function addDataToList(tracnsaction){   
    const symbol = tracnsaction.amount < 0 ? '-' : '+';
    const status = tracnsaction.amount < 0 ? 'minus' : 'plus';
    // console.log(symbol);
    const item  = document.createElement('li');
    // item.innerHTML = 'ค่าซ่อมรถ <span>- ฿400</span><button class="delete-btn">x</button>';
    result = formatNumber(Math.abs(tracnsaction.amount))
    item.classList.add(status);
    item.innerHTML = `${tracnsaction.text} <span>${symbol} ฿${result}</span><button class="delete-btn" onclick="removeData(${tracnsaction.id})">x</button>`;
    list.appendChild(item);
    console.log(item);
}

function formatNumber(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function calculateMoney(){
    const amounts = tracnsaction.map(tracnsaction=>tracnsaction.amount);
    console.log(amounts);
    // คำนวนยอดคงเหลือ
    const total = amounts.reduce((result,item)=>(result+=item),0).toFixed(2);
    console.log(total);
    // คำนวณรายรับ
    const income = amounts.filter(item=>item > 0).reduce((result,item)=>(result+=item),0).toFixed(2);
    console.log(income);
    // คำนวณรายจ่าย
    const expense = (amounts.filter(item=>item < 0).reduce((result,item)=>(result+=item),0)*-1).toFixed(2);
    console.log(expense);

    // แสดงผลบนเว็บ
    balance.innerText=`฿`+formatNumber(total);
    money_plus.innerText=`฿`+formatNumber(income);
    money_minus.innerText=`฿`+formatNumber(expense);
}
function autoID(){
    return Math.floor(Math.random()*1000000);
}

function removeData(id){
    console.log("delete data",id);
    tracnsaction = tracnsaction.filter(tracnsaction=>tracnsaction.id!= id);
    init();
}

function addTransaction(e){
    e.preventDefault();
    console.log("send data >> ");
    if(text.value.trim() == "" || amount.value.trim() == ""){
        alert("กรุณาป้อนข้อมูล");
    }else{
        console.log(typeof(text.value));
        console.log(typeof(+amount.value));
        console.log(autoID());
        const data={
            id:autoID(),text:text.value,amount:+amount.value
        }
        tracnsaction.push(data);
        console.log(tracnsaction);
        addDataToList(data);
        calculateMoney();
        text.value="";
        amount.value="";
    }
}

form.addEventListener('submit',addTransaction);

init();