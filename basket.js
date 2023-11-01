let basketBtns = document.querySelectorAll(".basketBtn");

basketBtns.forEach((basketBtn) => {
  basketBtn.addEventListener("click", function () {
    let basketId = basketBtn.getAttribute("name");
    fetch(url + "/" + basketId).then((res) => res.json()).then((data) => {
      basket.innerHTML += ` <div style="background-color:whitesmoke; display:flex; justify-content:space-between;align-items:center;padding:5px; margin-bottom:10px">
      <img src="${data.image}"  style="width: 60px; height: 60px; overflow: hidden" class="card-img-top" alt="..." />
      <div style="display: inline;"> ${data.title} - ${data.price}</div><button class="btn btn-outline-dark deleteItem" style="display: inline;"><i class="fa-solid fa-trash"></i></button></div>`;

      Swal.fire({
        title: `${data.title} added to Basket`
      })

      let deleteItemBtns = document.querySelectorAll(".deleteItem");
      deleteItemBtns.forEach((deleteItem) => {
        deleteItem.addEventListener("click", function () {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.parentElement.remove();
              Swal.fire(
                'Deleted!',
                'Your choice has been deleted.',
                'success'
              )
            }
          })
        })
      })
    }).catch((err) => console.log(err));
  })
})


function upadateCaseNumber(product, price, isIncreasing) {
    const caseInput = document.getElementById(product + '-number');
    let caseNumber = caseInput.value;

    if (isIncreasing) {
        caseNumber = parseInt(caseNumber) + 1;
    } else if (caseNumber > 0) {
        caseNumber = parseInt(caseNumber) - 1;
    }

    caseInput.value = caseNumber;

    const caseTotal = document.getElementById(product + '-total');
    caseTotal.innerText = caseNumber * price;
    calculateTotal();
    updateTotalprice(); 
}

function getInputvalue(product) {
    const productInput = document.getElementById(product + '-number');
    const productNumber = parseInt(productInput.value);
    return productNumber;
}

function calculateTotal() {
    const juiceTotal = getInputvalue('juice') * 109.95;
    const caseTotal = getInputvalue('case') * 55.99;
    const subTotal = juiceTotal + caseTotal;

    document.getElementById('sub-total').innerText = subTotal;
   
}

document.getElementById('case-plus').addEventListener('click', function () {
    upadateCaseNumber('case', 55.99, true);
});

document.getElementById('case-minus').addEventListener('click', function () {
    upadateCaseNumber('case', 55.99, false);
});

document.getElementById('juice-plus').addEventListener('click', function () {
    upadateCaseNumber('juice', 109.95, true);
});

document.getElementById('juice-minus').addEventListener('click', function () {
    upadateCaseNumber('juice', 109.95, false);
});

function calculateTotalprice() {
    const juiceTotal = getInputvalue('juice') * 109.95;
    const caseTotal = getInputvalue('case') * 55.99;
    const subTotal = juiceTotal + caseTotal;

    return subTotal;
}

function updateTotalprice() {
    const totalprice = calculateTotalprice();
   
    document.getElementById('total-price').innerText = totalprice.toFixed(2);
}


updateTotalprice();
