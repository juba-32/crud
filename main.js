const title=document.getElementById("title")
const price=document.getElementById("price")
const taxes=document.getElementById("taxes")
const ads=document.getElementById("ads")
const discount=document.getElementById("discount")
const total=document.getElementById("total")
const count=document.getElementById("count")
const category=document.getElementById("category")
const submit=document.getElementById("submit")
const tbody =document.getElementById("tbody")
let mode = "create"
let iq;

//get total
function gettotal(){
	if (price.value != "") {
		const result= (+price.value + +taxes.value + +ads.value
			- +discount.value)
		total.innerHTML = result
		total.style.background= "#040"
	}
	else  {
		total.innerHTML=""
		total.style.background = "blue"
	}
}




/*--------------create product--------------------*/
let datapro;
if (localStorage.product !=null) {
	datapro=JSON.parse(localStorage.product)
}else{
	datapro= [];
}



submit.onclick=function(){

	let newpro={
		title:title.value.toLowerCase(),
		price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
	}
	if (mode === "create") {
		if (newpro.count > 1) {
		for(let i = 0; i < newpro.count; i++)
			datapro.push(newpro)
	    }else{
		datapro.push(newpro)
	    }
	}else{
	    datapro[iq] = newpro
	    mode="create"
	    submit.innerHTML="create"
	    count.style.display="block"
	}
	localStorage.setItem("product" , JSON.stringify(datapro))
	console.log(datapro)
	cleardata()
	showdata()
}

//clear inputs 
function cleardata() {
	title.value = "";
	price.value = "";
	taxes.value = "";
	ads.value = "";
	discount.value = "";
	total.innerHTML = "";
	count.value = "";
	category.value = "";
}

//----------------read data
function showdata(){
	gettotal()
    let table=""
    for (let i = 0; i < datapro.length; i++) {
    	   table+=` <tr>
		   	  	<td>${i}</td>
		   	  	<td>${datapro[i].title}</td>
		   	  	<td>${datapro[i].price}</td>
		   	  	<td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td> <button onclick="ubdatedata(${i})" id="ubdate">ubdate</button></td>
                <td> <button onclick="deletedata(${i})" id="delete">delete</button></td>
		   	  </tr>`

      }
 
       
     tbody.innerHTML=table

     let deleteall = document.getElementById("deletall")
	if (datapro.length > 0) {
		deleteall.innerHTML = `<button onclick= "deleteall()">delete all (${datapro.length})</button>`	
	   }else{deleteall.innerHTML= ""}
    }
showdata()

//delete data

function deletedata(i){
    datapro.splice(i,1)
    localStorage.product = JSON.stringify(datapro)
    showdata()

}
function deleteall(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}

//ubdate data

function ubdatedata(i){
   title.value = datapro[i].title
   price.value = datapro[i].price
   taxes.value = datapro[i].taxes
   ads.value = datapro[i].ads
   discount.value = datapro[i].discount
   gettotal()
   category.value = datapro[i].category
   count.style.display="none"
   submit.innerHTML= "ubdate"
   mode= "ubdate"
   iq = i
   scroll({
   	top:0,
   	behavior:"smooth"
   })
}
const search = document.getElementById("search")
let searchmode="title"
function getsearch(id){
	if (id== "titlesearch") {
		searchmode = "title"
		search.placeholder= "search by title"
	}else{
		searchmode = "category"
		search.placeholder= "search by category"
	}
	search.focus()
	search.value =""
	showdata()
}
function searchdata(value){
	let table = ""
   if (searchmode=="title") {
    for(let i = 0; i < datapro.length; i++){
     	if (datapro[i].title.includes(value.toLowerCase())) {
     		  table+=` <tr>
		   	  	<td>${i}</td>
		   	  	<td>${datapro[i].title}</td>
		   	  	<td>${datapro[i].price}</td>
		   	  	<td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td> <button onclick="ubdatedata(${i})" id="ubdate">ubdate</button></td>
                <td> <button onclick="deletedata(${i})" id="delete">delete</button></td>
		   	  </tr>`
     	}
    }  
   }else{
    for(let i = 0; i < datapro.length; i++){
     	if (datapro[i].category.includes(value.toLowerCase())) {
     		  table+=` <tr>
		   	  	<td>${i}</td>
		   	  	<td>${datapro[i].title}</td>
		   	  	<td>${datapro[i].price}</td>
		   	  	<td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td> <button onclick="ubdatedata(${i})" id="ubdate">ubdate</button></td>
                <td> <button onclick="deletedata(${i})" id="delete">delete</button></td>
		   	  </tr>`
     	}
    }
   }
   tbody.innerHTML=table
}