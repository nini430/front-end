
const mainPaginationContainer=document.querySelector(".pagination")
const paginationContainer = document.querySelector('.pagination-container');
const prevBtn=document.querySelector(".prev");
const nextBtn=document.querySelector(".next");




  
 const paginationRender= async () => {
    paginationContainer.innerText = '';
    totalRecords = (await getFragmentedData(currentPage)).total;
    prevBtn.classList.remove(`${totalRecords&& "none"}`);
    nextBtn.classList.remove(`${totalRecords&& "none"}`);
    pages = Math.ceil(totalRecords / recordPerPage);
   

    for (let text = 1; text <= pages; text++) {
      const button = getButton(text);
      button.addEventListener('click', () => goToPage(button, text));
      button.classList.add('page-link');
      button.setAttribute('data-id', text);
      button.setAttribute('id', text);
      paginationContainer.appendChild(button);
    }
  
}




const prev = async () => {
  if (currentPage === 1) {
    return;
  }
 currentPage = currentPage - 1;
  const currentBtn = document.getElementById(currentPage);
  await goToPage(currentBtn, currentPage);
};

const next = async () => {
  if (currentPage === pages) {
    return;
  }
 currentPage = currentPage + 1;
  const currentBtn = document.getElementById(currentPage);
  await goToPage(currentBtn,currentPage);
};

goToPage = (elem, pageNumber) => {
  currentPage = pageNumber;
  let paginatedArray = document.querySelectorAll('.page-link');
  paginatedArray.forEach((item) => {
    item.classList.remove('active');
  });

  elem?.classList.add('active');

   render(pageNumber);
};

const goToLastPage = async () => {

  currentPage = pages;
  const currentBtn = document.getElementById(currentPage);
  await goToPage(currentBtn, currentPage);
  
};

const getButton = (text) => {
  let paginationButton = document.createElement('button');
  paginationButton.innerText = text;
  if (+paginationButton.innerText === currentPage) {
    paginationButton.classList.add('active');
  }
  return paginationButton;
};

paginationRender();
