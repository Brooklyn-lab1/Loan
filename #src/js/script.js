jQuery(document).ready(function () {
   //----Format Webp---------
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src =
         'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
   }
   testWebP(function (support) {
      if (support == true) {
         document.querySelector('body').classList.add('webp');
      }
   });


   const burger = document.querySelector('.burger')
   const nav = document.querySelector('.header__nav')
   const body = document.querySelector('body')

   burger.addEventListener('click', () => {
      burger.classList.toggle('active')
      nav.classList.toggle('active')
      body.classList.toggle('active')
   })


   let smoothLinks = document.querySelectorAll('a[href*="#"]')

   smoothLinks.forEach(elem => {
      elem.addEventListener('click', event => {
         event.preventDefault()

         let id = elem.getAttribute('href')

         document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
         })
      })
   })

   let headerAccord = document.querySelectorAll('.faq__header');

   headerAccord.forEach(head => {
      head.addEventListener('click', function () {
         let activeWrapperItem = document.querySelectorAll('.faq__text-wrapper.active')

         activeWrapperItem.forEach(item => {
            item.classList.remove('active')
         })

         let parentItem = head.parentNode;
         let wrapperItem = parentItem.querySelector('.faq__text-wrapper');

         if (wrapperItem.classList.contains('active')) {
            wrapperItem.classList.remove('active')
         } else {
            wrapperItem.classList.add('active')
         }
      })
   })

   const button = document.querySelector('#button')
   const backBatton = document.querySelector('#backButton')
   const content = document.querySelector('.form__content')
   let stepNum = document.querySelector('#stepNum')

   let data = {
      personalized: '',
      name: '',
      lastName: '',
   }

   const step_1 = `
   <div class='form__body-wrapper step1'>
      <p class="form__title">
         Request your personalized loan-proposal
      </p>

      <div class="form__body">
         <label for="radio1" class="form__radio">
            <input class="form__radio-input" type="radio" name="personalized" id="radio1" data-attribute='<5k'>
            <span class="form__radio-text">Less than €5,000</span>
         </label>
         <label for="radio2" class="form__radio">
            <input class="form__radio-input" type="radio" name="personalized" id="radio2" data-attribute='>5k'>
            <span class="form__radio-text">€5,000-€25,000</span>
         </label>
         <label for="radio3" class="form__radio">
            <input class="form__radio-input" type="radio" name="personalized" id="radio3" data-attribute='>25k'>
            <span class="form__radio-text">More than €25,000</span>
         </label>
      </div>   
   </div>
`
   const step_2 = `
   <div class='form__body-wrapper step2'>  
      <p class="form__title">
      Fill the rows below to suits better loan-offer for you
      </p>

      <div class="form__body">
         <input type="text" name='name' class="form__input" placeholder="First name">
         <input type="text" name='lastName' class="form__input" placeholder="Last name">
      </div>
   </div>
   `

   const step_3 = `
   <div class='form__body-wrapper step3'>  
      <p class="form__title">
      Fill the rows below to suits better loan-offer for you
      </p>

      <div class="form__body">
         <input type="text" name='number' class="form__input" placeholder="ID-number" data-attribute='number'>
         <input type="text" name='date' class="form__input" placeholder="Date of birth" data-attribute='birth'>
      </div>
   </div>
   `


   content.innerHTML = step_1;

   // console.log(stepNum)
   // function count() {
   //    stepNum.innerHTML = 2
   // }
   // count()

   function toggleSteps(step) {
      content.innerHTML = step
   }

   // function checkedRadio() {
   //    let radio = document.querySelectorAll('.form__radio')
   //    console.log(radio)
   //    radio.forEach(input => {
   //       let input = input

   //       console.log(input)
   //    })
   // }

   let radioInputs = document.querySelectorAll('.form__radio-input')
   radioInputs.forEach(input => {
      data.personalized = input.getAttribute('data-attribute')
      console.log(data)
   })


   function nextStep() {
      const formWrapper = document.querySelector('.form__body-wrapper')
      if (formWrapper.classList.contains('step1')) {
         toggleSteps(step_2)
      } else if (formWrapper.classList.contains('step2')) {
         toggleSteps(step_3)
      }
   }

   function backStep() {
      const formWrapper = document.querySelector('.form__body-wrapper')
      if (formWrapper.classList.contains('step2')) {
         toggleSteps(step_1)
      }
      // else if (formWrapper.classList.contains('step2')) {
      //    toggleSteps(step_3)
      // }
   }

   button.addEventListener('click', (e) => {
      e.preventDefault()
      nextStep()

      if (backBatton.classList.contains('form__back_hide')) {
         backBatton.classList.remove('form__back_hide')
      }
   })

   backBatton.addEventListener('click', () => {
      backStep()
   })

});



