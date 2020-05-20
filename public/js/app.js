const weather=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#msg-1')
const message2=document.querySelector('#msg-2')

weather.addEventListener('submit',(e)=>{
    e.preventDefault()
    //console.log("Taking location from text box")
    const location=search.value
    message1.textContent='Loading....'
    message2.textContent=''

    fetch('http://localhost:3000/weather?address='+location).then((res)=>{
    
    res.json().then((data)=>{
      
        if(data.error){
            message1.textContent=data.error
    
            }else{
                message1.textContent=data.address
                message2.textContent=data.temperature
                }
        })
    })
})