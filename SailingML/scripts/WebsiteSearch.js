const userCardTemplate=document.querySelector("[data-user-template]");
const userCardContainer=document.querySelector("[data-user-cards-container]");
const searchInput=document.querySelector("[data-search]");

let helms=[];

searchInput.addEventListener("input",(e)=>{
  const value = e.target.value.toLowerCase();
  console.log('-')
  helms.forEach(helm=>{

      const isVisible = 
      helm.name.toLowerCase().includes(value) 
      || helm.boatNumber.includes(value)  




      helm.element.classList.toggle("hide",!isVisible)
  })
})



fetch("https://rhvzwuhewi.execute-api.eu-west-2.amazonaws.com/dev/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    
    query: `
      query {
        allHelms{
          name
          boatName
          boatNumber
          pY
        }
      }
    `,
  }),
})
    .then(res => res.json())
    .then(data => {
        helms = data.data.allHelms.map(helm => {
            const card = userCardTemplate.content.cloneNode(true).children[0];
            const header = card.querySelector("[data-header]");
            const body =card.querySelector("[data-body]");
            header.textContent=helm.name+ 
            ' - '+helm.boatName.toUpperCase() + ' - ' + helm.boatNumber;
            
            body.textContent=helm.boatName;
            body.textContent=helm.boatNumber;
            body.textContent='pY - '+helm.pY;
            userCardContainer.append(card);
            return { name: helm.name, boatNumber: helm.boatNumber,boatName: helm.boatName,pY: helm.pY, element: card};
        })
    })