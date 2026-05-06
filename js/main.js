
window.onload = function()
{
   
    fetch("./features/navbar.html")
      .then(response => response.text())
    .then(data => {
            document.getElementById("navbar").innerHTML = data
           
    })
    .catch(error =>{
        console.error("Error loading  navigation links" , error)
    })
    
}




    window.onload = function()
{
      fetch("../features/onland.html")
      .then(response => response.text())
    .then(data => {
            document.getElementById("onland").innerHTML = data
           
    })
    .catch(error =>{
        console.error("Error loading  onlands" , error)
    })

    
}
  window.onload = function()
{
      fetch("../project-4/features/footer.html")
      .then(response => response.text())
    .then(data => {
            document.getElementById("footer").innerHTML = data
           
    })
    .catch(error =>{
        console.error("Error loading  footer" , error)
    })

    
}