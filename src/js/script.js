$(document).ready(function(){
    $('.carousel__inner').slick({
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        autoplay: false,
        prevArrow:'<button type="button" class="slick-prev"><img src="icons/arrowleft.png"></button>',
        nextArrow:'<button type="button" class="slick-next"><img src="icons/arrowright.png"></button>',
        responsive: [
            {
              breakpoint: 769,
              settings: {
                dots: false,
                arrows:false
              }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
  
  function toggleSlide(item){
    $(item).each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  }

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //Modal
  $('[data-modal=consultation]').on('click',function(){
    $('.overlay,#consultation').fadeIn('slow');
  });

  $('.modal__close').on('click',function(){
    $('.overlay,#consultation,#thanks,#order').fadeOut('slow');
  });

  $('.button_mini').each(function(i){
    $(this).on('click',function(){
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.button_mini').on('click',function(){
        $('.overlay,#order').fadeIn('slow');
      });
    });
  });

  function validateForms(form){
    $(form).validate({
      rules:{
        name:'required',
        phone:'required',
        email:{
          required:true,
          email:true
        }
      },
      messages: {
        name: "Пожалуйста, введите своё имя",
        phone:"Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты, он должен быть вида  name@domain.com"
        }
      }
    });
  }

  validateForms('#consultation-form');
  validateForms('#order form');
  validateForms('#consultation form');

  $('input[name=phone]').mask("+7 (999) 999-99-99");

  $('form').submit(function(e){
    e.preventDefault();

    if (!$(this).valid()){
      return;
    }

    $.ajax({
      type:"POST",
      url:"../PHPMailer/smart.php",
      data:$(this).serialize()
    }).done(function(){
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');
      $('form').trigger('reset');
    });
    return false;
  });

  $(window).scroll(function(){
    if($(this).scrollTop()>1600){
      $('.pageup').fadeIn();
    } else{
      $('.pageup').fadeOut();
    }
  });

  new WOW().init();
  
});