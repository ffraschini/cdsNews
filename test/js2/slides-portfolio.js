 function generateSlider (idSlider, idContentNextSlider, idContentPrevSlider){
	// Declarar slider como objeto javascript
	
	var slider = {};

	// Declarar el id para buscar el elemento "ul": 
	slider.initQuery = idSlider;

	// Declarar variables iniciales
	slider.slider = jQuery( slider.initQuery + " ul,ul"+slider.initQuery); // seleccionamos el "ul" con jquery
	slider.slides = slider.slider.find('li'); // seleccionamos cada uno de sus "li"
	slider.number = slider.slides.length; // Contamos el numero de "li" y por tanto slides que tenemos
	slider.actual = 0; // marcado para saber que slide estamos viendo, actualmente la primera, o sea la 0
	slider.height = 350; // altura del slider... luego la calcularemos
	slider.width = 0; // anchura del slider... luego la calcularemos

	// buscando ancho y alto de <li> máximos para calcular altura y anchura del slider...
	for ( var i = 0; i < slider.number; i++ )
	{
	  var w = jQuery( slider.slides[i] ).width();
	  var h = jQuery( slider.slides[i] ).height();
	  slider.height = ( h > slider.height ) ? h : slider.height;
	  slider.width = ( w > slider.width ) ? w : slider.width;	
	}
	 
	// formateando el css del <ul> contenedor, la caja del slider...
	slider.slider.css ( {
	  overflow: "hidden",
	  width: slider.width + 10,  
	  height: slider.height,
	  position: 'relative'
	});

	// colocando en posicion absoluta todos los <li> del slider, para poder ir haciendo las transiciones...
	for ( var i = 0; i < slider.number; i++ )
	{
	  var sl = jQuery( slider.slides[i] );
	  sl.attr('class',sl.attr('class') + " slider-slide-"+i);
	  sl.css({
		position : 'absolute',
		left : slider.width * i	
	  });
	}

	// funcion para moverse a un slide concreto...
	slider.go = function (where) {
	  if (where == 'next')
	  {
		slider.actual = ( slider.actual < slider.number-1) ? slider.actual*1 + 1 : 0;
	  }
	  else if (where == 'prev')
	  {
		slider.actual = ( slider.actual > 0) ? slider.actual - 1 : slider.number-1;
	  }
	  else
	  {
		slider.actual = where;
	  }
	 
	  for (var i=0;i<slider.number;i++)
	  {
		var sl = jQuery(slider.slides[i]);
		sl.animate({
		   left : slider.width * (i - slider.actual)
		},2000);
	  }
	};
	 
	 // asignando el evento a los botones de siguiente y anterior...
	jQuery( idContentNextSlider ).click( function () {
	  slider.go('next');
	  return false;	
	});
	jQuery(idContentPrevSlider ).click( function () {
	  slider.go('prev');
	  return false;	
	});

	
	}

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 