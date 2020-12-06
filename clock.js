const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector(".js-timeline"),
    ampmScreen = document.querySelector(".ampm");
const noticeOne = document.querySelector(".noticeOne"),
    noticeTwo = document.querySelector(".noticeTwo"),
    noticeThree = document.querySelector(".noticeThree");

function getTime() {
    let date = new Date(), minutes = date.getMinutes(), hours = date.getHours(), seconds = date.getSeconds();
    let ampm;
    hours = (hours < 10) ? `0${hours}` : hours;
    if (parseInt(hours, 10) > 12) {
        hours = parseInt(hours, 10) - 12;
        ampm = "PM";
    } else {
        ampm = "AM";
    }
    clockTitle.innerHTML = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    ampmScreen.innerHTML = ampm;
    function nexthours(addTime) {
        let Nhours = date.getHours() + addTime
        if (Nhours >= 24 && Nhours < 36) {
            Nhours = `내일</br> ${Nhours - 24} AM`;
        } else if (Nhours === 36) {
            Nhours = "내일</br> 12 PM";
        } else if (Nhours >= 12 && Nhours < 24) {
            Nhours = `${Nhours - 12} PM`;
        } else {
            Nhours = `${Nhours} AM`;
        }
        return Nhours;
    }
    function makeTommarow() {
        tmr = parseInt(hours, 10)
        return `${tmr} ${ampm}`
    }
    noticeOne.innerHTML = `${nexthours(6)}`
    noticeTwo.innerHTML = `${nexthours(12)}`
    noticeThree.innerHTML = `내일</br> ${makeTommarow()}`
}

function init() {
    setInterval(getTime, 1000);
}

init();