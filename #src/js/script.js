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

   // ----------- Burger Menu ------------------

   let burger = document.querySelector('.burger'),
      nav = document.querySelector('.header__nav'),
      body = document.querySelector('body');

   burger.addEventListener('click', () => {
      burger.classList.toggle('active')
      nav.classList.toggle('active')
      body.classList.toggle('active')
   })


   // -------------  Smooth scroll link --------------------

   let smoothLinks = document.querySelectorAll('a[href*="#"]');

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

   // -------------- Accord menu ------------------------

   let headerAccord = document.querySelectorAll('.faq__header');

   headerAccord.forEach(head => {
      head.addEventListener('click', function () {
         let activeWrapperItem = document.querySelectorAll('.faq__text-wrapper.active')

         activeWrapperItem.forEach(item => {
            item.classList.remove('active')
         })

         let parentItem = head.parentNode,
            wrapperItem = parentItem.querySelector('.faq__text-wrapper');

         wrapperItem.classList.toggle('active')
      })
   })

   // ------------- Form ---------------------------

   let button = document.querySelector('#button'),
      backBatton = document.querySelector('.contact__prev'),
      content = document.querySelector('.form__content'),
      stepNum = document.querySelector('#progresNumber'),
      step = 1,

      data = {
         personalized: '',
         name: '',
         lastName: '',
         number: '',
         date: ''
      };

   const step_1 = `
   <p class="form__title">
      Request your personalized loan-proposal
   </p>

   <div class="form__wrapper">
      <label for="radio1" class="form__radio-btn">
         <input class="form__radio-input" type="radio" name="personalized" id="radio1" data-attribute='<5k'>
         <span class="form__radio-text">Less than €5,000</span>
      </label>
      <label for="radio2" class="form__radio-btn">
         <input class="form__radio-input" type="radio" name="personalized" id="radio2" data-attribute='>5k'>
         <span class="form__radio-text">€5,000-€25,000</span>
      </label>
      <label for="radio3" class="form__radio-btn">
         <input class="form__radio-input" type="radio" name="personalized" id="radio3" data-attribute='>25k'>
         <span class="form__radio-text">More than €25,000</span>
      </label>
   </div>   
`
   const step_2 = `
   <p class="form__title">
   Fill the rows below to suits better loan-offer for you
   </p>

   <div class="form__wrapper">
      <input type="text" name='name' class="form__input" placeholder="First name" pattern="[A-Za-zА-Яа-яЁё]">
      <input type="text" name='lastName' class="form__input" placeholder="Last name">
   </div>
`
   const step_3 = `
   <p></p>
   <div class="form__wrapper">
      <input type="text" name='number' class="form__input" placeholder="ID-number" data-attribute='number'>
      <input type="text" name='date' class="form__input" placeholder="Date of birth" data-attribute='birth'>
   </div>
`
   const step_4 = `
   <p>The form has been sent, thanks!</p>
`

   content.innerHTML = step_1;
   stepNum.innerHTML = step;

   // функция проверки на наличие checked у input type='radio'
   function radioChecked() {
      // находим в форме все input type='radio'
      let radioInputs = content.querySelectorAll('input[type="radio"]');
      // проходим по массиву и отделяем каждый input
      radioInputs.forEach(input => {
         // вешаем слушатель события по клику на каждый input
         input.addEventListener('click', function () {
            // проверяем наличие attribute checked у input
            if (input.checked) {
               // обращаемся к объекту и перезаписываем его ключ значение
               data.personalized = input.getAttribute('data-attribute')
            }
         })
         // проверяем наличие attribute checked у input
         if (input.checked) {
            // обращаемся к объекту и перезаписываем его ключ значение
            data.personalized = input.getAttribute('data-attribute')
         }
         // находим input с attr совпадающим с data.personalized
         if (data.personalized === input.getAttribute('data-attribute')) {
            // При совпадении даем этому input checked
            input.setAttribute('checked', true)
         }
      })
   }

   function inputVal() {
      let inputs = content.querySelectorAll('input[type="text"]');

      inputs.forEach(input => {
         switch (input.getAttribute('name')) {
            case 'name':
               data.name = input.value;
               break;
            case 'lastName':
               data.lastName = input.value;
               break;
            case 'number':
               data.number = input.value;
               break;
            case 'date':
               data.date = input.value;
               break;
         }
      })
   }

   // Счетчик вверх
   function countUp() {
      step = step + 1;
      stepNum.innerHTML = step;
   }
   // Счетчик вниз 
   function countDown() {
      step = step - 1
      stepNum.innerHTML = step;
   }

   function stepUp() {
      // Если step равен 1 и data.personalized не пустой то ...
      if (step === 1) {
         radioChecked();
         // Проверяем нажата ли radio button
         if (data.personalized.length !== 0) {
            content.innerHTML = step_2;
            countUp();
            backBatton.classList.toggle('disable')
         }
      } else if (step === 2) {
         inputVal();
         // Проверяем, что заполнены оба инпута
         if (data.name.length !== 0 && data.lastName.length !== 0) {
            content.innerHTML = step_3;
            countUp();
         }
      } else if (step === 3) {
         inputVal();
         // Проверяем, что заполнены оба инпута
         if (data.number.length !== 0 && data.date.length !== 0) {
            submitForm();
            content.innerHTML = step_4;
         }
      }
   }

   function stepDown() {
      switch (step) {
         case 2:
            content.innerHTML = step_1;
            countDown();
            radioChecked();
            backBatton.classList.toggle('disable');
            break;
         case 3:
            content.innerHTML = step_2;
            countDown();
            inputVal();
            break;
      }
   }

   // При нажатии меняет степ на +1
   button.addEventListener('click', (e) => {
      e.preventDefault();
      stepUp()
      console.log(data)
   })
   // При нажатии меняет степ на -1
   backBatton.addEventListener('click', () => {
      stepDown()
      console.log(data)
   })

   // отпраква формы 
   const submitForm = async () => {
      try {
         await $.ajax({
            url: 'http://localhost:8000/posts',
            type: 'POST',
            data: {
               personalized: data.personalized,
               name: data.name,
               lastName: data.lastName,
               idNumber: data.number,
               birthDate: data.date
            }
         })
      } catch (error) {
         console.error(error);
      }
   }

   // const submitForm = async () => {
   //    await fetch('http://localhost:8000/posts', {
   //       method: 'POST',
   //       headers: {
   //          'Content-Type': 'application/json;charset=utf-8'
   //       },
   //       body: JSON.stringify(data)
   //    });
   // }
});
