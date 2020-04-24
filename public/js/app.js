console.log("Client side java script file loaded")
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = ''
    messageTwo.textContent = 'Loading...'
    const url = 'http://localhost:2020/weather?address='+location
    fetch(url).then((response)=>{
        response.json().then((data)=>{
              if(data.error){
                  messageOne.textContent = data.error
                  messageTwo.textContent = ''
              }else{
                messageOne.textContent = data.location;
                messageTwo.textContent =data.forecast;
              }
        })
    })
})