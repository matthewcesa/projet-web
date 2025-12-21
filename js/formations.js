function onClick(){
    window.location.href = 'cycle_ingenieur.html';
}

function onChange(element) {
    const url = element.value;
    if (url !== "") {
        window.location.href = url;
    }
}