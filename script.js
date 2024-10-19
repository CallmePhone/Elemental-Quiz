let elements = [];
let score = 0;
let currentElementIndex = 0;

// ฟังก์ชันสุ่มสี
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

async function loadElements() {
    try {
        console.log('เริ่มโหลดข้อมูลธาตุ');
        const response = await fetch('elements.json');
        if (!response.ok) throw new Error('Network response was not ok');
        elements = await response.json();
        // console.log('โหลดข้อมูลธาตุเสร็จสิ้น:', elements);
        // alert('โหลดข้อมูลธาตุเสร็จสิ้น!');
        updateElement();
    } catch (error) {
        console.error('Error loading elements:', error);
        alert('ไม่สามารถโหลดข้อมูลธาตุได้!');
        document.getElementById("result").textContent = "ไม่สามารถโหลดข้อมูลธาตุได้!";
    }
}

function updateElement() {
    const elementName = document.getElementById("element-name");
    elementName.textContent = elements[currentElementIndex].symbol;
    elementName.style.color = getRandomColor(); // เปลี่ยนสีแบบสุ่ม
    document.getElementById("answer").value = '';
    document.getElementById("result").textContent = '';
    document.getElementById("result").className = '';
}

document.getElementById("submit").addEventListener("click", () => {
    const userAnswer = document.getElementById("answer").value;
    const correctAnswer = elements[currentElementIndex].name;
    const resultElement = document.getElementById("result");

    if (userAnswer.trim() === correctAnswer) {
        score++;
        resultElement.textContent = "ถูกต้อง!";
        resultElement.className = "correct";
        alert("คุณตอบถูกต้อง! คะแนนเพิ่มขึ้นเป็น " + score);
    } else {
        resultElement.textContent = `ผิด! คำตอบที่ถูกคือ ${correctAnswer}`;
        resultElement.className = "incorrect";
        alert("คุณตอบผิด! คำตอบที่ถูกคือ " + correctAnswer);
    }

    document.getElementById("score").textContent = `คะแนน: ${score}`;
    currentElementIndex = (currentElementIndex + 1) % elements.length;
    updateElement();
});

document.getElementById("reset").addEventListener("click", () => {
    score = 0;
    currentElementIndex = 0;
    updateElement();
    document.getElementById("score").textContent = `คะแนน: ${score}`;
});

// โหลดธาตุเมื่อเริ่ม
loadElements();
