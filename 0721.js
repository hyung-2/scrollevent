
// // 좌표따서 content넣기
// const button = document.querySelector('button')
// const elem = document.getElementById('coords-show-mark')

// function createMessageUnder(elem, html){
//   let message = document.createElement('div')
//   message.style.cssText = "position: fixed; color: red";

//   let coords = elem.getBoundingClientRect()

//   message.style.left = coords.left + 'px'
//   message.style.top = coords.bottom + 'px'
//   message.innerHTML = html
  
//   return message
// }

// function showMessage (){
//   let message = createMessageUnder(elem,"hellow world!") //element를 받아와 메모리에 생성
//   document.body.append(message)
//   setTimeout(()=> message.remove(), 5000)
//   console.log(message)
// }

// button.addEventListener('click',showMessage)
//-------------------------------------------------------------------------------------------
// // 가로 스크롤
// const container = document.querySelector('.container')

// function scrollToItem(e){
//   if(e.target.classList.contains('item')){ //e.target의 클래스리스트에 item이 포함되어있는지 체크
//     console.log(e.target)
//     e.target.scrollIntoView({behavior: 'smooth', inline: "center"}) //scrollIntoView:스크롤한곳을 보겠다는 함수
//   }
// }

// container.addEventListener('click',scrollToItem)
//------------------------------------------------------------------------------------------------

// //세로스크롤을 가로스크롤로 변환
// const container = document.querySelector('.container')
// const clientHeight = document.documentElement.clientHeight //브라우저 창높이
// const scrollHeight = Math.max( //문서높이
//   document.body.scrollHeight, document.documentElement.scrollHeight,
//   document.body.offsetHeight, document.documentElement.offsetHeight,
//   document.body.clientHeight, document.documentElement.clientHeight
// );

// function scrollHorizontally(){
//   console.log(window.pageYOffset / (scrollHeight-clientHeight)) //내가 스크롤한 범위(시작점0 끝점1) / 전체y스크롤 범위
//   container.scrollLeft = (window.pageYOffset / (scrollHeight-clientHeight)) * (container.scrollWidth - container.clientWidth)
//   //container의 scrollLeft는 (내가 y축 이동한거리 / (전체문서높이-브라우저높이=y스크롤범위)) * (container안의 item의 전체 가로길이(스크롤되는)-container의가로길이)
//   // y축에서 내가 이동한 비율 * 가로스크롤의 길이 = 내가 y축을 이동한만큼 가로스크롤을 움직이겠다
// }


// window.addEventListener('scroll', scrollHorizontally)
//------------------------------------------------------------------------------------------------

// //스크롤시 item회전
// const container = document.querySelector('.container')
// const items = document.querySelectorAll('.item')
// let coords = container.getBoundingClientRect() //컨테이너의 좌표값
// let xcenter = coords.width / 2 //컨테이너 좌표값의 절반이 중앙
// let ycenter = coords.height / 2
// const Radius = 350 
// const clientHeight = document.documentElement.clientHeight
// const scrollHeight = Math.max(
//   document.body.scrollHeight, document.documentElement.scrollHeight,
//   document.body.offsetHeight, document.documentElement.offsetHeight,
//   document.body.clientHeight, document.documentElement.clientHeight
// );

// function degToRad(deg){
//   return deg * (Math.PI / 180) //라디안값 공식. PI는 파이
// }

// function setPosition(xc, yc, R, delta){ //delta : 아이템x축에서 현재 item까지의 각도
//   const radian = degToRad(delta) //delta값이 deg이라서 deg에서 radian으로 변경
//   const x = R * Math.cos(radian) + xc
//   const y = R * Math.sin(radian) + yc
//   return [x, y]
// }

// function circleItems(){
//   for(let i=0; i<items.length; i++){
//     const [x, y] = setPosition(xcenter, ycenter, Radius, 360/items.length * (i+1)) //return [x, y] 랑 다른값임
//     items[i].style.left = `${x}px`
//     items[i].style.top = `${y}px`
//   }
  
// }

// function scrollCircular(){
//   const theta = window.pageYOffset / (scrollHeight - clientHeight) * 360 //360도 범위에서 얼만큼 움직일지 설정
//   container.style.transform = `translate(-50%, -50%) rotate(${theta}deg)` //css에서 translate을 설정해놨으니 여기서도 설정해줘야 사라지지않음
// }

// function changeCenter(){ //윈도우 창 크기가 변할때 다시 좌표값 지정-잘안됨ㅋㅋ
//   coords = container.getBoundingClientRect() //컨테이너의 좌표값
//   xcenter = coords.width / 2 //컨테이너 좌표값의 절반이 중앙
//   ycenter = coords.height / 2
//   // container.style.left = `${xcenter}px`
//   // container.style.top = `${ycenter}px`
//   circleItems()
// }
// circleItems()

// window.addEventListener('scroll', scrollCircular)
// window.addEventListener('resize',changeCenter)
//------------------------------------------------------------------------------------------------

//가로 스크롤링(마우스 드래그앤드롭)
const container = document.querySelector('.container')
let isDown = false // 플래그 : 현재 마우스 클릭여부 판단
let startX //마우스 클릭시 마우스의 X 좌표
let scrollLeft //최근 스크롤바 위치 저장

container.addEventListener('mousedown',e =>{
  isDown = true
  container.classList.add('active'); //마우스가 클릭되면 아이템들 크기 살짝 키움
  startX = e.pageX - container.offsetLeft //컨테이너를 기준으로 클릭한 현재 마우스의 x좌표 저장
  scrollLeft = container.scrollLeft //현재 스크롤바 위치 저장
})

function deactive(){
  isDown = false
  container.classList.remove('active')

}

container.addEventListener('mouseleave',deactive) //마우스가 컨테이너밖으로 떠나거나
container.addEventListener('mouseup',deactive)    //마우스 클릭을 뗄때

container.addEventListener('mousemove', e => { //마우스를 드래그했을때
  if(!isDown) return
  e.preventDefault()
  const x = e.pageX - container.offsetLeft //마우스가 드래그할때 현재 마우스의 x 좌표
  const walk = x - startX //마우스 드래그 지점에서 이전에 마우스 클릭 지점까지 이동한 거리
  container.scrollLeft = scrollLeft - walk //최근 스크롤바 위치에서 마우스 이동거리만큼 더하거나 빼줌
})