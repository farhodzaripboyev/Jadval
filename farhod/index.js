let currentPage = 1;
const pageSize = 20;
let totalPages = 1;
let title = '';

let tbodyElement = document.getElementById("myTable");
let prevPageButton = document.getElementById("prevPage");
let nextPageButton = document.getElementById("nextPage");

function searchInput(event) {
    title = event.target.value;
    fetchDataAndRender();
}


function changePage(delta) {
    currentPage += delta;
    if (currentPage < 1) {
        currentPage = 1;
    }
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    fetchDataAndRender();
}


function fetchDataAndRender() {
    let url = ``;
    if(title){
         url = `https://kep.uz/api/problems?page=${currentPage}&page_size=${pageSize}&title=${title}`;
    }else{
         url = `https://kep.uz/api/problems?page=${currentPage}&page_size=${pageSize}`;
    }
    
    
    fetch(url)
        .then(response => response.json())
        .then(json => {
            getData(json);
            totalPages = json.totalPages;
            let data = json.data;
            let size = data.length;
            if(size < 20){
                if (nextPageButton && !nextPageButton.disabled) {
                    nextPageButton.classList.add('disabled-btn');
                    nextPageButton.disabled = true;
                }
            }else{
                nextPageButton.classList.remove('disabled-btn');
                updatePagination();
            }
        });
}

function getData(data) {
    dates = data.data;
    tbodyElement.innerHTML = ""; 

    dates.forEach(date => {
        let newRow = document.createElement("tr");
        let tagsNames = date.tags.map(tag => tag.name).join(', ');

        newRow.innerHTML = `
            <td>${date.id}</td>
            <td>${date.title}</td>
            <td>${date.difficultyTitle}</td>
            <td> <button class="tagName"> ${tagsNames} </button> </td>
            <td> <i class="fa-solid fa-thumbs-up"></i>
                <!-- ... (existing SVG content) ... -->
            </svg> ${date.likesCount} /  <i class="fa-solid fa-thumbs-down"></i>
                <!-- ... (existing SVG content) ... -->
            </svg> ${date.dislikesCount}</td>
            <td> <span class="solved">${date.solved}</span> / <span class="attempCount">${date.attemptsCount}</span> </td>
        `;

        tbodyElement.appendChild(newRow);
    });
}

function updatePagination() {
    document.getElementById("currentPage").innerText = currentPage;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
}

fetchDataAndRender();
