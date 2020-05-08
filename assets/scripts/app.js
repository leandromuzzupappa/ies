const ti = document.querySelector('#textoIngresado');
const tb = document.querySelector('#textoBonito');
const copy = document.querySelector('#copiar');

const play = () => {
    let audio = new Audio('./assets/sounds/pew.mp3');
    audio.play();
}
const select = () => {
    if (document.selection) { // IE
        range = document.body.createTextRange();
        range.moveToElementText(tb);
        range.select();
    } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(tb);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
    Object.assign(tb.style, {
        border: '1px solid #fdcb6e'
    })
    Object.assign(copy.style, {
        background: '#fdcb6e'
    })
}
const deselect = () => {
    if (document.selection) { // IE
        document.selection.empty();
    } else if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }
    Object.assign(tb.style, {
        border: '1px solid #6c5ce7'
    })
    Object.assign(copy.style, {
        background: '#6c5ce7'
    })
}
const copyText = () => {
    let range;
    select();
    document.execCommand('copy');
    setTimeout(() => {
        deselect();
    }, 100);
    play();

}
const handleText = () => {
    ti.value.length > 0 ?
        (
            Object.assign(tb.style, {
                opacity: 1,
                top: '150%'
            }),
            Object.assign(copy.style, {
                opacity: 1,
            })
        ) :
        (
            Object.assign(tb.style, {
                opacity: 0,
                top: '0%'
            }),
            Object.assign(copy.style, {
                opacity: 0,
            })
        )


    let stringBonito = ti.value;
    let ptrn = /[aeouAEOU]+/gm;
    stringBonito = stringBonito.replace(ptrn, 'i')

    tb.innerHTML = stringBonito;

}

window.addEventListener('load', handleText);
ti.addEventListener('keyup', handleText);
ti.addEventListener('paste', handleText);
copy.addEventListener('click', copyText);
tb.addEventListener('click', copyText);
ti.addEventListener('click', () => {
    ti.select();
})