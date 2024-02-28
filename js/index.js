const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    //console.log(phones);
    displayPhones(phones,isShowAll);
}
const displayPhones = (phones,isShowAll) => {
    //console.log(phones);

    const phoneContainer = document.getElementById('phone-container');


    phoneContainer.textContent = '';

    // display show all button if there have more then 12 phones...

    const showAllButton = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllButton.classList.remove('hidden');
    }else{
        showAllButton.classList.add('hidden');
    }




    // display first 12 phones if is not show all....
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    
    phones.forEach(phone => {
        //console.log(phone);

        const phoneDiv = document.createElement('div');
        phoneDiv.classList = `card w-96 bg-base-100 shadow-xl`;
        phoneDiv.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body gap-10">
            <div class="flex-1 text-center ">
                <h2 class=" text-center p-4 text-[24px] font-bold">${phone.phone_name}</h2>
                <p class=" text-center p-2 text-[16px] font-normal">${phone.slug}</p>
                <h3 class="text-center text-[20px] font-bold  p-4">$999</h3>
                <div class="text-center justify-end  p-4">
                    <button onclick="handleShowDetails('${phone.slug}')" class="btn bg-blue-600 text-white ">Show Details</button>
                </div>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    })

    // hide loading spinner

    toggleLoadingSpinner(false)
}


const handleSearch = (isShowAll) => {
    
    toggleLoadingSpinner(true);
    searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //console.log(searchText);
    loadPhone(searchText,isShowAll);

}


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}





const handleShowDetails = async(id) =>{
    //console.log('show details click',id)


    //load single phone details..
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json(); // Add 'await' here
    console.log(data);
    const mobile = data.data;
    console.log(data.data);

    showPhoneDetails(mobile);
}


const showPhoneDetails = (phone) =>{

    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText =phone.name;


    const phoneImage = document.getElementById('show-details-phone-image');
    phoneImage.src = phone.image;


    const phoneMemory = document.getElementById('show-details-phone-memory');
    phoneMemory.innerText = phone.mainFeatures.memory;
    
    


    //console.log(phone);
    my_modal_5.showModal();
}

//loadPhone();