function changeImg (source, description, alter){
    document.getElementById("imgDisplay").src = source;
    document.getElementById("figure").textContent = description;
    document.getElementById("imgDisplay").alt = alter;
}

