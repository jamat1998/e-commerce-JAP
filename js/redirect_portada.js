const d=document;
const $form=d.querySelector('contact-form');
const $inputs=d.querySelectorAll('.in');
$inputs.forEach(input=>{
    const $span =d.createElement('span');
    $span.textContent=input.title;
    $span.classList.add('contact-form-error', 'none');
    input.insertAdjacentElement('afterend', $span);
    d.addEventListener('submit',(e)=>{
        let pattern = input.pattern;
        let regex = new RegExp(pattern);
        let value = input.value;
        e.preventDefault();
        if((regex.test(value)) && (!$inputs[1].value == '') && (!$inputs[0].value == '')){
            window.location.href = 'https://jamat1998.github.io/e-commerce-JAP/portada.html'
        }
        if(input.value == '' || !regex.test(value)){
         $span.classList.remove('none');
    }
})

})