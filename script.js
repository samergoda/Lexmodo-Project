const dataRow = document.getElementById("cards");
const search = document.querySelector(".search");
const searchLayout = document.querySelector(".searchLayout");
const select = document.getElementById("select");

const getData = async function (id) {
  // console.log(id);
  let data = await fetch(`http://jsonplaceholder.typicode.com/users/${id}`);
  data = await data.json();
  // console.log(data);
  displayUsers(data);
  searchUser(data);
  sort(data);
};
getData("");

const displayUsers = function (data) {
  // console.log(data);
  c = "";
  for (let i = 0; i < data.length; i++) {
    // console.log(data);
    c += `
       <div   class="card">
        <div class="headCard">
          <img src="./img/team-${i}.jpg " alt="Avatar">
        <div class="container">
            <h4>${data[i].name || data.name}</h4>
            <p class="text-gray">@${data[i].username || data.username}</p>
            <p class="text-blue">${
              data[i].company.catchPhrase || data.company.catchPhrase
            }</p>
        </div>
        </div>
        <div class="content">
            <ul>
                <li><i class="fa-regular fa-envelope"></i>${
                  data[i].email || data.email
                }</li>
                <li><i class="fa-solid fa-location-dot"></i>${
                  data[i].address.street
                },${data[i].address.suite},${data[i].address.city},${
      data[i].address.zipcode
    },${data[i].address.geo.lat},${data[i].address.geo.lng || "egypt"}</li>
                <li><i class="fa-solid fa-phone"></i>${
                  data[i].phone || data.phone
                }</li>
                <li><i class="fa-solid fa-globe"></i><a href='${
                  data[i].website
                }'>${data[i].website || data.website}</a></li>
                <li><i class="fa-solid fa-briefcase"></i>${
                  data[i].company.name || data.company.name
                }</li>
                <li><i class="fa-regular fa-building"></i>${
                  data[i].company.bs || data.company.bs
                }</li>
            </ul>
            


        </div>
    </div>
       `;
    dataRow.innerHTML = c;
  }
};

// search
const searchUser = function (data) {
  const dataArr = Array.from(data);
  search.closest(".searchParent").addEventListener("keyup", function (e) {
    searchLayout.classList.add("hidden");
    let value = e.target.value;
    // console.log(data);
    if (dataArr.length === 0) return;
    let users = dataArr.find((user) => {
      if (user.name.toLowerCase().includes(value.toLowerCase())) {
        displayUsers(user);
        // getData(user.id)
      } else {
        dataRow.innerHTML = "no customer(s) found with the search criteria";
      }
    });
    //    console.log(users);
  });
};

// sort
const sort = function (data) {
  select.addEventListener("change", function () {
    // console.log(this.value);
    if (this.value === "az") {
      displayUsers(data.sort());
    } else {
      displayUsers(data.reverse());
    }
  });
};
