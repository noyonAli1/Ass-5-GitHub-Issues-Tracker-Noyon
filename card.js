
const showSpinner =(status)=>{
  const spinnerDiv = document.getElementById("spinner-div")
  const allCardDiv = document.getElementById("all-card")
  if(status===true){
    spinnerDiv.classList.remove("hidden")
    allCardDiv.classList.add("hidden")
  }else{
    spinnerDiv.classList.add("hidden")
    allCardDiv.classList.remove("hidden")
  }
}


const allcards = () => {
   showSpinner(true)
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => cardsection(data.data))

}

const fetchOpenCards = async()=>{
  showSpinner(true)
   fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) =>{
      const openIssues = data.data.filter(singleData=> singleData.status==="open")
      cardsection(openIssues)
    })

}
const fetchCloseCards = async()=>{
 showSpinner(true)
   fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) =>{
      const closeIssues = data.data.filter(singleData=> singleData.status==="closed")
      cardsection(closeIssues)
    })

}
//modal.......................................................
const fetchSingleIssue = (id)=>{
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((res) => res.json())
    .then((data) =>{
     showModal(data.data)
    })
  
}
//  id: 1,
//   title: "Fix navigation menu on mobile devices",
//   description:
//     "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//   status: "open",
//   priority: "high",
//   labels: [
//     "bug",
//     "help wanted"
//   ],
//   author: "john_doe",
//   assignee: "jane_smith",
//   createdAt: "2024-01-15T10:30:00Z",
//   updatedAt: "2024-01-15T10:30:00Z"
const showModal = (issue)=>{
  my_modal_1.showModal()
  const modalcontent =  document.getElementById("modal-content");
  const addDiv = document.createElement("div");
     modalcontent.innerHTML = `
     
    <div>

                <!-- /// -->
                <h2 class="text-xl font-bold mb-2">
                    Fix broken image uploads
                </h2>

                <!-- Status -->
                <div class="flex items-center gap-2 text-sm mb-4">
                    <span class="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                        Opened
                    </span>
                    <span class="text-gray-500">• Opened by Fahim Ahmed</span>
                    <span class="text-gray-500">• 22/02/2026</span>
                </div>

                <!-- Labels -->
                <div class="flex gap-2 mb-4">
                    <span class="badge badge-error badge-outline">
                        <i class="fa-solid fa-bug"></i> BUG
                    </span>

                    <span class="badge badge-warning badge-outline">
                        <i class="fa-regular fa-life-ring"></i> HELP WANTED
                    </span>
                </div>

                <!-- Description -->
                <p class="text-gray-600 mb-6">
                    The navigation menu doesn't collapse properly on mobile devices.
                    Need to fix the responsive behavior.
                </p>

                <!-- Info Section -->
                <div class="bg-gray-100 rounded-lg p-4 flex justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">Assignee:</p>
                        <p class="font-semibold">Fahim Ahmed</p>
                    </div>

                    <div>
                        <p class="text-gray-500 text-sm">Priority:</p>
                        <span class="badge badge-error">HIGH</span>
                    </div>
                </div>
                  <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-info">Close</button>
                </form>
            </div>
     
     
     `;
    modalcontent.append(addDiv)  ;
}
//..................................................
////all card section...
const cardsection = (card) => {
  showSpinner(false)
document.getElementById("issus-count").innerText = card.length
  const allcard = document.getElementById("all-card");

  allcard.innerHTML = "";

  card.forEach(car => {

    const divadd = document.createElement("div");
//....................................
// "id": 1,
//       "title": "Fix navigation menu on mobile devices",
//       "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//       "status": "open",
//       "labels": [
//         "bug",
//         "help wanted"
//       ],
//       "priority": "high",
//       "author": "john_doe",
//       "assignee": "jane_smith",
//       "createdAt": "2024-01-15T10:30:00Z",
//       "updatedAt": "2024-01-15T10:30:00Z"
///........................
    divadd.innerHTML = `

<div onclick="fetchSingleIssue(${car.id})" class="card bg-base-100 shadow border-t-4 ${car.status==="open"? "border-green-500": "border-violet-500"} ">

  <div class="card-body p-4">

    <div class="flex justify-between items-center">

      <img src="./assets/Open-Status.png" alt="">

      <span class="badge uppercase rounded-full ${car.priority==='high'? "badge-error" : car.priority==='low'? "badge-warning" : "badge-accent"}  ">
        ${car.priority}
      </span>

    </div>


    <h3 class="font-semibold text-[16px] mt-2">
      ${car.title}
    </h3>


    <p class="text-xs text-gray-500">
      ${car.description}
    </p>


    <div class="flex gap-2 mt-2">

      ${
        car.labels.includes("bug")
          ? `<span class="badge badge-error badge-outline">
               <i class="fa-solid fa-bug"></i> BUG
             </span>`
          : ""
      }

      ${
        car.labels.includes("help wanted")
          ? `<span class="badge badge-warning badge-outline">
               <i class="fa-regular fa-life-ring"></i> HELP WANTED
             </span>`
          : ""
      }
      ${
        car.labels.includes("good first issue")
          ? `<span class="badge badge-warning badge-outline uppercase text-xs">
               <i class="fa-regular fa-life-ring"></i>good first issue
             </span>`
          : ""
      }
      ${
        car.labels.includes("enhancement")
          ? `<span class="badge badge-warning badge-outline uppercase">
               <i class="fa-regular fa-star"></i>enhancement
             </span>`
          : ""
      }
      ${
        car.labels.includes("documentation")
          ? `<span class="badge badge-warning badge-outline uppercase">
               <i class="fa-regular fa-star"></i>documentation
             </span>`
          : ""
      }

    </div>


    <div class="text-xs text-gray-400 mt-3">

      <p>#${car.id} by ${car.author}</p>

      <p>${new Date(car.createdAt).toLocaleDateString()}</p>

    </div>

  </div>

</div>

    `;

    allcard.appendChild(divadd);

  });

}

allcards();