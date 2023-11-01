let allProducts = document.querySelector("#all-products");
let man = document.querySelector("#man");
let woman = document.querySelector("#woman");
let accessories = document.querySelector("#accessories");
let electronics = document.querySelector("#electronics");
let cardContainer = document.querySelector(".card-container");
let priceLow = document.querySelector("#price-low");
let priceHigh = document.querySelector("#price-high");
let rateLow = document.querySelector("#rate-low");
let rateHigh = document.querySelector("#rate-high");
let filter = document.querySelector("#filter");
let basket = document.querySelector(".basket");
let favourites = document.querySelector(".favourite");

let url = "https://fakestoreapi.com/products";
fetch(url).then((res) => res.json()).then((data) => {
  console.log(data);


  data.forEach((elem) => {
    cardContainer.innerHTML += `
        <div class="card" style="width: 18rem">
        <img src="${elem.image}"  style="width: 286px; height: 300px; overflow: hidden" class="card-img-top" alt="..." />
        <div class="card-body" style="position: relative">
          <h5 class="card-title">${elem.title}</h5>
          <p>Price: ${elem.price}</p>
          <p class="rating">
            Rating: ${elem.rating?.rate}<i class="fa-solid fa-star" style="color: #f5db2e"></i>
          </p>
          <p class="card-text">Left stock: ${elem.rating?.count}</p>
          <a href="." class="btn mt-4" style="border:none;"
            ><i
              class="fa-solid fa-basket-shopping basketBtn" name=${elem.id}
              style="color: #0091ff; font-size: 30px; position: absolute;
              left: 10%;
              bottom: 10%;"
            ></i
          ></a>
          <a href="." class="btn mt-4" style="border:none;"
            ><i
              class="fa-solid fa-heart favBtn" name=${elem.id}
              style="color: #ff0000; font-size: 30px; position: absolute;
              left: 33%;
              bottom: 10%;"
            ></i
          ></a>
        </div>
      </div>
`;
  })
  let basketBtns = document.querySelectorAll(".basketBtn");
  let favBtns = document.querySelectorAll(".favBtn");

  // adding product to basket
  basketBtns.forEach((elem) => {
    elem.addEventListener("click", function (e) {
      e.preventDefault();
      let elemId = elem.getAttribute("name");
      console.log(elemId);
      fetch(url + "/" + elemId).then((res) => res.json()).then((data) => {
        basket.innerHTML += ` <div style="background-color:whitesmoke;  display:flex; justify-content:space-between;align-items:center;padding:5px; margin-bottom:10px">
        <img src="${data.image}"  style="width: 80px; height: 80px; overflow: hidden" class="card-img-top" alt="..." />
        <div style="display: inline;"> ${data.title} - ${data.price}</div><button class="btn btn-outline-dark deleteItem" style="display: inline;"><i class="fa-solid fa-trash fa-xl"></i></button></div>`;

        Swal.fire({
          title: `${data.title} added to Basket`,
        })
        let deleteItemBtn = document.querySelectorAll(".deleteItem")
       
        deleteItemBtn.forEach(item => {
          item.addEventListener("click", function () {
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
                  'Your file has been deleted.',
                  'success'
                )
              }
            })

          
          })
        })
      }).catch((err) => console.log(err))
    });
  })
  // adding product to favourites
  favBtns.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      let itemId = item.getAttribute("name");
      fetch(url + "/" + itemId).then((res) => res.json()).then((data) => {
        favourites.innerHTML += ` <div style="background-color:whitesmoke; color:black; display:flex; justify-content:space-between;align-items:center;padding:5px; margin-bottom:10px">
        <img src="${data.image}"  style="width: 80px; height: 80px; overflow: hidden" class="card-img-top" alt="..." />
        <div style="display: inline;"> ${data.title} - ${data.price}</div><button class="btn btn-outline-dark favItem" style="display: inline;"><i class="fa-solid fa-trash fa-xl"></i></button></div>`;

        Swal.fire({
          title: `${data.title} added to Favourites`,
        })

        let unFavItemBtn = document.querySelectorAll(".favItem")
        unFavItemBtn.forEach(item => {
          item.addEventListener("click", function () {
            this.parentElement.remove();
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
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
              }
            })
          })
        })
      }).catch((err) => console.log(err))
    });
  })

  // card alert
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    let cardImg = card.children[0];
    cardImg.addEventListener("click", function () {
      Swal.fire({
        title: `${this.nextElementSibling.children[0].innerText}`,
        text: `${this.nextElementSibling.children[1].innerText}`,
        footer: `${this.nextElementSibling.children[3].innerText}`
      })
    })
  })

  // let foot = document.querySelector("#total");
  // cards.forEach((card) => {
  //   total=0;
  //   document.getElementById("count").innerHTML=card.length;
  //   if(card.length==0){
  //     document.getElementById("total".innerHTML = "$ " +0+ ".00")
  //   }
  //   else{
  //     total=total+price;
  //     document.getElementById("total").innerHTML ="$ " + total + ".00";
  //   }
  // })

   // men's clothing

   man.addEventListener("click", function (e) {
    e.preventDefault();
    Swal.fire({
      title: `Added to Men's clothing section`,
    })

    cardContainer.innerHTML = "";
    data.forEach((elem) => {
      if (elem.category == "men's clothing") {
        cardContainer.innerHTML += `
        <div class="card" style="width: 18rem">
        <img src="${elem.image}"  style="width: 286px; height: 300px; overflow: hidden" class="card-img-top" alt="..." />
        <div class="card-body" style="position: relative">
          <h5 class="card-title">${elem.title}</h5>
          <p>Price: ${elem.price}</p>
          <p class="rating">
            Rating: ${elem.rating?.rate}<i class="fa-solid fa-star" style="color: #f5db2e"></i>
          </p>
          <p class="card-text">Left stock: ${elem.rating?.count}</p>
          <a href="#" class="btn mt-4" style="border:none;"
            ><i
              class="fa-solid fa-basket-shopping basketBtn" name=${elem.id}
              style="color: #0091ff; font-size: 30px; position: absolute;
              left: 10%;
              bottom: 10%;"
            ></i
          ></a>
          <a href="#" class="btn mt-4" style="border:none;"
            ><i
              class="fa-solid fa-heart favBtn" name=${elem.id}
              style="color: #ff0000; font-size: 30px; position: absolute;
              left: 33%;
              bottom: 10%;"
            ></i
          ></a>
        </div>
      </div>
`;
      }
    })
    {
      let basketBtns = document.querySelectorAll(".basketBtn");
      // adding product to basket
      basketBtns.forEach((basketBtn) => {
        basketBtn.addEventListener("click", function () {
          let basketId = basketBtn.getAttribute("name");
          fetch(url + "/" + basketId).then((res) => res.json()).then((data) => {
           
            basket.innerHTML += ` <div style="background-color:whitesmoke; display:flex; justify-content:space-between;align-items:center;padding:5px; margin-bottom:10px">
          <img src="${data.image}"  style="width: 80px; height: 80px; overflow: hidden" class="card-img-top" alt="..." />
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
                      'Your file has been deleted.',
                      'success'
                    )
                  }
                })
              })
            })
          }).catch((err) => console.log(err));
        })
      })

      let cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        let cardImg = card.children[0];
        cardImg.addEventListener("click", function () {
          Swal.fire({
            title: `${this.nextElementSibling.children[0].innerText}`,
            text: `${this.nextElementSibling.children[1].innerText}`,
            footer: `${this.nextElementSibling.children[3].innerText}`
          })
        })
      })
    }
    // adding new element to favourites
    {
      let favBtns = document.querySelectorAll(".favBtn");
      favBtns.forEach((favBtn) => {
        favBtn.addEventListener("click", function () {
          let favId = favBtn.getAttribute("name");
          fetch(url + "/" + favId).then((res) => res.json()).then((data) => {
            favourites.innerHTML += `<div style="background-color:whitesmoke; display:flex; justify-content:space-between;align-items:center;padding:5px; margin-bottom:10px">
          <img src="${data.image}"  style="width: 80px; height: 80px; overflow: hidden" class="card-img-top" alt="..." />
          <div style="display: inline;"> ${data.title} - ${data.price}</div><button class="btn btn-outline-dark deleteItem" style="display: inline;"><i class="fa-solid fa-trash"></i></button></div>`;

            Swal.fire({
              title: `${data.title} added to Favourites`
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
    }
  })

  // women's clothings
  woman.addEventListener("click", function (e) {
    e.preventDefault();
    cardContainer.innerHTML = "";
    data.forEach((elem) => {
      if (elem.category == "women's clothing") {
        cardContainer.innerHTML += `
        <div class="card" style="width: 18rem">
        <img src="${elem.image}"  style="width: 286px; height: 300px; overflow: hidden" class="card-img-top" alt="..." />
        <div class="card-body" style="position: relative">
          <h5 class="card-title">${elem.title}</h5>
          <p>Price: ${elem.price}</p>
          <p class="rating">
            Rating: ${elem.rating?.rate}<i class="fa-solid fa-star" style="color: #f5db2e"></i>
          </p>
          <p class="card-text">Left stock: ${elem.rating?.count}</p>
          <a href="#" class="btn mt-4" style="border:none;"
            ><i
              class="fa-solid fa-basket-shopping basketBtn" name=${elem.id}
              style="color: #0091ff; font-size: 30px; position: absolute;
              left: 10%;
              bottom: 10%;"
            ></i
          ></a>
          <a href="#" class="btn mt-4" style="border:none;"
            ><i
              class="fa-solid fa-heart favBtn" name=${elem.id}
              style="color: #ff0000; font-size: 30px; position: absolute;
              left: 33%;
              bottom: 10%;"
            ></i
          ></a>
        </div>
      </div>
`;
      }

      let basketBtns = document.querySelectorAll(".basketBtn");
      // adding product to basket
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
 
// adding new element to favourites
let favBtns = document.querySelectorAll(".favBtn");
favBtns.forEach((favBtn) => {
  favBtn.addEventListener("click", function () {
    let favId = favBtn.getAttribute("name");
    fetch(url + "/" + favId).then((res) => res.json()).then((data) => {
      favourites.innerHTML += `<div style="background-color:whitesmoke; display:flex; justify-content:space-between;align-items:center;padding:5px; margin-bottom:10px">
      <img src="${data.image}"  style="width: 80px; height: 80px; overflow: hidden" class="card-img-top" alt="..." />
      <div style="display: inline;"> ${data.title} - ${data.price}</div><button class="btn btn-outline-dark deleteItem" style="display: inline;"><i class="fa-solid fa-trash"></i></button></div>`;

      Swal.fire({
        title: `${data.title} added to Favourites`
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

})
Swal.fire({
title: `Added to Women's clothing section`,
})
let cards = document.querySelectorAll(".card");
cards.forEach((card) => {
let cardImg = card.children[0];
cardImg.addEventListener("click", function () {
  Swal.fire({
    title: `${this.nextElementSibling.children[0].innerText}`,
    text: `${this.nextElementSibling.children[1].innerText}`,
    footer: `${this.nextElementSibling.children[3].innerText}`
  })
})
})
})



  // accessories 
  accessories.addEventListener("click", function (e) {
    e.preventDefault();
    Swal.fire({
      title: `You moved to Accessories section`,
    })

    cardContainer.innerHTML = "";
    data.forEach((elem) => {
      if (elem.category == "jewelery") {
        cardContainer.innerHTML += `
        <div class="card" style="width: 18rem">
        <img src="${elem.image}"  style="width: 286px; height: 400px; overflow: hidden" class="card-img-top" alt="..." />
        <div class="card-body" style="position: relative">
          <h5 class="card-title">${elem.title}</h5>
          <p>Price: ${elem.price}</p>
          <p class="rating">
            Rating: ${elem.rating?.rate}<i class="fa-solid fa-star" style="color: #f5db2e"></i>
          </p>
          <p class="card-text">Left stock: ${elem.rating?.count}</p>
          <a href="#" class="btn mt-4" style="border:none;"
            ><i
              class="fa-solid fa-basket-shopping basketBtn" name=${elem.id}
              style="color: #0091ff; font-size: 30px; position: absolute;
              left: 10%;
              bottom: 10%;"
            ></i
          ></a>
          <a href="#" class="btn mt-4" style="border:none;"
            ><i
              class="fa-solid fa-heart favBtn" name=${elem.id}
              style="color: #ff0000; font-size: 30px; position: absolute;
              left: 33%;
              bottom: 10%;"
            ></i
          ></a>
        </div>
      </div>
`;
      }
    })
    {
      let basketBtns = document.querySelectorAll(".basketBtn");
  // adding product to basket
  basketBtns.forEach((basketBtn) => {
    basketBtn.addEventListener("click", function () {
      let basketId = basketBtn.getAttribute("name");
      fetch(url + "/" + basketId).then((res) => res.json()).then((data) => {
        basket.innerHTML += ` <div style="background-color:whitesmoke; display:flex; justify-content:space-between;align-items:center;padding:5px; margin-bottom:10px">
      <img src="${data.image}"  style="width: 80px; height: 80px; overflow: hidden" class="card-img-top" alt="..." />
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
              }
            })
          })
        })
      }).catch((err) => console.log(err));
    })
  })
}
// adding new element to favourites
{
  let favBtns = document.querySelectorAll(".favBtn");
  favBtns.forEach((favBtn) => {
    favBtn.addEventListener("click", function () {
      let favId = favBtn.getAttribute("name");
      fetch(url + "/" + favId).then((res) => res.json()).then((data) => {
        favourites.innerHTML += `<div style="background-color:whitesmoke; display:flex; justify-content:space-between;align-items:center;padding:5px; margin-bottom:10px">
      <img src="${data.image}"  style="width: 60px; height: 60px; overflow: hidden" class="card-img-top" alt="..." />
      <div style="display: inline;"> ${data.title} - ${data.price}</div><button class="btn btn-outline-dark deleteItem" style="display: inline;"><i class="fa-solid fa-trash"></i></button></div>`;

        Swal.fire({
          title: `${data.title} added to Favourites`
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
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    let cardImg = card.children[0];
    cardImg.addEventListener("click", function () {
      Swal.fire({
        title: `${this.nextElementSibling.children[0].innerText}`,
        text: `${this.nextElementSibling.children[1].innerText}`,
        footer: `${this.nextElementSibling.children[3].innerText}`
      })
    })
  })
}
})

  // electronics
  electronics.addEventListener("click", function (e) {
    e.preventDefault();
    cardContainer.innerHTML = "";
    data.forEach((elem) => {
      if (elem.category == "electronics") {
        cardContainer.innerHTML += `
        <div class="card" style="width: 18rem">
        <img src="${elem.image}"  style="width: 286px; height: 400px; overflow: hidden" class="card-img-top" alt="..." />
        <div class="card-body" style="position: relative">
          <h5 class="card-title">${elem.title}</h5>
          <p>Price: ${elem.price}</p>
          <p class="rating">
            Rating: ${elem.rating?.rate}<i class="fa-solid fa-star" style="color: #f5db2e"></i>
          </p>
          <p class="card-text">Left stock: ${elem.rating?.count}</p>
          <a href="#" class="btn mt-4" style="border:none;"
            ><i
              class="fa-solid fa-basket-shopping basketBtn" name=${elem.id}
              style="color: #0091ff; font-size: 30px; position: absolute;
              left: 10%;
              bottom: 10%;"
            ></i
          ></a>
          <a href="#" class="btn mt-4" style="border:none;"
            ><i
              class="fa-solid fa-heart favBtn" name=${elem.id}
              style="color: #ff0000; font-size: 30px; position: absolute;
              left: 33%;
              bottom: 10%;"
            ></i
          ></a>
        </div>
      </div>
`;
      }
    })


    let basketBtns = document.querySelectorAll(".basketBtn");
    Swal.fire({
      title: `You moved to Electronics section`,
    })
    basketBtns.forEach((basketBtn) => {
      let cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        let cardImg = card.children[0];
        cardImg.addEventListener("click", function () {
          Swal.fire({
            title: `${this.nextElementSibling.children[0].innerText}`,
            text: `${this.nextElementSibling.children[1].innerText}`,
            footer: `${this.nextElementSibling.children[3].innerText}`
          })
        })
      })
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
  
// adding new element to favourites
let favBtns = document.querySelectorAll(".favBtn");
favBtns.forEach((favBtn) => {
  favBtn.addEventListener("click", function () {
    let favId = favBtn.getAttribute("name");
    fetch(url + "/" + favId).then((res) => res.json()).then((data) => {
      favourites.innerHTML += `<div style="background-color:whitesmoke; display:flex; justify-content:space-between;align-items:center;padding:5px; margin-bottom:10px">
      <img src="${data.image}"  style="width: 60px; height: 60px; overflow: hidden" class="card-img-top" alt="..." />
      <div style="display: inline;"> ${data.title} - ${data.price}</div><button class="btn btn-outline-dark deleteItem" style="display: inline;"><i class="fa-solid fa-trash"></i></button></div>`;

      Swal.fire({
        title: `${data.title} added to Favourites`
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
})


  // sorting 
  filter.addEventListener("click", function () {
    let selectedValue = filter.value;

    if (selectedValue === "high-rate") {
      data.sort((a, b) => b.rating.rate - a.rating.rate);
      cardContainer.innerHTML = ""
      data.forEach((item) => {
        cardContainer.innerHTML += `
                <div class="card" style="width: 18rem">
                <img src="${item.image}"  style="width: 286px; height: 400px; overflow: hidden" class="card-img-top" alt="..." />
                <div class="card-body" style="position: relative">
                  <h5 class="card-title">${item.title}</h5>
                  <p>Price: ${item.price}</p>
                  <p class="rating">
                    Rating: ${item.rating?.rate}<i class="fa-solid fa-star" style="color: #f5db2e"></i>
                  </p>
                  <p class="card-text">Left stock: ${item.rating?.count}</p>
                  <a href="#" class="btn mt-4" style="border:none;"
                    ><i
                      class="fa-solid fa-basket-shopping"
                      style="color: #0091ff; font-size: 30px; position: absolute;
                      left: 10%;
                      bottom: 10%;"
                    ></i
                  ></a>
                  <a href="#" class="btn mt-4" style="border:none;"
                    ><i
                      class="fa-solid fa-heart"
                      style="color: #ff0000; font-size: 30px; position: absolute;
                      left: 33%;
                      bottom: 10%;"
                    ></i
                  ></a>
                </div>
              </div>
        `;


      })

      let cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        let cardImg = card.children[0];
        cardImg.addEventListener("click", function () {
          Swal.fire({
            title: `${this.nextElementSibling.children[0].innerText}`,
            text: `${this.nextElementSibling.children[1].innerText}`,
            footer: `${this.nextElementSibling.children[3].innerText}`
          })
        })
      })

    } else if (selectedValue === "low-rate") {
      data.sort((a, b) => a.rating.rate - b.rating.rate);
      cardContainer.innerHTML = ""
      data.forEach((item) => {
        cardContainer.innerHTML += `
                <div class="card" style="width: 18rem">
                <img src="${item.image}"  style="width: 286px; height: 400px; overflow: hidden" class="card-img-top" alt="..." />
                <div class="card-body" style="position: relative">
                  <h5 class="card-title">${item.title}</h5>
                  <p>Price: ${item.price}</p>
                  <p class="rating">
                    Rating: ${item.rating?.rate}<i class="fa-solid fa-star" style="color: #f5db2e"></i>
                  </p>
                  <p class="card-text">Left stock: ${item.rating?.count}</p>
                  <a href="#" class="btn mt-4" style="border:none;"
                    ><i
                      class="fa-solid fa-basket-shopping"
                      style="color: #0091ff; font-size: 30px; position: absolute;
                      left: 10%;
                      bottom: 10%;"
                    ></i
                  ></a>
                  <a href="#" class="btn mt-4" style="border:none;"
                    ><i
                      class="fa-solid fa-heart"
                      style="color: #ff0000; font-size: 30px; position: absolute;
                      left: 33%;
                      bottom: 10%;"
                    ></i
                  ></a>
                </div>
              </div>
        `;
      })
      let cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        let cardImg = card.children[0];
        cardImg.addEventListener("click", function () {
          Swal.fire({
            title: `${this.nextElementSibling.children[0].innerText}`,
            text: `${this.nextElementSibling.children[1].innerText}`,
            footer: `${this.nextElementSibling.children[3].innerText}`
          })
        })
      })
    } else if (selectedValue === "high-price") {
      data.sort((a, b) => b.price - a.price);
      cardContainer.innerHTML = ""
      data.forEach((item) => {
        cardContainer.innerHTML += `
            <div class="card" style="width: 18rem">
            <img src="${item.image}"  style="width: 286px; height: 400px; overflow: hidden" class="card-img-top" alt="..." />
            <div class="card-body" style="position: relative">
              <h5 class="card-title">${item.title}</h5>
              <p>Price: ${item.price}</p>
              <p class="rating">
                Rating: ${item.rating?.rate}<i class="fa-solid fa-star" style="color: #f5db2e"></i>
              </p>
              <p class="card-text">Left stock: ${item.rating?.count}</p>
              <a href="#" class="btn mt-4" style="border:none;"
                ><i
                  class="fa-solid fa-basket-shopping"
                  style="color: #0091ff; font-size: 30px; position: absolute;
                  left: 10%;
                  bottom: 10%;"
                ></i
              ></a>
              <a href="#" class="btn mt-4" style="border:none;"
                ><i
                  class="fa-solid fa-heart"
                  style="color: #ff0000; font-size: 30px; position: absolute;
                  left: 33%;
                  bottom: 10%;"
                ></i
              ></a>
            </div>
          </div>
    `;
      })
      let cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        let cardImg = card.children[0];
        cardImg.addEventListener("click", function () {
          Swal.fire({
            title: `${this.nextElementSibling.children[0].innerText}`,
            text: `${this.nextElementSibling.children[1].innerText}`,
            footer: `${this.nextElementSibling.children[3].innerText}`
          })
        })
      })
    } else {
      data.sort((a, b) => a.price - b.price);
      cardContainer.innerHTML = "";
      data.forEach((item) => {
        cardContainer.innerHTML += `
            <div class="card" style="width: 18rem">
            <img src="${item.image}"  style="width: 286px; height: 400px; overflow: hidden" class="card-img-top" alt="..." />
            <div class="card-body" style="position: relative">
              <h5 class="card-title">${item.title}</h5>
              <p>Price: ${item.price}</p>
              <p class="rating">
                Rating: ${item.rating?.rate}<i class="fa-solid fa-star" style="color: #f5db2e"></i>
              </p>
              <p class="card-text">Left stock: ${item.rating?.count}</p>
              <a href="#" class="btn mt-4" style="border:none;"
                ><i
                  class="fa-solid fa-basket-shopping"
                  style="color: #0091ff; font-size: 30px; position: absolute;
                  left: 10%;
                  bottom: 10%;"
                ></i
              ></a>
              <a href="#" class="btn mt-4" style="border:none;"
                ><i
                  class="fa-solid fa-heart"
                  style="color: #ff0000; font-size: 30px; position: absolute;
                  left: 33%;
                  bottom: 10%;"
                ></i
              ></a>
            </div>
          </div>
    `;
      })
      let cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        let cardImg = card.children[0];
        cardImg.addEventListener("click", function () {
          Swal.fire({
            title: `${this.nextElementSibling.children[0].innerText}`,
            text: `${this.nextElementSibling.children[1].innerText}`,
            footer: `${this.nextElementSibling.children[3].innerText}`
          })
        })
      })
    }
  })

})